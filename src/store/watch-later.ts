import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface WatchLaterMovie {
  id: number;
  title: string;
  posterPath: string | null;
  rating: number;
  releaseDate: string;
  addedAt: number;
}

interface WatchLaterState {
  movies: WatchLaterMovie[];
  addMovie: (movie: Omit<WatchLaterMovie, 'addedAt'>) => void;
  removeMovie: (movieId: number) => void;
  isInWatchLater: (movieId: number) => boolean;
  clearAll: () => void;
}

export const useWatchLaterStore = create<WatchLaterState>()(
  persist(
    (set, get) => ({
      movies: [],
      addMovie: (movie) =>
        set((state) => {
          // Check if already exists
          if (state.movies.some((m) => m.id === movie.id)) {
            return state;
          }

          // Add to beginning with current timestamp
          const newMovie = { ...movie, addedAt: Date.now() };
          return { movies: [newMovie, ...state.movies] };
        }),
      removeMovie: (movieId) =>
        set((state) => ({
          movies: state.movies.filter((m) => m.id !== movieId),
        })),
      isInWatchLater: (movieId) => {
        return get().movies.some((m) => m.id === movieId);
      },
      clearAll: () => set({ movies: [] }),
    }),
    {
      name: 'watch-later-movies',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
