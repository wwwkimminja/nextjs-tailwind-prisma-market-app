'use server';
import db from '@/lib/db';
export async function loadMoreProducts(page: number) {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    skip: page * 10,
    take: 10,
    orderBy: {
      created_at: 'desc',
    },
  });
  return products.map(product => ({
    ...product,
    created_at: product.created_at.toISOString(), // Convert to ISO string here
  }));
}
