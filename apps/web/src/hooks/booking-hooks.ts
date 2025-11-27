import { useAuth } from '@clerk/clerk-react';
import {
  CreateBookingDto,
  PaginationQuery,
  UpdateBookingDto,
} from '@movie-hub/shared-types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  checkUserBookingAtShowtime,
  createBooking,
  getUserBookings,
  updateBooking,
} from '../libs/actions/booking/booking-action';
import { getQueryClient } from '../libs/get-query-client';
import { BookingStatus } from '../libs/types/booking.type';
import { useBookingStore } from '../stores/booking-store';

export const useCreateBooking = () => {
  const { setBookingId } = useBookingStore();
  const queryClient = getQueryClient();
  return useMutation({
    mutationKey: ['create-booking'],
    mutationFn: async (data: CreateBookingDto) => {
      return await createBooking(data);
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
      setBookingId(result.data.bookingId);
    },
    onError: (error) => {
      toast.error(
        error?.message || 'Đã có lỗi xảy ra khi tạo đặt vé. Vui lòng thử lại.'
      );
    },
  });
};

export const useGetBookings = (
  status?: BookingStatus,
  pagination?: PaginationQuery
) => {
  return useQuery({
    queryKey: ['user-bookings'],
    queryFn: async () => {
      return await getUserBookings({
        status,
        pagination,
      });
    },
  });
};
export const useCheckUserBookingAtShowtime = (showtimeId: string) => {
  const { setBookingId } = useBookingStore();
  return useQuery({
    queryKey: ['check-user-booking', showtimeId],
    queryFn: async () => {
      const response = await checkUserBookingAtShowtime(showtimeId);
      if (response.data) {
        setBookingId(response.data.bookingId);
      }
      return response;
    },
    enabled: !!showtimeId,
  });
};

export const useUpdateBooking = () => {
  return useMutation({
    mutationKey: ['update-booking'],
    mutationFn: async ({bookingId, data}: {
      bookingId: string;
      data: UpdateBookingDto
    }) => {
      return await updateBooking(bookingId, data);
    },
    onSuccess: () => {
      const queryClient = getQueryClient();
      queryClient.invalidateQueries({ queryKey: ['user-bookings'] });
    },
    onError: (error) => {
      toast.error(
        error?.message ||
          'Đã có lỗi xảy ra khi cập nhật đặt vé. Vui lòng thử lại.'
      );
    },
    
  });
};
