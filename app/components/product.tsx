'use client';
import { formatToYen, formatToTimeAgo } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface ProductProps {
  title: string;
  price: number;
  created_at: string;
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
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    setFormattedTime(formatToTimeAgo(created_at));
  }, [created_at]);
  return (
    <div className="flex gap-2">
      <Link href={`/products/${id}`} className="">
        <div className="relative size-28 rounded-md overflow-hidden">
          <Image
            sizes="28px"
            src={`${photo}/avatar`}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-1 *:text-white">
          <span>{title}</span>
          <span>{formattedTime}</span>
          <span className="font-bold">{formatToYen(price)}円</span>
        </div>
      </Link>
    </div>
  );
}
