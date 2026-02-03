# 🎬 MovieLab

A modern, feature-rich movie discovery application built with Next.js 16, TypeScript, and the TMDB API. Browse thousands of movies, manage your watchlist, and discover new favorites with an elegant, responsive interface.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## ✨ Features

### 🎥 Movie Discovery

- **Browse by Genre**: Explore movies across 19+ different genres
- **Top Rated Movies**: Discover critically acclaimed films
- **Movie Details**: View comprehensive information including ratings, cast, runtime, and overview
- **Similar Movies**: Find related movies based on your interests
- **Smart Search**: Real-time search in header with debouncing (500ms) and floating results dropdown
- **Advanced Sorting**: Sort genre pages by popularity, release date, rating, or title (ascending/descending)

### 📚 Personal Collections

- **Watch Later**: Bookmark movies to watch later with persistent storage
- **Recently Viewed**: Automatic tracking of your viewing history
- **One-Click Management**: Add/remove movies with instant feedback

### 🎨 User Experience

- **Dark/Light Mode**: Seamless theme switching with next-themes
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Loading Skeletons**: Smooth loading states for better UX
- **Pagination**: Browse through thousands of movies efficiently
- **Toast Notifications**: Real-time feedback for user actions (Sonner)
- **Collapsible Sidebar**: Easy navigation on all devices

### 🚀 Performance

- **Client-Side Rendering**: Fast and interactive with optimized React 19
- **Image Optimization**: Next.js Image component with lazy loading
- **Smart Caching**: TanStack Query with optimized cache strategies (5min movies, 24hr genres, 10min details)

### 💾 State Management

- **Zustand**: Lightweight state management with persist middleware
- **TanStack Query**: Intelligent data fetching and caching
- **LocalStorage**: Persistent storage for watch later and recently viewed

## 🛠️ Tech Stack

- **Framework**: [Next.js 16.1.6](https://nextjs.org/) (App Router)
- **React**: [React 19.2.3](https://react.dev/)
- **Language**: [TypeScript 5.x](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.x](https://tailwindcss.com/)
- **Data Fetching**: [TanStack Query 5.90.20](https://tanstack.com/query/latest)
- **State Management**: [Zustand 5.0.11](https://zustand-demo.pmnd.rs/)
- **API**: [TMDB API v3](https://www.themoviedb.org/documentation/api)
- **HTTP Client**: [Axios 1.13.4](https://axios-http.com/)
- **Icons**: [Lucide React 0.563.0](https://lucide.dev/)
- **Notifications**: [Sonner 2.0.7](https://sonner.emilkowal.ski/)
- **Theme**: [next-themes 0.4.6](https://github.com/pacocoursey/next-themes)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **pnpm**: v8.0.0 or higher (or npm/yarn)
- **TMDB API Key**: Get one from [TMDB](https://www.themoviedb.org/settings/api)

## 🚀 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/movie-lab.git
cd movie-lab
```

### 2. Install Dependencies

Using pnpm (recommended):

```bash
pnpm install
```

Using npm:

```bash
npm install
```

Using yarn:

```bash
yarn install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_TMDB_API_BASE_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_TMDB_API_SECRET=your_tmdb_api_secret_here
```

**How to get TMDB API Key:**

1. Create a free account at [TMDB](https://www.themoviedb.org/signup)
2. Go to [API Settings](https://www.themoviedb.org/settings/api)
3. Request an API key (select "Developer" if asked)
4. Copy your API key and paste it in `.env.local`

### 4. Run Development Server

```bash
pnpm dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
pnpm build
pnpm start
```

## 📁 Project Structure

```
movie-lab/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (pages)/           # Route groups
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── genre/[id]/    # Genre pages with sorting
│   │   │   ├── movie/[id]/    # Movie details
│   │   │   ├── recent/        # Recently viewed
│   │   │   ├── watch-later/   # Watch later list
│   │   │   └── search/        # Search page (empty)
│   │   ├── layout.tsx         # Root layout
│   │   ├── globals.css        # Global styles
│   │   └── not-found.tsx      # 404 page
│   ├── components/            # React components
│   │   ├── genre/            # Genre components
│   │   ├── layout/           # Layout components (Header, Sidebar, MainContent)
│   │   ├── movie/            # Movie components (MovieCard, MovieList)
│   │   ├── providers/        # Context providers (Theme, Query)
│   │   ├── section/          # Section components
│   │   ├── skeleton/         # Loading skeletons
│   │   └── ui/               # UI components (ThemeToggle)
│   ├── hooks/                # Custom React hooks
│   │   ├── use-movies.ts     # Movie data hooks
│   │   └── use-genres.ts     # Genre data hooks
│   ├── lib/                  # Utilities and configurations
│   │   └── api/              # API services (TMDB)
│   ├── store/                # Zustand stores
│   │   ├── watch-later.ts    # Watch later state
│   │   └── recently-viewed.ts # Recently viewed state
│   └── types/                # TypeScript types
├── public/                   # Static assets
├── .env.local               # Environment variables (create this)
├── next.config.ts           # Next.js configuration
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## 🎯 Available Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

## 🔑 Key Features Implementation

### Search Functionality

- Integrated in header (no separate page)
- Debounced search with 500ms delay to reduce API calls
- Real-time results in floating dropdown
- Shows up to 8 movies with poster, title, year, rating, and overview
- Skeleton loaders (4 items) during search
- Click outside to close
- Responsive design for mobile and desktop

### Sorting Options (Genre Pages)

- Popularity (High to Low / Low to High)
- Release Date (Newest / Oldest)
- Rating (High to Low / Low to High)
- Title (A-Z / Z-A)
- Resets to page 1 when sort changes
- Auto-scroll on page/sort change

### Caching Strategy (TanStack Query)

- **Movies**: 5 minutes
- **Genres**: 24 hours
- **Movie Details**: 10 minutes
- **Search Results**: Cached per query

### State Persistence (Zustand + LocalStorage)

- Watch Later list persists across sessions
- Recently Viewed history persists across sessions
- Theme preference persists across sessions (next-themes)

## 🌐 API Integration

The app uses TMDB API v3 endpoints:

- `/genre/movie/list` - Fetch all genres
- `/movie/top_rated` - Get top-rated movies
- `/discover/movie` - Discover movies by genre with sorting
- `/movie/{id}` - Get movie details
- `/movie/{id}/credits` - Get movie cast
- `/movie/{id}/similar` - Get similar movies
- `/search/movie` - Search movies

---
