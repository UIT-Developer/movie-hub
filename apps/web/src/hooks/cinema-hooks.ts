import { useAuth } from '@clerk/nextjs';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import {
  getCinemaDetail,
  GetCinemasNearby,
  getCinemasWithFilters,
  getMovieAtCinemas,
  getMovieShowtimesAtCinema,
  GetShowtimesQuery,
  searchCinemas,
} from '../libs/actions/cinemas/cinema-action';
import { CinemaListResponse } from '../libs/types/cinema.type';
import { ApiResponse, PaginationQuery, ServiceResult } from '@movie-hub/shared-types/common';
import { ShowtimeSummaryResponse } from '@movie-hub/shared-types';
import { MovieWithShowtimeResponse } from '../libs/types/movie.type';

export const useGetMovieShowtimesAtCinema = (
  cinemaId: string,
  movieId: string,
  query: GetShowtimesQuery
) => {
  return useQuery({
    queryKey: ['cinemas', cinemaId, 'movies', movieId, 'showtimes', query],
    queryFn: async () => {
      const response: ApiResponse<ShowtimeSummaryResponse[]> =
        await getMovieShowtimesAtCinema(cinemaId, movieId, query);

      if (response.success) {
        return response.data; // chỉ trả về mảng showtimes
      }

      throw new Error(response.message ?? 'Failed to fetch showtimes');
    },
  });
};

export const useGetCinemasNearby = (
  langtitude: number,
  longtitude: number,
  radius?: number,
  limit?: number
) => {
  return useQuery({
    queryKey: ['cinemas', 'nearby', langtitude, longtitude, radius, limit],
    queryFn: async () => {
      return await GetCinemasNearby(langtitude, longtitude, radius, limit);
    },
  });
};

export const useGetCinemasWithFilters = (params: {
  lat?: string;
  lon?: string;
  radius?: string;
  city?: string;
  district?: string;
  amenities?: string;
  hallTypes?: string;
  minRating?: string;
  page?: number;
  limit?: number;
  sortBy?: 'distance' | 'rating' | 'name';
  sortOrder?: 'asc' | 'desc';
}) => {
  return useInfiniteQuery<CinemaListResponse>({
    queryKey: ['cinemas', params],
    queryFn: ({ pageParam = 1 }) =>
      getCinemasWithFilters({ ...params, page: pageParam as number }),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasMore) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    enabled: !!params,
  });
};

export const useSearchCinemas = (
  query: string,
  longitude?: string,
  latitude?: string
) => {
  return useQuery({
    queryKey: ['cinemas', 'search', query, longitude, latitude],
    queryFn: async () => {
      return await searchCinemas(query, longitude, latitude);
    },
  });
};

export const useGetCinemaDetail = (cinemaId: string) => {
  return useQuery({
    queryKey: ['cinemas', 'detail', cinemaId],
    queryFn: async () => {
      return await getCinemaDetail(cinemaId);
    },
    enabled: !!cinemaId,
  });
};


export const useGetMoviesAtCinema = (cinemaId: string, query: PaginationQuery ) => {
  return useInfiniteQuery({
    queryKey: ['movies-at-cinema', cinemaId, query],
    queryFn: async ({ pageParam = 1 }) => {
      // gọi getMovies và merge query params
      return await getMovieAtCinemas(cinemaId, {
        ...query,
        page: pageParam,
      } as PaginationQuery);
    },
    getNextPageParam: (
      lastPage: ServiceResult<MovieWithShowtimeResponse[]>
    ) => {
      const meta = lastPage.meta;
      if (!meta) return undefined;
      return meta.page < meta.totalPages ? meta.page + 1 : undefined;
    },
    select: (data) => {
      return {
        pages: data.pages.flatMap((page) => page.data),
        pageParams: data.pageParams,
      };
    },
    initialPageParam: 1,
  });
};