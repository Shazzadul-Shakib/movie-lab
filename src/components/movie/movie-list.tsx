'use client';

import { MovieCard } from './movie-card';
import type { MovieCardData, MovieCardSize } from '@/types';

interface MovieListProps {
  movies: MovieCardData[];
  size?: MovieCardSize;
}

export function MovieList({ movies, size = 'medium' }: MovieListProps) {
  return (
    <div className='relative'>
      <div className='flex gap-3 sm:gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-muted-foreground/20 scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/40'>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            posterUrl={movie.posterUrl}
            rating={movie.rating}
            year={movie.year}
            releaseDate={movie.releaseDate}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}
