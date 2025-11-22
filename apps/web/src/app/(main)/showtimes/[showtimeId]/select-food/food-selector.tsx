'use client';

import { useBookingStore } from 'apps/web/src/stores/booking-store';
import { FoodCard } from './_components/food-card';
import { Button } from '@movie-hub/shacdn-ui/button';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';


import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@movie-hub/shacdn-ui/select';
import { ConcessionCategory } from 'apps/web/src/libs/types/concession.type';
import { useGetConcessions } from 'apps/web/src/hooks/concession-hooks';

export const FoodSelector = () => {
  const {
    cinemaId,
    foodSelections,
    setFoodSelection,
    totalFoodPrice,
    currentShowtimeId,
  } = useBookingStore();
  const router = useRouter();

  // state category
  const [category, setCategory] = useState<ConcessionCategory>(
    ConcessionCategory.FOOD
  );

  // gọi hook lấy concessions
  const { data: foodList = [] } = useGetConcessions({
    cinemaId: cinemaId, 
    category,
    available: true,
  });

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

  const navigateToCheckout = useCallback(() => {
    if (currentShowtimeId) {
      router.push(`/showtimes/${currentShowtimeId}/checkout`);
    }
  }, [router, currentShowtimeId]);

  return (
    <div className="flex flex-col gap-4">
      {/* Select category */}
      <Select onValueChange={(val) => setCategory(val as ConcessionCategory)}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Chọn loại" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value={ConcessionCategory.FOOD}>🍔 Food</SelectItem>
          <SelectItem value={ConcessionCategory.DRINK}>🥤 Drink</SelectItem>
          <SelectItem value={ConcessionCategory.COMBO}>🍿 Combo</SelectItem>
          <SelectItem value={ConcessionCategory.MERCHANDISE}>
            🎁 Merchandise
          </SelectItem>
        </SelectContent>
      </Select>

      {/* Grid food */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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

      {/* Tổng tiền + button */}
      <div className="mt-6 flex justify-between items-center p-4 rounded-md shadow-sm">
        <div className="text-lg font-semibold text-white">
          Tổng tiền đồ ăn: {totalFoodPrice.toLocaleString()}₫
        </div>
        <Button onClick={navigateToCheckout}>Thanh toán</Button>
      </div>
    </div>
  );
};
