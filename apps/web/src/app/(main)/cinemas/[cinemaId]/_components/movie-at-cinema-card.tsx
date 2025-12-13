'use client';

import { Button } from '@movie-hub/shacdn-ui/button';
import { Card, CardContent } from '@movie-hub/shacdn-ui/card';
import { MovieWithShowtimeResponse } from '@/libs/types/movie.type';
import { motion } from 'framer-motion';
import { Globe2, Theater, Timer } from 'lucide-react';
import Image from 'next/image';
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

  // Group showtimes by date
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
  }, [movie]);

  return (
    <Card className="w-full rounded-2xl bg-rose-500/10 border border-rose-500/20 text-gray-200 shadow-lg">
      <CardContent className="grid grid-cols-1 gap-6 p-4 md:grid-cols-[190px,1fr]">
        {/* Poster */}
        <button
          type="button"
          onClick={goToMovieDetail}
          className="overflow-hidden rounded-2xl focus:outline-none flex items-center md:items-start justify-center"
        >
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            width={260}
            height={380}
            className="h-auto w-full max-w-[260px] object-cover rounded-xl"
          />
        </button>
        {/* Right section */}
        <div className="flex flex-col gap-4">
          {/* Movie info */}
          <div>
            <h2
              className="mb-2 cursor-pointer text-2xl font-bold uppercase tracking-wide text-rose-300 hover:text-rose-400"
              onClick={goToMovieDetail}
            >
              {movie.title}
            </h2>

            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
              {/* Genre */}
              <span className="flex items-center gap-1">
                <Theater className="w-4 h-4 text-rose-400" />
                {movie.genre.map((g) => g.name).join(', ')}
              </span>

              {/* Runtime */}
              <span className="flex items-center gap-1">
                <Timer className="w-4 h-4 text-rose-400" />
                {movie.runtime} phút
              </span>

              {/* Country */}
              <span className="flex items-center gap-1">
                <Globe2 className="w-4 h-4 text-rose-400" />
                {movie.productionCountry}
              </span>
            </div>

            <p className="mt-2 line-clamp-3 text-sm text-gray-300">
              {movie.overview}
            </p>
          </div>

          {/* Showtime groups */}
          <div className="flex flex-col gap-3">
            {Object.entries(showtimesByDate).map(([dateLabel, times]) => {
              const validTimes = times.filter((s) => {
                const start = new Date(s.startTime);
                return !!s.id && start >= now;
              });

              const byFormat = validTimes.reduce((acc, s) => {
                const key = s.format;
                if (!acc[key]) acc[key] = [];
                acc[key].push(s);
                return acc;
              }, {} as Record<string, typeof validTimes>);

              return (
                <div
                  key={dateLabel}
                  className="rounded-xl bg-rose-500/10 border border-rose-500/30 p-4"
                >
                  <p className="mb-2 text-sm font-semibold text-rose-300">
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
                          <span className="font-semibold uppercase tracking-wide text-rose-400">
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
                                  'rounded-lg border px-4 py-2 text-sm font-semibold',
                                  disabled
                                    ? 'cursor-not-allowed border-rose-800 text-rose-800'
                                    : 'border-rose-400 bg-transparent text-rose-300 hover:bg-rose-500 hover:text-white',
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
            className="mt-1 w-fit text-sm font-bold text-rose-300 underline hover:text-rose-400"
          >
            Xem thêm lịch chiếu
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
