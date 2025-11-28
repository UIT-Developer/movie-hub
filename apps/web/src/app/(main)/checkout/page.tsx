import Link from 'next/link';
import { Button } from '@movie-hub/shacdn-ui/button';

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const params = await searchParams;
  const hasParams = Object.keys(params).length > 0;

  if (hasParams) {
    const bookingIdRaw = params.vnp_TxnRef; // lấy mã GD từ VNPay nếu cần
    const bookingId = Array.isArray(bookingIdRaw) ? bookingIdRaw[0] : bookingIdRaw;

    return (
      <div className="flex flex-col gap-8 w-full">
        <h1 className="text-3xl font-bold text-white text-center">
          Thanh toán thành công
        </h1>

        {bookingId && (
          <p className="text-center text-white">Mã giao dịch: {bookingId}</p>
        )}

        <div className="flex items-center justify-center gap-4">
          <Link href="/">
            <Button>Về trang chủ</Button>
          </Link>

          {bookingId && (
            <Link href={`/my-booking`}>
              <Button variant="outline">Xem vé của tôi</Button>
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Không có params => giữ nguyên giao diện cũ
  return (
    <div className="flex flex-col gap-8 w-full text-center items-center justify-center text-white">
      <h1 className="text-3xl font-bold">Trang thanh toán</h1>
      <p>Không tìm thấy trạng thái giao dịch.</p>
      <Link href="/">
        <Button variant="outline">Về trang chủ</Button>
      </Link>
    </div>
  );
}
