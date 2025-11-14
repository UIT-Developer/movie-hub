
import { FoodSelector } from './food-selector';

export const foodList = [
  {
    id: 'food-001',
    name: 'Bỏng Ngô Classic',
    price: 35000,
    image:
      'https://images.pexels.com/photos/70497/popcorn-snack-food-cinema-70497.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'food-002',
    name: 'Bỏng Ngô Caramel',
    price: 45000,
    image:
      'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'food-003',
    name: 'Coca-Cola',
    price: 25000,
    image:
      'https://images.pexels.com/photos/34598/coca-cola-glass-drink-ice-34598.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'food-004',
    name: 'Pepsi',
    price: 25000,
    image:
      'https://images.pexels.com/photos/278165/pexels-photo-278165.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'food-005',
    name: 'Combo Bỏng Ngô + Nước',
    price: 80000,
    image:
      'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'food-006',
    name: 'Kẹo Dẻo',
    price: 20000,
    image:
      'https://images.pexels.com/photos/62321/candy-sweets-chocolate-sugar-62321.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'food-007',
    name: 'Socola',
    price: 30000,
    image:
      'https://images.pexels.com/photos/302680/pexels-photo-302680.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 'food-008',
    name: 'Snack Mặn',
    price: 25000,
    image:
      'https://images.pexels.com/photos/1199954/pexels-photo-1199954.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];


export default function BookingPage() {
  return (
    <div className="flex flex-col justify-center md:flex-row px-6 md:px-16 lg:px-40  w-full ">
      <FoodSelector foodList={foodList} />
    </div>
  );
}
