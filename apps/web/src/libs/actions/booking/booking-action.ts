import { CreateBookingDto } from "@movie-hub/shared-types";
import api from "../../api-client";

export const createBooking = async (dto: CreateBookingDto) => {
  try {
    const response = await api.post("/bookings", dto);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getUserBookings = async () => {
  try {
    const response = await api.get("/bookings");
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getBookingDetails = async (bookingId: string) => {
  try {
    const response = await api.get(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const cancelBooking = async (bookingId: string) => {
  try {
    const response = await api.delete(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}