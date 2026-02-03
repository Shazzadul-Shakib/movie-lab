'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star } from 'lucide-react';

interface MovieCardProps {
  id: number;
  title: string;
  posterUrl: string;
  rating: number;
  year: number;
  size?: 'small' | 'medium' | 'large';
}

export function MovieCard({
  id,
  title,
  posterUrl,
  rating,
  year,
  size = 'medium',
}: MovieCardProps) {
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
    <Link
      href={`/movie/${id}`}
      className={`${sizeClasses[size]} flex-shrink-0 group cursor-pointer`}
    >
      <div className='relative overflow-hidden rounded-lg bg-muted transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl'>
        {/* Movie Poster */}
        <div className={`relative ${imageHeight[size]} w-full overflow-hidden`}>
          <Image
            src={posterUrl}
            alt={title}
            fill
            className='object-cover transition-opacity duration-300 group-hover:opacity-80'
            sizes='(max-width: 640px) 144px, (max-width: 768px) 176px, 192px'
          />
          {/* Rating Badge */}
          <div className='absolute top-2 right-2 flex items-center gap-1 rounded-full bg-black/80 px-2 py-1 backdrop-blur-sm'>
            <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
            <span className='text-xs font-semibold text-white'>
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Movie Info */}
        <div className='p-2.5'>
          <h3 className='line-clamp-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors'>
            {title}
          </h3>
          <p className='text-xs text-muted-foreground mt-0.5'>{year}</p>
        </div>
      </div>
    </Link>
  );
}
