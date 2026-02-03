'use client';

import { MovieCard } from './movie-card';
import type { MovieCardData, MovieCardSize } from '@/types';

interface MovieListProps {
  movies: MovieCardData[];
  size?: MovieCardSize;
}

export function MovieList({ movies, size = 'medium' }: MovieListProps) {
  const sizeClasses = {
    small: 'w-32 sm:w-36',
    medium: 'w-36 sm:w-44 md:w-48',
    large: 'w-44 sm:w-52 md:w-56',
  };

  return (
    <div className='relative'>
      <div className='flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/40'>
        {movies.map((movie) => (
          <div key={movie.id} className={`${sizeClasses[size]} flex-shrink-0`}>
            <MovieCard
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              vote_average={movie.vote_average}
              release_date={movie.release_date}
              size={size}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
