import { SectionHeader } from '@/components/section/section-header';
import { MovieList } from '@/components/movie/movie-list';
import { GenreCard } from '@/components/genre/genre-card';

// Mock data - Replace with API calls later
const topRatedMovies = [
  {
    id: 1,
    title: 'The Shawshank Redemption',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    rating: 9.3,
    year: 1994,
  },
  {
    id: 2,
    title: 'The Godfather',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    rating: 9.2,
    year: 1972,
  },
  {
    id: 3,
    title: 'The Dark Knight',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    rating: 9.0,
    year: 2008,
  },
  {
    id: 4,
    title: 'Pulp Fiction',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    rating: 8.9,
    year: 1994,
  },
  {
    id: 5,
    title: 'Forrest Gump',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
    rating: 8.8,
    year: 1994,
  },
  {
    id: 6,
    title: 'Inception',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
    rating: 8.8,
    year: 2010,
  },
];

const actionMovies = [
  {
    id: 11,
    title: 'Mad Max: Fury Road',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/hA2ple9q4qnwxp3hKVNhroipsir.jpg',
    rating: 8.1,
    year: 2015,
  },
  {
    id: 12,
    title: 'John Wick',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/fZPSd91yGE9fCcCe6OoQr6E3Bev.jpg',
    rating: 7.4,
    year: 2014,
  },
  {
    id: 13,
    title: 'Die Hard',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg',
    rating: 8.2,
    year: 1988,
  },
  {
    id: 14,
    title: 'The Matrix',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    rating: 8.7,
    year: 1999,
  },
  {
    id: 15,
    title: 'Gladiator',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg',
    rating: 8.5,
    year: 2000,
  },
];

const comedyMovies = [
  {
    id: 21,
    title: 'The Grand Budapest Hotel',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg',
    rating: 8.1,
    year: 2014,
  },
  {
    id: 22,
    title: 'Superbad',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg',
    rating: 7.6,
    year: 2007,
  },
  {
    id: 23,
    title: 'The Hangover',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/wSA4zOk4mGxBoAqy2TxbYCBRRYE.jpg',
    rating: 7.7,
    year: 2009,
  },
  {
    id: 24,
    title: 'Groundhog Day',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/gCgt1WARPZaXnq523ySQEUKinCs.jpg',
    rating: 8.0,
    year: 1993,
  },
  {
    id: 25,
    title: 'Mean Girls',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/fXm3YKXAEjx7d2tIWDg9TfRZtsU.jpg',
    rating: 7.1,
    year: 2004,
  },
];

const dramaMovies = [
  {
    id: 31,
    title: '12 Angry Men',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg',
    rating: 9.0,
    year: 1957,
  },
  {
    id: 32,
    title: "Schindler's List",
    posterUrl:
      'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
    rating: 9.0,
    year: 1993,
  },
  {
    id: 33,
    title: 'Fight Club',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    rating: 8.8,
    year: 1999,
  },
  {
    id: 34,
    title: 'The Green Mile',
    posterUrl:
      'https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg',
    rating: 8.6,
    year: 1999,
  },
  {
    id: 35,
    title: 'Good Will Hunting',
    posterUrl: 'https://image.tmdb.org/t/p/w500/bABCBKYBK7A5G1x0FzoeoNfuj2.jpg',
    rating: 8.3,
    year: 1997,
  },
];

const genres = [
  { name: 'Action', href: '/genre/action', movieCount: 1250 },
  { name: 'Comedy', href: '/genre/comedy', movieCount: 980 },
  { name: 'Drama', href: '/genre/drama', movieCount: 1560 },
  { name: 'Horror', href: '/genre/horror', movieCount: 760 },
  { name: 'Sci-Fi', href: '/genre/scifi', movieCount: 620 },
  { name: 'Thriller', href: '/genre/thriller', movieCount: 890 },
  { name: 'Romance', href: '/genre/romance', movieCount: 540 },
  { name: 'Animation', href: '/genre/animation', movieCount: 450 },
  { name: 'Adventure', href: '/genre/adventure', movieCount: 720 },
  { name: 'Fantasy', href: '/genre/fantasy', movieCount: 580 },
  { name: 'Crime', href: '/genre/crime', movieCount: 670 },
  { name: 'Mystery', href: '/genre/mystery', movieCount: 410 },
];

export default function Home() {
  return (
    <div className='space-y-8 sm:space-y-10 md:space-y-12'>
      {/* Top Rated Movies Section */}
      <section>
        <SectionHeader
          title='Top Rated Movies'
          subtitle='The highest-rated films of all time'
          viewAllHref='/top-rated'
        />
        <MovieList movies={topRatedMovies} size='medium' />
      </section>

      {/* Action Movies Section */}
      <section>
        <SectionHeader
          title='Popular Action Movies'
          subtitle='Explosive entertainment and thrilling adventures'
          viewAllHref='/genre/action'
        />
        <MovieList movies={actionMovies} size='medium' />
      </section>

      {/* Comedy Movies Section */}
      <section>
        <SectionHeader
          title='Popular Comedy Movies'
          subtitle='Laugh out loud with these hilarious films'
          viewAllHref='/genre/comedy'
        />
        <MovieList movies={comedyMovies} size='medium' />
      </section>

      {/* Drama Movies Section */}
      <section>
        <SectionHeader
          title='Popular Drama Movies'
          subtitle='Powerful stories that touch the heart'
          viewAllHref='/genre/drama'
        />
        <MovieList movies={dramaMovies} size='medium' />
      </section>

      {/* All Genres Section */}
      <section>
        <SectionHeader
          title='Browse by Genre'
          subtitle='Explore movies across all categories'
        />
        <div className='grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4'>
          {genres.map((genre) => (
            <GenreCard
              key={genre.name}
              name={genre.name}
              href={genre.href}
              movieCount={genre.movieCount}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
