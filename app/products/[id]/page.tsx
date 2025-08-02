import { getProduct, getIsOwner } from '@/lib/product-utils';
import { formatToYen } from '@/lib/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductImage from '@/components/product-image';
import ProductInfo from '@/components/product-info';

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const p = await params;
  const id = Number(p.id);

  if (isNaN(id)) {
    console.error('id is not a number');
    return notFound();
  }

  const product = await getProduct(id);
  if (!product) {
    console.error('product not found');
    return notFound();
  }

  const isOwner = await getIsOwner(product.user_id);

  return (
    <div className="pb-40">
      <ProductImage src={product.photo} alt={product.title} />
      <ProductInfo product={product} showPrice={false} />

      <div className="fixed w-full bottom-0 left-0 p-5 pb-10 bg-neutral-800 flex justify-between items-center">
        <span className="font-semibold text-xl">
          {formatToYen(product.price)}円
        </span>
        {isOwner ? (
          <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
            Delete product
          </button>
        ) : null}
        <Link
          className="bg-orange-500 px-5 py-2.5 rounded-md text-white font-semibold"
          href={``}
        >
          Chat with seller
        </Link>
      </div>
    </div>
  );
}
