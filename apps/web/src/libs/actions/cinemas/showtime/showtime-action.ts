/* eslint-disable no-useless-catch */
import { ShowtimeSeatResponse } from "@movie-hub/shared-types";
import api from "../../../api-client";



export const getShowtimeSeats = async (
  showtimeId: string,
): Promise<ShowtimeSeatResponse> => {
  try {
    const response = await api.get(`/showtimes/${showtimeId}/seats`);
    return response.data;
  } catch (error) {
    throw error;
  }
}



