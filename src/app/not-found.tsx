import Link from 'next/link';
import { Film } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] text-center px-4'>
      <div className='mb-8'>
        <div className='inline-flex h-16 w-16 items-center justify-center rounded-lg bg-linear-to-br from-purple-600 to-pink-600 mb-4'>
          <Film className='h-8 w-8 text-white' />
        </div>
      </div>

      <h1 className='text-5xl font-bold text-foreground mb-3'>404</h1>
      <h2 className='text-2xl font-semibold text-foreground mb-3'>
        Page Not Found
      </h2>
      <p className='text-muted-foreground max-w-md mb-8 text-lg'>
        Looks like the movie you&apos;re looking for isn&apos;t in our database.
        Let&apos;s get you back on track.
      </p>

      <Link
        href='/'
        className='inline-flex items-center justify-center px-6 py-3 rounded-lg bg-linear-to-r from-purple-600 to-pink-600 text-white font-medium hover:shadow-lg transition-all duration-200 hover:scale-105'
      >
        Back to Home
      </Link>

      <div className='mt-12 text-muted-foreground text-sm'>
        <p>Lost? Try exploring our featured collections</p>
        <div className='flex gap-4 justify-center mt-3'>
          <Link href='/' className='hover:text-primary transition-colors'>
            Home
          </Link>
          <span>•</span>
          <Link href='/recent' className='hover:text-primary transition-colors'>
            Recent
          </Link>
          <span>•</span>
          <Link
            href='/watch-later'
            className='hover:text-primary transition-colors'
          >
            Watch Later
          </Link>
        </div>
      </div>
    </div>
  );
}
