import axiosInstance from './axios';
import type {
  Movie,
  Genre,
  MoviesResponse,
  GenresResponse,
  MovieDetails,
  MovieCredits,
} from '@/types';

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
  if (!dateString) return 0;
  const year = new Date(dateString).getFullYear();
  return isNaN(year) ? 0 : year;
};

// Get movie details by ID
export const getMovieDetails = async (
  movieId: number,
): Promise<MovieDetails> => {
  const { data } = await axiosInstance.get<MovieDetails>(`/movie/${movieId}`);
  return data;
};

// Get movie credits (cast and crew)
export const getMovieCredits = async (
  movieId: number,
): Promise<MovieCredits> => {
  const { data } = await axiosInstance.get<MovieCredits>(
    `/movie/${movieId}/credits`,
  );
  return data;
};

// Get similar movies
export const getSimilarMovies = async (
  movieId: number,
  page: number = 1,
): Promise<MoviesResponse> => {
  const { data } = await axiosInstance.get<MoviesResponse>(
    `/movie/${movieId}/similar`,
    {
      params: { page },
    },
  );
  return data;
};

// Helper function to get backdrop URL
export const getBackdropUrl = (
  backdropPath: string | null,
  size: string = 'original',
): string => {
  if (!backdropPath) {
    return '/placeholder-backdrop.svg';
  }
  return `https://image.tmdb.org/t/p/${size}${backdropPath}`;
};

// Helper function to get profile URL
export const getProfileUrl = (
  profilePath: string | null,
  size: string = 'w185',
): string => {
  if (!profilePath) {
    return '/placeholder-profile.svg';
  }
  return `https://image.tmdb.org/t/p/${size}${profilePath}`;
};

// Helper function to format runtime
export const formatRuntime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};
