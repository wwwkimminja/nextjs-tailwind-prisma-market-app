'use client';

import ProductModal from '@/components/product-modal';
import { useEffect } from 'react';

export default function Modal({ params }: { params: { id: string } }) {
  const isAdd = params.id === 'add';
  useEffect(() => {
    if (isAdd) {
      window.location.reload();
    }
  }, [params.id]);
  return isAdd ? null : <ProductModal productId={params.id} />;
}
