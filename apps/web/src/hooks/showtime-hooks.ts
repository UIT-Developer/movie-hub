import { useQuery } from '@tanstack/react-query';
import { getShowtimeSeats } from '../libs/actions/cinemas/showtime/showtime-action';

export const useGetShowtimeSeats = (showtimeId?: string) => {
  return useQuery({
    queryKey: ['showtimes', showtimeId, 'seats'],
    queryFn: async () => {
      if (!showtimeId) {
        return null
      }
      return await getShowtimeSeats(showtimeId);
    },
    enabled: !!showtimeId,
  });
};
