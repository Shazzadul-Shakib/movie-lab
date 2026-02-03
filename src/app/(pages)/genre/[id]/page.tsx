'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
} from 'lucide-react';
import { useMoviesByGenre } from '@/hooks/use-movies';
import { useGenres } from '@/hooks/use-genres';
import { MovieCard } from '@/components/movie/movie-card';
import { MovieCardSkeleton } from '@/components/skeleton/movie-card-skeleton';
import { getPosterUrl, getYearFromDate } from '@/lib/api/tmdb';
import { toast } from 'sonner';

const sortOptions = [
  { value: 'popularity.desc', label: 'Popularity (High to Low)' },
  { value: 'popularity.asc', label: 'Popularity (Low to High)' },
  { value: 'release_date.desc', label: 'Release Date (Newest)' },
  { value: 'release_date.asc', label: 'Release Date (Oldest)' },
  { value: 'vote_average.desc', label: 'Rating (High to Low)' },
  { value: 'vote_average.asc', label: 'Rating (Low to High)' },
  { value: 'title.asc', label: 'Title (A-Z)' },
  { value: 'title.desc', label: 'Title (Z-A)' },
];

export default function GenrePage() {
  const params = useParams();
  const genreId = Number(params.id);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('popularity.desc');

  const { data: genresData } = useGenres();
  const {
    data: moviesData,
    isLoading,
    error,
  } = useMoviesByGenre(genreId, page, sortBy);

  const genre = genresData?.genres.find((g) => g.id === genreId);

  useEffect(() => {
    if (error) {
      toast.error('Failed to load movies');
    }
  }, [error]);

  // Scroll to top on page or sort change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page, sortBy]);

  if (!genre && !isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold mb-2'>Genre Not Found</h1>
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

  const totalPages = moviesData?.total_pages || 1;
  const movies = moviesData?.results || [];

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='space-y-4'>
        <Link
          href='/'
          className='inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors'
        >
          <ArrowLeft className='h-4 w-4' />
          Back to home
        </Link>

        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
          <div>
            {genre?.name ? (
              <h1 className='text-3xl md:text-4xl font-bold text-foreground'>
                {genre.name}
              </h1>
            ) : (
              <div className='h-9 md:h-11 w-48 bg-muted rounded-lg animate-pulse' />
            )}
            <p className='text-muted-foreground mt-2'>
              {moviesData?.total_results
                ? `${moviesData.total_results.toLocaleString()} movies found`
                : 'Explore movies in this genre'}
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className='flex items-center gap-2 self-end sm:self-auto'>
            <ArrowUpDown className='h-4 w-4 mr-2 text-muted-foreground shrink-0' />
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1); // Reset to first page on sort change
              }}
              className='px-3 py-2 rounded-lg border border-input bg-muted text-foreground text-sm outline-none transition-all focus:border-ring focus:bg-card focus:ring-2 focus:ring-ring/30 cursor-pointer min-w-[200px]'
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Movies Grid */}
      {isLoading ? (
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className='w-full max-w-[240px] mx-auto'>
              <MovieCardSkeleton />
            </div>
          ))}
        </div>
      ) : movies.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-16 px-4'>
          <div className='text-center max-w-md'>
            <h2 className='text-xl font-semibold text-foreground mb-2'>
              No movies found
            </h2>
            <p className='text-muted-foreground'>
              Try exploring other genres or check back later.
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
                poster_path={movie.poster_path}
                vote_average={movie.vote_average}
                release_date={movie.release_date}
                // size='small'
              />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && movies.length > 0 && totalPages > 1 && (
        <div className='flex items-center justify-center gap-1 sm:gap-2 pt-4 flex-wrap'>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className='flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg bg-card border border-border text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
          >
            <ChevronLeft className='h-4 w-4' />
            <span className='hidden sm:inline'>Previous</span>
          </button>

          <div className='flex items-center gap-1 sm:gap-2'>
            {/* Current page range */}
            {(() => {
              const pageNumbers = [];
              // Show fewer pages on mobile (1 before, 1 after), more on desktop (2 before, 2 after)
              const isMobile =
                typeof window !== 'undefined' && window.innerWidth < 640;
              const range = isMobile ? 1 : 2;

              let startPage = Math.max(1, page - range);
              let endPage = Math.min(totalPages, page + range);

              // Adjust to show consistent number of pages
              const targetPages = isMobile ? 3 : 5;
              if (endPage - startPage < targetPages - 1) {
                if (startPage === 1) {
                  endPage = Math.min(targetPages, totalPages);
                } else if (endPage === totalPages) {
                  startPage = Math.max(1, totalPages - (targetPages - 1));
                }
              }

              for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
              }

              return (
                <>
                  {/* First page button - only show if page 1 is not in range */}
                  {startPage > 1 && (
                    <>
                      <button
                        onClick={() => setPage(1)}
                        className='px-2 sm:px-3 py-2 rounded-lg bg-card border border-border text-sm font-medium transition-colors hover:bg-muted cursor-pointer min-w-[36px]'
                      >
                        1
                      </button>
                      {startPage > 2 && (
                        <span className='text-muted-foreground text-xs sm:text-sm'>
                          ...
                        </span>
                      )}
                    </>
                  )}

                  {/* Page number buttons */}
                  {pageNumbers.map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-2 sm:px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer min-w-[36px] ${
                        page === pageNum
                          ? 'bg-primary text-white'
                          : 'bg-card border border-border hover:bg-muted'
                      }`}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {/* Last page button - only show if last page is not in range */}
                  {endPage < totalPages && (
                    <>
                      {endPage < totalPages - 1 && (
                        <span className='text-muted-foreground text-xs sm:text-sm'>
                          ...
                        </span>
                      )}
                      <button
                        onClick={() => setPage(totalPages)}
                        className='px-2 sm:px-3 py-2 rounded-lg bg-card border border-border text-sm font-medium transition-colors hover:bg-muted cursor-pointer min-w-[36px]'
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </>
              );
            })()}
          </div>

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className='flex items-center gap-1 px-2 sm:px-3 py-2 rounded-lg bg-card border border-border text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
          >
            <span className='hidden sm:inline'>Next</span>
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
      )}
    </div>
  );
}
