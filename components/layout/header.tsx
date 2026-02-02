'use client';

import { Search, Film } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export function Header() {
  return (
    <header className='fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-card backdrop-blur-md shadow-sm'>
      <div className='flex h-full items-center justify-between px-6'>
        {/* Logo */}
        <div className='flex items-center gap-2'>
          <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-pink-600'>
            <Film className='h-6 w-6 text-white' />
          </div>
          <span className='text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent'>
            MOVIELAB
          </span>
        </div>

        {/* Search Bar */}
        <div className='flex-1 max-w-2xl mx-8 min-w-[240px]'>
          <div className='relative'>
            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground' />
            <input
              type='search'
              placeholder='Search for movies, genres, actors...'
              className='w-full rounded-lg border border-input bg-muted py-2 pl-10 pr-4 text-sm text-foreground placeholder-muted-foreground outline-none transition-all focus:border-ring focus:bg-card focus:ring-2 focus:ring-ring/30'
            />
          </div>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />
      </div>
    </header>
  );
}
