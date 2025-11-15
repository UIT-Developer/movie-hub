import { CreateBookingDto } from "@movie-hub/shared-types";
import api from "../../api-client";

export const createBooking = async (token: string, dto: CreateBookingDto) => {
  try {
    const response = await api.post("/bookings", dto, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getUserBookings = async (token: string) => {
  try {
    const response = await api.get("/bookings", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getBookingDetails = async (token: string, bookingId: string) => {
  try {
    const response = await api.get(`/bookings/${bookingId}`, {
      headers: { 
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const cancelBooking = async (token: string, bookingId: string) => {
  try {
    const response = await api.delete(`/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}