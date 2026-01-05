const fs = require('fs');
const path = require('path');

// Helper to find PrismaClient in different environments (Local vs Docker)
function getPrismaClient(serviceName, customPath) {
  const possiblePaths = [
    customPath || `../../apps/${serviceName}/generated/prisma`, // Local
    '../../generated/prisma', // Docker (own service)
    `../../apps/${serviceName}/generated/prisma`, // Docker (other service if mounted)
  ];

  for (const p of possiblePaths) {
    try {
      if (fs.existsSync(path.resolve(__dirname, p))) {
        return require(p).PrismaClient;
      }
    } catch (e) {
      /* skip */
    }
  }
  return null;
}

const CinemaClient = getPrismaClient('cinema-service');
const MovieClient = getPrismaClient('movie-service');

// Initialize Cinema Service client
const prisma = CinemaClient ? new CinemaClient() : null;

// Initialize Movie Service client for cross-service data fetching
const moviePrisma = MovieClient
  ? new MovieClient({
      datasources: {
        db: {
          url:
            process.env.MOVIE_DATABASE_URL ||
            'postgresql://postgres:postgres@localhost:5436/movie_hub_movie',
        },
      },
    })
  : null;

/**
 * Cinema Service Seed Script
 *
 * This script seeds the cinema-service database with:
 * - Cinemas
 * - Halls (with seats auto-generated)
 * - Seats
 * - TicketPricing (matches schema: hall_id, seat_type, day_type, price)
 * - Showtimes (requires movie_release_id from movie-service)
 * - CinemaReviews
 *
 * Dependencies:
 * - seed_movie must be run FIRST to create Movie and MovieRelease records
 *
 * Schema Alignment:
 * - TicketPricing: Only uses [hall_id, seat_type, day_type] per unique constraint
 * - Showtimes: Requires movie_release_id (no time_slot field in schema)
 */

