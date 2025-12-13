'use client';

import { Button } from '@movie-hub/shacdn-ui/button';
import { Input } from '@movie-hub/shacdn-ui/input';
import { cn } from '@movie-hub/shacdn-utils';
import { ConsoleLogger } from '@nestjs/common';
import Loading from '@/components/loading';
import {
  useCreateBooking,
  useUpdateBooking,
} from '@/hooks/booking-hooks';
import { useCreatePayment } from '@/hooks/payment-hooks';
import { useValidationPromotion } from '@/hooks/promotion-hook';
import { updateBooking } from '@/libs/actions/booking/booking-action';
import {
  PaymentMethod,
  paymentMethods,
  PaymentMethodUI,
} from '@/libs/types/payment.type';
import { useBookingStore } from '@/stores/booking-store';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';

export const PaymentSection = () => {
  const { getTotalFinal, buildBookingPayload, bookingId } = useBookingStore();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(
    null
  );
  const [voucher, setVoucher] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { mutateAsync, isPending } = useValidationPromotion();

  const handleValidatePromotion = async (code: string) => {
      await mutateAsync({
        code,
        validateDto: {
          bookingAmount: getTotalFinal(),
        },
      });
  };

  const handleSelect = (payment: PaymentMethodUI) => {
    if (!payment.supported) {
      toast.error('Phương thức thanh toán này hiện chưa được hỗ trợ.');
      return;
    }
    setSelectedMethod(payment.method);
  };

  const updateBooking = useUpdateBooking();
  const createPayment = useCreatePayment();
  const handlePay = async () => {
    if (!selectedMethod) {
      toast.error('Vui lòng chọn phương thức thanh toán.');
      return;
    }

    if (!bookingId) {
      toast.error('Đã có lỗi xảy ra. Vui lòng thử lại.');
      return;
    }
    console.log('Starting payment process for bookingId:', bookingId);
    try {
      setIsLoading(true);
      await updateBooking.mutateAsync({
        bookingId,
        data: buildBookingPayload(),
      });

      const payment = await createPayment.mutateAsync({
        bookingId,
        data: {
          paymentMethod: selectedMethod as PaymentMethod,
          amount: getTotalFinal(),
          returnUrl: `${window.location.origin}/checkout?success=true&bookingId=${bookingId}`,
          cancelUrl: `${window.location.origin}/checkout?success=false&bookingId=${bookingId}`,
        },
      });

   
      if (payment && payment.data && payment.data.paymentUrl) {
        window.location.href = payment.data.paymentUrl;
      } else {
        toast.error('Không thể tạo thanh toán. Vui lòng thử lại.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Không thể tạo thanh toán. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <Loading />
  }

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
        <div className="flex items-center gap-4">
          <Input
            placeholder="Nhập mã voucher"
            value={voucher}
            onChange={(e) => setVoucher(e.target.value)}
          />
          <Button
            disabled={isPending || voucher.trim() === ''}
            onClick={() => handleValidatePromotion(voucher)}
          >
            Áp dụng
          </Button>
        </div>
      </div>

      {/* Nút thanh toán */}
      <Button onClick={handlePay} disabled={!selectedMethod} className="w-full">
        Thanh toán
      </Button>
    </div>
  );
};
