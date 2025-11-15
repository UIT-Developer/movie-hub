import { useAuth } from "@clerk/clerk-react";
import { CreateBookingDto } from "@movie-hub/shared-types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { createBooking, getUserBookings } from "../libs/actions/booking/booking-action";

export const useCreateBooking = () => {
  const {getToken} = useAuth();
  return useMutation({
    mutationKey: ['create-booking'],
    mutationFn: async (data: CreateBookingDto) => {
      const token = await getToken();
      if (!token) throw new Error('Token is required');
      return await createBooking(token, data);
    },
    onError: (error) => {
      toast.error(error?.message || 'Đã có lỗi xảy ra khi tạo đặt vé. Vui lòng thử lại.');
    }
  })
}

export const useGetBookings = () => {
  const {getToken} = useAuth();
  return useQuery({
    queryKey: ['user-bookings'],
    queryFn: async () => {
      const token = await getToken();
      if (!token) throw new Error('Token is required');
      return await getUserBookings(token);
    },
  })
}