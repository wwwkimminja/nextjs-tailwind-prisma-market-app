'use client';

import ProductModal from '@/components/product-modal';

export default function Modal({ params }: { params: { id: string } }) {
  return <ProductModal productId={params.id} />;
}
