'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Bookmark } from 'lucide-react';
import { useWatchLaterStore } from '@/store/watch-later';
import type { MovieCardSize } from '@/types';

interface MovieCardProps {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  size?: MovieCardSize;
}

export function MovieCard({
  id,
  title,
  poster_path,
  vote_average,
  release_date,
  size = 'medium',
}: MovieCardProps) {
  const posterUrl = poster_path;
  const rating = vote_average;
  const releaseDate = release_date;
  const year = releaseDate ? new Date(releaseDate).getFullYear() : 0;
  const [isHydrated] = useState(() => typeof window !== 'undefined');
  const addMovie = useWatchLaterStore((state) => state.addMovie);
  const removeMovie = useWatchLaterStore((state) => state.removeMovie);
  const watchLaterMovies = useWatchLaterStore((state) => state.movies);
  const inWatchLater = isHydrated && watchLaterMovies.some((m) => m.id === id);

  // Get full poster URL
  const fullPosterUrl = posterUrl
    ? `https://image.tmdb.org/t/p/w500${posterUrl}`
    : '/placeholder-movie.png';

  const handleWatchLaterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (inWatchLater) {
      removeMovie(id);
    } else {
      addMovie({
        id,
        title,
        posterPath: posterUrl,
        rating,
        releaseDate,
      });
    }
  };

  const imageHeight = {
    small: 'h-48 sm:h-54',
    medium: 'h-54 sm:h-64 md:h-72',
    large: 'h-64 sm:h-80 md:h-84',
  };

  return (
    <Link href={`/movie/${id}`} className='w-full group cursor-pointer block'>
      <div className='relative overflow-hidden rounded-lg bg-muted transition-transform duration-300 group-hover:scale-105 group-hover:shadow-xl h-full'>
        {/* Movie Poster */}
        <div className={`relative ${imageHeight[size]} w-full overflow-hidden`}>
          <Image
            src={fullPosterUrl}
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
