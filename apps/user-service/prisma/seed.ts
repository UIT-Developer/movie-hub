import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding User Service database...');

  // Clear existing data
  await prisma.rolePermission.deleteMany();
  await prisma.userRole.deleteMany();
  await prisma.role.deleteMany();
  await prisma.permission.deleteMany();

  // Create Permissions
  const permissions = await Promise.all([
    prisma.permission.create({ data: { name: 'user:read' } }),
    prisma.permission.create({ data: { name: 'user:write' } }),
    prisma.permission.create({ data: { name: 'user:delete' } }),
    prisma.permission.create({ data: { name: 'booking:read' } }),
    prisma.permission.create({ data: { name: 'booking:write' } }),
    prisma.permission.create({ data: { name: 'booking:cancel' } }),
    prisma.permission.create({ data: { name: 'movie:read' } }),
    prisma.permission.create({ data: { name: 'movie:write' } }),
    prisma.permission.create({ data: { name: 'cinema:read' } }),
    prisma.permission.create({ data: { name: 'cinema:write' } }),
    prisma.permission.create({ data: { name: 'admin:access' } }),
  ]);

  console.log(`✅ Created ${permissions.length} permissions`);

  // Create Roles
  const adminRole = await prisma.role.create({
    data: { name: 'admin' },
  });

  const managerRole = await prisma.role.create({
    data: { name: 'manager' },
  });

  const customerRole = await prisma.role.create({
    data: { name: 'customer' },
  });

  console.log('✅ Created 3 roles: admin, manager, customer');

  // Assign Permissions to Admin Role (all permissions)
  await Promise.all(
    permissions.map((permission) =>
      prisma.rolePermission.create({
        data: {
          roleId: adminRole.id,
          permissionId: permission.id,
        },
      })
    )
  );

  // Assign Permissions to Manager Role
  const managerPermissions = permissions.filter((p) =>
    ['user:read', 'booking:read', 'booking:write', 'movie:read', 'cinema:read', 'cinema:write'].includes(p.name)
  );
  await Promise.all(
    managerPermissions.map((permission) =>
      prisma.rolePermission.create({
        data: {
          roleId: managerRole.id,
          permissionId: permission.id,
        },
      })
    )
  );

  // Assign Permissions to Customer Role
  const customerPermissions = permissions.filter((p) =>
    ['user:read', 'booking:read', 'booking:write', 'booking:cancel', 'movie:read', 'cinema:read'].includes(p.name)
  );
  await Promise.all(
    customerPermissions.map((permission) =>
      prisma.rolePermission.create({
        data: {
          roleId: customerRole.id,
          permissionId: permission.id,
        },
      })
    )
  );

  console.log('✅ Assigned permissions to roles');

  // Create sample UserRoles (assuming some users exist in the system)
  // Note: These user IDs should match actual user records in the User table
  // If you have a User table, make sure to create those records first
  const sampleUserRoles = [
    { userId: 'admin-user-1', roleId: adminRole.id },
    { userId: 'manager-user-1', roleId: managerRole.id },
    { userId: 'customer-user-1', roleId: customerRole.id },
    { userId: 'customer-user-2', roleId: customerRole.id },
    { userId: 'customer-user-3', roleId: customerRole.id },
  ];

  await Promise.all(
    sampleUserRoles.map((userRole) =>
      prisma.userRole.create({ data: userRole })
    )
  );

  console.log('✅ Created sample user role assignments');
  console.log('🎉 User Service database seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
