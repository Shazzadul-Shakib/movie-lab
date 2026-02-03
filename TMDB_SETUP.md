# TMDB API Setup Instructions

## Getting Your TMDB API Key

1. **Create a TMDB Account**
   - Go to [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup)
   - Create a free account

2. **Request an API Key**
   - Log in to your account
   - Go to Settings → API
   - Click on "Request an API Key"
   - Choose "Developer" option
   - Fill in the application form (you can use personal/educational purposes)
   - Accept the terms and conditions

3. **Get Your Keys**
   - Once approved, you'll receive:
     - API Key (v3 auth)
     - API Read Access Token (v4 auth)

4. **Add to Environment Variables**
   - Open `.env.local` file in the project root
   - Replace `your_api_key_here` with your actual API Key (v3)
   - The API secret is optional for v3

```env
NEXT_PUBLIC_TMDB_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=https://api.themoviedb.org/3
```

5. **Restart Development Server**
   ```bash
   pnpm dev
   ```

## Features Implemented

✅ **TanStack Query (React Query)** - Data fetching and caching
✅ **Axios** - HTTP client for API calls
✅ **Sonner** - Beautiful toast notifications for errors
✅ **Loading Skeletons** - Smooth loading states
✅ **Dynamic Data** - All data fetched from TMDB API
✅ **Error Handling** - User-friendly error messages
✅ **Responsive Design** - Works on all devices

## API Endpoints Used

- `/genre/movie/list` - Get all movie genres
- `/movie/top_rated` - Get top rated movies
- `/movie/popular` - Get popular movies
- `/discover/movie` - Get movies by genre

## Components

### Hooks

- `useGenres()` - Fetch and cache genres
- `useTopRatedMovies()` - Fetch top rated movies
- `usePopularMovies()` - Fetch popular movies
- `useMoviesByGenre(genreId)` - Fetch movies by genre

### Skeletons

- `MovieCardSkeleton` - Loading state for movie cards
- `GenreCardSkeleton` - Loading state for genre cards

## API Rate Limits

TMDB free tier allows:

- 40 requests every 10 seconds per IP address
- This app is optimized with caching to stay well within limits
