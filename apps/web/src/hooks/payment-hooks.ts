import { useAuth } from "@clerk/nextjs";
import { CreatePaymentDto } from "@movie-hub/shared-types";
import { useMutation } from "@tanstack/react-query";
import { createPayment } from "../libs/actions/payment/payment-action";
import { toast } from "sonner";

export const useCreatePayment = () => {
  const {getToken} = useAuth();
  return useMutation({
    mutationKey: ['create-payment'],
    mutationFn: async ({bookingId, data}: {bookingId: string, data: CreatePaymentDto}) => {
      const token = await getToken();
      if (!token) throw new Error('Token is required');
      return await createPayment(token, bookingId, data);
    },
    onError: (error) => {
      toast.error(error?.message || 'Đã có lỗi xảy ra khi tạo thanh toán. Vui lòng thử lại.');
    }
  })
}