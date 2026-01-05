'use client';

import { CinemaShowtimeGroup as CinemaShowtimeGroupType } from '@/libs/types/movie.type';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

interface Props {
  cinemaGroup: CinemaShowtimeGroupType;
}

export const CinemaShowtimeGroup = ({ cinemaGroup }: Props) => {
  const router = useRouter();

  const groupedShowtimes = useMemo(() => {
    if (!cinemaGroup.showtimes) return {};
    return cinemaGroup.showtimes.reduce((acc, s) => {
      const key = s.format || '2D'; // Default to 2D if format is missing
      if (!acc[key]) acc[key] = [];
      acc[key].push(s);
      return acc;
    }, {} as Record<string, typeof cinemaGroup.showtimes>);
  }, [cinemaGroup]);

  const handleBook = (showtimeId: string) => {
    router.push(`/showtimes/${showtimeId}`);
  };

  if (!cinemaGroup.showtimes || cinemaGroup.showtimes.length === 0) return null;

  return (
    <div className="mb-4 last:mb-0 border-b border-white/10 pb-4 last:border-0">
      <h4 className="text-primary font-bold mb-2 text-base uppercase tracking-wide">
        {cinemaGroup.name}
      </h4>
      <div className="space-y-3">
        {Object.entries(groupedShowtimes).map(([format, times]) => (
          <div
            key={format}
            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4"
          >
            <span className="text-xs font-semibold bg-white/10 px-2 py-1 rounded text-white w-fit">
              {format}
            </span>
            <div className="flex flex-wrap gap-2">
              {times
                .sort(
                  (a, b) =>
                    new Date(a.startTime).getTime() -
                    new Date(b.startTime).getTime()
                )
                .map((showtime) => {
                  const startTime = new Date(showtime.startTime);
                  const isPast = startTime < new Date();

                  return (
                    <button
                      key={showtime.id}
                      onClick={() =>
                        !isPast && showtime.id && handleBook(showtime.id)
                      }
                      disabled={isPast}
                      className={`
                        px-3 py-1 text-sm font-medium rounded border transition-all duration-200
                        ${
                          isPast
                            ? 'border-white/10 text-gray-600 bg-transparent cursor-not-allowed'
                            : 'border-white/20 text-white hover:bg-primary hover:border-primary hover:text-white bg-transparent'
                        }
                      `}
                    >
                      {startTime.toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        timeZone: 'UTC',
                      })}
                    </button>
                  );
                })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
