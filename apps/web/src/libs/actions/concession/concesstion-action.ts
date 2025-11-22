import api from "../../api-client";

export const findAllConcessions = async () => {
  try {
    const response = await api.get('/concessions');
    return response.data;
  } catch (error) {
    throw error;
  }
}

