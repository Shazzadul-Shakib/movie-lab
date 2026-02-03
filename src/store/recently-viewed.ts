import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface RecentlyViewedMovie {
  id: number;
  title: string;
  posterPath: string | null;
  rating: number;
  releaseDate: string;
  viewedAt: number;
}

interface RecentlyViewedState {
  movies: RecentlyViewedMovie[];
  addMovie: (movie: Omit<RecentlyViewedMovie, 'viewedAt'>) => void;
  clearAll: () => void;
}

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      movies: [],
      addMovie: (movie) =>
        set((state) => {
          // Remove if already exists
          const filtered = state.movies.filter((m) => m.id !== movie.id);

          // Add to beginning with current timestamp
          const newMovie = { ...movie, viewedAt: Date.now() };

          // Keep only last 20 movies
          const updated = [newMovie, ...filtered].slice(0, 20);

          return { movies: updated };
        }),
      clearAll: () => set({ movies: [] }),
    }),
    {
      name: 'recently-viewed-movies',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
