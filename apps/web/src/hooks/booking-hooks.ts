import { useAuth } from '@clerk/clerk-react';
import { CreateBookingDto, PaginationQuery } from '@movie-hub/shared-types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  checkUserBookingAtShowtime,
  createBooking,
  getUserBookings,
} from '../libs/actions/booking/booking-action';
import { getQueryClient } from '../libs/get-query-client';
import { BookingStatus } from '../libs/types/booking.type';

export const useCreateBooking = () => {
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ['create-booking'],
    mutationFn: async (data: CreateBookingDto) => {
      return await createBooking(data);
    },
    onSuccess: () => {
      toast.success('Đặt vé thành công!');
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });

    },
    onError: (error) => {
      toast.error(
        error?.message || 'Đã có lỗi xảy ra khi tạo đặt vé. Vui lòng thử lại.'
      );
    },
  });
};

export const useGetBookings = (status?: BookingStatus, pagination?: PaginationQuery) => {
  return useQuery({
    queryKey: ['user-bookings'],
    queryFn: async () => {
      return await getUserBookings({
        status,
        pagination
      });
    },
  });
};
export const useCheckUserBookingAtShowtime = (showtimeId: string) => {
  return useQuery({
    queryKey: ['check-user-booking', showtimeId],
    queryFn: async () => {
      return await checkUserBookingAtShowtime(showtimeId);
    },
    enabled: !!showtimeId,
  });
}
