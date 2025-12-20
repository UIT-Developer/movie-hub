/* eslint-disable no-useless-catch */
import { ShowtimeSeatResponse } from "@movie-hub/shared-types";
import api from "../../../api-client";
import { ApiResponse } from "@movie-hub/shared-types/common";



export const getShowtimeSeats = async (
  showtimeId: string,
): Promise<ApiResponse<ShowtimeSeatResponse>> => {
  try {
    const response = await api.get(`/showtimes/${showtimeId}/seats`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getSessionTTL = async (
  showtimeId: string,
) => {
  try {
    const response = await api.get(`/showtimes/showtime/${showtimeId}/ttl`);
    return response.data;
  } catch (error) {
    throw error;
  }
}



