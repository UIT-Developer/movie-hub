
import { getQueryClient } from 'apps/web/src/libs/get-query-client';
import { FoodSelector } from './food-selector';
import { findAllConcessions } from 'apps/web/src/libs/actions/concession/concesstion-action';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { ConcessionCategory } from '@movie-hub/shared-types';



export default async function SelectFoodPage() {


  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['concessions'],
    queryFn: () => findAllConcessions({
      category: ConcessionCategory.FOOD,
      available: true,
    }),
  });
  

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col justify-center md:flex-row px-6 md:px-16 lg:px-40  w-full ">
        <FoodSelector />
      </div>
    </HydrationBoundary>
  );
}

