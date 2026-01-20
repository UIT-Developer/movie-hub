/* eslint-disable no-useless-catch */
import {
  CinemaDetailResponse,
  GetShowtimesQuerySchema,
  ShowtimesFilterSchema,
  ShowtimeSummaryResponse,
} from '@movie-hub/shared-types';
import { PaginationQuery, ServiceResult } from '@movie-hub/shared-types/common';
import z from 'zod';
import api from '../../api-client';
import {
  CinemaListResponse,
  CinemaLocationResponse,
} from '../../types/cinema.type';
import {
  MovieWithCinemaAndShowtimeResponse,
  MovieWithShowtimeResponse,
} from '../../types/movie.type';

export type GetShowtimesQuery = z.infer<typeof GetShowtimesQuerySchema>;
export const getMovieShowtimesAtCinema = async (
  cinemaId: string,
  movieId: string,
  query: GetShowtimesQuery
): Promise<ServiceResult<ShowtimeSummaryResponse[]>> => {
  try {
    const response = await api.get(
      `/cinemas/${cinemaId}/movies/${movieId}/showtimes`,
      {
        params: query,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMovieAtCinemas = async (
  cinemaId: string,
  query: PaginationQuery
): Promise<ServiceResult<MovieWithShowtimeResponse[]>> => {
  try {
    const response = await api.get(`/cinemas/cinema/${cinemaId}/movies`, {
      params: query,
    });
    return response.data as ServiceResult<MovieWithShowtimeResponse[]>;
  } catch (error) {
    throw error;
  }
};
export type ShowtimesFilterDTO = z.infer<typeof ShowtimesFilterSchema>;
export const getAllMoviesWithShowtimes = async (
  query: ShowtimesFilterDTO
): Promise<ServiceResult<MovieWithCinemaAndShowtimeResponse[]>> => {
  try {
    const response = await api.get('/cinemas/movies/showtimes', {
      params: query,
    });
    return response.data as ServiceResult<MovieWithCinemaAndShowtimeResponse[]>;
  } catch (error) {
    throw error;
  }
};

export const GetCinemasNearby = async (
  lat: number,
  lon: number,
  radius?: number,
  limit?: number
): Promise<ServiceResult<CinemaListResponse>> => {
  try {
    const response = await api.get('/cinemas/nearby', {
      params: {
        lat,
        lon,
        radius,
        limit,
      },
    });
    return response.data as ServiceResult<CinemaListResponse>;
  } catch (error) {
    throw error;
  }
};

export const searchCinemas = async (
  query: string,
  lon?: string,
  lat?: string
): Promise<ServiceResult<CinemaLocationResponse[]>> => {
  try {
    const response = await api.get('/cinemas/search', {
      params: {
        query,
        lon,
        lat,
      },
    });
    return response.data as ServiceResult<CinemaLocationResponse[]>;
  } catch (error) {
    throw error;
  }
};

export const getCinemasWithFilters = async (params: {
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
  sortBy?: string;
  sortOrder?: string;
}): Promise<ServiceResult<CinemaListResponse>> => {
  try {
    const response = await api.get('/cinemas/filters', {
      params,
    });
    return response.data as ServiceResult<CinemaListResponse>;
  } catch (error) {
    throw error;
  }
};

export const getCinemaDetail = async (
  cinemaId: string,
  userLatitude?: number,
  userLongitude?: number
): Promise<ServiceResult<CinemaLocationResponse>> => {
  try {
    const response = await api.get(`/cinemas/${cinemaId}`, {
      params: {
        userLatitude,
        userLongitude,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAvailableCities = async (): Promise<
  ServiceResult<string[]>
> => {
  try {
    const response = await api.get('/cinemas/locations/cities');
    return response.data as ServiceResult<string[]>;
  } catch (error) {
    throw error;
  }
};

export const getAllCinemas = async (): Promise<
  ServiceResult<CinemaDetailResponse[]>
> => {
  try {
    const response = await api.get('/cinemas');
    return response.data as ServiceResult<CinemaDetailResponse[]>;
  } catch (error) {
    throw error;
  }
};
