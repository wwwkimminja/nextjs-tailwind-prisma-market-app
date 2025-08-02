import ProductList from '@/components/product-list';
import { Prisma } from '@/generated/prisma';
import db from '@/lib/db';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/solid';

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
  return products.map(product => ({
    ...product,
    created_at: product.created_at.toISOString(), // Convert to ISO string here
  }));
}
export type InitialProduct = Prisma.PromiseReturnType<typeof getProducts>;

export default async function Products() {
  const initialProducts = await getProducts();
  return (
    <div>
      <ProductList initialProducts={initialProducts} />
      <Link
        href="/products/add"
        className="bg-orange-500 flex items-center justify-center rounded-full size-16 fixed bottom-24 right-8 text-white transition-colors hover:bg-orange-400"
      >
        <PlusIcon className="size-10" />
      </Link>
    </div>
  );
}
