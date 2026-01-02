import { PrismaClient } from '@prisma/client';

// Global test setup
beforeAll(async () => {
  // Set test environment variables
  process.env.NODE_ENV = 'test';
  process.env.DATABASE_URL = process.env.TEST_DATABASE_URL || 'file:./test.db';
});

afterAll(async () => {
  // Global cleanup
  const prisma = new PrismaClient();
  await prisma.$disconnect();
});

// Increase timeout for integration tests
jest.setTimeout(30000);
