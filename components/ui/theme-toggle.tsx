'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className='h-10 w-10 rounded-lg border border-border bg-card'></div>
    );
  }

  const currentTheme = theme === 'dark' ? 'dark' : 'light';
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
  const Icon = currentTheme === 'dark' ? Sun : Moon;
  const label =
    currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <button
      type='button'
      onClick={() => setTheme(nextTheme)}
      aria-label={label}
      className='flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-0'
    >
      <Icon size={18} />
    </button>
  );
}
