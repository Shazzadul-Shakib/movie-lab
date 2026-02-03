'use client';

import Link from 'next/link';
import { Film } from 'lucide-react';

interface GenreCardProps {
  name: string;
  href: string;
  movieCount?: number;
}

export function GenreCard({ name, href, movieCount }: GenreCardProps) {
  return (
    <Link href={href} className='group cursor-pointer'>
      <div className='relative overflow-hidden rounded-lg border border-border bg-card p-4 sm:p-5 transition-all duration-300 group-hover:border-primary group-hover:shadow-lg h-24 sm:h-28 flex flex-col justify-between'>
        {/* Subtle Background Accent */}
        <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

        {/* Content */}
        <div className='relative z-10'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300'>
              <Film className='h-4 w-4 sm:h-5 sm:w-5' />
            </div>
            {movieCount && (
              <span className='text-[10px] sm:text-xs text-muted-foreground group-hover:text-foreground transition-colors'>
                {movieCount}
              </span>
            )}
          </div>
        </div>

        <h3 className='relative z-10 text-sm sm:text-base font-semibold text-foreground group-hover:text-primary transition-colors'>
          {name}
        </h3>
      </div>
    </Link>
  );
}
