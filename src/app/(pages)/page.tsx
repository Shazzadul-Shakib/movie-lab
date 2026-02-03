'use client';

import { SectionHeader } from '@/components/section/section-header';
import { MovieList } from '@/components/movie/movie-list';
import { GenreCard } from '@/components/genre/genre-card';
import { MovieCardSkeleton } from '@/components/skeleton/movie-card-skeleton';
import { GenreCardSkeleton } from '@/components/skeleton/genre-card-skeleton';
import { useTopRatedMovies, useMoviesByGenre } from '@/hooks/use-movies';
import { useGenres } from '@/hooks/use-genres';
import { getPosterUrl, getYearFromDate } from '@/lib/api/tmdb';
import { useEffect } from 'react';
import { toast } from 'sonner';
import type { Movie, MovieCardData } from '@/types';

export default function Home() {
  const {
    data: topRatedData,
    isLoading: isLoadingTopRated,
    error: topRatedError,
  } = useTopRatedMovies();
  const {
    data: genresData,
    isLoading: isLoadingGenres,
    error: genresError,
  } = useGenres();

  // Get popular movies for first 3 genres
  const genre1 = genresData?.genres?.[0];
  const genre2 = genresData?.genres?.[1];
  const genre3 = genresData?.genres?.[2];

  const {
    data: genre1Movies,
    isLoading: isLoadingGenre1,
    error: genre1Error,
  } = useMoviesByGenre(genre1?.id || 0);
  const {
    data: genre2Movies,
    isLoading: isLoadingGenre2,
    error: genre2Error,
  } = useMoviesByGenre(genre2?.id || 0);
  const {
    data: genre3Movies,
    isLoading: isLoadingGenre3,
    error: genre3Error,
  } = useMoviesByGenre(genre3?.id || 0);

  // Show error toasts
  useEffect(() => {
    if (topRatedError) {
      toast.error('Failed to load top rated movies');
    }
    if (genresError) {
      toast.error('Failed to load genres');
    }
    if (genre1Error) {
      toast.error(`Failed to load ${genre1?.name} movies`);
    }
    if (genre2Error) {
      toast.error(`Failed to load ${genre2?.name} movies`);
    }
    if (genre3Error) {
      toast.error(`Failed to load ${genre3?.name} movies`);
    }
  }, [
    topRatedError,
    genresError,
    genre1Error,
    genre2Error,
    genre3Error,
    genre1?.name,
    genre2?.name,
    genre3?.name,
  ]);

  // Transform API data to component format
  const transformMovies = (movies: Movie[]): MovieCardData[] => {
    return (
      movies?.slice(0, 10).map((movie) => ({
        id: movie.id,
        title: movie.title,
        posterUrl: getPosterUrl(movie.poster_path),
        rating: movie.vote_average,
        year: getYearFromDate(movie.release_date),
        releaseDate: movie.release_date,
      })) || []
    );
  };

  return (
    <div className='space-y-8 sm:space-y-10 md:space-y-12'>
      {/* Top Rated Movies Section */}
      <section>
        <SectionHeader
          title='Top Rated Movies'
          subtitle='The highest-rated films of all time'
          viewAllHref='/top-rated'
        />
        {isLoadingTopRated ? (
          <div className='flex gap-6 overflow-x-auto pb-4'>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className='w-36 sm:w-44 md:w-48 flex-shrink-0'>
                <MovieCardSkeleton size='medium' />
              </div>
            ))}
          </div>
        ) : (
          <MovieList
            movies={transformMovies(topRatedData?.results || [])}
            size='medium'
          />
        )}
      </section>

      {/* Popular Movies by Genre Sections */}
      {genre1 && (
        <section>
          <SectionHeader
            title={`Popular ${genre1.name} Movies`}
            subtitle={`Top ${genre1.name.toLowerCase()} films you'll love`}
            viewAllHref={`/genre/${genre1.id}`}
          />
          {isLoadingGenre1 ? (
            <div className='flex gap-6 overflow-x-auto pb-4'>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className='w-36 sm:w-44 md:w-48 flex-shrink-0'>
                  <MovieCardSkeleton size='medium' />
                </div>
              ))}
            </div>
          ) : (
            <MovieList
              movies={transformMovies(genre1Movies?.results || []).slice(0, 5)}
              size='medium'
            />
          )}
        </section>
      )}

      {genre2 && (
        <section>
          <SectionHeader
            title={`Popular ${genre2.name} Movies`}
            subtitle={`Top ${genre2.name.toLowerCase()} films you'll love`}
            viewAllHref={`/genre/${genre2.id}`}
          />
          {isLoadingGenre2 ? (
            <div className='flex gap-6 overflow-x-auto pb-4'>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className='w-36 sm:w-44 md:w-48 flex-shrink-0'>
                  <MovieCardSkeleton size='medium' />
                </div>
              ))}
            </div>
          ) : (
            <MovieList
              movies={transformMovies(genre2Movies?.results || []).slice(0, 5)}
              size='medium'
            />
          )}
        </section>
      )}

      {genre3 && (
        <section>
          <SectionHeader
            title={`Popular ${genre3.name} Movies`}
            subtitle={`Top ${genre3.name.toLowerCase()} films you'll love`}
            viewAllHref={`/genre/${genre3.id}`}
          />
          {isLoadingGenre3 ? (
            <div className='flex gap-6 overflow-x-auto pb-4'>
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className='w-36 sm:w-44 md:w-48 flex-shrink-0'>
                  <MovieCardSkeleton size='medium' />
                </div>
              ))}
            </div>
          ) : (
            <MovieList
              movies={transformMovies(genre3Movies?.results || []).slice(0, 5)}
              size='medium'
            />
          )}
        </section>
      )}

      {/* All Genres Section */}
      <section>
        <SectionHeader
          title='Browse by Genre'
          subtitle='Explore movies across all categories'
        />
        {isLoadingGenres ? (
          <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {Array.from({ length: 12 }).map((_, i) => (
              <GenreCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {genresData?.genres.map((genre) => (
              <GenreCard
                key={genre.id}
                id={genre.id}
                name={genre.name}
                href={`/genre/${genre.id}`}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
