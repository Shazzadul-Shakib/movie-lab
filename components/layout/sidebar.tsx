'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Clock, Heart } from 'lucide-react';

const genres = [
  { name: 'Action', href: '/genre/action' },
  { name: 'Adventure', href: '/genre/adventure' },
  { name: 'Animation', href: '/genre/animation' },
  { name: 'Comedy', href: '/genre/comedy' },
  { name: 'Crime', href: '/genre/crime' },
  { name: 'Drama', href: '/genre/drama' },
  { name: 'Fantasy', href: '/genre/fantasy' },
  { name: 'Horror', href: '/genre/horror' },
  { name: 'Sci-Fi', href: '/genre/scifi' },
  { name: 'Thriller', href: '/genre/thriller' },
];

const mainLinks = [
  { name: 'Home', icon: Home, href: '/' },
  { name: 'Recent', icon: Clock, href: '/recent' },
  { name: 'Watch Later', icon: Heart, href: '/watch-later' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className='fixed left-0 top-16 h-[calc(100vh-4rem)] w-64 border-r border-border bg-card flex flex-col'>
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
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
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
            <nav className='flex flex-col gap-1'>
              {genres.map((genre) => {
                const isActive = pathname === genre.href;
                return (
                  <Link
                    key={genre.href}
                    href={genre.href}
                    className={`rounded-lg px-3 py-2 text-sm transition-all duration-200 ${
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
  );
}
