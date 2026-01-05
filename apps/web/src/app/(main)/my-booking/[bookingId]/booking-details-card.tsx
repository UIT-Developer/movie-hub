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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@movie-hub/shacdn-ui/alert-dialog';
import { Button } from '@movie-hub/shacdn-ui/button';
import { CalendarDays, Popcorn, User2, Ticket } from 'lucide-react';
import { formatPrice } from '../../../utils/format-price';
import { bookingsApi } from '@/libs/api/services';
import { useGetBookingById } from '@/hooks/booking-hooks';
import { BookingStatus } from '@/libs/types/booking.type';
import { toast } from 'sonner';
import { useState, useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { QRCodeCanvas } from 'qrcode.react';
import { Loader } from '@/components/loader';
import { ErrorFallback } from '@/components/error-fallback';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function BookingCard({ bookingId }: { bookingId: string }) {
  const {
    data: booking,
    isLoading,
    isError,
    error,
  } = useGetBookingById(bookingId);
  const queryClient = useQueryClient();
  const [isRefundLoading, setIsRefundLoading] = useState(false);
  const [refundVoucher, setRefundVoucher] = useState<string | null>(null);

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

  const handleRefund = async () => {
    if (!booking) return;

    // Client-side validation for 24h
    const showtimeDate = new Date(booking.startTime);
    const now = new Date();
    const hoursDiff =
      (showtimeDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursDiff <= 24) {
      toast.error('Chỉ được hoàn vé trước giờ chiếu ít nhất 24 tiếng.');
      return;
    }

    try {
      setIsRefundLoading(true);
      const result = await bookingsApi.refundAsVoucher(
        booking.id,
        'User requested refund'
      );
      setRefundVoucher(result.voucher.code);
      toast.success('Hoàn vé thành công! Voucher của bạn đã được tạo.');
      queryClient.invalidateQueries({ queryKey: ['booking', bookingId] });
    } catch (err: any) {
      toast.error(err?.response?.data?.message || 'Có lỗi xảy ra khi hoàn vé');
    } finally {
      setIsRefundLoading(false);
    }
  };

  if (isLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <Loader size={32} />
      </div>
    );

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

  // Logic to check if refundable
  const isRefundable =
    booking?.status === BookingStatus.CONFIRMED &&
    new Date(booking.startTime).getTime() - new Date().getTime() >
      24 * 60 * 60 * 1000;

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
            {booking?.status === BookingStatus.REFUNDED && (
              <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/50">
                ĐÃ HOÀN VÉ
              </Badge>
            )}
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
          {/* Refund Voucher Display */}
          {(refundVoucher || booking?.status === BookingStatus.REFUNDED) && (
            <div className="bg-orange-500/10 border border-orange-500/30 p-4 rounded-lg space-y-2">
              <div className="flex items-center gap-2 text-orange-300 font-semibold">
                <Ticket className="w-5 h-5" />
                <span>Voucher hoàn tiền</span>
              </div>
              <p className="text-sm text-neutral-300">
                Mã voucher:{' '}
                <span className="text-white font-mono font-bold text-lg">
                  {refundVoucher || 'Kiểm tra email của bạn'}
                </span>
              </p>
              <p className="text-xs text-neutral-400">
                Voucher có giá trị 100% tiền vé và có hạn 1 năm. Chỉ áp dụng cho
                tài khoản của bạn.
              </p>
            </div>
          )}

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

      <div className="flex gap-2">
        <Button onClick={handleDownloadPDF} className="flex-1">
          Tải vé (PDF)
        </Button>

        {isRefundable && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="flex-1 border-rose-500 text-rose-500 hover:bg-rose-500/10 hover:text-rose-400"
              >
                Yêu cầu hoàn vé
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-zinc-900 border-rose-500/20">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">
                  Xác nhận hoàn vé
                </AlertDialogTitle>
                <AlertDialogDescription className="text-neutral-300">
                  Bạn có chắc chắn muốn hoàn vé này không?
                  <br />
                  <br />
                  Chính sách hoàn vé:
                  <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                    <li>Chỉ áp dụng cho vé đặt trước giờ chiếu 24h.</li>
                    <li>
                      Hoàn tiền dưới dạng <strong>Voucher</strong> (Mã khuyến
                      mãi) trị giá 100% tiền vé.
                    </li>
                    <li>
                      Voucher có hạn sử dụng 1 năm và chỉ áp dụng cho tài khoản
                      của bạn.
                    </li>
                    <li>Tiền bắp nước (nếu có) sẽ không được hoàn lại.</li>
                  </ul>
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="bg-transparent border-neutral-700 text-white hover:bg-neutral-800">
                  Hủy
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleRefund}
                  disabled={isRefundLoading}
                  className="bg-rose-600 hover:bg-rose-700 text-white"
                >
                  {isRefundLoading ? 'Đang xử lý...' : 'Đồng ý hoàn vé'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}
