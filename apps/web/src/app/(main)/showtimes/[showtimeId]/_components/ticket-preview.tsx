'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@movie-hub/shacdn-ui/card';
import { formatPrice } from 'apps/web/src/app/utils/format-price';

// ------- FAKE DATA FOR UI PREVIEW -------
const fakeMovie = {
  title: 'Godzilla x Kong: The New Empire',
  date: '18/08/2025',
  time: '20:15',
  cinema: 'Cinestar Quốc Thanh',
};

const fakeSeats = [
  { seatName: 'C5', type: 'Ghế Thường', price: 90000 },
  { seatName: 'C6', type: 'Ghế Thường', price: 90000 },
  { seatName: 'D3', type: 'Ghế VIP', price: 120000 },
];

const fakeConcessions = [
  { name: 'Bắp lớn', quantity: 1, price: 45000 },
  { name: 'Nước ngọt', quantity: 2, price: 30000 },
];

const fakeDiscountCode = 'MOVIE2025';
const fakeDiscountAmount = 30000;

// Tính tổng
const seatsTotal = fakeSeats.reduce((s, x) => s + x.price, 0);
const concessionsTotal = fakeConcessions.reduce(
  (s, x) => s + x.price * x.quantity,
  0
);
const fakeTotal = seatsTotal + concessionsTotal - fakeDiscountAmount;

// ----------------------------------------

type SeatItem = {
  seatName: string;
  type: string;
  price: number;
};

type ConcessionItem = {
  name: string;
  quantity: number;
  price: number;
};

export default function TicketPreview() {
  const movie = fakeMovie;
  const seats = fakeSeats as SeatItem[];
  const concessions = fakeConcessions as ConcessionItem[];
  const discountCode = fakeDiscountCode;
  const discountAmount = fakeDiscountAmount;
  const total = fakeTotal;

  // Gom nhóm ghế theo loại
  const seatByType = seats.reduce((acc: any, seat) => {
    if (!acc[seat.type]) {
      acc[seat.type] = {
        type: seat.type,
        quantity: 0,
        price: seat.price,
      };
    }
    acc[seat.type].quantity += 1;
    return acc;
  }, {});

  const seatTypes = Object.values(seatByType);

  return (
    <Card className="bg-rose-500/10 border border-rose-500/20">
      <CardHeader className="pb-4 border-b border-rose-500/20">
        <CardTitle className="text-lg text-white">{movie.title}</CardTitle>
        <CardDescription className="text-sm text-neutral-400">
          {movie.date} | {movie.time} <br />
          {movie.cinema}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 mt-4">
        {/* Ghế */}
        <div>
          <p className="font-semibold text-sm text-white">Ghế đã chọn:</p>
          <p className="text-neutral-400">
            {seats.map((s) => s.seatName).join(', ')}
          </p>
        </div>

        {/* Loại ghế */}
        <div>
          <p className="font-semibold text-sm text-white mb-2">Loại vé:</p>
          <div className="space-y-2">
            {seatTypes.map((t: any) => (
              <div
                key={t.type}
                className="flex justify-between bg-rose-500/20 p-2 rounded text-sm"
              >
                <span className="text-neutral-300">
                  {t.type} x{t.quantity}
                </span>
                <span className="text-white font-semibold">
                  {formatPrice(t.price * t.quantity)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Concession */}
        <div>
          <p className="font-semibold text-sm text-white mb-2">
            Đồ ăn đã chọn:
          </p>

          {concessions.length === 0 ? (
            <p className="text-neutral-500 italic">Không có món nào.</p>
          ) : (
            <div className="space-y-2">
              {concessions.map((c) => (
                <div
                  key={c.name}
                  className="flex justify-between bg-rose-500/20 p-2 rounded text-sm"
                >
                  <span className="text-neutral-300">
                    {c.name} x{c.quantity}
                  </span>
                  <span className="text-white font-semibold">
                    {formatPrice(c.price * c.quantity)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Discount */}
        {discountCode && (
          <div>
            <p className="font-semibold text-sm text-white mb-2">
              Mã giảm giá:
            </p>
            <div className="flex justify-between bg-green-500/10 p-2 rounded text-sm">
              <span className="text-green-300">{discountCode}</span>
              <span className="text-green-300">
                -{formatPrice(discountAmount)}
              </span>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-4 border-t border-rose-500/20">
        <div className="flex justify-between items-center w-full">
          <span className="font-semibold text-white">Tổng cộng:</span>
          <span className="font-bold text-lg text-neutral-300">
            {formatPrice(total)}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
