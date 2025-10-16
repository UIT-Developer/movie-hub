/* eslint-disable no-useless-catch */
import { CreateGenreSchema, GenreResponse } from '@movie-hub/shared-types';
import axios from 'axios';
import z from 'zod';

export type CreateGenreRequest = z.infer<typeof CreateGenreSchema>;
export const getGenres = async (token: string): Promise<GenreResponse[]> => {
  try {
    const response = axios.get('/genres', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return (await response).data as GenreResponse[];
  } catch (error) {
    throw error;
  }
};

export const getGenreDetail = async (
  id: string,
  token: string
): Promise<GenreResponse> => {
  try {
    const response = axios.get(`/genres/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return (await response).data as GenreResponse;
  } catch (error) {
    throw error;
  }
};

export const createGenre = async (
  data: CreateGenreRequest,
  token: string
): Promise<GenreResponse> => {
  try {
    const response = axios.post('/genres', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return (await response).data as GenreResponse;
  } catch (error) {
    throw error;
  }
};

export const updateGenre = async (
  id: string,
  genreData: CreateGenreRequest,
  token: string
): Promise<GenreResponse> => {
  try {
    const response = axios.put(`/genres/${id}`, genreData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return (await response).data as GenreResponse;
  } catch (error) {
    throw error;
  }
};
export const deleteGenre = async (id: string, token: string): Promise<void> => {
  try {
    await axios.delete(`/genres/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};
