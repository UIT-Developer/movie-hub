'use client';

import { Button } from '@movie-hub/shacdn-ui/button';
import { Input } from '@movie-hub/shacdn-ui/input';
import { cn } from '@movie-hub/shacdn-utils';
import { useCreateBooking } from 'apps/web/src/hooks/booking-hooks';
import { useCreatePayment } from 'apps/web/src/hooks/payment-hooks';
import {
  PaymentMethod,
  paymentMethods,
  PaymentMethodUI,
} from 'apps/web/src/libs/types/payment-method';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

const heldSeats = [
  { seatId: 'A1', label: 'A1', price: 90000 },
  { seatId: 'A2', label: 'A2', price: 90000 },
];

const concessions = [
  { concessionId: 'popcorn-l', name: 'Popcorn L', price: 60000 },
];

const subtotal =
  heldSeats.reduce((s, t) => s + t.price, 0) +
  concessions.reduce((s, c) => s + c.price, 0);

export const PaymentSection = () => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  );

  const handleSelect = (payment: PaymentMethodUI) => {
    if (!payment.supported) {
      toast.error('Phương thức thanh toán này hiện chưa được hỗ trợ.');
      return;
    }
    setSelectedMethod(payment.method);
  };

  const createBooking = useCreateBooking();
  const createPayment = useCreatePayment();
  const handlePay = async () => {
    if (!selectedMethod) {
      toast.error('Vui lòng chọn phương thức thanh toán.');
      return;
    }

    try {
   

      const booking = await createBooking.mutateAsync({
        showtimeId: 'showtime-123',
        seats: [
          {
            seatId: 'A1',
            ticketType: 'ADULT',
          }
        ],
        concessions: [
          {
            concessionId: 'popcorn-l',
            quantity: 1,
          },
        ]
      });

      const bookingId = booking.id;

      const payment = await createPayment.mutateAsync({
        bookingId,
        data: {
          paymentMethod: selectedMethod as PaymentMethod,
          amount: subtotal,
          returnUrl: `${window.location.origin}/checkout?success=true&bookingId=${bookingId}`,
          cancelUrl: `${window.location.origin}/checkout?success=false&bookingId=${bookingId}`,
        },
      });

      window.location.href = payment.paymentUrl;
    } catch (err) {
      console.error(err);
      toast.error('Không thể tạo thanh toán. Vui lòng thử lại.');
    }
  };
  const [voucher, setVoucher] = useState('');

  return (
    <div className="space-y-4 max-w-2xl">
      {/* Phương thức thanh toán */}

      <div className="space-y-4">
        {paymentMethods.map((payment) => (
          <div
            key={payment.method}
            onClick={() => handleSelect(payment)}
            className={cn(
              'flex items-center p-3 border rounded-lg border-rose-500/20 cursor-pointer bg-rose-500/10 text-neutral-400 ',
              selectedMethod === payment.method && 'bg-rose-500 text-white',
              selectedMethod !== payment.method && 'hover:bg-rose-500/20'
            )}
          >
            {/* Icon giả lập */}
            <div className="rounded mr-3 flex items-center justify-center text-sm font-bold">
              <Image
                src={payment.logo}
                alt={payment.method}
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
            <span className="font-medium">{payment.method}</span>
          </div>
        ))}
      </div>

      {/* Nhập voucher */}
      <div className="space-y-2">
        <p className="font-semibold text-lg">Mã giảm giá</p>
        <Input
          placeholder="Nhập mã voucher"
          value={voucher}
          onChange={(e) => setVoucher(e.target.value)}
        />
      </div>

      {/* Nút thanh toán */}
      <Button onClick={handlePay} disabled={!selectedMethod} className="w-full">
        Thanh toán
      </Button>
    </div>
  );
};
