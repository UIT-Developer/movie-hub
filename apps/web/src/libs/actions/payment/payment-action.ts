import { CreatePaymentDto } from "@movie-hub/shared-types";
import api from "../../api-client";

export const createPayment = async (token: string, bookingId: string, dto: CreatePaymentDto) => {
  try {
    const response = await api.post(`/payments/bookings/${bookingId}`, dto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getPaymentDetails = async (token: string, paymentId: string) => {
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