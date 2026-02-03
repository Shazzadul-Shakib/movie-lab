'use client';

import { useRecentlyViewedStore } from '@/store/recently-viewed';
import { MovieCard } from '@/components/movie/movie-card';
import { getPosterUrl, getYearFromDate } from '@/lib/api/tmdb';

export default function Recent() {
  const movies = useRecentlyViewedStore((state) => state.movies);
  const clearAll = useRecentlyViewedStore((state) => state.clearAll);

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
            className='px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-lg transition-colors cursor-pointer'
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
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
          {movies.map((movie) => (
            <div key={movie.id} className='w-full max-w-[240px] mx-auto'>
              <MovieCard
                id={movie.id}
                title={movie.title}
                poster_path={movie.posterPath}
                vote_average={movie.rating}
                release_date={movie.releaseDate}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
