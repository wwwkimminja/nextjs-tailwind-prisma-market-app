import { PrismaClient } from '../app/generated/prisma';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 12);

  // const user = await prisma.user.upsert({
  //   where: { username: 'testuser' },
  //   update: {},
  //   create: {
  //     username: 'testuser',
  //     password: hashedPassword,
  //     email: 'test@example.com',
  //   },
  // });

  // Create test products
  const products = await Promise.all([
    prisma.product.upsert({
      where: { id: 4 },
      update: {},
      create: {
        title: 'iPhone 15 Pro',
        price: 150000,
        photo:
          'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
        description: 'Latest iPhone 15 Pro in excellent condition.',
        user_id: 3,
      },
    }),
    prisma.product.upsert({
      where: { id: 5 },
      update: {},
      create: {
        title: 'MacBook Air M2',
        price: 1800000,
        photo:
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
        description: 'MacBook Air with M2 chip, perfect for work and study.',
        user_id: 3,
      },
    }),
    prisma.product.upsert({
      where: { id: 6 },
      update: {},
      create: {
        title: 'AirPods Pro',
        price: 350000,
        photo:
          'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400&h=400&fit=crop',
        description: 'AirPods Pro with active noise cancellation.',
        user_id: 3,
      },
    }),
  ]);

  console.log('Seed data created:', { products });
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
