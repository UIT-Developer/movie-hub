import { Button } from '@movie-hub/shacdn-ui/button';
import Image from 'next/image';

interface FoodCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  inventory: number;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
}

export const FoodCard = ({
  id,
  name,
  price,
  image,
  quantity,
  inventory,
  onIncrement,
  onDecrement,
}: FoodCardProps) => {
  return (
    <div className="bg-gray-900 text-white rounded-lg overflow-hidden  flex flex-col justify-center p-2">
      <div className="relative w-full h-40">
        <Image
          src={image}
          alt={name}
          fill
        
          className="object-cover rounded-lg"
        />
      </div>

      <div className="p-3 flex flex-col gap-2 justify-center items-center">
        <div className="font-semibold text-lg w-full text-center truncate">
          {name}
        </div>
        <div className="text-gray-400">{price.toLocaleString()}₫</div>

        <div className="mt-2 flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Button
              size="sm"
              onClick={() => onDecrement(id)}
              disabled={quantity === 0}
            >
              -
            </Button>
            <span>{quantity}</span>
            <Button
              disabled={quantity >= inventory}
              size="sm"
              onClick={() => onIncrement(id)}
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
