import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Clearing Cinema Service database...');

  await prisma.seatReservations.deleteMany();
  await prisma.showtimes.deleteMany();
  await prisma.ticketPricing.deleteMany();
  await prisma.seats.deleteMany();
  await prisma.cinemaReviews.deleteMany();
  await prisma.halls.deleteMany();
  await prisma.cinemas.deleteMany();

  console.log('✅ Cleared Cinema Service database');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());