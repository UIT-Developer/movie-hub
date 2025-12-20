const { PrismaClient } = require('../generated/prisma');
const prisma = new PrismaClient();

async function main() {
  console.log('🎬 Starting Cinema Service seed...');

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

  // Create cinemas
  const cinema1 = await prisma.cinemas.create({
    data: {
      name: 'CGV Vincom Center Landmark',
      address: '81 Đ. Lê Thánh Tôn, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh',
      city: 'Hồ Chí Minh',
      district: 'Quận 1',
      phone: '1900-6017',
      email: 'landmark@cgv.vn',
      latitude: 10.7827,
      longitude: 106.7013,
      description:
        'Rạp phim hiện đại với công nghệ âm thanh và hình ảnh tiên tiến',
      amenities: ['Parking', 'Food Court', '3D', 'IMAX', 'VIP'],
      facilities: {
        totalScreens: 8,
        totalSeats: 1200,
        parking: true,
        wheelchairAccess: true,
        airConditioning: true,
      },
      images: [
        'https://example.com/cgv-landmark-exterior.jpg',
        'https://example.com/cgv-landmark-lobby.jpg',
      ],
      rating: 4.5,
      total_reviews: 156,
      operating_hours: {
        monday: '09:00-23:00',
        tuesday: '09:00-23:00',
        wednesday: '09:00-23:00',
        thursday: '09:00-23:00',
        friday: '09:00-24:00',
        saturday: '09:00-24:00',
        sunday: '09:00-23:00',
      },
      social_media: {
        facebook: 'cgvcinemas.vietnam',
        instagram: 'cgvcinemas_vn',
      },
      status: 'ACTIVE',
    },
  });

  const cinema2 = await prisma.cinemas.create({
    data: {
      name: 'Lotte Cinema Diamond Plaza',
      address: '34 Lê Duẩn, Bến Nghé, Quận 1, Thành phố Hồ Chí Minh',
      city: 'Hồ Chí Minh',
      district: 'Quận 1',
      phone: '1900-5555',
      email: 'diamond@lottecinema.com.vn',
      latitude: 10.7886,
      longitude: 106.7024,
      description: 'Rạp chiếu phim cao cấp với dịch vụ VIP đẳng cấp',
      amenities: ['Parking', 'Food Court', '3D', '4DX', 'Premium'],
      facilities: {
        totalScreens: 6,
        totalSeats: 900,
        parking: true,
        wheelchairAccess: true,
        airConditioning: true,
      },
      images: [
        'https://example.com/lotte-diamond-exterior.jpg',
        'https://example.com/lotte-diamond-lobby.jpg',
      ],
      rating: 4.3,
      total_reviews: 89,
      operating_hours: {
        monday: '10:00-22:30',
        tuesday: '10:00-22:30',
        wednesday: '10:00-22:30',
        thursday: '10:00-22:30',
        friday: '10:00-23:30',
        saturday: '10:00-23:30',
        sunday: '10:00-22:30',
      },
      social_media: {
        facebook: 'lottecinemasVN',
        instagram: 'lotte_cinemas_vn',
      },
      status: 'ACTIVE',
    },
  });

  console.log('✅ Created cinemas');

  // Create halls for Cinema 1
  const halls1 = await Promise.all([
    prisma.halls.create({
      data: {
        cinema_id: cinema1.id,
        name: 'Hall 1',
        type: 'STANDARD',
        capacity: 150,
        rows: 10,
        screen_type: '2K Digital',
        sound_system: 'Dolby Digital 7.1',
        features: ['Air Conditioning', 'Cup Holders'],
        status: 'ACTIVE',
      },
    }),
    prisma.halls.create({
      data: {
        cinema_id: cinema1.id,
        name: 'Hall 2',
        type: 'VIP',
        capacity: 80,
        rows: 8,
        screen_type: '4K Digital',
        sound_system: 'Dolby Atmos',
        features: ['Reclining Seats', 'Food Service', 'Blankets'],
        status: 'ACTIVE',
      },
    }),
    prisma.halls.create({
      data: {
        cinema_id: cinema1.id,
        name: 'Hall 3',
        type: 'IMAX',
        capacity: 200,
        rows: 12,
        screen_type: 'IMAX Laser',
        sound_system: 'IMAX Enhanced Sound',
        features: ['Large Screen', 'Enhanced Audio'],
        status: 'ACTIVE',
      },
    }),
  ]);

  // Create halls for Cinema 2
  const halls2 = await Promise.all([
    prisma.halls.create({
      data: {
        cinema_id: cinema2.id,
        name: 'Screen 1',
        type: 'STANDARD',
        capacity: 120,
        rows: 10,
        screen_type: '2K Digital',
        sound_system: 'DTS Digital Surround',
        features: ['Air Conditioning', 'Cup Holders'],
        status: 'ACTIVE',
      },
    }),
    prisma.halls.create({
      data: {
        cinema_id: cinema2.id,
        name: 'Screen 2',
        type: 'PREMIUM',
        capacity: 100,
        rows: 8,
        screen_type: '4K Digital',
        sound_system: 'Dolby Atmos',
        features: ['Premium Seats', 'Food Service'],
        status: 'ACTIVE',
      },
    }),
    prisma.halls.create({
      data: {
        cinema_id: cinema2.id,
        name: 'Screen 3',
        type: 'FOUR_DX',
        capacity: 60,
        rows: 6,
        screen_type: '4K Digital',
        sound_system: 'Dolby Atmos',
        features: ['Motion Seats', 'Environmental Effects', 'Wind', 'Water'],
        status: 'ACTIVE',
      },
    }),
  ]);

  console.log('✅ Created halls');

  // ...existing code for seats, pricing, showtimes, reviews...
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Cinema Service seed error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
