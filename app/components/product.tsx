import { formaToYen, formatToTimeAgo } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

interface ProductProps {
  title: string;
  price: number;
  created_at: Date;
  photo: string;
  id: number;
}

export default function Product({
  title,
  price,
  created_at,
  photo,
  id,
}: ProductProps) {
  return (
    <div className="flex gap-2">
      <Link href={`/products/${id}`} className="">
        <div className="relative size-28 rounded-md overflow-hidden">
          <Image src={photo} alt={title} fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-1 *:text-white">
          <span>{title}</span>
          <span>{formatToTimeAgo(created_at)}前</span>
          <span className="font-bold">{formaToYen(price)}円</span>
        </div>
      </Link>
    </div>
  );
}
