import { useAuth } from "@clerk/nextjs";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getCinemaDetail, GetCinemasNearby, getCinemasWithFilters, getMovieShowtimesAtCinema, GetShowtimesQuery, searchCinemas } from "../libs/actions/cinemas/cinema-action";
import { CinemaListResponse } from "../libs/types/cinema.type";

export const useGetMovieShowtimesAtCinema = (cinemaId: string, movieId: string, query: GetShowtimesQuery) => {

  return useQuery({
    queryKey: ["cinemas", cinemaId, "movies", movieId, "showtimes", query],
    queryFn: async () => {
      return await getMovieShowtimesAtCinema(cinemaId, movieId, query);
    },
  });
}

export const useGetCinemasNearby = (langtitude: number, longtitude: number, radius?: number, limit?: number) => {
  return useQuery({
    queryKey: ['cinemas', 'nearby', langtitude, longtitude, radius, limit],
    queryFn: async () => {
      return await GetCinemasNearby(langtitude, longtitude, radius, limit);
    },
  });
}

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
      getCinemasWithFilters({ ...params, page: pageParam as number } ),
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

export const useSearchCinemas = (query: string, longitude?: string, latitude?: string) => {
  return useQuery({
    queryKey: ["cinemas", "search", query, longitude, latitude],
    queryFn: async () => {
      return await searchCinemas(query, longitude, latitude);
    }
  });
}


export const useGetCinemaDetail = (cinemaId: string) => {
  return useQuery({
    queryKey: ["cinemas", "detail", cinemaId],
    queryFn: async () => {
      return await getCinemaDetail(cinemaId);
    },
    enabled: !!cinemaId,
  });
}