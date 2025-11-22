import { useQuery } from "@tanstack/react-query";
import { findAllConcessions } from "../libs/actions/concession/concesstion-action";
import { ConcessionCategory } from "@movie-hub/shared-types";

export const useGetConcessions = (query: {
  cinemaId?: string,
  category?: ConcessionCategory,
  available?: boolean
})  => {
  return useQuery({
    queryKey: ['concessions'],
    queryFn: async () => {
      return await findAllConcessions(
        query
      );
    },
  });
}