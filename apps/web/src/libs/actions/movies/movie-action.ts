import {
  CreateMovieSchema,
  MovieDetailResponse,
  MovieSummary,
  UpdateMovieSchema,
} from '@movie-hub/shared-types';

import z from 'zod';
import api from '../../api-client';

export type CreateMovieRequest = z.infer<typeof CreateMovieSchema>;
export type UpdateMovieRequest = z.infer<typeof UpdateMovieSchema>;


export const getMovies = async (token: string): Promise<MovieSummary[]> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.get('/movies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as MovieSummary[];
  } catch (error) {
    // Re-throw the error so callers can handle it (or handle/log here as needed)
    throw error;  
  }
};


export const getMovieDetail = async (
  movieId: string,
  token: string
): Promise<MovieDetailResponse> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.get(`/movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as MovieDetailResponse;
  } catch (error) {
    // Re-throw the error so callers can handle it (or handle/log here as needed)
    throw error;  
  }
}

export const createMovie = async (
  movieData: CreateMovieRequest,
  token: string
): Promise<MovieSummary> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.post('/movies', movieData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as MovieSummary;
  } catch (error) {
    // Re-throw the error so callers can handle it (or handle/log here as needed)
    throw error;  
  }
};

export const updateMovie = async (
  movieId: string,
  movieData: UpdateMovieRequest,
  token: string
): Promise<MovieSummary> => {
  // eslint-disable-next-line no-useless-catch
  try {
    const response = await api.put(`/movies/${movieId}`, movieData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data as MovieSummary;
  } catch (error) {
    // Re-throw the error so callers can handle it (or handle/log here as needed)
    throw error;  
  }
}

export const deleteMovie = async (
  movieId: string,
  token: string
): Promise<void> => {
  // eslint-disable-next-line no-useless-catch
  try {
    await api.delete(`/movies/${movieId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    // Re-throw the error so callers can handle it (or handle/log here as needed)
    throw error;  
  }
};