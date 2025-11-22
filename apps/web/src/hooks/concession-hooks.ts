import { useQuery } from "@tanstack/react-query";
import { findAllConcessions } from "../libs/actions/concession/concesstion-action";

export const useGetConcessions = () => {
  return useQuery({
    queryKey: ['concessions'],
    queryFn: async () => {
      return await findAllConcessions();
    },
  });
}