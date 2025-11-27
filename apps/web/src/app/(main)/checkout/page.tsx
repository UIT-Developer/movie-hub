import { Button } from '@movie-hub/shacdn-ui/button';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: { showtimeId: string };
  searchParams: { success?: string; bookingId?: string };
}) {
  const { showtimeId } = params;
  const success = searchParams?.success;
  const bookingId = searchParams?.bookingId;

  // Trang kết quả thanh toán
  if (success === 'true' && bookingId) {
    return (
      <div className="flex flex-col gap-8 w-full">
        <h1 className="text-3xl font-bold text-white text-center">
          Thanh toán thành công
        </h1>
        <p className="text-center text-white">Booking ID: {bookingId}</p>
        <div className="flex items-center justify-center gap-4">
          <Button>
            <Link href={`/showtimes/${showtimeId}/tickets`} className="w-full">
              Xem vé của tôi
            </Link>
          </Button>
          <Button variant="outline">
            <Link href="/">Quay lại trang chủ</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (success === 'false') {
    return (
      <div className="flex flex-col px-6 gap-8 w-full">
        <h1 className="text-3xl font-bold text-white text-center">
          Thanh toán thất bại
        </h1>
        <div className="flex items-center justify-center gap-4">
          <Button>
            <Link href={`/showtimes/${showtimeId}`}>Thử thanh toán lại</Link>
          </Button>

          <Button variant="outline">
            <Link href="/">Quay lại trang chủ</Link>
          </Button>
        </div>
      </div>
    );
  }
  return redirect('/');
}
