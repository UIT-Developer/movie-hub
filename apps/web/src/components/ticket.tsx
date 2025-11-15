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

interface TicketProps {
  movie: { title: string; date: string; time: string; cinema: string };
  seat: string;
  type: string;
  price: number;
}

export default function Ticket({ movie, seat, type, price }: TicketProps) {
  const randomQR = () => Math.random().toString(36).substring(2, 10); // random QR string

  return (
    <Card className="bg-rose-500/10 border border-rose-500/20">
      {/* Header với poster + thông tin phim */}
      <CardHeader className="flex items-start pb-4 border-rose-500/20 border-b">
        <CardTitle className="text-lg text-white">{movie.title}</CardTitle>

        <CardDescription className="text-sm text-neutral-400">
          {movie.date} | {movie.time} <br />
          {movie.cinema}
        </CardDescription>
      </CardHeader>

      {/* Nội dung card: ghế + chi tiết vé */}
      <CardContent className="space-y-4 mt-4">
        <div>
          <p className="font-semibold text-sm text-white">Ghế đã chọn:</p>
          {/* <p className="text-neutral-400">{seats.join(', ')}</p> */}

          {/* Bảng số vé + loại vé */}
          <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
            {/* {ticketDetails.map((ticket) => (
              <div
                key={ticket.type}
                className="flex justify-between bg-rose-500/20 p-2 rounded"
              >
                <span className="text-neutral-400">{ticket.type}</span>
                <span className="font-semibold text-white">
                  {ticket.quantity}
                </span>
              </div>
            ))} */}
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
