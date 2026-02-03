export function GenreCardSkeleton() {
  return (
    <div className='animate-pulse'>
      <div className='rounded-lg border border-border bg-muted p-4 sm:p-5 h-24 sm:h-28 flex flex-col justify-between'>
        {/* Icon and count */}
        <div className='flex items-center justify-between'>
          <div className='h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-muted-foreground/20' />
          <div className='h-3 w-12 bg-muted-foreground/20 rounded' />
        </div>

        {/* Title */}
        <div className='h-5 bg-muted-foreground/20 rounded w-2/3' />
      </div>
    </div>
  );
}
