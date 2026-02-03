// TMDB API Response Types
export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string;
  overview: string;
  genre_ids: number[];
  backdrop_path?: string | null;
  adult?: boolean;
  original_language?: string;
  original_title?: string;
  popularity?: number;
  video?: boolean;
}

export interface Genre {
  id: number;
  name: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface GenresResponse {
  genres: Genre[];
}

// Component Props Types
export interface MovieCardData {
  id: number;
  title: string;
  posterUrl: string;
  rating: number;
  year: number;
}

export interface GenreCardData {
  id: number;
  name: string;
  href: string;
  movieCount?: number;
}

// Size Types
export type MovieCardSize = 'small' | 'medium' | 'large';

// Link Types
export interface MainLink {
  name: string;
  icon: React.ComponentType<{ size?: number | string; className?: string }>;
  href: string;
}
