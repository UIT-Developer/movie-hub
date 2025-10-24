'use client';
import { useEffect, useState } from 'react';
import MovieSlider from './_components/MovieSlider';
import OtherServices from './_components/OtherServices';
import PromoBanner from './_components/PromoBanner';
import QuickBooking from './_components/QuickBooking';

const MainPage = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Trình duyệt của bạn không hỗ trợ định vị.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Bạn đã từ chối chia sẻ vị trí.');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Không thể xác định vị trí hiện tại.');
            break;
          case err.TIMEOUT:
            setError('Yêu cầu định vị mất quá nhiều thời gian.');
            break;
          default:
            setError('Lỗi không xác định khi lấy vị trí.');
        }
      }
    );
  }, []);
  return (
    <div className="flex flex-col gap-8">
      <QuickBooking />

      {/* Slider phim đang chiếu */}
      <section>
        <MovieSlider
          title="🎬 PHIM ĐANG CHIẾU"
          href="showing"
          status="now_showing"
        />
      </section>

      {/* Slider phim sắp chiếu */}
      <section>
        <MovieSlider
          title="🎥 PHIM SẮP CHIẾU"
          href="upcoming"
          status="upcoming"
        />
      </section>

      <PromoBanner />
      <OtherServices />
    </div>
  );
};

export default MainPage;
