'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clock, Heart } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useGenres } from '@/hooks/use-genres';
import type { MainLink } from '@/types';

const mainLinks: MainLink[] = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Recent', icon: Clock, href: '/recent' },
  { name: 'Watch Later', icon: Heart, href: '/watch-later' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const previousPathname = useRef(pathname);
  const { data: genresData, isLoading: isLoadingGenres } = useGenres();

  // Close sidebar when route changes on mobile (only if pathname actually changed)
  useEffect(() => {
    if (previousPathname.current !== pathname && isOpen) {
      onClose();
      previousPathname.current = pathname;
    }
  }, [pathname, isOpen, onClose]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className='fixed inset-0 bg-black/80 z-40 lg:hidden cursor-pointer'
          onClick={onClose}
          aria-hidden='true'
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card flex flex-col z-40 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Main Navigation - Static */}
        <div className='p-4 pb-0'>
          <nav className='flex flex-col gap-1'>
            {mainLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                      : 'text-foreground hover:bg-primary/20 hover:text-primary'
                  }`}
                >
                  <Icon size={20} />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Genres - Scrollable list with static header */}
        <div className='flex-1 overflow-hidden p-4'>
          <div className='flex h-full flex-col'>
            <h3 className='flex-none px-3 py-2 text-xs font-bold uppercase tracking-wider text-primary bg-muted rounded-lg border border-border'>
              Genres
            </h3>
            <div className='mt-3 flex-1 overflow-y-auto pr-1'>
              {isLoadingGenres ? (
                <div className='flex flex-col gap-2 px-3'>
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div
                      key={i}
                      className='h-8 bg-muted/50 rounded-lg animate-pulse'
                    />
                  ))}
                </div>
              ) : (
                <nav className='flex flex-col gap-1'>
                  {genresData?.genres.map((genre) => {
                    const isActive = pathname === `/genre/${genre.id}`;
                    return (
                      <Link
                        key={genre.id}
                        href={`/genre/${genre.id}`}
                        className={`rounded-lg px-3 py-2 text-sm transition-all duration-200 cursor-pointer ${
                          isActive
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                            : 'text-muted-foreground hover:bg-primary/20 hover:text-primary'
                        }`}
                      >
                        {genre.name}
                      </Link>
                    );
                  })}
                </nav>
              )}
            </div>
          </div>
        </div>

        {/* Copyright Footer - Static */}
        <div className='border-t border-border p-4 bg-card'>
          <p className='text-[10px] text-center text-muted-foreground'>
            © 2026 Movielab.
          </p>
        </div>
      </aside>
    </>
  );
}
