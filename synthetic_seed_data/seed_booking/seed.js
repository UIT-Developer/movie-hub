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

const BookingClient = getPrismaClient('booking-service');
const CinemaClient = getPrismaClient('cinema-service');

// Initialize Booking Service client
const prisma = BookingClient ? new BookingClient() : null;

// Initialize Cinema Service client for cross-service data fetching
const cinemaPrisma = CinemaClient
  ? new CinemaClient({
      datasources: {
        db: {
          url:
            process.env.CINEMA_DATABASE_URL ||
            'postgresql://postgres:postgres@localhost:5437/movie_hub_cinema',
        },
      },
    })
  : null;

/**
 * Booking Service Seed Script
 *
 * This script seeds the booking-service database with:
 * - Concessions (food/drinks/merchandise)
 * - Promotions (discount codes)
 * - LoyaltyAccounts (user loyalty programs)
 * - Bookings (ticket orders with realistic data)
 * - Tickets (individual seat tickets)
 * - Payments (payment records)
 * - Refunds (for cancelled bookings)
 * - BookingConcessions (concession orders)
 * - LoyaltyTransactions (points earned/redeemed)
 *
 * Dependencies:
 * - seed_cinema must be run FIRST to create Showtimes and Seats
 *
 * Schema Alignment:
 * - TicketPricing: Only uses [hall_id, seat_type, day_type] - NO ticket_type or time_slot
 * - Showtimes: Only uses day_type - NO time_slot field
 * - Uses upsert where unique constraints allow for idempotency
 */

function generateBookingCode() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  let result = '';
  for (let i = 0; i < 2; i++)
    result += letters.charAt(Math.floor(Math.random() * letters.length));
  for (let i = 0; i < 6; i++)
    result += numbers.charAt(Math.floor(Math.random() * numbers.length));
  return result;
}

function generateTicketCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < 12; i++)
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  return result;
}

function randomDate(startDaysAgo, endDaysAgo) {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - startDaysAgo);
  end.setDate(end.getDate() - endDaysAgo);
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Get ticket price from TicketPricing table
 * Schema fields: hall_id, seat_type, day_type, price
 * NOTE: ticket_type and time_slot are NOT in the schema!
 *
 * @param {string} hallId - UUID of the hall
 * @param {string} seatType - SeatType enum value (STANDARD, VIP, COUPLE, PREMIUM, WHEELCHAIR)
 * @param {string} dayType - DayType enum value (WEEKDAY, WEEKEND, HOLIDAY)
 * @returns {Promise<number>} - Price in VND
 */
async function getTicketPrice(hallId, seatType, dayType) {
  const pricing = await cinemaPrisma.ticketPricing.findFirst({
    where: {
      hall_id: hallId,
      seat_type: seatType,
      day_type: dayType,
      // NOTE: ticket_type and time_slot removed - not in schema
    },
  });

  if (pricing) {
    return Number(pricing.price);
  }

  // Fallback pricing if not found in database
  const basePrices = {
    STANDARD: 120000,
    VIP: 180000,
    COUPLE: 250000,
    PREMIUM: 200000,
    WHEELCHAIR: 100000,
  };

  let price = basePrices[seatType] || 120000;

  // Apply day type multiplier
  if (dayType === 'WEEKEND') {
    price = Math.round(price * 1.15);
  } else if (dayType === 'HOLIDAY') {
    price = Math.round(price * 1.3);
  }

  return price;
}

