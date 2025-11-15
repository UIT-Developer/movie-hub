/* eslint-disable no-useless-catch */
import {
  GetShowtimesQuerySchema,
  ShowtimeSummaryResponse,
} from '@movie-hub/shared-types';
import z from 'zod';
import api from '../../api-client';
import { CinemaListResponse, CinemaLocationResponse } from '../../types/cinema.type';

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


export const GetCinemasNearby= async (
  lat: number,
  lon: number,
  radius?: number,
  limit?: number,
): Promise<CinemaListResponse> => {
  try {
    const response = await api.get('/cinemas/nearby', {
      params: {
        lat,
        lon,
        radius,
        limit,
      },
    });
    return response.data as CinemaListResponse;
  } catch (error) {
    throw error;
  }
}


export const searchCinemas= async (
  query: string,
  lon?: string,
  lat?: string,
): Promise<CinemaLocationResponse> => {
  try {

    const response = await api.get('/cinemas/search', {
      params: {
        query,
        lon,
        lat,
      },
    });
    return response.data as CinemaLocationResponse;
  }
    catch (error) {
    throw error;
  }
}

export const getCinemasWithFilters= async (
  params: {
    lat?: string;
    lon?: string;
    radius?: string;
    city?: string;
    district?: string;
    amenities?: string;
    hallTypes?: string;
    minRating?: string;
    page?: number;
    limit?: number;
    sortBy?: 'distance' | 'rating' | 'name';
    sortOrder?: 'asc' | 'desc';
  }
): Promise<CinemaListResponse> => {
  try {

    const response = await api.get('/cinemas/filters', {
      params,
    });
    return response.data as CinemaListResponse;
  }
    catch (error) {
    throw error;
  }
}

export const getCinemaDetail= async (
  cinemaId: string,
  userLatitude?: number,
  userLongitude?: number,
): Promise<CinemaLocationResponse> => {
  try {
    const response = await api.get(`/cinemas/${cinemaId}`, {
      params: {
        userLatitude,
        userLongitude,
      },
    });
    return response.data as CinemaLocationResponse;
  }
    catch (error) {
    throw error;
  }
}

