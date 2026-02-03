import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { getGenres } from '@/lib/api/tmdb';
import type { GenresResponse } from '@/types';

export function useGenres(): UseQueryResult<GenresResponse, Error> {
  return useQuery({
    queryKey: ['genres'],
    queryFn: getGenres,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours - genres don't change often
  });
}
