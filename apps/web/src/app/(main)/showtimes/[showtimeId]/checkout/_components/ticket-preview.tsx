'use client';

import { Button } from '@movie-hub/shacdn-ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@movie-hub/shacdn-ui/card';
import { formatPrice } from 'apps/web/src/app/utils/format-price';
import { useEffect, useState } from 'react';

export default function TicketPreview() {
  // Fake data tạm để test UI
  const movie = {
    title: 'Godzilla x Kong: New Empire',
    date: '18/08/2025',
    time: '20:15',
    cinema: 'Cinestar Quốc Thanh',
  };

  const seats = ['C5', 'C6'];
  const ticketDetails = [
    { type: 'Người lớn', quantity: 2 },
    { type: 'Trẻ em', quantity: 1 },
  ];

  const price = 120000 * seats.length;
  const holdTime = 240; // 4 phút test

  const [timeLeft, setTimeLeft] = useState(holdTime);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <Card className="bg-rose-500/10 border border-rose-500/20">
      {/* Header với poster + thông tin phim */}
      <CardHeader className="flex items-start pb-4 border-rose-500/20 border-b">
        <div className="flex items-center justify-between gap-4">
          <CardTitle className="text-lg text-white">{movie.title}</CardTitle>
          <div
            className={`text-center font-semibold w-[160px] p-2 rounded ${
              timeLeft <= 60
                ? 'bg-red-200 text-red-700 animate-pulse'
                : 'bg-red-100 text-red-700'
            }`}
          >
            Giữ vé còn: {formatTime(timeLeft)}
          </div>
        </div>
        <CardDescription className="text-sm text-neutral-400">
          {movie.date} | {movie.time} <br />
          {movie.cinema}
        </CardDescription>
      </CardHeader>

      {/* Nội dung card: ghế + chi tiết vé */}
      <CardContent className="space-y-4 mt-4">
        <div>
          <p className="font-semibold text-sm text-white">Ghế đã chọn:</p>
          <p className="text-neutral-400">{seats.join(', ')}</p>

          {/* Bảng số vé + loại vé */}
          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
            {ticketDetails.map((ticket) => (
              <div
                key={ticket.type}
                className="flex justify-between bg-rose-500/20 p-2 rounded"
              >
                <span className="text-neutral-400">{ticket.type}</span>
                <span className="font-semibold text-white">
                  {ticket.quantity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>

      {/* Footer: tổng tiền */}
      <CardFooter className="pt-4 border-t border-rose-500/20">
        <div className="flex justify-between items-center w-full">
          <span className="font-semibold text-white">
            Tổng tiền cần thanh toán:
          </span>
          <span className="font-bold text-lg text-neutral-400">
            {formatPrice(price)}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
