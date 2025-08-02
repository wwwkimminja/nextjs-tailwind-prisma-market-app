interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-neutral-700 rounded ${className}`} />
  );
}

export function ProductImageSkeleton() {
  return (
    <div className="relative aspect-square w-full">
      <Skeleton className="w-full h-full" />
    </div>
  );
}

export function UserAvatarSkeleton() {
  return (
    <div className="flex items-center gap-3 p-5 border-b border-neutral-700">
      <Skeleton className="size-10 rounded-full" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
}

export function ProductInfoSkeleton() {
  return (
    <div className="p-5 flex-1">
      <Skeleton className="h-8 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-2/3 mb-1" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

export function ProductModalSkeleton() {
  return (
    <div className="max-w-4xl w-full h-full max-h-[95vh] bg-neutral-800 rounded-lg overflow-hidden flex flex-col">
      <ProductImageSkeleton />
      <UserAvatarSkeleton />
      <ProductInfoSkeleton />
    </div>
  );
}
