'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, Star, ArrowLeft, User, Bookmark } from 'lucide-react';
import {
  useMovieDetails,
  useMovieCredits,
  useSimilarMovies,
} from '@/hooks/use-movies';
import {
  getPosterUrl,
  getBackdropUrl,
  getProfileUrl,
  formatRuntime,
  getYearFromDate,
} from '@/lib/api/tmdb';
import { useRecentlyViewedStore } from '@/store/recently-viewed';
import { useWatchLaterStore } from '@/store/watch-later';
import { MovieList } from '@/components/movie/movie-list';
import { MovieCardSkeleton } from '@/components/skeleton/movie-card-skeleton';
import type { MovieCardData } from '@/types';
import { toast } from 'sonner';

export default function MovieDetailsPage() {
  const params = useParams();
  const movieId = Number(params.id);
  const [isHydrated] = useState(() => typeof window !== 'undefined');
  const addRecentlyViewed = useRecentlyViewedStore((state) => state.addMovie);
  const addToWatchLater = useWatchLaterStore((state) => state.addMovie);
  const removeFromWatchLater = useWatchLaterStore((state) => state.removeMovie);
  const watchLaterMovies = useWatchLaterStore((state) => state.movies);
  const inWatchLater =
    isHydrated && watchLaterMovies.some((m) => m.id === movieId);

  const {
    data: movie,
    isLoading: movieLoading,
    error: movieError,
  } = useMovieDetails(movieId);

  const { data: credits, isLoading: creditsLoading } = useMovieCredits(movieId);

  const { data: similarMovies, isLoading: similarLoading } =
    useSimilarMovies(movieId);

  // Add to recently viewed when movie data is loaded
  useEffect(() => {
    if (movie) {
      addRecentlyViewed({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        rating: movie.vote_average,
        releaseDate: movie.release_date,
      });
    }
  }, [movie, addRecentlyViewed]);

  // Handle errors
  useEffect(() => {
    if (movieError) {
      toast.error('Failed to load movie details');
    }
  }, [movieError]);

  const handleWatchLaterToggle = () => {
    if (!movie) return;

    if (inWatchLater) {
      removeFromWatchLater(movieId);
      toast.success('Removed from watch later');
    } else {
      addToWatchLater({
        id: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
        rating: movie.vote_average,
        releaseDate: movie.release_date,
      });
      toast.success('Added to watch later');
    }
  };

  if (movieLoading) {
    return (
      <div className='min-h-screen pb-12'>
        {/* Back Button Skeleton */}
        <div className='container mx-auto px-4 pt-4 md:pt-6'>
          <div className='h-5 w-32 bg-muted animate-pulse rounded' />
        </div>

        {/* Backdrop Skeleton */}
        <div className='relative h-[40vh] md:h-[60vh] w-full bg-muted animate-pulse mt-4' />

        {/* Content Skeleton */}
        <div className='container mx-auto px-4 -mt-32 relative z-10'>
          <div className='flex flex-col md:flex-row gap-6 md:gap-8'>
            {/* Poster Skeleton */}
            <div className='w-full md:w-64 lg:w-80 shrink-0'>
              <div className='aspect-2/3 rounded-lg bg-muted animate-pulse shadow-2xl' />
            </div>

            {/* Details Skeleton */}
            <div className='flex-1 space-y-6'>
              {/* Title and Tagline */}
              <div className='space-y-2'>
                <div className='h-10 md:h-12 bg-muted animate-pulse rounded w-full max-w-2xl' />
                <div className='h-6 bg-muted animate-pulse rounded w-3/4 max-w-xl' />
              </div>

              {/* Meta Info */}
              <div className='flex flex-wrap gap-4 md:gap-6'>
                <div className='h-6 w-24 bg-muted animate-pulse rounded' />
                <div className='h-6 w-32 bg-muted animate-pulse rounded' />
                <div className='h-6 w-20 bg-muted animate-pulse rounded' />
              </div>

              {/* Genres */}
              <div className='flex flex-wrap gap-2'>
                <div className='h-7 w-20 bg-muted animate-pulse rounded-full' />
                <div className='h-7 w-24 bg-muted animate-pulse rounded-full' />
                <div className='h-7 w-16 bg-muted animate-pulse rounded-full' />
              </div>

              {/* Overview */}
              <div className='space-y-3'>
                <div className='h-7 w-32 bg-muted animate-pulse rounded' />
                <div className='space-y-2'>
                  <div className='h-4 bg-muted animate-pulse rounded w-full' />
                  <div className='h-4 bg-muted animate-pulse rounded w-full' />
                  <div className='h-4 bg-muted animate-pulse rounded w-11/12' />
                  <div className='h-4 bg-muted animate-pulse rounded w-4/5' />
                </div>
              </div>

              {/* Cast */}
              <div className='space-y-4'>
                <div className='h-7 w-24 bg-muted animate-pulse rounded' />
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className='flex flex-col items-center'>
                      <div className='w-20 h-20 md:w-24 md:h-24 rounded-full bg-muted animate-pulse mb-2' />
                      <div className='h-4 w-20 bg-muted animate-pulse rounded' />
                      <div className='h-3 w-16 bg-muted animate-pulse rounded mt-1' />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Similar Movies Skeleton */}
          <div className='mt-12'>
            <div className='h-8 w-48 bg-muted animate-pulse rounded mb-6' />
            <div className='flex gap-4 overflow-x-hidden'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className='shrink-0 w-36 sm:w-44'>
                  <div className='aspect-2/3 bg-muted animate-pulse rounded-lg' />
                  <div className='mt-2 space-y-1'>
                    <div className='h-4 bg-muted animate-pulse rounded w-3/4' />
                    <div className='h-3 bg-muted animate-pulse rounded w-1/2' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-2'>Movie Not Found</h1>
          <Link
            href='/'
            className='text-primary hover:text-primary/80 transition-colors'
          >
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  // Transform similar movies for MovieList (limit to 12)
  const similarMoviesData: MovieCardData[] =
    similarMovies?.results.slice(0, 12).map((movie) => ({
      id: movie.id,
      title: movie.title,
      posterUrl: getPosterUrl(movie.poster_path),
      rating: movie.vote_average,
      year: getYearFromDate(movie.release_date),
      releaseDate: movie.release_date,
    })) || [];

  // Get top 10 cast members
  const mainCast = credits?.cast.slice(0, 10) || [];

  return (
    <div className='min-h-screen pb-12'>
      {/* Back Button */}
      <div className='container mx-auto px-4 pt-4 md:pt-6'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to home
        </Link>
      </div>

      {/* Backdrop */}
      <div className='relative h-[40vh] md:h-[60vh] w-full overflow-hidden'>
        <div className='absolute inset-0 bg-linear-to-t from-background via-background/50 to-transparent z-10' />
        <Image
          src={getBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* Main Content */}
      <div className='container mx-auto px-4 -mt-32 relative z-10'>
        <div className='flex flex-col md:flex-row gap-6 md:gap-8'>
          {/* Poster */}
          <div className='w-full md:w-64 lg:w-80 shrink-0'>
            <div className='relative aspect-2/3 rounded-lg overflow-hidden shadow-2xl border border-border'>
              <Image
                src={getPosterUrl(movie.poster_path, 'w500')}
                alt={movie.title}
                fill
                className='object-cover'
                priority
              />
            </div>
          </div>

          {/* Details */}
          <div className='flex-1 space-y-6'>
            {/* Title and Tagline */}
            <div>
              <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-2'>
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className='text-lg text-muted-foreground italic'>
                  {movie.tagline}
                </p>
              )}
            </div>

            {/* Meta Info */}
            <div className='flex flex-wrap gap-4 md:gap-6 text-sm md:text-base'>
              <div className='flex items-center gap-2'>
                <Star className='h-5 w-5 text-yellow-500 fill-yellow-500' />
                <span className='font-semibold'>
                  {movie.vote_average.toFixed(1)}
                </span>
                <span className='text-muted-foreground'>
                  ({movie.vote_count.toLocaleString()} votes)
                </span>
              </div>

              {movie.release_date && (
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Calendar className='h-5 w-5' />
                  <span>
                    {new Date(movie.release_date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}

              {movie.runtime > 0 && (
                <div className='flex items-center gap-2 text-muted-foreground'>
                  <Clock className='h-5 w-5' />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}
            </div>

            {/* Watch Later Button */}
            {isHydrated && (
              <button
                onClick={handleWatchLaterToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all cursor-pointer ${
                  inWatchLater
                    ? 'bg-primary text-white hover:bg-primary/90'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                <Bookmark
                  className={`h-5 w-5 ${inWatchLater ? 'fill-current' : ''}`}
                />
                <span>
                  {inWatchLater
                    ? 'Remove from Watch Later'
                    : 'Add to Watch Later'}
                </span>
              </button>
            )}

            {/* Genres */}
            {movie.genres.length > 0 && (
              <div className='flex flex-wrap gap-2'>
                {movie.genres.map((genre) => (
                  <Link
                    key={genre.id}
                    href={`/genre/${genre.id}`}
                    className='px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary hover:text-white transition-colors'
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>
            )}

            {/* Overview */}
            <div>
              <h2 className='text-xl md:text-2xl font-semibold mb-3'>
                Overview
              </h2>
              <p className='text-muted-foreground leading-relaxed'>
                {movie.overview || 'No overview available.'}
              </p>
            </div>

            {/* Cast */}
            {!creditsLoading && mainCast.length > 0 && (
              <div>
                <h2 className='text-xl md:text-2xl font-semibold mb-4'>Cast</h2>
                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4'>
                  {mainCast.map((cast) => (
                    <div
                      key={cast.id}
                      className='flex flex-col items-center text-center group'
                    >
                      <div className='relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-2 border-2 border-border group-hover:border-primary transition-colors'>
                        {cast.profile_path ? (
                          <Image
                            src={getProfileUrl(cast.profile_path)}
                            alt={cast.name}
                            fill
                            className='object-cover'
                          />
                        ) : (
                          <div className='w-full h-full bg-muted flex items-center justify-center'>
                            <User className='h-8 w-8 text-muted-foreground' />
                          </div>
                        )}
                      </div>
                      <p className='text-sm font-medium text-foreground line-clamp-2'>
                        {cast.name}
                      </p>
                      <p className='text-xs text-muted-foreground line-clamp-2'>
                        {cast.character}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Similar Movies */}
        {!similarLoading && similarMoviesData.length > 0 && (
          <div className='mt-12'>
            <h2 className='text-2xl md:text-3xl font-bold mb-6'>
              Similar Movies
            </h2>
            <MovieList movies={similarMoviesData} size='small' />
          </div>
        )}

        {similarLoading && (
          <div className='mt-12'>
            <h2 className='text-2xl md:text-3xl font-bold mb-6'>
              Similar Movies
            </h2>
            <div className='flex gap-6 overflow-x-auto pb-4'>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className='w-32 sm:w-36 flex-shrink-0'>
                  <MovieCardSkeleton size='small' />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
