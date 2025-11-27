'use client';


import { Badge } from '@movie-hub/shacdn-ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@movie-hub/shacdn-ui/card';
import { BookingDetailDto } from '@movie-hub/shared-types';
import { CalendarDays, Popcorn, User2 } from 'lucide-react';
import { formatPrice } from '../app/utils/format-price';

export function BookingCard({ booking }: { booking: BookingDetailDto }) {
  const formatDate = (d: Date | string) =>
    new Date(d).toLocaleString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  const statusColor = {
    COMPLETED: 'bg-green-500/20 text-green-300',
    PENDING: 'bg-yellow-500/20 text-yellow-300',
    CANCELLED: 'bg-red-500/20 text-red-300',
  };

  return (
    <Card className="bg-rose-500/10 border border-rose-500/20">
      {/* Header */}
      <CardHeader className="pb-4 border-b border-rose-500/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-white">
            {booking.movieTitle}
          </CardTitle>

          {/* <Badge className={statusColor[booking.status]}>
            {booking.status}
          </Badge> */}
        </div>

        <CardDescription className="text-neutral-400 text-sm">
          Mã vé: <span className="text-neutral-300">{booking.bookingCode}</span>
          <br />
          {booking.cinemaName} — {booking.hallName}
        </CardDescription>
      </CardHeader>

      {/* Content */}
      <CardContent className="space-y-6 mt-4">
        {/* Showtime */}
        <div className="flex items-center gap-2 text-neutral-300">
          <CalendarDays className="w-4 h-4 text-rose-500" />
          <span>{formatDate(booking.startTime)}</span>
        </div>

        {/* Customer */}
        <div className="flex items-center gap-2 text-neutral-300">
          <User2 className="w-4 h-4 text-rose-500" />
          <span>{booking.customerName}</span>
          <span className="text-neutral-500">({booking.customerEmail})</span>
        </div>

        {/* Seats */}
        <div>
          <p className="font-semibold text-sm text-white mb-1">Ghế đã chọn:</p>
          <div className="flex gap-2 flex-wrap">
            {booking.seats.map((s) => (
              <span
                key={s.seatId}
                className="bg-rose-500/20 px-2 py-1 rounded text-neutral-300 text-sm"
              >
                {s.row}{s.number}
              </span>
            ))}
          </div>
        </div>

        {/* Concessions */}
        <div>
          <p className="font-semibold text-sm text-white mb-1">Đồ ăn:</p>

          {(!booking.concessions || booking.concessions.length === 0) && (
            <p className="text-neutral-500 italic">Không có</p>
          )}

          {booking.concessions?.map((c) => (
            <div
              key={c.name}
              className="flex justify-between bg-rose-500/20 p-2 rounded text-sm"
            >
              <span className="text-neutral-300">
                <Popcorn className="w-4 h-4 inline mr-1 text-rose-400" />
                {c.name} x{c.quantity}
              </span>
              <span className="text-white font-semibold">
                {formatPrice(c.unitPrice * c.quantity)}
              </span>
            </div>
          ))}
        </div>

        {/* Discount */}
        {booking.promotionCode && booking.discount > 0 && (
          <div>
            <p className="text-sm font-semibold text-white mb-1">
              Mã giảm giá:
            </p>
            <div className="flex justify-between bg-green-500/10 p-2 rounded text-sm">
              <span className="text-green-300">{booking.promotionCode}</span>
              <span className="text-green-300">
                -{formatPrice(booking.discount)}
              </span>
            </div>
          </div>
        )}

        {/* Payment status */}
        <div className="flex justify-between text-sm">
          <p className="text-white font-semibold">Trạng thái thanh toán:</p>
          <span className="text-neutral-300">{booking.paymentStatus}</span>
        </div>
      </CardContent>

      {/* Total */}
      <CardFooter className="pt-4 border-t border-rose-500/20">
        <div className="flex justify-between items-center w-full">
          <span className="font-semibold text-white">Tổng tiền:</span>
          <span className="font-bold text-lg text-neutral-200">
            {formatPrice(booking.finalAmount)}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
