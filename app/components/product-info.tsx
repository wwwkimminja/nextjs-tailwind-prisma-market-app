import { formatToYen } from '@/lib/utils';
import { Product } from '@/lib/types';
import UserAvatar from './user-avatar';

interface ProductInfoProps {
  product: Product;
  showPrice?: boolean;
  className?: string;
}

export default function ProductInfo({
  product,
  showPrice = true,
  className = '',
}: ProductInfoProps) {
  return (
    <div className={className}>
      {/* seller info */}
      <div className="p-5 flex items-center gap-3 border-b border-neutral-700">
        <UserAvatar
          avatar={product.user.avatar}
          username={product.user.username}
        />
        <div>
          <h3 className="font-semibold text-white">{product.user.username}</h3>
        </div>
      </div>

      {/* product info */}
      <div className="p-5 flex-1 overflow-y-auto">
        <h1 className="text-2xl font-semibold text-white mb-2">
          {product.title}
        </h1>
        <p className="text-neutral-300 mb-4">{product.description}</p>
      </div>

      {/* price info */}
      {showPrice && (
        <div className="p-5 border-t border-neutral-700">
          <span className="font-semibold text-xl text-white">
            {formatToYen(product.price)}円
          </span>
        </div>
      )}
    </div>
  );
}
