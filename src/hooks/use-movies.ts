import { useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  getTopRatedMovies,
  getPopularMovies,
  getMoviesByGenre,
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
} from '@/lib/api/tmdb';
import type { MoviesResponse, MovieDetails, MovieCredits } from '@/types';

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

// Get movie details
export function useMovieDetails(
  movieId: number,
): UseQueryResult<MovieDetails, Error> {
  return useQuery({
    queryKey: ['movie', 'details', movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

// Get movie credits
export function useMovieCredits(
  movieId: number,
): UseQueryResult<MovieCredits, Error> {
  return useQuery({
    queryKey: ['movie', 'credits', movieId],
    queryFn: () => getMovieCredits(movieId),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

// Get similar movies
export function useSimilarMovies(
  movieId: number,
  page: number = 1,
): UseQueryResult<MoviesResponse, Error> {
  return useQuery({
    queryKey: ['movie', 'similar', movieId, page],
    queryFn: () => getSimilarMovies(movieId, page),
    enabled: !!movieId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
