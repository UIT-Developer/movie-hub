'use client';
import { useBookingStore } from 'apps/web/src/stores/booking-store';
import { FoodCard } from './_components/food-card';
import { Button } from '@movie-hub/shacdn-ui/button';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface FoodItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface FoodSelectorProps {
  foodList: FoodItem[];
}

export const FoodSelector = ({ foodList }: FoodSelectorProps) => {
  const {
    foodSelections,
    setFoodSelection,
    totalFoodPrice,
    currentShowtimeId,
  } = useBookingStore();
  const router = useRouter();

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
    <div className="flex flex-col">
      {/* Grid food */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {foodList.map((food) => (
          <FoodCard
            key={food.id}
            id={food.id}
            name={food.name}
            price={food.price}
            image={food.image}
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
