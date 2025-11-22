import { useAuth } from '@clerk/clerk-react';
import { CreateBookingDto } from '@movie-hub/shared-types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  createBooking,
  getUserBookings,
} from '../libs/actions/booking/booking-action';

export const useCreateBooking = () => {
  return useMutation({
    mutationKey: ['create-booking'],
    mutationFn: async (data: CreateBookingDto) => {
      return await createBooking(data);
    },
    onError: (error) => {
      toast.error(
        error?.message || 'Đã có lỗi xảy ra khi tạo đặt vé. Vui lòng thử lại.'
      );
    },
  });
};

export const useGetBookings = () => {
  return useQuery({
    queryKey: ['user-bookings'],
    queryFn: async () => {
      return await getUserBookings();
    },
  });
};
