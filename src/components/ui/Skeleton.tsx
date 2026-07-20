interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circle' | 'rect' | 'card';
  width?: string;
  height?: string;
  lines?: number;
}

function SkeletonBase({ className = '' }: { className?: string }) {
  return (
    <div
      className={`bg-gray-200 animate-pulse rounded ${className}`}
      aria-hidden="true"
    />
  );
}

export function Skeleton({ variant = 'rect', className = '', lines = 1 }: SkeletonProps) {
  if (variant === 'circle') {
    return <SkeletonBase className={`rounded-full ${className}`} />;
  }

  if (variant === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonBase
            key={i}
            className={`h-4 rounded ${i === lines - 1 && lines > 1 ? 'w-3/4' : 'w-full'}`}
          />
        ))}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
        <SkeletonBase className="h-48 w-full rounded-none" />
        <div className="p-4 space-y-3">
          <SkeletonBase className="h-5 w-3/4" />
          <SkeletonBase className="h-4 w-full" />
          <SkeletonBase className="h-4 w-2/3" />
          <div className="flex gap-2 pt-1">
            <SkeletonBase className="h-6 w-16 rounded-full" />
            <SkeletonBase className="h-6 w-20 rounded-full" />
          </div>
          <div className="flex justify-between items-center pt-2">
            <SkeletonBase className="h-5 w-24" />
            <SkeletonBase className="h-8 w-20 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return <SkeletonBase className={className} />;
}

export function ListingCardSkeleton() {
  return <Skeleton variant="card" />;
}

export function HeroSkeleton() {
  return (
    <div className="animate-pulse bg-gray-200 min-h-[560px] w-full rounded-none" aria-hidden="true" />
  );
}
