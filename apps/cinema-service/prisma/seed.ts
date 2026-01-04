import {
  PrismaClient,
  CinemaStatus,
  HallType,
  HallStatus,
  LayoutType,
  SeatType,
  SeatStatus,
  DayType,
  Format,
  ShowtimeStatus,
  ReservationStatus,
} from '../generated/prisma';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Cinema Service database...');

  // Clear existing data in correct order
  await prisma.seatReservations.deleteMany();
  await prisma.showtimes.deleteMany();
  await prisma.ticketPricing.deleteMany();
  await prisma.seats.deleteMany();
  await prisma.cinemaReviews.deleteMany();
  await prisma.halls.deleteMany();
  await prisma.cinemas.deleteMany();

  console.log('🔄 Cleared existing data');

  // -----------------------------------------------------------
  //  🎬 CREATE 8 CINEMAS
  // -----------------------------------------------------------

const cinemasData = [
  {
    name: 'CGV Aeon Tân Phú',
    address: '30 Bờ Bao Tân Thắng, Sơn Kỳ',
    city: 'Ho Chi Minh City',
    district: 'Tân Phú',
    phone: '028 3620 2000',
    email: 'tanphu@cgv.vn',
    website: 'https://www.cgv.vn',
    latitude: 10.8028,
    longitude: 106.6171,
    description:
      'One of the largest CGV cinemas in Ho Chi Minh City with IMAX and premium auditoriums.',
    amenities: ['Parking', 'Food Court', 'IMAX', 'Premium Lounge'],
    facilities: { parking_slots: 300, wheelchair_accessible: true },
    images: [
      'https://cdn.galaxycine.vn/media/2023/8/2/cgv-aeon-tan-phu-1_1690945376540.jpg',
      'https://cdn.galaxycine.vn/media/2023/8/2/cgv-aeon-tan-phu-2_1690945376714.jpg',
    ],
    rating: 4.6,
    total_reviews: 2100,
    operating_hours: {
      weekday: '09:00-23:00',
      weekend: '08:00-00:00',
    },
    social_media: { facebook: 'cgv.vn', instagram: 'cgv.vietnam' },
    status: CinemaStatus.ACTIVE,
  },

  {
    name: 'BHD Star Bitexco',
    address: '2 Hải Triều, Bến Nghé, Quận 1',
    city: 'Ho Chi Minh City',
    district: 'Quận 1',
    phone: '1900 2099',
    email: 'bitexco@bhdstar.vn',
    website: 'https://www.bhdstar.vn',
    latitude: 10.7714,
    longitude: 106.7041,
    description:
      'Modern cinema located inside Bitexco Financial Tower with premium services.',
    amenities: ['Parking', 'Snacks', 'VIP Zone'],
    facilities: { parking_slots: 100, wheelchair_accessible: true },
    images: [
      'https://bhdstar.vn/wp-content/uploads/2023/04/BHD-Bitexco-3-scaled.jpg',
    ],
    rating: 4.4,
    total_reviews: 1400,
    operating_hours: {
      weekday: '09:00-23:00',
      weekend: '08:00-00:00',
    },
    social_media: { facebook: 'bhdstar', instagram: 'bhdstar.vn' },
    status: CinemaStatus.ACTIVE,
  },

  {
    name: 'Galaxy Nguyễn Du',
    address: '116 Nguyễn Du, Quận 1',
    city: 'Ho Chi Minh City',
    district: 'Quận 1',
    phone: '1900 2220',
    email: 'nguyendu@galaxycine.vn',
    website: 'https://www.galaxycine.vn',
    latitude: 10.7733,
    longitude: 106.6944,
    description:
      'Galaxy Nguyễn Du is one of the most popular cinemas for young audiences.',
    amenities: ['Parking', 'Food Court'],
    facilities: { parking_slots: 150, wheelchair_accessible: true },
    images: [
      'https://cdn.galaxycine.vn/media/2022/12/13/nguyen-du-2_1670920067780.jpg',
    ],
    rating: 4.3,
    total_reviews: 1750,
    operating_hours: {
      weekday: '08:30-23:30',
      weekend: '08:00-00:30',
    },
    social_media: { facebook: 'galaxycine', instagram: 'galaxycine' },
    status: CinemaStatus.ACTIVE,
  },

  {
    name: 'MegaGS Cao Thắng',
    address: '19 Cao Thắng, Quận 3',
    city: 'Ho Chi Minh City',
    district: 'Quận 3',
    phone: '028 7300 4088',
    email: 'caothang@megags.vn',
    website: 'https://www.megags.vn',
    latitude: 10.7742,
    longitude: 106.6817,
    description: 'Cinema with modern auditoriums and attractive ticket prices.',
    amenities: ['Parking'],
    facilities: { parking_slots: 80, wheelchair_accessible: true },
    images: [
      'https://megagscinemas.vn/wp-content/uploads/2020/10/Slide-3-1.jpg',
    ],
    rating: 4.1,
    total_reviews: 900,
    operating_hours: {
      weekday: '09:00-22:30',
      weekend: '08:00-23:30',
    },
    social_media: { facebook: 'megagscinemas' },
    status: CinemaStatus.ACTIVE,
  },

  {
    name: 'Cinestar Hai Bà Trưng',
    address: '135 Hai Bà Trưng, Quận 1',
    city: 'Ho Chi Minh City',
    district: 'Quận 1',
    phone: '028 6288 8888',
    email: 'hbt@cinestar.vn',
    website: 'https://www.cinestar.vn',
    latitude: 10.7812,
    longitude: 106.6994,
    description:
      'Cinestar offers affordable prices with a modern and friendly environment.',
    amenities: ['Parking', 'Cafe'],
    facilities: { parking_slots: 120, wheelchair_accessible: true },
    images: [
      'https://cinestar.com.vn/pic/galaxycns/quan1-3-min_1635137614.jpg',
    ],
    rating: 4.2,
    total_reviews: 1100,
    operating_hours: {
      weekday: '09:00-23:00',
      weekend: '08:00-00:00',
    },
    social_media: { facebook: 'cinestarvn' },
    status: CinemaStatus.ACTIVE,
  },

  {
    name: 'Lotte Cinema Thủ Đức',
    address: '216 Võ Văn Ngân, Thủ Đức',
    city: 'Ho Chi Minh City',
    district: 'Thủ Đức',
    phone: '1900 2224',
    email: 'thuduc@lotte.vn',
    website: 'https://www.lottecinema.vn',
    latitude: 10.8534,
    longitude: 106.7531,
    description: 'Large Lotte branch with clean facilities and friendly staff.',
    amenities: ['Parking', 'Food Court', 'Shopping Mall'],
    facilities: { parking_slots: 250, wheelchair_accessible: true },
    images: [
      'https://lottecinemavn.com/media/article/image/lottecine-thuduc.jpg',
    ],
    rating: 4.5,
    total_reviews: 1650,
    operating_hours: {
      weekday: '09:00-23:00',
      weekend: '08:00-00:00',
    },
    social_media: { facebook: 'lottecinema', instagram: 'lottecinema' },
    status: CinemaStatus.ACTIVE,
  },

  {
    name: 'CGV Vincom Landmark 81',
    address: '208 Nguyễn Hữu Cảnh, Bình Thạnh',
    city: 'Ho Chi Minh City',
    district: 'Bình Thạnh',
    phone: '028 3620 2000',
    email: 'landmark81@cgv.vn',
    website: 'https://www.cgv.vn',
    latitude: 10.7945,
    longitude: 106.7227,
    description:
      'Located inside the tallest building in Vietnam, offering luxury IMAX theaters.',
    amenities: ['Parking', 'IMAX', 'Premium Lounge'],
    facilities: { parking_slots: 350, wheelchair_accessible: true },
    images: [
      'https://cdn.galaxycine.vn/media/2023/8/2/cgv-landmark-81_1690946082438.jpg',
    ],
    rating: 4.7,
    total_reviews: 2300,
    operating_hours: {
      weekday: '09:00-23:59',
      weekend: '08:00-00:30',
    },
    social_media: { facebook: 'cgv.vietnam', instagram: 'cgv.vn' },
    status: CinemaStatus.ACTIVE,
  },

  {
    name: 'BHD Star Vincom Thảo Điền',
    address: '159 Xa Lộ Hà Nội, Thảo Điền',
    city: 'Ho Chi Minh City',
    district: 'Thủ Đức',
    phone: '1900 2099',
    email: 'thaodien@bhdstar.vn',
    website: 'https://www.bhdstar.vn',
    latitude: 10.8031,
    longitude: 106.7298,
    description:
      'Cinema located in Vincom Mega Mall Thảo Điền with modern screen and sound.',
    amenities: ['Parking', 'Food Court'],
    facilities: { parking_slots: 200, wheelchair_accessible: true },
    images: [
      'https://bhdstar.vn/wp-content/uploads/2023/04/BHD-Thao-Dien-1-scaled.jpg',
    ],
    rating: 4.4,
    total_reviews: 1280,
    operating_hours: {
      weekday: '09:00-23:00',
      weekend: '08:00-00:00',
    },
    social_media: { facebook: 'bhdstar', instagram: 'bhdstar.vn' },
    status: CinemaStatus.ACTIVE,
  },
];



  const cinemas = [];
  for (const cinema of cinemasData) {
    const created = await prisma.cinemas.create({ data: cinema });
    cinemas.push(created);
  }

  console.log(`🎥 Created ${cinemas.length} cinemas`);
  // -----------------------------------------------------------
  //  🎬 CREATE 4 HALLS FOR EACH CINEMA (WITH RANDOM LAYOUT)
  // -----------------------------------------------------------

  function randomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const hallTypes = [
    HallType.STANDARD,
    HallType.VIP,
    HallType.FOUR_DX,
    HallType.IMAX,
  ];

  const allHalls = [];

  for (const cinema of cinemas) {
    for (let i = 0; i < 4; i++) {
      const hallType = hallTypes[i]; // FIXED order but applies variety per cinema

      // Random layout by hall type
      let rows = 10;
      let seatsPerRow = 14;

      switch (hallType) {
        case HallType.STANDARD:
          rows = randomInt(10, 12);
          seatsPerRow = randomInt(12, 16);
          break;
        case HallType.VIP:
          rows = randomInt(10, 12);
          seatsPerRow = randomInt(12, 16);
          break;
        case HallType.FOUR_DX:
          rows = randomInt(11, 15);
          seatsPerRow = randomInt(14, 18);
          break;
        case HallType.IMAX:
          rows = randomInt(12, 16);
          seatsPerRow = randomInt(16, 20);
          break;
      }

      const hall = await prisma.halls.create({
        data: {
          cinema_id: cinema.id,
          name: `${cinema.name} - Hall ${i + 1}`,
          type: hallType,
          capacity: rows * seatsPerRow,
          rows,
          screen_type:
            hallType === HallType.IMAX
              ? 'IMAX Screen'
              : hallType === HallType.FOUR_DX
              ? '3D Digital'
              : 'Standard Digital',
          sound_system:
            hallType === HallType.IMAX
              ? 'IMAX Sound'
              : hallType === HallType.VIP
              ? 'Dolby Atmos Premium'
              : 'Dolby 7.1',
          features: ['Air Conditioning', 'Cup Holders'],
          layout_type:
            hallType === HallType.IMAX
              ? LayoutType.STADIUM
              : LayoutType.STANDARD,
          status: HallStatus.ACTIVE,
        },
      });

      allHalls.push({ ...hall, rows, seatsPerRow });
    }
  }

  console.log(`🎞 Created ${allHalls.length} halls (4 halls per cinema)`);

  // -----------------------------------------------------------
  //  🎟 GENERATE RANDOM SEATS FOR EACH HALL
  // -----------------------------------------------------------

  const allSeats = [];

  for (const hall of allHalls) {
    const { rows, seatsPerRow } = hall;

    for (let r = 0; r < rows; r++) {
      const rowLetter = String.fromCharCode(65 + r); // A, B, C...

      for (let s = 1; s <= seatsPerRow; s++) {
        let seatType: SeatType = SeatType.STANDARD;

        // VIP zone (middle block)
        if (hall.type === HallType.VIP) {
          if (r >= Math.floor(rows * 0.3) && r <= Math.floor(rows * 0.7)) {
            if (
              s >= Math.floor(seatsPerRow * 0.3) &&
              s <= Math.floor(seatsPerRow * 0.7)
            ) {
              seatType = SeatType.VIP;
            }
          }
        }

        // IMAX couple seats (last 2 rows, even positions)
        if (hall.type === HallType.IMAX) {
          if (r >= rows - 2 && s % 2 === 0) {
            seatType = SeatType.COUPLE;
          } else {
            seatType = SeatType.PREMIUM;
          }
        }

        // 3D hall occasional premium
        if (hall.type === HallType.FOUR_DX) {
          if (r >= rows - 3 && s >= seatsPerRow - 4) {
            seatType = SeatType.PREMIUM;
          }
        }

        allSeats.push({
          hall_id: hall.id,
          row_letter: rowLetter,
          seat_number: s,
          type: seatType,
          status: SeatStatus.ACTIVE,
        });
      }
    }
  }

  await prisma.seats.createMany({ data: allSeats });

  console.log(`🪑 Created ${allSeats.length} seats across all halls`);
  // -----------------------------------------------------------
  //  🎬 PART 3 — ASSIGN MOVIES TO EACH CINEMA (3–4 MOVIES)
  // -----------------------------------------------------------

  console.log('🎥 Assigning movies to cinemas...');

  // List of movies injected manually (from your provided JSON)
  const movies = [
    {
      id: '0cd278c6-dfd5-41f2-bd85-0f1e9a67fdeb',
      title: 'Spider-Man: No Way Home',
      runtime: 148,
      language_type: 'SUBTITLE',
    },
    {
      id: '13915657-7f7c-4dc4-9fb5-f267806b9e4b',
      title: 'Inside Out',
      runtime: 95,
      language_type: 'SUBTITLE',
    },
    {
      id: '20db5080-9282-40ea-8fcd-b474dd905ad7',
      title: 'The Batman',
      runtime: 176,
      language_type: 'SUBTITLE',
    },
    {
      id: '3003df67-5f2d-4160-ab2b-2c662f78c22e',
      title: 'Zootopia',
      runtime: 108,
      language_type: 'SUBTITLE',
    },
    {
      id: '33935342-23da-46a9-971a-189709423717',
      title: 'Avengers: Endgame',
      runtime: 181,
      language_type: 'SUBTITLE',
    },
    {
      id: '4c83a06a-2b66-41ff-9f56-e603232835ef',
      title: 'Interstellar',
      runtime: 169,
      language_type: 'SUBTITLE',
    },
    {
      id: '5d6fb7ff-887f-409b-9162-92be182e20c3',
      title: 'Inception',
      runtime: 148,
      language_type: 'SUBTITLE',
    },
    {
      id: 'ebfa0368-ce63-4096-97b5-ee5da6a911cb',
      title: 'Joker',
      runtime: 122,
      language_type: 'SUBTITLE',
    },
    {
      id: 'f4e044ac-1061-4e5c-bd4c-cebaf949e32c',
      title: 'Mai',
      runtime: 131,
      language_type: 'ORIGINAL',
    },
  ];

  // Helper random
  function pickRandom<T>(arr: T[], count: number): T[] {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  // Assign to each cinema 3–4 movies
  const cinemaMovieMap: Record<string, typeof movies> = {};

  for (const cinema of cinemas) {
    const numMovies = randomInt(3, 4);
    cinemaMovieMap[cinema.id] = pickRandom(movies, numMovies);
  }

  console.log('🎬 Assigned movies to each cinema');

  // -----------------------------------------------------------
  //  🎞 PART 3B — GENERATE SHOWTIMES FOR 5 DAYS
  // -----------------------------------------------------------

  console.log('🕒 Generating showtimes...');

  const allShowtimes = [];
  const daysToGenerate = 5;

  const startHours = [9, 11, 13, 15, 17, 19, 21];
  const formatsByHall = {
    STANDARD: [Format.TWO_D],
    VIP: [Format.TWO_D],
    FOUR_DX: [Format.THREE_D, Format.TWO_D],
    IMAX: [Format.IMAX],
  }as Record<string, Format[]>;

  const languages = ['en', 'vi'];

  for (const cinema of cinemas) {
    const halls = allHalls.filter((h) => h.cinema_id === cinema.id);
    const assignedMovies = cinemaMovieMap[cinema.id];

    for (let day = 0; day < daysToGenerate; day++) {
      const date = new Date();
      date.setDate(date.getDate() + day);

      const day_type =
        date.getDay() === 0 || date.getDay() === 6
          ? DayType.WEEKEND
          : DayType.WEEKDAY;

      for (const hall of halls) {
        const movieList = pickRandom(
          assignedMovies,
          randomInt(1, assignedMovies.length)
        );

        for (const movie of movieList) {
          const numShowtimes = randomInt(3, 5);

      const hallFormats = formatsByHall[hall.type] || [Format.TWO_D];


          for (let i = 0; i < numShowtimes; i++) {
            const startHour = startHours[randomInt(0, startHours.length - 1)];

            const start = new Date(date);
            start.setHours(startHour, 0, 0, 0);

            const end = new Date(start);
            end.setMinutes(end.getMinutes() + movie.runtime + 15); // +15 minutes buffer

            const format = hallFormats[randomInt(0, hallFormats.length - 1)];

            const availableSeats = Math.floor(
              hall.capacity * randomInt(60, 100) * 0.01
            );

            const status =
              availableSeats === 0
                ? ShowtimeStatus.SOLD_OUT
                : ShowtimeStatus.SELLING;

            allShowtimes.push({
              movie_id: movie.id,
              movie_release_id: randomUUID(),
              cinema_id: cinema.id,
              hall_id: hall.id,
              start_time: start,
              end_time: end,
              day_type,
              format,
              language: languages[randomInt(0, languages.length - 1)],
              subtitles: movie.language_type === 'SUBTITLE' ? ['vi'] : [],
              available_seats: availableSeats,
              total_seats: hall.capacity,
              status,
            });
          }
        }
      }
    }
  }

  await prisma.showtimes.createMany({ data: allShowtimes });

  console.log(`🎫 Created ${allShowtimes.length} showtimes for 5 days`);
  // -----------------------------------------------------------
  //  🎫 PART 4 — TICKET PRICING FOR EACH HALL
  // -----------------------------------------------------------

  console.log('💰 Creating ticket pricing for halls...');

  const pricingPayload = [];

  for (const hall of allHalls) {
   const basePrices: Record<
     HallType,
     Record<SeatType, { weekday: number; weekend: number; holiday: number }>
   > = {
     [HallType.STANDARD]: {
       [SeatType.STANDARD]: { weekday: 75000, weekend: 90000, holiday: 100000 },
       [SeatType.VIP]: { weekday: 90000, weekend: 120000, holiday: 140000 },
       [SeatType.COUPLE]: { weekday: 160000, weekend: 200000, holiday: 230000 },
       [SeatType.PREMIUM]: {
         weekday: 110000,
         weekend: 130000,
         holiday: 150000,
       },
       [SeatType.WHEELCHAIR]: {
         weekday: 70000,
         weekend: 90000,
         holiday: 100000,
       },
     },

     [HallType.VIP]: {
       [SeatType.STANDARD]: {
         weekday: 90000,
         weekend: 110000,
         holiday: 130000,
       },
       [SeatType.VIP]: { weekday: 140000, weekend: 170000, holiday: 190000 },
       [SeatType.COUPLE]: { weekday: 200000, weekend: 240000, holiday: 270000 },
       [SeatType.PREMIUM]: {
         weekday: 160000,
         weekend: 190000,
         holiday: 220000,
       },
       [SeatType.WHEELCHAIR]: {
         weekday: 85000,
         weekend: 110000,
         holiday: 130000,
       },
     },

     [HallType.IMAX]: {
       [SeatType.STANDARD]: {
         weekday: 150000,
         weekend: 170000,
         holiday: 190000,
       },
       [SeatType.VIP]: { weekday: 180000, weekend: 210000, holiday: 240000 },
       [SeatType.COUPLE]: { weekday: 260000, weekend: 300000, holiday: 330000 },
       [SeatType.PREMIUM]: {
         weekday: 200000,
         weekend: 240000,
         holiday: 270000,
       },
       [SeatType.WHEELCHAIR]: {
         weekday: 140000,
         weekend: 160000,
         holiday: 180000,
       },
     },

     [HallType.FOUR_DX]: {
       [SeatType.STANDARD]: {
         weekday: 170000,
         weekend: 200000,
         holiday: 230000,
       },
       [SeatType.VIP]: { weekday: 200000, weekend: 230000, holiday: 260000 },
       [SeatType.COUPLE]: { weekday: 280000, weekend: 320000, holiday: 360000 },
       [SeatType.PREMIUM]: {
         weekday: 220000,
         weekend: 260000,
         holiday: 300000,
       },
       [SeatType.WHEELCHAIR]: {
         weekday: 150000,
         weekend: 170000,
         holiday: 200000,
       },
     },

     [HallType.PREMIUM]: {
       [SeatType.STANDARD]: {
         weekday: 120000,
         weekend: 150000,
         holiday: 170000,
       },
       [SeatType.VIP]: { weekday: 160000, weekend: 190000, holiday: 220000 },
       [SeatType.COUPLE]: { weekday: 230000, weekend: 260000, holiday: 300000 },
       [SeatType.PREMIUM]: {
         weekday: 180000,
         weekend: 210000,
         holiday: 250000,
       },
       [SeatType.WHEELCHAIR]: {
         weekday: 110000,
         weekend: 140000,
         holiday: 160000,
       },
     },
   };


    const pricesForHall = basePrices[hall.type];

   for (const seatType of Object.keys(pricesForHall) as SeatType[]) {
     const p = pricesForHall[seatType];

     pricingPayload.push(
       {
         hall_id: hall.id,
         seat_type: seatType as SeatType,
         day_type: DayType.WEEKDAY,
         price: p.weekday,
       },
       {
         hall_id: hall.id,
         seat_type: seatType as SeatType,
         day_type: DayType.WEEKEND,
         price: p.weekend,
       },
       {
         hall_id: hall.id,
         seat_type: seatType as SeatType,
         day_type: DayType.HOLIDAY,
         price: p.holiday,
       }
     );
   }
  }

  await prisma.ticketPricing.createMany({ data: pricingPayload });

  console.log(`🏷 Created ${pricingPayload.length} ticket pricing entries`);
  // -----------------------------------------------------------
  //  🎟 PART 5 — RANDOM SEAT RESERVATIONS
  // -----------------------------------------------------------

  console.log('🎟 Generating random seat reservations...');

  const showtimesList = await prisma.showtimes.findMany({
    select: {
      id: true,
      hall_id: true,
      available_seats: true,
      total_seats: true,
    },
  });

  const reservationPayload = [];

  for (const st of showtimesList) {
    // 10% chance to have reservations
    if (Math.random() > 0.1) continue;

    const seatsInHall = await prisma.seats.findMany({
      where: { hall_id: st.hall_id },
      select: { id: true },
    });

    const numReserved = randomInt(5, 12);
    const chosenSeats = pickRandom(seatsInHall, numReserved);

    const statuses = [
      ReservationStatus.CONFIRMED,
      ReservationStatus.CONFIRMED,
      ReservationStatus.CONFIRMED, // 70%
      ReservationStatus.CONFIRMED, // 20%
      ReservationStatus.CONFIRMED,
      ReservationStatus.CANCELLED, // 10%
    ];

    for (const seat of chosenSeats) {
      reservationPayload.push({
        showtime_id: st.id,
        seat_id: seat.id,
        user_id: randomUUID(),
        status: statuses[randomInt(0, statuses.length - 1)],
        booking_id: randomUUID(),
      });
    }

    // Update available seats
    await prisma.showtimes.update({
      where: { id: st.id },
      data: {
        available_seats: Math.max(0, st.available_seats - numReserved),
      },
    });
  }

  if (reservationPayload.length > 0) {
    await prisma.seatReservations.createMany({ data: reservationPayload });
  }

  console.log(`🪑 Created ${reservationPayload.length} seat reservations`);

  // -----------------------------------------------------------
  //  🎉 FINISHED!
  // -----------------------------------------------------------

  console.log('🎉 Cinema Service database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
