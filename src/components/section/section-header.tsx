import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  viewAllHref?: string;
}

export function SectionHeader({
  title,
  subtitle,
  viewAllHref,
}: SectionHeaderProps) {
  return (
    <div className='flex items-center justify-between mb-4 sm:mb-6'>
      <div>
        <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-foreground'>
          {title}
        </h2>
        {subtitle && (
          <p className='text-sm text-muted-foreground mt-1'>{subtitle}</p>
        )}
      </div>
      {viewAllHref && (
        <Link
          href={viewAllHref}
          className='flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors cursor-pointer'
        >
          View All
          <ChevronRight className='h-4 w-4' />
        </Link>
      )}
    </div>
  );
}
