'use client';
import { Button } from '@movie-hub/shacdn-ui/button';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { PaymentSection } from './_components/payment';
import TicketPreview from './_components/ticket-preview';
import { useState } from 'react';
import Loading from 'apps/web/src/components/loading';

export default function CheckoutPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const showtimeId = params.showtimeId as string;
  const success = searchParams.get('success');
  const bookingId = searchParams.get('bookingId');

  const [loading, setLoading] = useState(false);
  if (success === 'true' && bookingId) {
    return (
      <div className="flex flex-col gap-8 w-full">
        <h1 className="text-3xl font-bold text-white text-center">
          Thanh toán thành công
        </h1>
        <p className="text-center text-white">Booking ID: {bookingId}</p>

        <div className="flex items-center justify-center gap-4">
          <Link href={`/showtimes/${showtimeId}/tickets`} >
            <Button className="w-full">Xem vé của tôi</Button>
          </Link>
        
            <Link href={'/'} >
              <Button variant="outline" >
                Quay lại trang chủ{' '}
              </Button>
            </Link>
      
        </div>
      </div>
    );
  }

  if (success === 'false') {
    return (
      <div className="flex flex-col px-6  gap-8  w-full">
        <h1 className="text-3xl font-bold text-white text-center">
          Thanh toán thất bại
        </h1>

        <div className="flex items-center justify-center gap-4">
          <Link href={`/showtimes/${showtimeId}/checkout`} >
            <Button className="w-full">Thử thanh toán lại</Button>
          </Link>
          <Link href={'/'} >
            <Button variant="outline" >
              Quay lại trang chủ{' '}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col px-6 gap-8  w-full">
      <h1 className="text-3xl font-bold text-white text-center">Thanh toán</h1>
      <div className="flex max-sm:flex-col gap-8 items-center justify-center">
        <PaymentSection setLoading={setLoading} />
        <TicketPreview />
      </div>
    </div>
  );
}
