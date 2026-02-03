'use client';

import { useState, useEffect } from 'react';
import { useRecentlyViewedStore } from '@/store/recently-viewed';
import { MovieCard } from '@/components/movie/movie-card';
import { MovieCardSkeleton } from '@/components/skeleton/movie-card-skeleton';
import { getPosterUrl, getYearFromDate } from '@/lib/api/tmdb';

export default function Recent() {
  const [isHydrated, setIsHydrated] = useState(false);
  const movies = useRecentlyViewedStore((state) => state.movies);
  const clearAll = useRecentlyViewedStore((state) => state.clearAll);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className='space-y-6'>
        <div className='flex items-center justify-between'>
          <div>
            <h1 className='text-3xl md:text-4xl font-bold text-foreground'>
              Recently Viewed
            </h1>
            <p className='text-muted-foreground mt-2'>
              Your viewing history from most recent
            </p>
          </div>
        </div>
        <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4'>
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className='w-full'>
              <MovieCardSkeleton size='small' />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-3xl md:text-4xl font-bold text-foreground'>
            Recently Viewed
          </h1>
          <p className='text-muted-foreground mt-2'>
            Your viewing history from most recent
          </p>
        </div>
        {movies.length > 0 && (
          <button
            onClick={clearAll}
            className='px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors'
          >
            Clear All
          </button>
        )}
      </div>

      {movies.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-16 px-4'>
          <div className='text-center max-w-md'>
            <h2 className='text-xl font-semibold text-foreground mb-2'>
              No viewing history yet
            </h2>
            <p className='text-muted-foreground'>
              Movies you view will appear here. Start exploring to build your
              history!
            </p>
          </div>
        </div>
      ) : (
        <div className='grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4'>
          {movies.map((movie) => (
            <div key={movie.id} className='w-full'>
              <MovieCard
                id={movie.id}
                title={movie.title}
                posterUrl={getPosterUrl(movie.posterPath)}
                rating={movie.rating}
                year={getYearFromDate(movie.releaseDate)}
                size='small'
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
