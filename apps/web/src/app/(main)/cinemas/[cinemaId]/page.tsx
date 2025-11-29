import { CinemaLocationResponse } from "apps/web/src/libs/types/cinema.type";
import CinemaDetailCard from "./_components/cinema-detail-card";
import { getQueryClient } from "apps/web/src/libs/get-query-client";
import { getMovieAtCinemas } from "apps/web/src/libs/actions/cinemas/cinema-action";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { MoviesAtCinema } from "./_components/movies-list-cinema";

export const fakeCinema: CinemaLocationResponse = {
  id: 'cinestar-nguyen-trai',
  name: 'Cinestar Quốc Thanh',
  address: '271 Nguyễn Trãi, Phường Nguyễn Cư Trinh',
  city: 'TP. Hồ Chí Minh',
  district: 'Quận 1',
  phone: '028 3920 9999',
  email: 'support@cinestar.vn',
  website: 'https://cinestar.com.vn',

  location: {
    latitude: 10.76387,
    longitude: 106.68229,
    // Không có distance — như bạn yêu cầu
  },

  description:
    'Cinestar Quốc Thanh là cụm rạp mang phong cách trẻ trung, giá vé dễ chịu, chất lượng màn hình và âm thanh đạt chuẩn quốc tế. Không gian rộng rãi, phù hợp đi nhóm bạn hoặc gia đình.',

  amenities: [
    '🅿️ Bãi giữ xe',
    '🍿 Bắp nước giá tốt',
    '🛋️ Ghế đôi Couple',
    '♿ Hỗ trợ người khuyết tật',
    '❄️ Máy lạnh mạnh',
  ],

  images: [
    'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4',
    'https://images.unsplash.com/photo-1517602302552-471fe67acf66',
    'https://images.unsplash.com/photo-1598899134739-24c46f58a9c5',
  ],

  rating: 4.5,
  totalReviews: 1248,

  operatingHours: {
    monday: '08:00 - 23:00',
    tuesday: '08:00 - 23:00',
    wednesday: '08:00 - 23:00',
    thursday: '08:00 - 23:00',
    friday: '08:00 - 00:00',
    saturday: '08:00 - 00:00',
    sunday: '08:00 - 23:00',
  },

  isOpen: true,

  availableHallTypes: ['2D', '3D', '4DX'],
  totalHalls: 7,

  status: 'active',

  mapUrl: 'https://maps.google.com/?q=Cinestar+Quoc+Thanh',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=10.76387,106.68229',

  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};


export default async function CinemaDetailPage({
  params
} : {
  params: Promise<{ cinemaId: string }>;
}) {
  const { cinemaId } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['movies-at-cinema', cinemaId],
    queryFn: async () => {
      const response = await getMovieAtCinemas(cinemaId, { page: 1, limit: 20 });
      return response.data;
    }})
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col items-center justify-center gap-4">
        <CinemaDetailCard cinema={fakeCinema} />
        <MoviesAtCinema cinemaId={cinemaId} />
      </div>
    </HydrationBoundary>
  );
}