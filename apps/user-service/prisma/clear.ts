import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Clearing User Service database...');

  await prisma.rolePermission.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.setting.deleteMany();

  console.log('✅ Cleared User Service database');
}

main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());