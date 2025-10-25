/* eslint-disable no-useless-catch */
import {
  GetShowtimesQuerySchema,
  ShowtimeSummaryResponse,
} from '@movie-hub/shared-types';
import z from 'zod';
import { th } from 'zod/v4/locales';
import api from '../../api-client';

export type GetShowtimesQuery = z.infer<typeof GetShowtimesQuerySchema>;
export const getMovieShowtimesAtCinema = async (
  cinemaId: string,
  movieId: string,
  query: GetShowtimesQuery
): Promise<ShowtimeSummaryResponse[]> => {
  try {
    
    const response = await api.get(`/cinemas/${cinemaId}/movies/${movieId}/showtimes`, {
      params: query,
    });
    return response.data as ShowtimeSummaryResponse[];
  } catch (error) {
    throw error;
  }
};
