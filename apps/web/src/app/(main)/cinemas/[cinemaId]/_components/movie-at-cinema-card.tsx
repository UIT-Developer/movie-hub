'use client';

import { Button } from '@movie-hub/shacdn-ui/button';
import { Card, CardContent } from '@movie-hub/shacdn-ui/card';
import { MovieWithShowtimeResponse } from 'apps/web/src/libs/types/movie.type';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

export const MovieAtCinemaCard = ({
  movie,
}: {
  movie: MovieWithShowtimeResponse;
}) => {
  const router = useRouter();

  const goToMovieDetail = useCallback(() => {
    router.push(`/movies/${movie.id}`);
  }, [router, movie.id]);

  const goToShowtimeDetail = useCallback(
    (showtimeId?: string) => {
      if (!showtimeId) return;
      router.push(`/showtimes/${showtimeId}`);
    },
    [router]
  );

  const now = useMemo(() => new Date(), []);

  // Group showtimes by date string
  const showtimesByDate = useMemo(() => {
    return movie.showtimes.reduce((acc, s) => {
      const d = new Date(s.startTime);
      const dateLabel = d.toLocaleDateString('vi-VN', {
        weekday: 'long',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });

      if (!acc[dateLabel]) acc[dateLabel] = [];
      acc[dateLabel].push(s);
      return acc;
    }, {} as Record<string, typeof movie.showtimes>);
  }, [movie.showtimes]);

  return (
    <Card className="w-full rounded-2xl bg-[#0f1335] text-white shadow-lg">
      <CardContent className="grid grid-cols-1 gap-6 p-4 md:grid-cols-[190px,1fr]">
        {/* Poster */}
        <button
          type="button"
          onClick={goToMovieDetail}
          className="group h-full w-full overflow-hidden rounded-2xl focus:outline-none"
        >
          <motion.img
            src={movie.posterUrl}
            alt={movie.title}
            className="h-full w-full max-h-[320px] object-cover md:max-h-[360px]"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
          />
        </button>

        {/* Right section */}
        <div className="flex flex-col gap-4">
          {/* Movie info */}
          <div>
            <h2
              className="mb-2 cursor-pointer text-2xl font-bold uppercase tracking-wide hover:text-yellow-400"
              onClick={goToMovieDetail}
            >
              {movie.title}
            </h2>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-300">
              <span>🎭 {movie.genre.map((g) => g.name).join(', ')}</span>
              <span>⏱ {movie.runtime} phút</span>
              <span>🌎 {movie.productionCountry}</span>
            </div>

            <p className="mt-2 line-clamp-3 text-sm text-gray-300">
              {movie.overview}
            </p>
          </div>

          {/* Showtime groups by date */}
          <div className="flex flex-col gap-3">
            {Object.entries(showtimesByDate).map(([dateLabel, times]) => {
              // lọc suất hợp lệ: có id & chưa chiếu
              const validTimes = times.filter((s) => {
                const start = new Date(s.startTime);
                return !!s.id && start >= now;
              });

              // group tiếp theo format (STANDARD / DELUXE / 3D...)
              const byFormat = validTimes.reduce((acc, s) => {
                const key = s.format; // FormatEnum -> string
                if (!acc[key]) acc[key] = [];
                acc[key].push(s);
                return acc;
              }, {} as Record<string, typeof validTimes>);

              return (
                <div
                  key={dateLabel}
                  className="rounded-xl bg-[#1a1f47] p-4 shadow-md"
                >
                  <p className="mb-2 text-sm font-semibold text-gray-200">
                    {dateLabel}
                  </p>

                  {Object.keys(byFormat).length === 0 ? (
                    <p className="text-xs text-neutral-400">
                      Không còn suất chiếu phù hợp trong ngày này.
                    </p>
                  ) : (
                    Object.entries(byFormat).map(([format, showtimes]) => (
                      <div key={format} className="mb-3 last:mb-0">
                        <div className="mb-2 flex items-center justify-between text-xs">
                          <span className="font-semibold uppercase tracking-wide text-gray-300">
                            {format}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {showtimes.map((s) => {
                            const start = new Date(s.startTime);
                            const timeLabel = start.toLocaleTimeString(
                              'vi-VN',
                              {
                                hour: '2-digit',
                                minute: '2-digit',
                              }
                            );

                            const disabled = !s.id || start < now;

                            return (
                              <Button
                                key={s.id ?? `${format}-${timeLabel}`}
                                type="button"
                                disabled={disabled}
                                onClick={() =>
                                  !disabled && goToShowtimeDetail(s.id)
                                }
                                className={[
                                  'rounded-xl border px-4 py-2 text-sm font-semibold',
                                  disabled
                                    ? 'cursor-not-allowed border-gray-500 text-gray-500'
                                    : 'border-yellow-400 bg-transparent text-yellow-300 hover:bg-yellow-400 hover:text-black',
                                ].join(' ')}
                              >
                                {timeLabel}
                              </Button>
                            );
                          })}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              );
            })}
          </div>

          {/* Xem thêm */}
          <button
            type="button"
            onClick={goToMovieDetail}
            className="mt-1 w-fit text-sm font-bold text-yellow-400 underline hover:text-yellow-300"
          >
            Xem thêm lịch chiếu
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
