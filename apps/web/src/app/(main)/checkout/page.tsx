import Link from 'next/link';
import { Button } from '@movie-hub/shacdn-ui/button';

export default function CheckoutPage({
  searchParams,
}: {
  searchParams: { success?: string; bookingId?: string };
}) {
  const { success, bookingId } = searchParams;

  // ❌ Không redirect() lung tung trong Server Component
  // ✔︎ Trả UI theo trạng thái
  if (success === 'true' && bookingId) {
    return (
      <div className="flex flex-col gap-8 w-full">
        <h1 className="text-3xl font-bold text-white text-center">
          Thanh toán thành công
        </h1>

        <p className="text-center text-white">Mã đặt vé: {bookingId}</p>

        <div className="flex items-center justify-center gap-4">
          <Link href={`/showtimes/${bookingId}/tickets`}>
            <Button>Xem vé của tôi</Button>
          </Link>

          <Link href="/">
            <Button variant="outline">Về trang chủ</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (success === 'false') {
    return (
      <div className="flex flex-col gap-8 w-full">
        <h1 className="text-3xl font-bold text-white text-center">
          Thanh toán thất bại
        </h1>

        <div className="flex items-center justify-center gap-4">
          <Link href="/">
            <Button>Thử lại</Button>
          </Link>

          <Link href="/">
            <Button variant="outline">Về trang chủ</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Trường hợp truy cập trực tiếp: show UI trung lập
  return (
    <div className="flex flex-col gap-8 w-full text-center text-white">
      <h1 className="text-3xl font-bold">Trang thanh toán</h1>
      <p>Không tìm thấy trạng thái giao dịch.</p>
      <Link href="/">
        <Button variant="outline">Về trang chủ</Button>
      </Link>
    </div>
  );
}
