import { ConcessionCategory, ConcessionDto } from "@movie-hub/shared-types";
import api from "../../api-client";

export const findAllConcessions = async ( query : {
  cinemaId?: string,
  category?: ConcessionCategory,
  available?: boolean
}): Promise<ConcessionDto[]> => {
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


