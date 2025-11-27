import { PrismaClient, CinemaStatus, HallType, HallStatus, LayoutType, SeatType, SeatStatus, DayType, Format, ShowtimeStatus, ReservationStatus } from '../generated/prisma';
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

  // Create Cinemas
  const cgvNowZone = await prisma.cinemas.create({
    data: {
      name: 'CGV Nowzone',
      address: '235 Nguyễn Văn Cú, Quận 5',
      city: 'Ho Chi Minh City',
      district: 'Quận 5',
      phone: '0283 8 567 567',
      email: 'nowzone@cgv.vn',
      website: 'https://www.cgv.vn',
      latitude: 10.7552,
      longitude: 106.6667,
      description: 'CGV Nowzone offers a premium cinema experience with state-of-the-art technology and comfortable seating.',
      amenities: ['Parking', 'Restaurant', 'Cafe', 'ATM', 'Gaming Zone'],
      facilities: { parking_slots: 100, wheelchair_accessible: true },
      images: ['https://example.com/cgv-nowzone-1.jpg', 'https://example.com/cgv-nowzone-2.jpg'],
      rating: 4.5,
      total_reviews: 1250,
      operating_hours: { weekday: '09:00-23:00', weekend: '08:00-00:00' },
      social_media: { facebook: 'cgvcinemas', instagram: 'cgvcinemas' },
      status: CinemaStatus.ACTIVE,
    },
  });

  const lotteGo = await prisma.cinemas.create({
    data: {
      name: 'Lotte Cinema Gò Vấp',
      address: '242 Nguyễn Văn Lượng, Gò Vấp',
      city: 'Ho Chi Minh City',
      district: 'Gò Vấp',
      phone: '1900 2224',
      email: 'govap@lottecinema.vn',
      website: 'https://www.lottecinema.vn',
      latitude: 10.8378,
      longitude: 106.6768,
      description: 'Modern cinema with luxury seating and excellent sound system.',
      amenities: ['Parking', 'Food Court', 'Shopping Mall'],
      facilities: { parking_slots: 200, wheelchair_accessible: true },
      images: ['https://example.com/lotte-govap-1.jpg'],
      rating: 4.3,
      total_reviews: 890,
      operating_hours: { weekday: '09:00-23:00', weekend: '08:00-00:00' },
      status: CinemaStatus.ACTIVE,
    },
  });

  console.log('✅ Created 2 cinemas');

  // Create Halls for CGV Nowzone
  const cgvHall1 = await prisma.halls.create({
    data: {
      cinema_id: cgvNowZone.id,
      name: 'Screen 1',
      type: HallType.STANDARD,
      capacity: 150,
      rows: 10,
      screen_type: 'Digital',
      sound_system: 'Dolby Atmos',
      features: ['Air Conditioning', 'Cup Holders'],
      layout_type: LayoutType.STANDARD,
      status: HallStatus.ACTIVE,
    },
  });

  const cgvHall2 = await prisma.halls.create({
    data: {
      cinema_id: cgvNowZone.id,
      name: 'Screen 2 - IMAX',
      type: HallType.IMAX,
      capacity: 200,
      rows: 12,
      screen_type: 'IMAX',
      sound_system: 'IMAX Sound',
      features: ['Air Conditioning', 'Premium Seats', 'Cup Holders'],
      layout_type: LayoutType.STADIUM,
      status: HallStatus.ACTIVE,
    },
  });

  // Create Halls for Lotte
  const lotteHall1 = await prisma.halls.create({
    data: {
      cinema_id: lotteGo.id,
      name: 'Hall 1',
      type: HallType.STANDARD,
      capacity: 120,
      rows: 9,
      screen_type: 'Digital',
      sound_system: 'Dolby 7.1',
      features: ['Air Conditioning'],
      layout_type: LayoutType.STANDARD,
      status: HallStatus.ACTIVE,
    },
  });

  console.log('✅ Created 3 halls');

  // Create Seats for CGV Hall 1 (10 rows, 15 seats per row)
  const seats = [];
  for (let row = 0; row < 10; row++) {
    const rowLetter = String.fromCharCode(65 + row); // A-J
    for (let seat = 1; seat <= 15; seat++) {
      let seatType: SeatType = SeatType.STANDARD;
      
      // VIP seats in middle rows and center seats
      if (row >= 4 && row <= 6 && seat >= 6 && seat <= 10) {
        seatType = SeatType.VIP;
      }
      // Couple seats in the back
      if (row >= 8 && seat % 2 === 1 && seat <= 14) {
        seatType = SeatType.COUPLE;
      }
      
      seats.push({
        hall_id: cgvHall1.id,
        row_letter: rowLetter,
        seat_number: seat,
        type: seatType,
        status: SeatStatus.ACTIVE,
      });
    }
  }

  await prisma.seats.createMany({ data: seats });
  console.log(`✅ Created ${seats.length} seats for CGV Hall 1`);

  // Create Seats for CGV Hall 2 (IMAX - 12 rows, 18 seats per row)
  const imaxSeats = [];
  for (let row = 0; row < 12; row++) {
    const rowLetter = String.fromCharCode(65 + row); // A-L
    for (let seat = 1; seat <= 18; seat++) {
      let seatType: SeatType = SeatType.PREMIUM;
      if (row >= 9 && seat % 2 === 1) {
        seatType = SeatType.COUPLE;
      }
      
      imaxSeats.push({
        hall_id: cgvHall2.id,
        row_letter: rowLetter,
        seat_number: seat,
        type: seatType,
        status: SeatStatus.ACTIVE,
      });
    }
  }

  await prisma.seats.createMany({ data: imaxSeats });
  console.log(`✅ Created ${imaxSeats.length} seats for CGV IMAX Hall`);

  // Create Seats for Lotte Hall 1 (9 rows, 13 seats per row)
  const lotteSeats = [];
  for (let row = 0; row < 9; row++) {
    const rowLetter = String.fromCharCode(65 + row); // A-I
    for (let seat = 1; seat <= 13; seat++) {
      let seatType: SeatType = SeatType.STANDARD;
      if (row >= 4 && row <= 6 && seat >= 5 && seat <= 9) {
        seatType = SeatType.VIP;
      }
      
      lotteSeats.push({
        hall_id: lotteHall1.id,
        row_letter: rowLetter,
        seat_number: seat,
        type: seatType,
        status: SeatStatus.ACTIVE,
      });
    }
  }

  await prisma.seats.createMany({ data: lotteSeats });
  console.log(`✅ Created ${lotteSeats.length} seats for Lotte Hall 1`);

  // Create Ticket Pricing for CGV Hall 1
  const pricingData = [
    // Weekday - Standard Seat
    { hall_id: cgvHall1.id, seat_type: SeatType.STANDARD, day_type: DayType.WEEKDAY, price: 75000 },
    
    // Weekend - Standard Seat
    { hall_id: cgvHall1.id, seat_type: SeatType.STANDARD, day_type: DayType.WEEKEND, price: 90000 },
    
    // Holiday - Standard Seat
    { hall_id: cgvHall1.id, seat_type: SeatType.STANDARD, day_type: DayType.HOLIDAY, price: 100000 },
    
    // Weekday - VIP Seats
    { hall_id: cgvHall1.id, seat_type: SeatType.VIP, day_type: DayType.WEEKDAY, price: 120000 },
    
    // Weekend - VIP Seats
    { hall_id: cgvHall1.id, seat_type: SeatType.VIP, day_type: DayType.WEEKEND, price: 150000 },
    
    // Holiday - VIP Seats
    { hall_id: cgvHall1.id, seat_type: SeatType.VIP, day_type: DayType.HOLIDAY, price: 170000 },
    
    // Weekday - Couple Seats
    { hall_id: cgvHall1.id, seat_type: SeatType.COUPLE, day_type: DayType.WEEKDAY, price: 180000 },
    
    // Weekend - Couple Seats
    { hall_id: cgvHall1.id, seat_type: SeatType.COUPLE, day_type: DayType.WEEKEND, price: 220000 },
    
    // Holiday - Couple Seats
    { hall_id: cgvHall1.id, seat_type: SeatType.COUPLE, day_type: DayType.HOLIDAY, price: 250000 },
  ];

  await prisma.ticketPricing.createMany({ data: pricingData });
  console.log(`✅ Created ${pricingData.length} pricing entries`);

  // Create some Cinema Reviews
  const reviews = [
    {
      cinema_id: cgvNowZone.id,
      user_id: randomUUID(),
      rating: 5,
      comment: 'Great cinema with excellent sound system and comfortable seats!',
      aspects: { sound: 5, seats: 5, cleanliness: 4, staff: 5 },
      verified_visit: true,
    },
    {
      cinema_id: cgvNowZone.id,
      user_id: randomUUID(),
      rating: 4,
      comment: 'Good experience overall, but parking can be difficult on weekends.',
      aspects: { sound: 5, seats: 4, cleanliness: 4, staff: 4 },
      verified_visit: true,
    },
  ];
  await prisma.cinemaReviews.createMany({ data: reviews });
  console.log(`✅ Created ${reviews.length} cinema reviews`);


  // Create Showtimes (CRITICAL - Most Important)
  // Using placeholder movie IDs - these should match actual movie IDs in production
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  const showtimes = [
    // Today's showtimes for CGV Hall 1
    {
      movie_id: randomUUID(), // Placeholder for Avengers
      movie_release_id: randomUUID(),
      cinema_id: cgvNowZone.id,
      hall_id: cgvHall1.id,
      start_time: new Date(today.getTime() + 10 * 60 * 60 * 1000), // 10:00 AM
      end_time: new Date(today.getTime() + 13 * 60 * 60 * 1000), // 1:00 PM (3 hours)
      day_type: DayType.WEEKDAY,
      format: Format.TWO_D,
      language: 'en',
      subtitles: ['vi'],
      available_seats: 150,
      total_seats: 150,
      status: ShowtimeStatus.SELLING,
    },
    {
      movie_id: randomUUID(),
      movie_release_id: randomUUID(),
      cinema_id: cgvNowZone.id,
      hall_id: cgvHall1.id,
      start_time: new Date(today.getTime() + 14 * 60 * 60 * 1000), // 2:00 PM
      end_time: new Date(today.getTime() + 17 * 60 * 60 * 1000), // 5:00 PM
      day_type: DayType.WEEKDAY,
      format: Format.TWO_D,
      language: 'en',
      subtitles: ['vi'],
      available_seats: 148,
      total_seats: 150,
      status: ShowtimeStatus.SELLING,
    },
    {
      movie_id: randomUUID(), // Placeholder for Batman
      movie_release_id: randomUUID(),
      cinema_id: cgvNowZone.id,
      hall_id: cgvHall1.id,
      start_time: new Date(today.getTime() + 18 * 60 * 60 * 1000), // 6:00 PM
      end_time: new Date(today.getTime() + 21 * 60 * 60 * 1000), // 9:00 PM
      day_type: DayType.WEEKDAY,
      format: Format.TWO_D,
      language: 'en',
      subtitles: ['vi'],
      available_seats: 145,
      total_seats: 150,
      status: ShowtimeStatus.SELLING,
    },
    {
      movie_id: randomUUID(), // Placeholder for Spider-Man
      movie_release_id: randomUUID(),
      cinema_id: cgvNowZone.id,
      hall_id: cgvHall1.id,
      start_time: new Date(today.getTime() + 22 * 60 * 60 * 1000), // 10:00 PM
      end_time: new Date(today.getTime() + 24.5 * 60 * 60 * 1000), // 12:30 AM
      day_type: DayType.WEEKDAY,
      format: Format.TWO_D,
      language: 'en',
      subtitles: ['vi'],
      available_seats: 150,
      total_seats: 150,
      status: ShowtimeStatus.SELLING,
    },
    // IMAX Showtimes
    {
      movie_id: randomUUID(),
      movie_release_id: randomUUID(),
      cinema_id: cgvNowZone.id,
      hall_id: cgvHall2.id,
      start_time: new Date(today.getTime() + 11 * 60 * 60 * 1000), // 11:00 AM
      end_time: new Date(today.getTime() + 14 * 60 * 60 * 1000), // 2:00 PM
      day_type: DayType.WEEKDAY,
      format: Format.IMAX,
      language: 'en',
      subtitles: ['vi'],
      available_seats: 200,
      total_seats: 200,
      status: ShowtimeStatus.SELLING,
    },
    {
      movie_id: randomUUID(),
      movie_release_id: randomUUID(),
      cinema_id: cgvNowZone.id,
      hall_id: cgvHall2.id,
      start_time: new Date(today.getTime() + 19 * 60 * 60 * 1000), // 7:00 PM
      end_time: new Date(today.getTime() + 21.5 * 60 * 60 * 1000), // 9:30 PM
      day_type: DayType.WEEKDAY,
      format: Format.IMAX,
      language: 'en',
      subtitles: ['vi'],
      available_seats: 195,
      total_seats: 200,
      status: ShowtimeStatus.SELLING,
    },
    // Lotte Cinema Showtimes
    {
      movie_id: randomUUID(), // Placeholder for Mai
      movie_release_id: randomUUID(),
      cinema_id: lotteGo.id,
      hall_id: lotteHall1.id,
      start_time: new Date(today.getTime() + 10 * 60 * 60 * 1000), // 10:00 AM
      end_time: new Date(today.getTime() + 12.5 * 60 * 60 * 1000), // 12:30 PM
      day_type: DayType.WEEKDAY,
      format: Format.TWO_D,
      language: 'vi',
      subtitles: [],
      available_seats: 120,
      total_seats: 120,
      status: ShowtimeStatus.SELLING,
    },
    {
      movie_id: randomUUID(),
      movie_release_id: randomUUID(),
      cinema_id: lotteGo.id,
      hall_id: lotteHall1.id,
      start_time: new Date(today.getTime() + 15 * 60 * 60 * 1000), // 3:00 PM
      end_time: new Date(today.getTime() + 18 * 60 * 60 * 1000), // 6:00 PM
      day_type: DayType.WEEKDAY,
      format: Format.TWO_D,
      language: 'en',
      subtitles: ['vi'],
      available_seats: 115,
      total_seats: 120,
      status: ShowtimeStatus.SELLING,
    },
    {
      movie_id: randomUUID(),
      movie_release_id: randomUUID(),
      cinema_id: lotteGo.id,
      hall_id: lotteHall1.id,
      start_time: new Date(today.getTime() + 20 * 60 * 60 * 1000), // 8:00 PM
      end_time: new Date(today.getTime() + 22.5 * 60 * 60 * 1000), // 10:30 PM
      day_type: DayType.WEEKDAY,
      format: Format.TWO_D,
      language: 'en',
      subtitles: ['vi'],
      available_seats: 110,
      total_seats: 120,
      status: ShowtimeStatus.SELLING,
    },
    // Tomorrow's showtimes (Weekend example)
    {
      movie_id: randomUUID(),
      movie_release_id: randomUUID(),
      cinema_id: cgvNowZone.id,
      hall_id: cgvHall1.id,
      start_time: new Date(today.getTime() + 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000), // Tomorrow 10:00 AM
      end_time: new Date(today.getTime() + 24 * 60 * 60 * 1000 + 13 * 60 * 60 * 1000), // Tomorrow 1:00 PM
      day_type: DayType.WEEKEND,
      format: Format.THREE_D,
      language: 'en',
      subtitles: ['vi'],
      available_seats: 150,
      total_seats: 150,
      status: ShowtimeStatus.SCHEDULED,
    },
    // Sold out showtime example
    {
      movie_id: randomUUID(),
      movie_release_id: randomUUID(),
      cinema_id: cgvNowZone.id,
      hall_id: cgvHall2.id,
      start_time: new Date(today.getTime() + 24 * 60 * 60 * 1000 + 19 * 60 * 60 * 1000), // Tomorrow 7:00 PM
      end_time: new Date(today.getTime() + 24 * 60 * 60 * 1000 + 21.5 * 60 * 60 * 1000), // Tomorrow 9:30 PM
      day_type: DayType.WEEKEND,
      format: Format.IMAX,
      language: 'en',
      subtitles: ['vi'],
      available_seats: 0,
      total_seats: 200,
      status: ShowtimeStatus.SOLD_OUT,
    },
  ];

  await prisma.showtimes.createMany({ data: showtimes });
  console.log(`✅ Created ${showtimes.length} showtimes`);

  // Create some Seat Reservations
  const allSeats = await prisma.seats.findMany({
    where: { hall_id: cgvHall1.id },
    take: 10,
  });
  
  const allShowtimes = await prisma.showtimes.findMany({
    where: { hall_id: cgvHall1.id },
    take: 1,
  });

  if (allSeats.length > 0 && allShowtimes.length > 0) {
    const seatReservations = allSeats.slice(0, 5).map((seat) => ({
      showtime_id: allShowtimes[0].id,
      seat_id: seat.id,
      user_id: randomUUID(),
      status: ReservationStatus.CONFIRMED,
      booking_id: randomUUID(),
    }));

    await prisma.seatReservations.createMany({ data: seatReservations });
    console.log(`✅ Created ${seatReservations.length} seat reservations`);
  }

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
