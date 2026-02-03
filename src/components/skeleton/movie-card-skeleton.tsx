import type { MovieCardSize } from '@/types';

interface MovieCardSkeletonProps {
  size?: MovieCardSize;
}

export function MovieCardSkeleton({ size = 'medium' }: MovieCardSkeletonProps) {
  const sizeClasses = {
    small: 'w-32 sm:w-36',
    medium: 'w-36 sm:w-44 md:w-48',
    large: 'w-44 sm:w-52 md:w-56',
  };

  const imageHeight = {
    small: 'h-48 sm:h-54',
    medium: 'h-54 sm:h-64 md:h-72',
    large: 'h-64 sm:h-80 md:h-84',
  };

  return (
    <div className={`${sizeClasses[size]} animate-pulse block`}>
      <div className='overflow-hidden rounded-lg bg-muted h-full'>
        {/* Image Skeleton */}
        <div className={`${imageHeight[size]} w-full bg-muted-foreground/10`} />

        {/* Info Skeleton */}
        <div className='p-2.5 space-y-2'>
          <div className='h-4 bg-muted-foreground/20 rounded w-3/4' />
          <div className='h-3 bg-muted-foreground/10 rounded w-1/2' />
        </div>
      </div>
    </div>
  );
}
