'use client';
import { Button } from '@movie-hub/shacdn-ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { getVietnameseDay } from 'apps/web/src/app/utils/get-vietnamese-day';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { BlurCircle } from '../../../../../components/blur-circle';
import { CinemaShowtime } from './cinema-showtime';
import {
  useGetCinemaDetail,
  useGetCinemasWithFilters,
} from 'apps/web/src/hooks/cinema-hooks';
import { useInView } from 'react-intersection-observer';

type SelectedDateKey = string;
export const DateSelect = ({
  movieId,
  cinemaId,
}: {
  movieId: string;
  cinemaId?: string;
}) => {
  const router = useRouter();
  const [selected, setSelected] = useState<SelectedDateKey>(
    new Date().toISOString().split('T')[0]
  );
  const [selectedLocation, setSelectedLocation] =
    useState<string>('Ho Chi Minh City');
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>();

  const next7Days = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      return d.toISOString().split('T')[0]; // format YYYY-MM-DD
    });
  }, []);

  const handleSelectShowtime = useCallback((showtimeId: string) => {
    setSelectedShowtime(showtimeId);
  }, []);

  const onBookHandler = useCallback(() => {
    if (!selected) return toast.error('Vui lòng chọn ngày');
    if (!selectedShowtime) return toast.error('Vui lòng chọn suất chiếu');
    router.push(`/showtimes/${selectedShowtime}`);
    scrollTo(0, 0);
  }, [router, selected, selectedShowtime]);

  // Nếu có cinemaId => lấy chi tiết rạp
  const { data: cinemaDetail } = useGetCinemaDetail(cinemaId ?? '');
  // Nếu không có cinemaId => lấy danh sách theo city


  const { data, fetchNextPage,hasNextPage, isFetchingNextPage, isLoading } =
    useGetCinemasWithFilters({
      city: selectedLocation,
      limit: 10,
    });

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    if (cinemaDetail?.city) {
      setSelectedLocation(cinemaDetail.city);
    }
  }, [cinemaDetail]);

  const cinemas =
    cinemaId && cinemaDetail
      ? [cinemaDetail]
      : data
      ? data.pages.flatMap((page) => page.cinemas)
      : [];
  return (
    <div id="dateSelect" className="pt-30 relative">
      <div className="flex flex-col items-center justify-between gap-10 relative p-8 bg-rose-500/10  border border-rose-500/20 rounded-lg">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />
        {/* Date select */}
        <div className="flex flex-col md:flex-row items-center justify-between  gap-10 w-full">
          <div>
            <p className="text-lg font-semibold text-white max-sm:text-center">
              Chọn ngày
            </p>
            <div className="flex items-center gap-6 text-sm mt-5">
              <span className="grid grid-cols-3 md:flex flex-wrap md:max-w-lg gap-4">
                {next7Days.map((date) => (
                  <button
                    onClick={() => {
                      setSelected(date);
                    }}
                    key={date}
                    className={`flex flex-col items-center justify-center h-14 w-14 aspect-square rounded-lg cursor-pointer ${
                      selected === date
                        ? 'bg-rose-500 text-white'
                        : 'border border-rose-500/70'
                    }`}
                  >
                    <span className="font-bold text-white">
                      {new Date(date).getDate()}
                    </span>
                    <span className="font-semibold text-neutral-400">
                      {getVietnameseDay(date)}
                    </span>
                  </button>
                ))}
              </span>
            </div>
          </div>
          <Button
            onClick={onBookHandler}
            className=" px-8 py-2 mt-6 ml-auto hover:bg-rose-500/90 transition-all cursor-pointer max-sm:mx-auto"
          >
            Đặt ngay
          </Button>
        </div>

        {/* Cinema showtime list */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 w-full">
          <div className="flex items-center justify-between w-full">
            <p className="text-lg font-bold text-white">Danh sách rạp</p>
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className=" w-[180px] h-10 bg-transparent  text-rose-500 font-semibold text-lg border border-rose-500/70 rounded-focus:outline-none focus:ring-2 focus:ring-rose-700 focus:ring-offset-2 focus:ring-offset-transparent data-[state=open]:ring-2 data-[state=open]:ring-rose-700transition-all">
                <SelectValue
                  placeholder={
                    <span className="text-rose-500">Chọn khu vực</span>
                  }
                />
              </SelectTrigger>
              <SelectContent className="text-rose-400" position="popper">
                <SelectItem value="Hồ Chí Minh">Hồ Chí Minh</SelectItem>
                <SelectItem value="Đà Nẵng">Đà Nẵng</SelectItem>
                <SelectItem value="Hà Nội">Hà Nội</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="space-y-4 w-full">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <CinemaShowtime.Skeleton key={i} />
            ))
          ) : cinemas.length === 0 ? (
            <p className="text-center text-neutral-400 font-semibold">
              Không có rạp nào
            </p>
          ) : (
            cinemas.map((cinema) => (
              <CinemaShowtime
                key={cinema.id}
                movieId={movieId}
                cinema={cinema}
                selectedDate={selected}
                onSelectShowtime={handleSelectShowtime}
              />
            ))
          )}

          <div ref={ref} className="w-full">
            {isFetchingNextPage && <CinemaShowtime.Skeleton />}
          </div>
        </div>
      </div>
    </div>
  );
};
