import { PrismaClient, Gender, StaffStatus, WorkType, StaffPosition, ShiftType } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding User Service database...');

  await prisma.rolePermission.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permission.deleteMany();
  await prisma.staff.deleteMany();
  await prisma.setting.deleteMany();

  const permissions = await Promise.all([
    prisma.permission.create({ data: { name: 'user:read' } }),
    prisma.permission.create({ data: { name: 'user:write' } }),
    prisma.permission.create({ data: { name: 'booking:read' } }),
    prisma.permission.create({ data: { name: 'booking:write' } }),
    prisma.permission.create({ data: { name: 'booking:cancel' } }),
    prisma.permission.create({ data: { name: 'movie:read' } }),
    prisma.permission.create({ data: { name: 'movie:write' } }),
    prisma.permission.create({ data: { name: 'cinema:read' } }),
    prisma.permission.create({ data: { name: 'cinema:write' } }),
    prisma.permission.create({ data: { name: 'admin:access' } }),
  ]);

  const adminRole = await prisma.role.create({ data: { name: 'admin' } });
  const managerRole = await prisma.role.create({ data: { name: 'manager' } });
  const customerRole = await prisma.role.create({ data: { name: 'customer' } });

  await Promise.all(
    permissions.map((p) => prisma.rolePermission.create({ data: { roleId: adminRole.id, permissionId: p.id } }))
  );

  const managerNames = ['user:read', 'booking:read', 'booking:write', 'movie:read', 'cinema:read', 'cinema:write'];
  const customerNames = ['user:read', 'booking:read', 'booking:write', 'booking:cancel', 'movie:read', 'cinema:read'];

  await Promise.all(
    permissions
      .filter((p) => managerNames.includes(p.name))
      .map((p) => prisma.rolePermission.create({ data: { roleId: managerRole.id, permissionId: p.id } }))
  );

  await Promise.all(
    permissions
      .filter((p) => customerNames.includes(p.name))
      .map((p) => prisma.rolePermission.create({ data: { roleId: customerRole.id, permissionId: p.id } }))
  );

  const users = {
    admin: 'user-admin-001',
    manager: 'user-manager-001',
    customer1: 'user-customer-001',
    customer2: 'user-customer-002',
  };

  const userRoles = [
    { userId: users.admin, roleId: adminRole.id },
    { userId: users.manager, roleId: managerRole.id },
    { userId: users.customer1, roleId: customerRole.id },
    { userId: users.customer2, roleId: customerRole.id },
  ];

  await prisma.userRole.createMany({ data: userRoles });

  const staff = [
    {
      cinemaId: 'aaaa1111-0000-0000-0000-000000000001',
      fullName: 'Lê Minh Quân',
      email: 'quan.le@cgv.vn',
      phone: '0903000111',
      gender: Gender.MALE,
      dob: new Date('1990-05-12'),
      position: StaffPosition.CINEMA_MANAGER,
      status: StaffStatus.ACTIVE,
      workType: WorkType.FULL_TIME,
      shiftType: ShiftType.MORNING,
      salary: 25000000,
      hireDate: new Date('2020-01-05'),
    },
    {
      cinemaId: 'aaaa1111-0000-0000-0000-000000000002',
      fullName: 'Trần Thu Hà',
      email: 'ha.tran@bhdstar.vn',
      phone: '0912000222',
      gender: Gender.FEMALE,
      dob: new Date('1994-08-21'),
      position: StaffPosition.TICKET_CLERK,
      status: StaffStatus.ACTIVE,
      workType: WorkType.PART_TIME,
      shiftType: ShiftType.AFTERNOON,
      salary: 12000000,
      hireDate: new Date('2022-09-10'),
    },
  ];

  await prisma.staff.createMany({ data: staff });

  await prisma.setting.create({
    data: {
      key: 'auth.passwordPolicy',
      value: { minLength: 8, requireSpecial: true, requireNumber: true },
      description: 'Chính sách mật khẩu tối thiểu',
    },
  });

  console.log('✅ Seeded permissions, roles, user-role mapping, staff, and settings');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
