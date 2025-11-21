import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { getCinemaDetail, GetCinemasNearby, getMovieShowtimesAtCinema, GetShowtimesQuery, searchCinemas } from "../libs/actions/cinemas/cinema-action";

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
    }
  });
}