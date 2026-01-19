import { ConcessionCategory, ServiceResult } from "@movie-hub/shared-types";
import api from "../../api/api-client";
import { ConcessionDto } from "../../types/concession.type";

export const findAllConcessions = async ( query : {
  cinemaId?: string,
  category?: ConcessionCategory,
  available?: boolean
}): Promise<ServiceResult<ConcessionDto[]>> => {
  try {
    const response = await api.get('/concessions', {
      params: {
        cinemaId: query.cinemaId,
        category: query.category,
        available: query.available,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}


