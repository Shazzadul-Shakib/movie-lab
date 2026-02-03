'use client';

import { Search, Film, Menu } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { useState } from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-card/95 backdrop-blur-md shadow-sm'>
      <div className='flex h-full items-center justify-between px-2 sm:px-4 md:px-6'>
        {/* Left Section: Menu + Logo */}
        <div className='flex items-center gap-1 sm:gap-2 flex-shrink-0'>
          {/* Mobile Menu Button */}
          <button
            onClick={onMenuToggle}
            className='lg:hidden flex items-center justify-center h-9 w-9 sm:h-10 sm:w-10 rounded-lg hover:bg-muted transition-colors flex-shrink-0 cursor-pointer'
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
          <div className='relative w-full'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <input
              type='search'
              placeholder='Search for movies, genres, actors...'
              className='w-full rounded-lg border border-input bg-muted py-2 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-ring focus:bg-card focus:ring-2 focus:ring-ring/30'
            />
          </div>
        </div>

        {/* Right Section: Search Toggle + Theme */}
        <div className='flex items-center gap-1 sm:gap-2 flex-shrink-0'>
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
          <div className='relative mt-3'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <input
              type='search'
              placeholder='Search movies...'
              className='w-full rounded-lg border border-input bg-muted py-2 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-ring focus:bg-card focus:ring-2 focus:ring-ring/30'
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
