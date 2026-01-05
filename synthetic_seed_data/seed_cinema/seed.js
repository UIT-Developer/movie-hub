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
 * SANITIZATION HELPER
 */
function sanitizeUrl(url) {
  if (
    !url ||
    typeof url !== 'string' ||
    url.includes('null') ||
    url.includes('undefined') ||
    url.includes('example.com')
  ) {
    return 'https://placehold.co/600x400?text=Cinema+Image';
  }
  return url;
}

async function main() {
  const dataPath = path.join(__dirname, 'data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  console.log('🎬 Starting Cinema Service seed...');
  console.log(
    'Shields Up: Enforcing correct seat counts to prevent >100% occupancy bugs.\n'
  );

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
  console.log('\n🏢 Phase 1: Seeding unified MovieHub cinemas...');
  const cinemaMap = {};

  for (const cinemaData of data.cinemas) {
    const { id, images, ...cinemaFields } = cinemaData;

    // Sanitize images
    const safeImages = (images || []).map(sanitizeUrl);

    // Use upsert for idempotency
    const cinema = await prisma.cinemas.upsert({
      where: {
        id: '00000000-0000-0000-0000-000000000000', // Forces create
      },
      update: { ...cinemaFields, images: safeImages },
      create: { ...cinemaFields, images: safeImages },
    });

    cinemaMap[id] = cinema;
    console.log(`   ✅ Created: ${cinema.name}`);
  }

  // ===========================
  // PHASE 2: Create Halls
  // ===========================
  console.log('\n🎭 Phase 2: Seeding halls...');
  const allHalls = [];

  for (const hallData of data.halls) {
    const { cinema_ref, ...hallFields } = hallData;
    const cinema = cinemaMap[cinema_ref];

    if (!cinema) continue;

    const hall = await prisma.halls.create({
      data: {
        ...hallFields,
        cinema_id: cinema.id,
      },
    });

    allHalls.push(hall);
  }
  console.log(`✅ Created ${allHalls.length} halls`);

  // ===========================
  // PHASE 3: Generate Seats
  // ===========================
  console.log('\n💺 Phase 3: Generating seats...');
  const seatsByHall = {};

  for (const hall of allHalls) {
    const rows = hall.rows;
    const seatsPerRow = Math.ceil(hall.capacity / rows); // This ceiling often causes total > capacity
    // Example: Cap 150, Rows 10 -> 15/row -> 150. Correct.
    // Example: Cap 64, Rows 8 -> 8/row -> 64. Correct.
    // Example: Cap 100, Rows 12 -> 8.33 -> 9/row -> 108 seats! (>100)

    seatsByHall[hall.id] = [];
    const hallSeatData = [];

    for (let row = 0; row < rows; row++) {
      const rowLetter = String.fromCharCode(65 + row); // A, B, C...

      for (let col = 1; col <= seatsPerRow; col++) {
        let seatType = 'STANDARD';

        // Logic for seat types
        if (hall.type === 'VIP') seatType = 'VIP';
        else if (hall.type === 'PREMIUM') seatType = 'PREMIUM';
        else if (hall.type === 'IMAX' && row >= rows - 3) seatType = 'VIP';
        else if (row >= rows - 2 && col % 2 === 1 && col < seatsPerRow)
          seatType = 'COUPLE';

        hallSeatData.push({
          hall_id: hall.id,
          row_letter: rowLetter,
          seat_number: col,
          type: seatType,
          status: 'ACTIVE',
        });
      }
    }

    // Store for counting later
    seatsByHall[hall.id] = hallSeatData;

    await prisma.seats.createMany({ data: hallSeatData });
  }

  const totalSeats = await prisma.seats.count();
  console.log(`✅ Created ${totalSeats} seats (verified against DB)`);

  // ===========================
  // PHASE 4: Create Ticket Pricing
  // ===========================
  console.log('\n💰 Phase 4: Generating ticket pricing...');
  const pricingData = [];
  const dayTypes = ['WEEKDAY', 'WEEKEND', 'HOLIDAY'];

  for (const hall of allHalls) {
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
    const hallSeats = seatsByHall[hall.id] || [];
    const uniqueSeatTypes = [...new Set(hallSeats.map((s) => s.type))];

    for (const seatType of uniqueSeatTypes) {
      for (const dayType of dayTypes) {
        let price = hallPrices[seatType] || 120000;
        if (dayType === 'WEEKEND') price = Math.round(price * 1.15);
        if (dayType === 'HOLIDAY') price = Math.round(price * 1.3);

        pricingData.push({
          hall_id: hall.id,
          seat_type: seatType,
          day_type: dayType,
          price: price,
        });
      }
    }
  }

  await prisma.ticketPricing.createMany({
    data: pricingData,
    skipDuplicates: true,
  });

  // ===========================
  // PHASE 5: Create Showtimes with Sequential Logic
  // ===========================
  console.log('\n🎞️ Phase 5: Generating sequential showtimes...');

  let moviesWithReleases = [];
  try {
    const movies = await moviePrisma.movie.findMany({
      take: 50,
      include: { movieReleases: true },
    });
    moviesWithReleases = movies.filter(
      (m) => m.movieReleases && m.movieReleases.length > 0
    );
  } catch (e) {
    console.warn(`⚠️ Could not fetch movies: ${e.message}`);
  }

  if (moviesWithReleases.length > 0) {
    const showtimes = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Range: Past 30 days -> Future 14 days
    for (let dayOffset = -30; dayOffset <= 14; dayOffset++) {
      const scheduleDate = new Date(today);
      scheduleDate.setDate(scheduleDate.getDate() + dayOffset);
      scheduleDate.setHours(9, 0, 0, 0);

      const dayType =
        scheduleDate.getDay() === 0 || scheduleDate.getDay() === 6
          ? 'WEEKEND'
          : 'WEEKDAY';
      const endOfDay = new Date(scheduleDate);
      endOfDay.setHours(23, 0, 0, 0);

      for (const hall of allHalls) {
        let nextAvailableTime = new Date(scheduleDate);

        // CRITICAL BUG FIX: Use ACTUAL generated seat count
        const actualSeats = seatsByHall[hall.id]
          ? seatsByHall[hall.id].length
          : hall.capacity;

        while (nextAvailableTime < endOfDay) {
          const validMovies = moviesWithReleases.filter((m) => {
            const release = m.movieReleases[0];
            const releaseDate = new Date(release.startDate);
            if (releaseDate > scheduleDate) return false;
            if (release.endDate && new Date(release.endDate) < scheduleDate)
              return false;
            return true;
          });

          if (validMovies.length === 0) break;

          const movie =
            validMovies[Math.floor(Math.random() * validMovies.length)];
          const movieRelease = movie.movieReleases[0];

          const startTime = new Date(nextAvailableTime);
          const runtimeMs = (movie.runtime || 120) * 60 * 1000;
          const cleaningMs = 20 * 60 * 1000;

          const endTime = new Date(
            startTime.getTime() + runtimeMs + 15 * 60000
          ); // +15m trailers/ads

          let format = 'TWO_D';
          if (hall.type === 'IMAX') format = 'IMAX';
          else if (hall.type === 'FOUR_DX') format = 'FOUR_DX';
          else if (
            ['VIP', 'PREMIUM'].includes(hall.type) &&
            Math.random() > 0.5
          )
            format = 'THREE_D';

          try {
            const showtime = await prisma.showtimes.create({
              data: {
                cinema_id: hall.cinema_id,
                hall_id: hall.id,
                movie_id: movie.id,
                movie_release_id: movieRelease.id,
                start_time: startTime,
                end_time: endTime,
                day_type: dayType,
                format: format,
                language: movie.originalLanguage || 'en',
                subtitles: ['vi'],
                // FIX: use actualSeats to ensure Denominator is correct
                available_seats: actualSeats,
                total_seats: actualSeats,
                status: 'SELLING',
              },
            });
            showtimes.push(showtime);
          } catch (e) {}

          nextAvailableTime = new Date(endTime.getTime() + cleaningMs);
        }
      }
    }
    console.log(`✅ Scheduled ${showtimes.length} showtimes`);
  }

  // ===========================
  // PHASE 6: Reviews
  // ===========================
  console.log('\n⭐ Phase 6: Seeding reviews...');
  for (const reviewData of data.reviews) {
    const cinema = cinemaMap[reviewData.cinema_ref];
    if (!cinema) continue;
    try {
      await prisma.cinemaReviews.upsert({
        where: {
          cinema_id_user_id: {
            cinema_id: cinema.id,
            user_id: reviewData.user_id,
          },
        },
        create: { ...reviewData, cinema_ref: undefined, cinema_id: cinema.id },
        update: { rating: reviewData.rating, comment: reviewData.comment },
      });
    } catch {}
  }

  const showtimeCount = await prisma.showtimes.count();
  console.log(
    `\n🎉 Cinema Service seed completed! Total Showtimes: ${showtimeCount}`
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
    if (moviePrisma) await moviePrisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    if (moviePrisma) await moviePrisma.$disconnect();
    process.exit(1);
  });
