import axiosInstance from './axios';
import type { Movie, Genre, MoviesResponse, GenresResponse } from '@/types';

// Get all movie genres
export const getGenres = async (): Promise<GenresResponse> => {
  const { data } = await axiosInstance.get<GenresResponse>('/genre/movie/list');
  return data;
};

// Get top rated movies
export const getTopRatedMovies = async (
  page: number = 1,
): Promise<MoviesResponse> => {
  const { data } = await axiosInstance.get<MoviesResponse>('/movie/top_rated', {
    params: { page },
  });
  return data;
};

// Get popular movies
export const getPopularMovies = async (
  page: number = 1,
): Promise<MoviesResponse> => {
  const { data } = await axiosInstance.get<MoviesResponse>('/movie/popular', {
    params: { page },
  });
  return data;
};

// Get movies by genre
export const getMoviesByGenre = async (
  genreId: number,
  page: number = 1,
): Promise<MoviesResponse> => {
  const { data } = await axiosInstance.get<MoviesResponse>('/discover/movie', {
    params: {
      with_genres: genreId,
      page,
      sort_by: 'popularity.desc',
    },
  });
  return data;
};

// Helper function to get poster URL
export const getPosterUrl = (
  posterPath: string | null,
  size: string = 'w500',
): string => {
  if (!posterPath) {
    return '/placeholder-movie.svg';
  }
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
};

// Helper function to get year from release date
export const getYearFromDate = (dateString: string): number => {
  return new Date(dateString).getFullYear();
};
