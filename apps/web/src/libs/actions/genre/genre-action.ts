/* eslint-disable no-useless-catch */
import { CreateGenreSchema, GenreResponse } from '@movie-hub/shared-types';

import z from 'zod';
import api from '../../api/api-client';
import { ServiceResult } from '@movie-hub/shared-types/common';

export type CreateGenreRequest = z.infer<typeof CreateGenreSchema>;
export const getGenres = async (): Promise<ServiceResult<GenreResponse[]>> => {
  try {
    const response = await api.get('/genres');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getGenreDetail = async (id: string): Promise<GenreResponse> => {
  try {
    const response = await api.get(`/genres/${id}`, {});
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createGenre = async (
  data: CreateGenreRequest,
  token: string
): Promise<GenreResponse> => {
  try {
    const response = api.post('/genres', data, {
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
    const response = api.put(`/genres/${id}`, genreData, {
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
    await api.delete(`/genres/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error;
  }
};