async function main() {
  const dataPath = path.join(__dirname, 'data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  console.log('� Starting Cinema Service seed...');
  console.log('📋 Schema-aligned version with proper relations\n');

  if (!prisma) {
    console.error(
      '❌ Cinema Service Prisma client not found. Connection failed!'
    );
    process.exit(1);
  }

  if (!moviePrisma) {
    console.warn(
      '⚠️ Movie Service Prisma client not found. Showtime generation may fail.'
    );
  }

  // Clean existing data in correct order (respecting foreign keys)
  await prisma.$transaction([
    prisma.seatReservations.deleteMany(),
    prisma.showtimes.deleteMany(),
    prisma.ticketPricing.deleteMany(),
    prisma.seats.deleteMany(),
    prisma.halls.deleteMany(),
    prisma.cinemaReviews.deleteMany(),
    prisma.cinemas.deleteMany(),
  ]);

  console.log('✅ Cleaned existing data');

  // ===========================
  // PHASE 1: Create Cinemas
  // ===========================
  console.log('\n🏢 Phase 1: Seeding cinemas...');
  const cinemaMap = {};

  for (const cinemaData of data.cinemas) {
    const { id, ...cinemaFields } = cinemaData;

    // Use upsert for idempotency (based on unique name + address combination)
    const cinema = await prisma.cinemas.upsert({
      where: {
        id: '00000000-0000-0000-0000-000000000000', // Will never match, forces create
      },
      update: cinemaFields,
      create: cinemaFields,
    });

    cinemaMap[id] = cinema;
    console.log(`   ✅ Created: ${cinema.name}`);
  }

  console.log(`✅ Created ${data.cinemas.length} cinemas`);

  // ===========================
  // PHASE 2: Create Halls
  // ===========================
  console.log('\n🎭 Phase 2: Seeding halls...');
  const allHalls = [];

  for (const hallData of data.halls) {
    const { cinema_ref, ...hallFields } = hallData;
    const cinema = cinemaMap[cinema_ref];

    if (!cinema) {
      console.warn(
        `   ⚠️ Cinema reference ${cinema_ref} not found for hall ${hallData.name}`
      );
      continue;
    }

    const hall = await prisma.halls.create({
      data: {
        ...hallFields,
        cinema_id: cinema.id,
      },
    });

    allHalls.push(hall);
    console.log(`   ✅ Created: ${hall.name} at ${cinema.name}`);
  }

  console.log(`✅ Created ${allHalls.length} halls`);

  // ===========================
  // PHASE 3: Generate Seats
  // ===========================
  console.log('\n💺 Phase 3: Generating seats...');
  const allSeats = [];
  const seatsByHall = {};

  for (const hall of allHalls) {
    const rows = hall.rows;
    const seatsPerRow = Math.ceil(hall.capacity / rows);
    seatsByHall[hall.id] = [];

    for (let row = 0; row < rows; row++) {
      const rowLetter = String.fromCharCode(65 + row); // A, B, C, etc.

      for (let col = 1; col <= seatsPerRow; col++) {
        let seatType = 'STANDARD';

        // Seat type assignment based on hall type and position
        if (hall.type === 'VIP') {
          seatType = 'VIP';
        } else if (hall.type === 'PREMIUM') {
          seatType = 'PREMIUM';
        } else if (hall.type === 'FOUR_DX') {
          seatType = 'STANDARD';
        } else if (hall.type === 'IMAX') {
          // Back 3 rows are VIP in IMAX
          if (row >= rows - 3) {
            seatType = 'VIP';
          }
        } else {
          // Standard halls - back 2 rows have couple seats (odd columns)
          if (row >= rows - 2 && col % 2 === 1 && col < seatsPerRow) {
            seatType = 'COUPLE';
          }
        }

        const seat = await prisma.seats.create({
          data: {
            hall_id: hall.id,
            row_letter: rowLetter,
            seat_number: col,
            type: seatType,
            status: 'ACTIVE',
          },
        });

        allSeats.push(seat);
        seatsByHall[hall.id].push(seat);
      }
    }
  }

  console.log(`✅ Created ${allSeats.length} seats`);

  // ===========================
  // PHASE 4: Create Ticket Pricing
  // ===========================
  // Schema: @@unique([hall_id, seat_type, day_type])
  // Fields: hall_id, seat_type, day_type, price
  // NOTE: ticket_type and time_slot are NOT in schema!
  console.log('\n💰 Phase 4: Generating ticket pricing (schema-aligned)...');

  const pricingData = [];
  const dayTypes = ['WEEKDAY', 'WEEKEND', 'HOLIDAY'];

  for (const hall of allHalls) {
    // Base prices by hall type -> seat type
    const basePrices = {
      STANDARD: {
        STANDARD: 120000,
        VIP: 150000,
        COUPLE: 250000,
        PREMIUM: 160000,
        WHEELCHAIR: 100000,
      },
      VIP: {
        VIP: 200000,
        PREMIUM: 220000,
        STANDARD: 180000,
        COUPLE: 350000,
        WHEELCHAIR: 150000,
      },
      PREMIUM: {
        PREMIUM: 200000,
        VIP: 220000,
        STANDARD: 180000,
        COUPLE: 380000,
        WHEELCHAIR: 150000,
      },
      IMAX: {
        STANDARD: 160000,
        VIP: 200000,
        PREMIUM: 220000,
        COUPLE: 300000,
        WHEELCHAIR: 130000,
      },
      FOUR_DX: {
        STANDARD: 250000,
        VIP: 300000,
        PREMIUM: 280000,
        COUPLE: 450000,
        WHEELCHAIR: 200000,
      },
    };

    const hallPrices = basePrices[hall.type] || basePrices.STANDARD;

    // Get unique seat types actually used in this hall
    const hallSeats = seatsByHall[hall.id] || [];
    const uniqueSeatTypes = [...new Set(hallSeats.map((s) => s.type))];

    for (const seatType of uniqueSeatTypes) {
      for (const dayType of dayTypes) {
        let price = hallPrices[seatType] || 120000;

        // Day type price adjustments
        if (dayType === 'WEEKEND') {
          price = Math.round(price * 1.15); // 15% weekend surcharge
        } else if (dayType === 'HOLIDAY') {
          price = Math.round(price * 1.3); // 30% holiday surcharge
        }

        pricingData.push({
          hall_id: hall.id,
          seat_type: seatType,
          day_type: dayType,
          price: price,
        });
      }
    }
  }

  // Use createMany for bulk insert (skip duplicates)
  await prisma.ticketPricing.createMany({
    data: pricingData,
    skipDuplicates: true, // Idempotency: skip if [hall_id, seat_type, day_type] exists
  });

  console.log(`✅ Created ${pricingData.length} ticket pricing combinations`);

  // ===========================
  // PHASE 5: Create Showtimes
  // Schema requires: movie_release_id (String @db.Uuid)
  // Schema does NOT have: time_slot
  console.log('\n🎞️ Phase 5: Fetching movies and releases for showtimes...');

  // Try to fetch movies with their releases
  let moviesWithReleases = [];
  try {
    // We use the MOVIE client (moviePrisma) to fetch from the movie database
    const movies = await moviePrisma.movie.findMany({
      take: 10,
      include: {
        movieReleases: true,
      },
    });

    // Only include movies that have at least one release
    moviesWithReleases = movies.filter(
      (m) => m.movieReleases && m.movieReleases.length > 0
    );
    console.log(
      `✅ Found ${movies.length} movies, ${moviesWithReleases.length} with releases`
    );
  } catch {
    console.log('⚠️ Could not fetch movies from database.');
    console.log(
      '   This is expected if movie-service uses a separate database.'
    );
    console.log('   Alternative: Run seed_movie first OR use same database.');
  }

  if (moviesWithReleases.length === 0) {
    console.log(
      '⚠️ No movies with releases found. Skipping showtime creation.'
    );
    console.log('   To create showtimes:');
    console.log('   1. Run seed_movie first to create movies and releases');
    console.log('   2. Ensure cinema-service can access movie tables');
    console.log('   3. Or configure shared database connection');
  } else {
    console.log('📅 Generating showtimes for next 7 days...');

    const showtimes = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Time slots (for scheduling logic only, NOT stored in DB)
    const timeSlots = [
      { hour: 9, minute: 0 },
      { hour: 11, minute: 30 },
      { hour: 14, minute: 0 },
      { hour: 16, minute: 30 },
      { hour: 19, minute: 0 },
      { hour: 21, minute: 30 },
      { hour: 23, minute: 45 },
    ];

    // Helper function to determine day type
    const getDayType = (date) => {
      const dayOfWeek = date.getDay();
      return dayOfWeek === 0 || dayOfWeek === 6 ? 'WEEKEND' : 'WEEKDAY';
    };

    // Generate showtimes for past 30 days + next 7 days
    for (let dayOffset = -30; dayOffset < 7; dayOffset++) {
      for (const hall of allHalls) {
        // Get the cinema for this hall
        const cinema = Object.values(cinemaMap).find(
          (c) => c.id === hall.cinema_id
        );

        // Each hall shows 3-5 different movies per day
        const shuffledMovies = [...moviesWithReleases].sort(
          () => 0.5 - Math.random()
        );
        const moviesForHall = shuffledMovies.slice(
          0,
          Math.floor(Math.random() * 3) + 3
        );

        for (let i = 0; i < moviesForHall.length && i < timeSlots.length; i++) {
          const movie = moviesForHall[i];
          const timeSlot = timeSlots[i];

          // Get a valid movie release (use the first one)
          const movieRelease = movie.movieReleases[0];
          if (!movieRelease) {
            console.warn(
              `   ⚠️ Movie ${movie.title} has no releases, skipping`
            );
            continue;
          }

          const startTime = new Date(today);
          startTime.setDate(startTime.getDate() + dayOffset);
          startTime.setHours(timeSlot.hour, timeSlot.minute, 0, 0);

          const endTime = new Date(startTime);
          endTime.setMinutes(
            endTime.getMinutes() + (movie.runtime || 120) + 15
          ); // Movie + 15min buffer

          const dayType = getDayType(startTime);

          // LOGIC FIX: Do not generate showtime if before movie release
          if (new Date(movieRelease.startDate) > startTime) {
            continue;
          }

          // Determine format based on hall type
          let format = 'TWO_D';
          if (hall.type === 'IMAX') {
            format = 'IMAX';
          } else if (hall.type === 'FOUR_DX') {
            format = 'FOUR_DX';
          } else if (hall.type === 'VIP' || hall.type === 'PREMIUM') {
            format = Math.random() > 0.5 ? 'TWO_D' : 'THREE_D';
          } else {
            format = Math.random() > 0.7 ? 'THREE_D' : 'TWO_D';
          }

          try {
            const showtime = await prisma.showtimes.create({
              data: {
                cinema_id: cinema.id,
                hall_id: hall.id,
                movie_id: movie.id,
                movie_release_id: movieRelease.id, // REQUIRED field - now properly set
                start_time: startTime,
                end_time: endTime,
                day_type: dayType,
                // NOTE: time_slot is NOT in schema, removed
                format: format,
                language: movie.originalLanguage || 'en',
                subtitles: ['vi'],
                available_seats: hall.capacity,
                total_seats: hall.capacity,
                status: 'SELLING',
              },
            });

            showtimes.push(showtime);
          } catch (error) {
            console.warn(`   ⚠️ Failed to create showtime: ${error.message}`);
          }
        }
      }
    }

    console.log(`✅ Created ${showtimes.length} showtimes for next 7 days`);
  }

  // ===========================
  // PHASE 6: Create Cinema Reviews
  // ===========================
  console.log('\n⭐ Phase 6: Seeding cinema reviews...');

  for (const reviewData of data.reviews) {
    const { cinema_ref, ...reviewFields } = reviewData;
    const cinema = cinemaMap[cinema_ref];

    if (!cinema) {
      console.warn(`   ⚠️ Cinema reference ${cinema_ref} not found for review`);
      continue;
    }

    try {
      // Use upsert to handle re-runs (unique constraint: [cinema_id, user_id])
      await prisma.cinemaReviews.upsert({
        where: {
          cinema_id_user_id: {
            cinema_id: cinema.id,
            user_id: reviewFields.user_id,
          },
        },
        update: {
          rating: reviewFields.rating,
          comment: reviewFields.comment,
        },
        create: {
          ...reviewFields,
          cinema_id: cinema.id,
        },
      });
    } catch (error) {
      console.warn(`   ⚠️ Failed to create review: ${error.message}`);
    }
  }

  console.log(`✅ Created ${data.reviews.length} cinema reviews`);

  // ===========================
  // Summary
  // ===========================
  console.log('\n📊 =============== SEED SUMMARY ===============');
  const cinemaCount = await prisma.cinemas.count();
  const hallCount = await prisma.halls.count();
  const seatCount = await prisma.seats.count();
  const pricingCount = await prisma.ticketPricing.count();
  const showtimeCount = await prisma.showtimes.count();
  const reviewCount = await prisma.cinemaReviews.count();

  console.log(`🏢 Cinemas: ${cinemaCount}`);
  console.log(`🎭 Halls: ${hallCount}`);
  console.log(`💺 Seats: ${seatCount}`);
  console.log(`💰 Pricing Rules: ${pricingCount}`);
  console.log(`🎬 Showtimes: ${showtimeCount}`);
  console.log(`⭐ Reviews: ${reviewCount}`);
  console.log('==============================================\n');

  console.log('🎉 Cinema Service seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await moviePrisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Cinema Service seed error:', e);
    await prisma.$disconnect();
    await moviePrisma.$disconnect();
    process.exit(1);
  });
