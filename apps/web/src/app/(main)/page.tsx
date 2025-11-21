'use client';
import { Button } from '@movie-hub/shacdn-ui/button';
import { useEffect, useState } from 'react';
import MovieSlider from './_components/MovieSlider';
import OtherServices from './_components/OtherServices';
import PromoBanner from './_components/PromoBanner';
import { CinemaListNearby } from './_components/cinema-near-list';
import QuickBooking from './_components/QuickBooking';

const MainPage = () => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  const requestLocation = () => {
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
        console.log('Location obtained:', pos.coords.latitude, pos.coords.longitude);
        setError('');
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
  };

  useEffect(() => {
    requestLocation();
  }, []);
  return (
    <div className="flex flex-col gap-8">
      <QuickBooking />

      {/* Các rạp gần vị trí */}
      {location ? (
        
     
            <CinemaListNearby
              latitude={location.lat}
              longtitude={location.lng}
            />
       
      ) : (
        <div className="px-6 py-10 text-center flex flex-col gap-4 text-gray-300">
          <p className="text-base">
            🎯 Bật định vị để xem rạp chiếu phim gần bạn nhất!
          </p>
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <Button
            onClick={requestLocation}
            className="w-fit mx-auto rounded-xl px-6 py-2"
          >
            Cấp quyền vị trí
          </Button>
        </div>
      )}

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
