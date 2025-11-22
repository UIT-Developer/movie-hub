'use client';

import { useQuery } from '@tanstack/react-query';
import { getShowtimeSeats } from '../libs/actions/cinemas/showtime/showtime-action';
import { useAuth } from '@clerk/nextjs';

export const useGetShowtimeSeats = (showtimeId: string) => {

  return useQuery({
    queryKey: ['showtimes', showtimeId, 'seats'],
    queryFn: async () => {
      return await getShowtimeSeats(showtimeId);
    },
    enabled: !!showtimeId,
  });
};
