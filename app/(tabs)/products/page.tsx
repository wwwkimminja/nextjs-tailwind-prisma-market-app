import ProductList from '@/components/product-list';
import { Prisma } from '@/generated/prisma';
import db from '@/lib/db';

async function getProducts() {
  const products = await db.product.findMany({
    select: {
      title: true,
      price: true,
      created_at: true,
      photo: true,
      id: true,
    },
    take: 10,
    orderBy: {
      created_at: 'desc',
    },
  });
  return products;
}
export type InitialProduct = Prisma.PromiseReturnType<typeof getProducts>;

export default async function Products() {
  const initialProducts = await getProducts();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
    </div>
  );
}
