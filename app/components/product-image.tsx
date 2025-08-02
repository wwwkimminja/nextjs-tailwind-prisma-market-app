import Image from 'next/image';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({
  src,
  alt,
  className = 'object-cover',
}: ProductImageProps) {
  return (
    <div className="relative aspect-square w-full">
      <Image fill className={className} src={`${src}/public`} alt={alt} />
    </div>
  );
}
