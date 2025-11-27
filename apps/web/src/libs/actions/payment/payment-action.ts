import { CreatePaymentDto, ServiceResult } from "@movie-hub/shared-types";
import api from "../../api-client";
import { PaymentDetailDto } from "../../types/payment.type";

export const createPayment = async (
  bookingId: string,
  createPaymentDto: CreatePaymentDto
) => {
  try {
    const response = await api.post(
      `/payments/bookings/${bookingId}`,
      createPaymentDto
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const getPaymentByBooking = async (token: string, bookingId: string): Promise<ServiceResult<PaymentDetailDto[]>> => {
  try {
    const response = await api.get(`/payments/bookings/${bookingId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getPaymentDetails = async (token: string, paymentId: string) : Promise<ServiceResult<PaymentDetailDto>> => {
  try {
    const response = await api.get(`/payments/${paymentId}`, {
      headers: {  
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}