'use client';

import { useBookingStore } from 'apps/web/src/stores/booking-store';
import { useCallback, useState } from 'react';
import { FoodCard } from './_components/food-card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { useGetConcessions } from 'apps/web/src/hooks/concession-hooks';
import { ConcessionCategory, ConcessionDto } from 'apps/web/src/libs/types/concession.type';
import { Loader } from 'apps/web/src/components/loader';

export const FoodSelector = ({ cinemaId }: { cinemaId?: string }) => {
  const { foodSelections, setFoodSelection } = useBookingStore();

  const [category, setCategory] = useState<ConcessionCategory>(
    ConcessionCategory.FOOD
  );

  // const { data, isLoading } = useGetConcessions({
  //   category,
  //   available: true,
  // });

  const foodList: ConcessionDto[] = [];

  const handleIncrement = useCallback(
    (id: string) => {
      const current = foodSelections[id] || 0;
      setFoodSelection(id, current + 1);
    },
    [foodSelections, setFoodSelection]
  );

  const handleDecrement = useCallback(
    (id: string) => {
      const current = foodSelections[id] || 0;
      if (current > 0) setFoodSelection(id, current - 1);
    },
    [foodSelections, setFoodSelection]
  );

  // if (isLoading) {
  //   return (
  //     <div className="flex-1 flex items-center justify-center">
  //       <Loader size={40} />
  //     </div>
  //   );
  // }

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-white tracking-tight text-center">
        Chọn đồ ăn
      </h1>

      {/* Select category */}
      <Select
        value={category}
        onValueChange={(val) => setCategory(val as ConcessionCategory)}
      >
        <SelectTrigger className="w-[220px] bg-zinc-900 text-white border-zinc-700">
          <SelectValue placeholder="Chọn loại" />
        </SelectTrigger>

        <SelectContent className="bg-zinc-900 text-white border-zinc-700">
          <SelectItem value={ConcessionCategory.FOOD}>🍔 Đồ ăn</SelectItem>
          <SelectItem value={ConcessionCategory.DRINK}>🥤 Nước uống</SelectItem>
          <SelectItem value={ConcessionCategory.COMBO}>🍿 Combo</SelectItem>
          <SelectItem value={ConcessionCategory.MERCHANDISE}>
            🛍️ Đồ lưu niệm
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Empty state */}
      {foodList.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
          <div className="text-6xl mb-4">🧐</div>
          <p className="text-lg">
            Hiện tại không có món nào.
          </p>
        </div>
      )}

      {/* Food grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {foodList.map((food) => (
          <FoodCard
            key={food.id}
            id={food.id}
            name={food.name}
            price={food.price}
            image={food.imageUrl || '/images/placeholder-bg.png'}
            quantity={foodSelections[food.id] || 0}
            onIncrement={() => handleIncrement(food.id)}
            onDecrement={() => handleDecrement(food.id)}
          />
        ))}
      </div>
    </div>
  );
};
