import { useAuth } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import { getMovieShowtimesAtCinema, GetShowtimesQuery } from "../libs/actions/cinemas/cinema-action";

export const useGetMovieShowtimesAtCinema = (cinemaId: string, movieId: string, query: GetShowtimesQuery) => {

  return useQuery({
    queryKey: ["cinemas", cinemaId, "movies", movieId, "showtimes", query],
    queryFn: async () => {
      return await getMovieShowtimesAtCinema(cinemaId, movieId, query);
    },
  });
}