import { Button } from '@movie-hub/shacdn-ui/button';
import { BookingSummaryDto } from 'apps/web/src/libs/types/booking.type';
import { format } from 'date-fns';
import Link from 'next/link';

interface BookingCardProps {
  booking: BookingSummaryDto;
}

export default function BookingCard({ booking }: BookingCardProps) {
  return (
    <div className="bg-rose-700/20 text-white shadow-md rounded-lg p-6 flex flex-col md:flex-row justify-between gap-4 w-full lg:max-w-xl">
      <div className="flex-1 min-w-0">
        <h2 className="text-rose-400 text-xl font-bold line-clamp-2 break-words">
          {booking.movieTitle} 
        </h2>
        <p className="text-neutral-300">
          {booking.cinemaName} - {booking.hallName}
        </p>
        <p className="text-gray-500 dark:text-gray-300">
          {format(new Date(booking.startTime), 'dd/MM/yyyy HH:mm')} | Ghế:{' '}
          {booking.seatCount}
        </p>
      </div>

      <div className="flex flex-col items-end justify-between gap-2">
        <p className="text-neutral-300 font-medium">
          Mã đặt: {booking.bookingCode}
        </p>
        <p className="font-bold text-lg">
          {booking.totalAmount.toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
          })}
        </p>
        {/* <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            booking.status === 'CONFIRMED'
              ? 'bg-green-100 text-green-800'
              : booking.status === 'PENDING'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {booking.status}
        </span> */}

        <Link href={`/my-booking/${booking.id}`}>
          <Button className="mt-2">Chi tiết</Button>
        </Link>
      </div>
    </div>
  );
}
