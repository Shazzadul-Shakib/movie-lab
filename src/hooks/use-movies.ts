import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  getTopRatedMovies,
  getPopularMovies,
  getMoviesByGenre,
} from '@/lib/api/tmdb';
import type { MoviesResponse } from '@/types';

export function useTopRatedMovies(
  page: number = 1,
): UseQueryResult<MoviesResponse, Error> {
  return useQuery({
    queryKey: ['movies', 'top-rated', page],
    queryFn: () => getTopRatedMovies(page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function usePopularMovies(
  page: number = 1,
): UseQueryResult<MoviesResponse, Error> {
  return useQuery({
    queryKey: ['movies', 'popular', page],
    queryFn: () => getPopularMovies(page),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useMoviesByGenre(
  genreId: number,
  page: number = 1,
): UseQueryResult<MoviesResponse, Error> {
  return useQuery({
    queryKey: ['movies', 'genre', genreId, page],
    queryFn: () => getMoviesByGenre(genreId, page),
    enabled: !!genreId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
