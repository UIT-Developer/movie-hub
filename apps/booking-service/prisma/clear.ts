import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Clearing Booking Service database...');

  await prisma.loyaltyTransactions.deleteMany();
  await prisma.loyaltyAccounts.deleteMany();
  await prisma.refunds.deleteMany();
  await prisma.payments.deleteMany();
  await prisma.tickets.deleteMany();
  await prisma.bookingConcessions.deleteMany();
  await prisma.bookings.deleteMany();
  await prisma.promotions.deleteMany();
  await prisma.concessions.deleteMany();

  console.log('✅ Cleared Booking Service database');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());