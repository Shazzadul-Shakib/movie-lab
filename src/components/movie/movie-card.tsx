'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Bookmark } from 'lucide-react';
import { useWatchLaterStore } from '@/store/watch-later';
import type { MovieCardSize } from '@/types';

interface MovieCardProps {
  id: number;
  title: string;
  posterUrl: string;
  rating: number;
  year: number;
  releaseDate?: string;
  size?: MovieCardSize;
}

export function MovieCard({
  id,
  title,
  posterUrl,
  rating,
  year,
  releaseDate = '',
  size = 'medium',
}: MovieCardProps) {
  const [isHydrated, setIsHydrated] = useState(
    () => typeof window !== 'undefined',
  );
  const addMovie = useWatchLaterStore((state) => state.addMovie);
  const removeMovie = useWatchLaterStore((state) => state.removeMovie);
  const watchLaterMovies = useWatchLaterStore((state) => state.movies);
  const inWatchLater = isHydrated && watchLaterMovies.some((m) => m.id === id);

  const handleWatchLaterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWatchLater) {
      removeMovie(id);
    } else {
      // Extract the path part from the full URL (e.g., /w500/abc.jpg -> /abc.jpg)
      let posterPath: string | null = null;
      if (!posterUrl.includes('placeholder')) {
        const match = posterUrl.match(/\/t\/p\/w\d+(\/.*$)/);
        posterPath = match ? match[1] : null;
      }

      addMovie({
        id,
        title,
        posterPath,
        rating,
        releaseDate,
      });
    }
  };

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
      className={`${sizeClasses[size]} flex-shrink-0 group cursor-pointer block`}
    >
      <div className='relative overflow-hidden rounded-lg bg-muted transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl h-full'>
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

          {/* Watch Later Button */}
          {isHydrated && (
            <button
              onClick={handleWatchLaterClick}
              className='absolute top-2 left-2 rounded-full bg-black/80 p-1.5 backdrop-blur-sm transition-colors hover:bg-black/90 cursor-pointer'
              aria-label={
                inWatchLater ? 'Remove from watch later' : 'Add to watch later'
              }
            >
              <Bookmark
                className={`h-3.5 w-3.5 transition-colors ${
                  inWatchLater ? 'fill-primary text-primary' : 'text-white'
                }`}
              />
            </button>
          )}
        </div>

        {/* Movie Info */}
        <div className='p-2.5'>
          <h3 className='line-clamp-1 text-sm font-semibold text-foreground group-hover:text-primary transition-colors'>
            {title}
          </h3>
          <p className='text-xs text-muted-foreground mt-0.5'>
            {year > 0 ? year : 'N/A'}
          </p>
        </div>
      </div>
    </Link>
  );
}
