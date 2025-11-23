import { PrismaClient, BookingStatus, PaymentStatus, PaymentMethod, TicketStatus, ConcessionCategory, PromotionType, LoyaltyTier, LoyaltyTransactionType } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding Booking Service database...');

  // Clear existing data in correct order
  await prisma.loyaltyTransactions.deleteMany();
  await prisma.loyaltyAccounts.deleteMany();
  await prisma.refunds.deleteMany();
  await prisma.payments.deleteMany();
  await prisma.tickets.deleteMany();
  await prisma.bookingConcessions.deleteMany();
  await prisma.bookings.deleteMany();
  await prisma.promotions.deleteMany();
  await prisma.concessions.deleteMany();

  // Create Concessions
  const concessions = [
    {
      name: 'Bắp rang bơ lớn',
      name_en: 'Large Popcorn',
      description: 'Bắp rang bơ thơm ngon, kích cỡ lớn',
      category: ConcessionCategory.FOOD,
      price: 60000,
      image_url: 'https://example.com/popcorn-large.jpg',
      available: true,
      inventory: 100,
      allergens: ['Butter', 'Corn'],
    },
    {
      name: 'Bắp rang bơ vừa',
      name_en: 'Medium Popcorn',
      description: 'Bắp rang bơ thơm ngon, kích cỡ vừa',
      category: ConcessionCategory.FOOD,
      price: 45000,
      image_url: 'https://example.com/popcorn-medium.jpg',
      available: true,
      inventory: 150,
      allergens: ['Butter', 'Corn'],
    },
    {
      name: 'Coca Cola lớn',
      name_en: 'Large Coca Cola',
      description: 'Nước ngọt Coca Cola size lớn',
      category: ConcessionCategory.DRINK,
      price: 40000,
      image_url: 'https://example.com/coke-large.jpg',
      available: true,
      inventory: 200,
      allergens: [],
    },
    {
      name: 'Combo 1 - Bắp + Nước',
      name_en: 'Combo 1 - Popcorn + Drink',
      description: '1 bắp vừa + 1 nước ngọt size vừa',
      category: ConcessionCategory.COMBO,
      price: 75000,
      image_url: 'https://example.com/combo1.jpg',
      available: true,
      inventory: 80,
      allergens: ['Butter', 'Corn'],
    },
    {
      name: 'Combo Couple',
      name_en: 'Couple Combo',
      description: '2 bắp lớn + 2 nước ngọt lớn',
      category: ConcessionCategory.COMBO,
      price: 150000,
      image_url: 'https://example.com/combo-couple.jpg',
      available: true,
      inventory: 50,
      allergens: ['Butter', 'Corn'],
    },
    {
      name: 'Hotdog',
      name_en: 'Hotdog',
      description: 'Xúc xích nướng kẹp bánh mì',
      category: ConcessionCategory.FOOD,
      price: 35000,
      image_url: 'https://example.com/hotdog.jpg',
      available: true,
      inventory: 60,
      allergens: ['Gluten', 'Pork'],
    },
  ];

  await prisma.concessions.createMany({ data: concessions });
  console.log(`✅ Created ${concessions.length} concession items`);

  // Create Promotions
  const now = new Date();
  const oneMonthLater = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
  
  const promotions = [
    {
      code: 'WELCOME10',
      name: 'Welcome Discount',
      description: 'Giảm 10% cho khách hàng mới',
      type: PromotionType.PERCENTAGE,
      value: 10,
      min_purchase: 100000,
      max_discount: 50000,
      valid_from: now,
      valid_to: oneMonthLater,
      usage_limit: 1000,
      usage_per_user: 1,
      current_usage: 45,
      applicable_for: ['tickets'],
      active: true,
    },
    {
      code: 'WEEKEND20',
      name: 'Weekend Special',
      description: 'Giảm 20% vào cuối tuần',
      type: PromotionType.PERCENTAGE,
      value: 20,
      min_purchase: 200000,
      max_discount: 100000,
      valid_from: now,
      valid_to: oneMonthLater,
      usage_limit: 500,
      usage_per_user: 2,
      current_usage: 123,
      applicable_for: ['tickets', 'concessions'],
      conditions: { day_of_week: ['Saturday', 'Sunday'] },
      active: true,
    },
    {
      code: 'COMBO50K',
      name: 'Combo Discount',
      description: 'Giảm 50,000đ khi mua combo',
      type: PromotionType.FIXED_AMOUNT,
      value: 50000,
      min_purchase: 150000,
      valid_from: now,
      valid_to: oneMonthLater,
      usage_limit: 200,
      usage_per_user: 3,
      current_usage: 67,
      applicable_for: ['concessions'],
      active: true,
    },
  ];

  await prisma.promotions.createMany({ data: promotions });
  console.log(`✅ Created ${promotions.length} promotions`);

  // Create Loyalty Accounts
  const loyaltyAccounts = [
    {
      user_id: 'customer-user-1',
      current_points: 2500,
      tier: LoyaltyTier.GOLD,
      total_spent: 5000000,
    },
    {
      user_id: 'customer-user-2',
      current_points: 500,
      tier: LoyaltyTier.BRONZE,
      total_spent: 800000,
    },
    {
      user_id: 'customer-user-3',
      current_points: 1200,
      tier: LoyaltyTier.SILVER,
      total_spent: 2000000,
    },
  ];

  for (const account of loyaltyAccounts) {
    const created = await prisma.loyaltyAccounts.create({
      data: account,
    });

    // Create some loyalty transactions
    await prisma.loyaltyTransactions.createMany({
      data: [
        {
          loyalty_account_id: created.id,
          points: 500,
          type: LoyaltyTransactionType.EARN,
          description: 'Earned from booking',
        },
        {
          loyalty_account_id: created.id,
          points: -100,
          type: LoyaltyTransactionType.REDEEM,
          description: 'Redeemed for discount',
        },
      ],
    });
  }

  console.log(`✅ Created ${loyaltyAccounts.length} loyalty accounts with transactions`);

  // Create Sample Bookings (note: these reference external IDs from cinema/movie services)
  const sampleBookingCode = () => `BK${Date.now()}${Math.floor(Math.random() * 1000)}`;
  
  const booking1 = await prisma.bookings.create({
    data: {
      booking_code: sampleBookingCode(),
      user_id: 'customer-user-1',
      showtime_id: '00000000-0000-0000-0000-000000000001', // Placeholder
      customer_name: 'Nguyễn Văn A',
      customer_email: 'nguyenvana@example.com',
      customer_phone: '0901234567',
      subtotal: 200000,
      discount: 20000,
      points_used: 100,
      points_discount: 10000,
      final_amount: 170000,
      promotion_code: 'WELCOME10',
      status: BookingStatus.CONFIRMED,
      payment_status: PaymentStatus.COMPLETED,
    },
  });

  // Create Tickets for booking1
  await prisma.tickets.createMany({
    data: [
      {
        booking_id: booking1.id,
        seat_id: '00000000-0000-0000-0000-000000000001',
        ticket_code: `TK${Date.now()}001`,
        qr_code: 'QR_CODE_DATA_1',
        barcode: 'BARCODE_001',
        ticket_type: 'ADULT',
        price: 90000,
        status: TicketStatus.VALID,
      },
      {
        booking_id: booking1.id,
        seat_id: '00000000-0000-0000-0000-000000000002',
        ticket_code: `TK${Date.now()}002`,
        qr_code: 'QR_CODE_DATA_2',
        barcode: 'BARCODE_002',
        ticket_type: 'ADULT',
        price: 90000,
        status: TicketStatus.VALID,
      },
    ],
  });

  // Create Payment for booking1
  await prisma.payments.create({
    data: {
      booking_id: booking1.id,
      amount: 170000,
      payment_method: PaymentMethod.MOMO,
      status: PaymentStatus.COMPLETED,
      transaction_id: `TXN${Date.now()}001`,
      provider_transaction_id: 'MOMO_12345678',
      paid_at: new Date(),
    },
  });

  console.log('✅ Created sample bookings with tickets and payments');
  console.log('🎉 Booking Service database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
