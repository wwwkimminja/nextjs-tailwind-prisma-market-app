import db from './db';
import { getSession } from './session';
import { Product } from './types';

export async function getProduct(id: number): Promise<Product | null> {
  const product = await db.product.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}

export async function getIsOwner(userId: number): Promise<boolean> {
  const session = await getSession();
  if (session.id) {
    return session.id === userId;
  }
  return false;
}
