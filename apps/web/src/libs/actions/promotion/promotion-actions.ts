import { ServiceResult } from '@movie-hub/shared-types';
import {
  PromotionDto,
  PromotionType,
  ValidatePromotionDto,
  ValidatePromotionResponseDto,
} from '../../types/promotion.type';
import api from '../../api/api-client';

export const findAllPromotions = async (
  active?: string,
  type?: PromotionType
): Promise<ServiceResult<PromotionDto[]>> => {
  try {
    const response = await api.get('/promotions', {
      params: { active, type },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validatePromotion = async (
  code: string,
  validateDto: ValidatePromotionDto
): Promise<ServiceResult<ValidatePromotionResponseDto>> => {
  try {
    const response = await api.post(`/promotions/validate/${code}`, validateDto);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const findPromotionByCode = async (
  code: string
): Promise<ServiceResult<PromotionDto>> => {
  try {
    const response = await api.get(`/promotions/${code}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const findPromotionById = async (
  id: string
): Promise<ServiceResult<PromotionDto>> => {
  try {
    const response = await api.get(`/promotions/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
