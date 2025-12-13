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

import { CalendarDays, Popcorn, User2 } from 'lucide-react';
import { formatPrice } from '../../../utils/format-price';
import {
  BookingDetailDto,
  BookingStatus,
} from '@/libs/types/booking.type';
import { useGetBookingById } from '@/hooks/booking-hooks';
import { ErrorFallback } from '@/components/error-fallback';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useRef } from 'react';
import { Button } from '@movie-hub/shacdn-ui/button';
import { QRCodeCanvas } from 'qrcode.react';
import { Loader } from '@/components/loader';

export function BookingCard({ bookingId }: { bookingId: string }) {
  const {
    data: booking,
    isLoading,
    isError,
    error,
  } = useGetBookingById(bookingId);

  // const statusColor = {
  //   COMPLETED: 'bg-green-500/20 text-green-300',
  //   PENDING: 'bg-yellow-500/20 text-yellow-300',
  //   CANCELLED: 'bg-red-500/20 text-red-300',
  // };

  const cardRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!cardRef.current) return;
    const canvas = await html2canvas(cardRef.current);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save(`booking-${booking?.bookingCode}.pdf`);
  };

  if (isLoading) return (
     <div className="flex h-full items-center justify-center">
    <Loader size={32} />
  </div>
  )

  if (isError) return <ErrorFallback message={error.message} />;

  const seatGroups = Object.values(
    booking?.seats.reduce((acc: any, seat) => {
      if (!acc[seat.ticketType]) {
        acc[seat.ticketType] = {
          type: seat.ticketType,
          quantity: 0,
          price: seat.price,
        };
      }
      acc[seat.ticketType].quantity += 1;
      return acc;
    }, {})
  );

  return (
    <div className="space-y-4 w-full">
      <Card
        ref={cardRef}
        className="bg-rose-500/10 border border-rose-500/20 w-full "
      >
        {/* Header */}
        <CardHeader className="pb-4 border-b border-rose-500/20">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl text-rose-400 font-bold">
              {booking?.movieTitle}
            </CardTitle>

            {/* <Badge className={statusColor[booking.status]}>
            {booking.status}
          </Badge> */}
          </div>

          <CardDescription className="text-neutral-400 text-sm">
            Mã vé:{' '}
            <span className="text-neutral-300">{booking?.bookingCode}</span>
            <br />
            {booking?.cinemaName} — {booking?.hallName}
          </CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-6 mt-4">
          {/* Showtime */}
          <div className="flex items-center gap-2 text-neutral-300">
            <CalendarDays className="w-4 h-4 text-rose-500" />
            <span>
              {booking?.startTime
                ? new Date(booking?.startTime).toLocaleString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : '—'}{' '}
            </span>
          </div>

          {/* Seats */}
          <div>
            <p className="font-semibold text-sm text-white mb-1">
              Ghế đã chọn:
            </p>
            <div className="flex gap-2 flex-wrap">
              {booking?.seats.map((s: any) => (
                <span
                  key={s.seatId}
                  className="bg-rose-500/20 px-2 py-1 rounded text-neutral-300 text-sm"
                >
                  {s.row}
                  {s.number}
                </span>
              ))}
            </div>
          </div>

          {seatGroups.length > 0 && (
            <div>
              <p className="font-semibold text-sm text-white mb-2">Loại vé:</p>
              <div className="space-y-2">
                {seatGroups.map((seat: any) => (
                  <div
                    key={seat.type}
                    className="flex justify-between bg-rose-500/20 p-2 rounded text-sm gap-2"
                  >
                    <span className="text-neutral-300">
                      {seat.type} x{seat.quantity}
                    </span>
                    <span className="text-white font-semibold">
                      {formatPrice(seat.price * seat.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Concessions */}
          <div>
            <p className="font-semibold text-sm text-white mb-1">Đồ ăn:</p>

            {(!booking?.concessions || booking.concessions.length === 0) && (
              <p className="text-neutral-500 italic">Không có</p>
            )}

            {booking?.concessions?.map((c: any) => (
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
          <div>
            <p className="font-semibold text-sm text-white mb-1">Giảm giá:</p>
            {booking?.discount === 0 && (
              <p className="text-neutral-500 italic">Không có</p>
            )}
            {booking?.discount && booking.discount > 0 && (
              <div className="flex justify-between bg-green-500/10 p-2 rounded text-sm">
                <span className="text-green-300">{booking.promotionCode}</span>
                <span className="text-green-300">
                  -{formatPrice(booking.discount)}
                </span>
              </div>
            )}
          </div>

          {/* Payment status */}
          {/* <div className="flex justify-between text-sm">
          <p className="text-white font-semibold">Trạng thái thanh toán:</p>
          <span className="text-neutral-300">{booking?.paymentStatus}</span>
        </div> */}
          {booking?.status === BookingStatus.CONFIRMED && (
            <div className="flex justify-center mt-4">
              <QRCodeCanvas
                value={booking?.bookingCode || '—'}
                size={128}
                fgColor="#F43F5E"
              />
            </div>
          )}
        </CardContent>

        {/* Total */}
        <CardFooter className="pt-4 border-t border-rose-500/20">
          <div className="flex justify-between items-center w-full">
            <span className="font-semibold text-white">Tổng tiền:</span>
            <span className="font-bold text-lg text-neutral-200">
              {formatPrice(booking?.finalAmount || 0)}
            </span>
          </div>
        </CardFooter>
      </Card>
      <Button onClick={handleDownloadPDF} className="mt-4 w-full">
        Tải vé (PDF)
      </Button>
    </div>
  );
}
