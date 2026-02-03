'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMoviesByGenre } from '@/hooks/use-movies';
import { useGenres } from '@/hooks/use-genres';
import { MovieCard } from '@/components/movie/movie-card';
import { MovieCardSkeleton } from '@/components/skeleton/movie-card-skeleton';
import { getPosterUrl, getYearFromDate } from '@/lib/api/tmdb';
import { toast } from 'sonner';

export default function GenrePage() {
  const params = useParams();
  const genreId = Number(params.id);
  const [page, setPage] = useState(1);

  const { data: genresData } = useGenres();
  const {
    data: moviesData,
    isLoading,
    error,
  } = useMoviesByGenre(genreId, page);

  const genre = genresData?.genres.find((g) => g.id === genreId);

  useEffect(() => {
    if (error) {
      toast.error('Failed to load movies');
    }
  }, [error]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [page]);

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

        <div>
          <h1 className='text-3xl md:text-4xl font-bold text-foreground'>
            {genre?.name || 'Loading...'}
          </h1>
          <p className='text-muted-foreground mt-2'>
            {moviesData?.total_results
              ? `${moviesData.total_results.toLocaleString()} movies found`
              : 'Explore movies in this genre'}
          </p>
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
                posterUrl={getPosterUrl(movie.poster_path)}
                rating={movie.vote_average}
                year={getYearFromDate(movie.release_date)}
                releaseDate={movie.release_date}
                // size='small'
              />
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && movies.length > 0 && totalPages > 1 && (
        <div className='flex items-center justify-center gap-2 pt-4'>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className='flex items-center gap-1 px-3 py-2 rounded-lg bg-card border border-border text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed'
          >
            <ChevronLeft className='h-4 w-4' />
            Previous
          </button>

          <div className='flex items-center gap-2'>
            {/* Current page range */}
            {(() => {
              const pageNumbers = [];
              let startPage = Math.max(1, page - 2);
              let endPage = Math.min(totalPages, page + 2);

              // Adjust to always show 5 pages when possible
              if (endPage - startPage < 4) {
                if (startPage === 1) {
                  endPage = Math.min(5, totalPages);
                } else if (endPage === totalPages) {
                  startPage = Math.max(1, totalPages - 4);
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
                        className='px-3 py-2 rounded-lg bg-card border border-border text-sm font-medium transition-colors hover:bg-muted'
                      >
                        1
                      </button>
                      {startPage > 2 && (
                        <span className='text-muted-foreground'>...</span>
                      )}
                    </>
                  )}

                  {/* Page number buttons */}
                  {pageNumbers.map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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
                        <span className='text-muted-foreground'>...</span>
                      )}
                      <button
                        onClick={() => setPage(totalPages)}
                        className='px-3 py-2 rounded-lg bg-card border border-border text-sm font-medium transition-colors hover:bg-muted'
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
            className='flex items-center gap-1 px-3 py-2 rounded-lg bg-card border border-border text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Next
            <ChevronRight className='h-4 w-4' />
          </button>
        </div>
      )}
    </div>
  );
}