async function main() {
  const dataPath = path.join(__dirname, 'data.json');
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

  console.log('🎟️ Starting Booking Service seed...');
  console.log('📋 Schema-aligned version with proper relations\n');

  if (!prisma) {
    console.error(
      '❌ Booking Service Prisma client not found. Connection failed!'
    );
    process.exit(1);
  }

  if (!cinemaPrisma) {
    console.warn(
      '⚠️ Cinema Service Prisma client not found. Data fetching will fail.'
    );
  }

  // Clean existing data in correct order (respecting foreign keys)
  await prisma.$transaction([
    prisma.loyaltyTransactions.deleteMany(),
    prisma.loyaltyAccounts.deleteMany(),
    prisma.bookingConcessions.deleteMany(),
    prisma.refunds.deleteMany(),
    prisma.tickets.deleteMany(),
    prisma.payments.deleteMany(),
    prisma.bookings.deleteMany(),
    prisma.concessions.deleteMany(),
    prisma.promotions.deleteMany(),
  ]);

  console.log('✅ Cleaned existing data');

  // ===========================
  // PHASE 1: Create Concessions
  // ===========================
  console.log('\n🍿 Phase 1: Seeding concessions...');
  const concessions = await Promise.all(
    data.concessions.map((c) =>
      prisma.concessions.create({
        data: c,
      })
    )
  );
  console.log(`✅ Created ${concessions.length} concessions`);

  // ===========================
  // PHASE 2: Create Promotions
  // ===========================
  console.log('\n🎁 Phase 2: Seeding promotions...');
  const promotions = [];
  for (const p of data.promotions) {
    try {
      // Use upsert based on unique code
      const promotion = await prisma.promotions.upsert({
        where: { code: p.code },
        update: {
          ...p,
          valid_from: new Date(p.valid_from),
          valid_to: new Date(p.valid_to),
        },
        create: {
          ...p,
          valid_from: new Date(p.valid_from),
          valid_to: new Date(p.valid_to),
        },
      });
      promotions.push(promotion);
    } catch (error) {
      console.warn(
        `   ⚠️ Failed to create promotion ${p.code}: ${error.message}`
      );
    }
  }
  console.log(`✅ Created ${promotions.length} promotions`);

  // ===========================
  // PHASE 3: Create Loyalty Accounts
  // ===========================
  console.log('\n💎 Phase 3: Seeding loyalty accounts...');
  const loyaltyAccounts = [];
  for (const la of data.loyaltyAccounts) {
    try {
      // Use upsert based on unique user_id
      const account = await prisma.loyaltyAccounts.upsert({
        where: { user_id: la.user_id },
        update: la,
        create: la,
      });
      loyaltyAccounts.push(account);
    } catch (error) {
      console.warn(
        `   ⚠️ Failed to create loyalty account ${la.user_id}: ${error.message}`
      );
    }
  }
  console.log(`✅ Created ${loyaltyAccounts.length} loyalty accounts`);

  // ===========================
  // PHASE 4: Fetch Showtimes and Seats
  // ===========================
  console.log(
    '\n📅 Phase 4: Fetching showtimes and seats from Cinema service...'
  );

  const showtimes = await cinemaPrisma.showtimes.findMany({
    include: {
      hall: {
        include: {
          seats: true,
        },
      },
    },
  });

  if (showtimes.length === 0) {
    console.log('⚠️ No showtimes found. Please run seed_cinema first!');
    console.log('   Exiting without creating bookings.');

    // Still print summary of what was created
    console.log('\n📊 =============== PARTIAL SEED SUMMARY ===============');
    console.log(`🍿 Concessions: ${concessions.length}`);
    console.log(`🎁 Promotions: ${promotions.length}`);
    console.log(`💎 Loyalty Accounts: ${loyaltyAccounts.length}`);
    console.log('======================================================\n');
    return;
  }

  console.log(`✅ Found ${showtimes.length} showtimes`);

  // Get all seats for reference
  const allSeats = await cinemaPrisma.seats.findMany();
  console.log(`✅ Found ${allSeats.length} seats`);

  // ===========================
  // PHASE 5: Generate Bookings
  // ===========================
  console.log('\n🔄 Phase 5: Generating 600 bookings with realistic data...');

  const allBookings = [];
  const bookingsToCreate = 600;
  const usedBookingCodes = new Set();

  for (let i = 0; i < bookingsToCreate; i++) {
    try {
      // Random showtime
      const showtime = randomElement(showtimes);
      const hallSeats = showtime.hall.seats;

      if (hallSeats.length === 0) continue;

      // Random number of tickets (1-4)
      const numTickets = randomInt(1, 4);

      // Select random available seats
      const selectedSeats = [];
      const availableSeats = [...hallSeats];
      for (let j = 0; j < numTickets && availableSeats.length > 0; j++) {
        const randomIndex = randomInt(0, availableSeats.length - 1);
        selectedSeats.push(availableSeats[randomIndex]);
        availableSeats.splice(randomIndex, 1);
      }

      if (selectedSeats.length === 0) continue;

      // Calculate booking relative to showtime
      const now = new Date();
      const showtimeDate = new Date(showtime.start_time);

      // Booking created 1-14 days before showtime
      const daysBefore = randomInt(0, 14);
      const bookingTime = new Date(
        showtimeDate.getTime() -
          daysBefore * 24 * 60 * 60 * 1000 -
          randomInt(0, 86400000)
      );

      // Ensure booking time is not in the future relative to now
      const createdAt = bookingTime > now ? now : bookingTime;

      // Skip if this implies we booked a showtime that hasn't been released yet (simple check)
      // Assuming movies released 30+ days ago for simplicity or standard logic

      // Random user
      const userId = randomElement(data.userIds);
      const customerName = randomElement(data.customerNames);
      const customerEmail = `${customerName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd')
        .replace(/Đ/g, 'D')
        .replace(/\s+/g, '')}@email.com`;
      const customerPhone = `09${randomInt(10000000, 99999999)}`;

      // Calculate pricing using showtime's day_type (NO time_slot - not in schema!)
      let subtotal = 0;
      const ticketData = [];

      for (const seat of selectedSeats) {
        // Get price from pricing table - only uses day_type now
        const price = await getTicketPrice(
          showtime.hall_id,
          seat.type,
          showtime.day_type
          // NOTE: time_slot removed - not in schema
        );

        subtotal += price;

        // Ticket type is just for display/business logic, not for pricing lookup
        let ticketType = 'ADULT';
        if (seat.type === 'COUPLE') {
          ticketType = 'COUPLE';
        } else {
          // 70% ADULT, 20% STUDENT, 10% CHILD
          const roll = Math.random();
          if (roll < 0.7) {
            ticketType = 'ADULT';
          } else if (roll < 0.9) {
            ticketType = 'STUDENT';
          } else {
            ticketType = 'CHILD';
          }
        }

        ticketData.push({
          seat_id: seat.id,
          price: price,
          type: ticketType,
        });
      }

      // Random promotion (30% chance)
      let promotionCode = null;
      let discount = 0;
      if (Math.random() < 0.3) {
        const promos = ['WELCOME20', 'STUDENT15'];
        promotionCode = randomElement(promos);
        discount =
          promotionCode === 'WELCOME20' ? subtotal * 0.2 : subtotal * 0.15;
        discount = Math.min(
          discount,
          promotionCode === 'WELCOME20' ? 50000 : 30000
        );
      }

      // Random loyalty points (20% chance)
      let pointsUsed = 0;
      let pointsDiscount = 0;
      if (Math.random() < 0.2 && userId.includes('user_')) {
        pointsUsed = randomInt(100, 500);
        pointsDiscount = pointsUsed * 50; // 50 VND per point
      }

      const finalAmount = Math.max(subtotal - discount - pointsDiscount, 0);

      // Random status
      // CHANGED: Use CONFIRMED for successful bookings so they appear in revenue reports immediately
      let status = 'CONFIRMED';
      let paymentStatus = 'COMPLETED';
      let cancelledAt = null;
      let cancellationReason = null;

      const statusRoll = Math.random();
      if (statusRoll < 0.05) {
        // 5% Cancelled
        status = 'CANCELLED';
        paymentStatus = 'REFUNDED';
        cancelledAt = new Date(
          createdAt.getTime() + randomInt(1, 24) * 60 * 60 * 1000
        );
        cancellationReason = randomElement([
          'Khách hàng hủy do thay đổi lịch trình',
          'Khách hàng yêu cầu hoàn tiền',
          'Không thể tham dự',
        ]);
      } else if (statusRoll < 0.1) {
        // 5% Refunded (NEW)
        status = 'REFUNDED';
        paymentStatus = 'REFUNDED'; // Or whatever your system uses for refunded payment status
        cancelledAt = new Date(
          createdAt.getTime() + randomInt(1, 24) * 60 * 60 * 1000
        );
        cancellationReason = 'User requested refund (Voucher)';
      } else if (statusRoll < 0.15) {
        // 5% Pending
        status = 'PENDING';
        paymentStatus = 'PENDING';
      } else if (statusRoll < 0.25) {
        // 10% Completed (NEW)
        status = 'COMPLETED';
        paymentStatus = 'COMPLETED';
      }

      // Generate unique booking code
      let bookingCode = generateBookingCode();
      let attempts = 0;
      while (usedBookingCodes.has(bookingCode) && attempts < 10) {
        bookingCode = generateBookingCode();
        attempts++;
      }
      usedBookingCodes.add(bookingCode);

      // Create booking
      const booking = await prisma.bookings.create({
        data: {
          booking_code: bookingCode,
          user_id: userId,
          showtime_id: showtime.id,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          subtotal: subtotal,
          discount: discount,
          points_used: pointsUsed,
          points_discount: pointsDiscount,
          final_amount: finalAmount,
          promotion_code: promotionCode,
          status: status,
          payment_status: paymentStatus,
          cancelled_at: cancelledAt,
          cancellation_reason: cancellationReason,
          created_at: createdAt,
          updated_at: createdAt,
        },
      });

      allBookings.push(booking);

      // Create tickets
      const usedTicketCodes = new Set();
      for (const ticket of ticketData) {
        let ticketCode = generateTicketCode();
        while (usedTicketCodes.has(ticketCode)) {
          ticketCode = generateTicketCode();
        }
        usedTicketCodes.add(ticketCode);

        // Determine ticket status based on booking status
        let ticketStatus = 'VALID';
        let usedAt = null;

        if (status === 'CANCELLED' || status === 'REFUNDED') {
          ticketStatus = 'CANCELLED';
        } else if (status === 'COMPLETED') {
          ticketStatus = 'USED';
          usedAt = new Date(
            new Date(showtime.start_time).getTime() +
              randomInt(0, 30) * 60 * 1000
          );
        } else if (status === 'CONFIRMED') {
          if (
            new Date(showtime.start_time) < new Date() &&
            Math.random() > 0.2
          ) {
            ticketStatus = 'USED';
            usedAt = new Date(
              new Date(showtime.start_time).getTime() +
                randomInt(0, 30) * 60 * 1000
            );
          } else {
            ticketStatus = 'VALID';
          }
        }

        await prisma.tickets.create({
          data: {
            booking_id: booking.id,
            seat_id: ticket.seat_id,
            ticket_code: ticketCode,
            qr_code: `QR_${ticketCode}`,
            ticket_type: ticket.type,
            price: ticket.price,
            status: ticketStatus,
            used_at: usedAt,
            created_at: createdAt,
          },
        });
      }

      // Create payment
      const paymentMethod = randomElement([
        'VNPAY',
        'CREDIT_CARD',
        'MOMO',
        'ZALOPAY',
      ]);

      // Generate unique transaction ID
      const transactionId = `TXN_${Date.now()}_${i}_${randomInt(1000, 9999)}`;

      const payment = await prisma.payments.create({
        data: {
          booking_id: booking.id,
          amount: finalAmount,
          payment_method: paymentMethod,
          status: paymentStatus,
          transaction_id: transactionId,
          provider_transaction_id:
            paymentMethod + '_' + Date.now() + '_' + randomInt(1000, 9999),
          paid_at: status !== 'PENDING' ? createdAt : null,
          metadata:
            paymentMethod === 'VNPAY'
              ? { bankCode: 'VNPAYQR', responseCode: '00' }
              : paymentMethod === 'CREDIT_CARD'
              ? {
                  cardType: 'VISA',
                  last4: randomInt(1000, 9999).toString(),
                }
              : {},
          created_at: createdAt,
        },
      });

      // Create refund if cancelled or refunded
      if ((status === 'CANCELLED' || status === 'REFUNDED') && cancelledAt) {
        await prisma.refunds.create({
          data: {
            payment_id: payment.id,
            amount: finalAmount,
            reason: cancellationReason,
            status: 'COMPLETED',
            refunded_at: cancelledAt,
            created_at: cancelledAt,
          },
        });
      }

      // Random concessions (40% of bookings)
      if (
        Math.random() < 0.4 &&
        status !== 'CANCELLED' &&
        status !== 'REFUNDED'
      ) {
        const numConcessions = randomInt(1, 3);
        for (let k = 0; k < numConcessions; k++) {
          const concession = randomElement(concessions);
          const quantity = randomInt(1, 3);
          await prisma.bookingConcessions.create({
            data: {
              booking_id: booking.id,
              concession_id: concession.id,
              quantity: quantity,
              unit_price: concession.price,
              total_price: Number(concession.price) * quantity,
              created_at: createdAt,
            },
          });
        }
      }

      // Loyalty transactions for confirmed/completed bookings
      if (
        (status === 'CONFIRMED' || status === 'COMPLETED') &&
        userId.includes('user_')
      ) {
        const loyaltyAccount = loyaltyAccounts.find(
          (acc) => acc.user_id === userId
        );
        if (loyaltyAccount) {
          // Earn points
          const earnedPoints = Math.floor(finalAmount / 1000);
          await prisma.loyaltyTransactions.create({
            data: {
              loyalty_account_id: loyaltyAccount.id,
              points: earnedPoints,
              type: 'EARN',
              transaction_id: booking.id,
              description: 'Điểm thưởng từ đơn hàng ' + booking.booking_code,
              created_at: createdAt,
            },
          });

          // Redeem points if used
          if (pointsUsed > 0) {
            await prisma.loyaltyTransactions.create({
              data: {
                loyalty_account_id: loyaltyAccount.id,
                points: -pointsUsed,
                type: 'REDEEM',
                transaction_id: booking.id,
                description:
                  'Sử dụng điểm cho đơn hàng ' + booking.booking_code,
                created_at: createdAt,
              },
            });
          }
        }
      }

      // Progress indicator
      if ((i + 1) % 100 === 0) {
        console.log(`   Generated ${i + 1}/${bookingsToCreate} bookings...`);
      }
    } catch (error) {
      console.error(`Error creating booking ${i + 1}:`, error.message);
    }
  }

  console.log(`✅ Created ${allBookings.length} bookings with realistic data`);

  // ===========================
  // Summary
  // ===========================
  const bookingCount = await prisma.bookings.count();
  const confirmedBookings = await prisma.bookings.count({
    where: { status: 'CONFIRMED' },
  });
  const cancelledBookings = await prisma.bookings.count({
    where: { status: 'CANCELLED' },
  });
  const pendingBookings = await prisma.bookings.count({
    where: { status: 'PENDING' },
  });
  const refundedBookings = await prisma.bookings.count({
    where: { status: 'REFUNDED' },
  });
  const completedBookings = await prisma.bookings.count({
    where: { status: 'COMPLETED' },
  });
  const ticketCount = await prisma.tickets.count();
  const concessionCount = await prisma.concessions.count();
  const bookingConcessionCount = await prisma.bookingConcessions.count();
  const loyaltyAccountCount = await prisma.loyaltyAccounts.count();
  const loyaltyTransactionCount = await prisma.loyaltyTransactions.count();
  const refundCount = await prisma.refunds.count();

  // Calculate total revenue (include CONFIRMED and COMPLETED)
  const totalRevenue = await prisma.bookings.aggregate({
    where: { status: { in: ['CONFIRMED', 'COMPLETED'] } },
    _sum: { final_amount: true },
  });
  const totalConcessionRevenue = await prisma.bookingConcessions.aggregate({
    _sum: { total_price: true },
  });

  console.log('\n📊 =============== SEED SUMMARY ===============');
  console.log(`📋 Total Bookings: ${bookingCount}`);
  console.log(`   ✅ Confirmed: ${confirmedBookings}`);
  console.log(`   🏁 Completed: ${completedBookings}`);
  console.log(`   ⏳ Pending: ${pendingBookings}`);
  console.log(`   ❌ Cancelled: ${cancelledBookings}`);
  console.log(`   ↩️  Refunded: ${refundedBookings}`);
  console.log(`🎫 Total Tickets: ${ticketCount}`);
  console.log(`🍿 Concession Types: ${concessionCount}`);
  console.log(`🛒 Concession Orders: ${bookingConcessionCount}`);
  console.log(`💎 Loyalty Accounts: ${loyaltyAccountCount}`);
  console.log(`💰 Loyalty Transactions: ${loyaltyTransactionCount}`);
  console.log(`↩️  Refund Records: ${refundCount}`);
  console.log(
    `\n💵 Total Revenue: ${Number(
      totalRevenue._sum.final_amount || 0
    ).toLocaleString('vi-VN')} VND`
  );
  console.log(
    `🍿 Concession Revenue: ${Number(
      totalConcessionRevenue._sum.total_price || 0
    ).toLocaleString('vi-VN')} VND`
  );
  console.log(
    `📊 Combined Revenue: ${(
      Number(totalRevenue._sum.final_amount || 0) +
      Number(totalConcessionRevenue._sum.total_price || 0)
    ).toLocaleString('vi-VN')} VND`
  );
  console.log('==============================================\n');
  console.log('🎉 Booking Service seed completed successfully!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await cinemaPrisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Booking Service seed error:', e);
    await prisma.$disconnect();
    await cinemaPrisma.$disconnect();
    process.exit(1);
  });
