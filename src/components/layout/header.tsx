'use client';

import { Search, Film, Menu, X } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchMovies } from '@/hooks/use-movies';
import { getPosterUrl, getYearFromDate } from '@/lib/api/tmdb';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data: searchResults, isLoading } = useSearchMovies(debouncedQuery, 1);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
      if (searchQuery.trim()) {
        setShowResults(true);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = () => {
    setShowResults(false);
    setSearchQuery('');
    setShowSearch(false);
  };

  const movies = searchResults?.results?.slice(0, 8) || [];
  const totalResults = searchResults?.total_results || 0;

  return (
    <header className='fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-card/95 backdrop-blur-md shadow-sm'>
      <div className='flex h-full items-center justify-between px-2 sm:px-4 md:px-6'>
        {/* Left Section: Menu + Logo */}
        <div className='flex items-center gap-1 sm:gap-2 shrink-0'>
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className='lg:hidden flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-lg hover:bg-muted transition-colors shrink-0 cursor-pointer'
            aria-label='Toggle menu'
          >
            <Menu className='h-5 w-5' />
          </button>

          {/* Logo */}
          <div className='flex items-center gap-1.5 sm:gap-2'>
            <div className='flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600'>
              <Film className='h-5 w-5 sm:h-6 sm:w-6 text-white' />
            </div>
            <span className='text-sm sm:text-base md:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent hidden min-[380px]:inline whitespace-nowrap'>
              MOVIELAB
            </span>
          </div>
        </div>

        {/* Center Section: Desktop Search Bar */}
        <div className='hidden lg:flex flex-1 max-w-2xl mx-8 justify-center'>
          <div ref={searchRef} className='relative w-full'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10' />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => debouncedQuery && setShowResults(true)}
              placeholder='Search for movies...'
              className='w-full rounded-lg border border-input bg-muted py-2 pl-10 pr-10 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-ring focus:bg-card focus:ring-2 focus:ring-ring/30'
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowResults(false);
                }}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
              >
                <X className='h-4 w-4' />
              </button>
            )}

            {/* Search Results Dropdown */}
            {showResults && debouncedQuery && (
              <div className='absolute top-full mt-2 w-full bg-background border border-border rounded-lg shadow-xl max-h-[500px] overflow-y-auto z-50'>
                {isLoading ? (
                  <div className='p-2'>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className='flex items-start gap-3 p-2'>
                        <div className='relative w-12 h-16 shrink-0 rounded bg-muted animate-pulse' />
                        <div className='flex-1 min-w-0 space-y-2'>
                          <div className='h-4 bg-muted rounded animate-pulse w-3/4' />
                          <div className='h-3 bg-muted rounded animate-pulse w-1/2' />
                          <div className='h-3 bg-muted rounded animate-pulse w-full' />
                          <div className='h-3 bg-muted rounded animate-pulse w-5/6' />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : movies.length === 0 ? (
                  <div className='p-4 text-center text-sm text-muted-foreground'>
                    No results found for &quot;{debouncedQuery}&quot;
                  </div>
                ) : (
                  <>
                    <div className='p-3 border-b border-border text-xs text-muted-foreground'>
                      Found {totalResults.toLocaleString()}{' '}
                      {totalResults === 1 ? 'result' : 'results'}
                    </div>
                    <div className='p-2'>
                      {movies.map((movie) => (
                        <Link
                          key={movie.id}
                          href={`/movie/${movie.id}`}
                          onClick={handleResultClick}
                          className='flex items-start gap-3 p-2 rounded-lg hover:bg-primary/10 transition-colors group'
                        >
                          <div className='relative w-12 h-16 shrink-0 rounded overflow-hidden bg-muted'>
                            <Image
                              src={getPosterUrl(movie.poster_path, 'w92')}
                              alt={movie.title}
                              fill
                              className='object-cover'
                              sizes='48px'
                            />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <h3 className='text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1'>
                              {movie.title}
                            </h3>
                            <p className='text-xs text-muted-foreground mt-0.5'>
                              {getYearFromDate(movie.release_date) || 'N/A'} •{' '}
                              ⭐ {movie.vote_average.toFixed(1)}
                            </p>
                            {movie.overview && (
                              <p className='text-xs text-muted-foreground mt-1 line-clamp-2'>
                                {movie.overview}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Search Toggle + Theme */}
        <div className='flex items-center gap-1 sm:gap-2 shrink-0'>
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            className='lg:hidden flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-lg hover:bg-muted transition-colors cursor-pointer'
            aria-label='Toggle search'
          >
            <Search className='h-5 w-5' />
          </button>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Search Bar */}
      {showSearch && (
        <div className='lg:hidden px-3 sm:px-4 pb-3 border-t border-border bg-card/95 backdrop-blur-md'>
          <div ref={searchRef} className='relative mt-3'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10' />
            <input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => debouncedQuery && setShowResults(true)}
              placeholder='Search movies...'
              className='w-full rounded-lg border border-input bg-muted py-2 pl-10 pr-10 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-ring focus:bg-card focus:ring-2 focus:ring-ring/30'
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowResults(false);
                }}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
              >
                <X className='h-4 w-4' />
              </button>
            )}

            {/* Mobile Search Results Dropdown */}
            {showResults && debouncedQuery && (
              <div className='absolute top-full mt-2 w-full bg-background border border-border rounded-lg shadow-xl max-h-[400px] overflow-y-auto z-50 left-0'>
                {isLoading ? (
                  <div className='p-2'>
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className='flex items-start gap-3 p-2'>
                        <div className='relative w-12 h-16 shrink-0 rounded bg-muted animate-pulse' />
                        <div className='flex-1 min-w-0 space-y-2'>
                          <div className='h-4 bg-muted rounded animate-pulse w-3/4' />
                          <div className='h-3 bg-muted rounded animate-pulse w-1/2' />
                          <div className='h-3 bg-muted rounded animate-pulse w-full' />
                          <div className='h-3 bg-muted rounded animate-pulse w-5/6' />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : movies.length === 0 ? (
                  <div className='p-4 text-center text-sm text-muted-foreground'>
                    No results found for &quot;{debouncedQuery}&quot;
                  </div>
                ) : (
                  <>
                    <div className='p-3 border-b border-border text-xs text-muted-foreground'>
                      Found {totalResults.toLocaleString()}{' '}
                      {totalResults === 1 ? 'result' : 'results'}
                    </div>
                    <div className='p-2'>
                      {movies.map((movie) => (
                        <Link
                          key={movie.id}
                          href={`/movie/${movie.id}`}
                          onClick={handleResultClick}
                          className='flex items-start gap-3 p-2 rounded-lg hover:bg-primary/10 transition-colors group'
                        >
                          <div className='relative w-12 h-16 shrink-0 rounded overflow-hidden bg-muted'>
                            <Image
                              src={getPosterUrl(movie.poster_path, 'w92')}
                              alt={movie.title}
                              fill
                              className='object-cover'
                              sizes='48px'
                            />
                          </div>
                          <div className='flex-1 min-w-0'>
                            <h3 className='text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1'>
                              {movie.title}
                            </h3>
                            <p className='text-xs text-muted-foreground mt-0.5'>
                              {getYearFromDate(movie.release_date) || 'N/A'} •{' '}
                              ⭐ {movie.vote_average.toFixed(1)}
                            </p>
                            {movie.overview && (
                              <p className='text-xs text-muted-foreground mt-1 line-clamp-2'>
                                {movie.overview}
                              </p>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
