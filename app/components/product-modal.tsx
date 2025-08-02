'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';
import ModalOverlay from './modal-overlay';
import ProductImage from './product-image';
import ProductInfo from './product-info';
import { ProductModalSkeleton } from './skeleton';

interface ProductModalProps {
  productId: string;
}

export default function ProductModal({ productId }: ProductModalProps) {
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  // scroll lock when modal is open
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    // restore scroll when component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
        } else {
          console.error('Failed to fetch product');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const onCloseClick = () => {
    router.back();
  };

  if (loading) {
    return (
      <ModalOverlay onClose={onCloseClick} className="size-2/3">
        <ProductModalSkeleton />
      </ModalOverlay>
    );
  }

  if (!product) {
    return (
      <ModalOverlay onClose={onCloseClick} className="size-2/3">
        <div className="max-w-2xl h-3/4 flex justify-center w-full">
          <div className="aspect-square bg-neutral-700 text-neutral-200 rounded-md flex justify-center items-center">
            <p>Product not found</p>
          </div>
        </div>
      </ModalOverlay>
    );
  }

  return (
    <ModalOverlay onClose={onCloseClick} className="size-2/3">
      <div className="max-w-2xl h-3/4 flex justify-center w-full">
        <ProductImage src={product.photo} alt={product.title} />
        <ProductInfo product={product} showPrice={false} />
      </div>
    </ModalOverlay>
  );
}
