import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { findAllPromotions } from "apps/web/src/libs/actions/promotion/promotion-actions";
import { getQueryClient } from "apps/web/src/libs/get-query-client";
import { PromotionType } from "apps/web/src/libs/types/promotion.type";
import { a } from "node_modules/framer-motion/dist/types.d-BJcRxCew";
import { PromotionList } from "./promotion-list";

export default async function PromotionsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['promotions'],
    queryFn: async () => {
      const response = await findAllPromotions(PromotionType.FIXED_AMOUNT);
      return response.data;
    },
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="w-full p-4">
        <PromotionList />
      </div>
    </HydrationBoundary>
  )
}