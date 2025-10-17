'use client';
import { useParams } from 'next/navigation';
import { DateSelect } from './_components/date-select';
import { MovieCast } from './_components/movie-cast';
import { MovieHeader } from './_components/movie-header';

const MovieDetailsPage = () => {
  const { id } = useParams();

  const bookingData = {
    '2025-09-27': ['10:00', '11:00', '14:30'],
    '2025-09-28': ['09:00', '16:00'],
    '2025-09-29': ['13:00'],
    '2025-09-30': [],
  };

  const actors = [
    { name: 'abc', image: '/images/placeholder.png' },
    { name: 'abc', image: '/images/placeholder.png' },
    { name: 'abc', image: '/images/placeholder.png' },
    { name: 'abc', image: '/images/placeholder.png' },
  ];

  return (
    <div className="min-h-screen">
      <MovieHeader
        title="Tử chiến trên không"
        rating={4.9}
        language="Tiếng Việt"
        duration="1h 58m - Hồi hộp, hành động - 2025"
        description="Tử Chiến Trên Không là phim điện ảnh hành động - kịch tính, được lấy cảm hứng từ vụ cướp máy bay có thật tại Việt Nam sau năm 1975. Đón xem hành động Việt Nam kịch tính nhất tháng 9 này!"
        posterUrl="https://cinestar.com.vn/_next/image/?url=https%3A%2F%2Fapi-website.cinestar.com.vn%2Fmedia%2Fwysiwyg%2FPosters%2F09-2025%2Ftu-chien-tren-khong-poster.jpg&w=1080&q=75"
      />
      <MovieCast actors={actors} />
      <DateSelect dateTime={bookingData} id={id as string} />
    </div>
  );
};

export default MovieDetailsPage;
