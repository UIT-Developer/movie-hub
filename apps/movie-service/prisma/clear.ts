import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Clearing Movie Service database...');

  await prisma.review.deleteMany();
  await prisma.movieGenre.deleteMany();
  await prisma.movieRelease.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.genre.deleteMany();

  console.log('✅ Cleared Movie Service database');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());