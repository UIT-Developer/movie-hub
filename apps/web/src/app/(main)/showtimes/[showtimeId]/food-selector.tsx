'use client';

import { useBookingStore } from '@/stores/booking-store';
import { useCallback, useState } from 'react';
import { FoodCard } from './_components/food-card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { useGetConcessions } from '@/hooks/concession-hooks';
import { ConcessionCategory } from '@movie-hub/shared-types/booking/enum';
import { ConcessionDto } from '@movie-hub/shared-types/booking';
import { Loader } from '@/components/loader';
import { toast } from 'sonner';

export const FoodSelector = ({ cinemaId }: { cinemaId?: string }) => {
  const { concessionSelections, setConcessionSelection } = useBookingStore();

  const [category, setCategory] = useState<ConcessionCategory | undefined>(
    ConcessionCategory.FOOD
  );

  const { data, isLoading } = useGetConcessions({
    category,
    available: true,
  });

  const foodList = data || [];

  const handleIncrement = useCallback(
    (foodId: string) => {
      const food = foodList.find(f => f.id === foodId);
      if (!food) return;
      
      const current = concessionSelections[foodId] || 0;
      if (current >= (food.inventory ?? 0)) {
        toast.error('Đã đat đến số lượng tối đa có thể mua cho món này.');
        return;
      }

      setConcessionSelection(foodId, current + 1, {
        name: food.name,
        price: food.price,
      });
    },
    [concessionSelections, setConcessionSelection, foodList]
  );

  const handleDecrement = useCallback(
    (foodId: string) => {
      const current = concessionSelections[foodId] || 0;

      if (current > 0) {
        const food = foodList.find(f => f.id === foodId);
        setConcessionSelection(foodId, current - 1, {
          name: food?.name || '',
          price: food?.price || 0,
        });
      }
    },
    [concessionSelections, setConcessionSelection, foodList]
  );

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
          <SelectItem value={ConcessionCategory.FOOD.toString()}>🍔 Đồ ăn</SelectItem>
          <SelectItem value={ConcessionCategory.BEVERAGE.toString()}>🥤 Nước uống</SelectItem>
          <SelectItem value={ConcessionCategory.SNACK.toString()}>🍿 Snack</SelectItem>
          <SelectItem value={ConcessionCategory.COMBO.toString()}>
            🛍️ Combo
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Loading */}
      {isLoading && (
        <div className="col-span-full flex justify-center items-center py-10">
          <Loader size={40} />
        </div>
      )}

      {/* Empty state */}
      {!isLoading && foodList.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-400">
          <div className="text-6xl mb-4">🧐</div>
          <p className="text-lg">Hiện tại không có món nào.</p>
        </div>
      )}

      {/* Food grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
        {!isLoading &&
          foodList.length > 0 &&
          foodList.map((food) => (
            <FoodCard
              key={food.id}
              id={food.id}
              name={food.name}
              price={food.price}
              image={food.imageUrl || '/images/placeholder-bg.png'}
              inventory={food.inventory}
              quantity={concessionSelections[food.id] || 0}
              onIncrement={() => handleIncrement(food.id)}
              onDecrement={() => handleDecrement(food.id)}
            />
          ))}
      </div>
    </div>
  );
};
