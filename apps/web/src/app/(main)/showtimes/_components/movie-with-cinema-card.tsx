'use client';

import { Button } from '@movie-hub/shacdn-ui/button';
import { Card, CardContent } from '@movie-hub/shacdn-ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import type {
  MovieWithCinemaAndShowtimeResponse,
  CinemaShowtimeGroup,
} from 'apps/web/src/libs/types/movie.type';
import { Skeleton } from '@movie-hub/shacdn-ui/skeleton';

interface MovieWithCinemaCardProps {
  movie: MovieWithCinemaAndShowtimeResponse;
}

export const MovieWithCinemaCard = ({ movie }: MovieWithCinemaCardProps) => {
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

  return (
    <Card className="w-full rounded-2xl bg-gradient-to-b from-[#10144a] to-[#151b60] text-white shadow-xl">
      <CardContent className="grid grid-cols-1 gap-8 p-4 md:grid-cols-[260px,1fr] md:p-6">
        {/* LEFT: Poster + movie info */}
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={goToMovieDetail}
            className="overflow-hidden rounded-2xl focus:outline-none"
          >
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              width={260}
              height={380}
              className="h-auto w-full max-w-[260px] object-cover"
            />
          </button>

          <div className="space-y-2 text-sm text-gray-200">
            <p className="text-base font-semibold uppercase text-yellow-300">
              {movie.title}
            </p>

            <p>🎭 {movie.genre.map((g) => g.name).join(', ')}</p>
            <p>⏱ {movie.runtime} phút</p>
            <p>🌍 {movie.productionCountry}</p>
            <p>🔊 Ngôn ngữ: {movie.languageType}</p>
            <p>🔞 {movie.ageRating}</p>

            <p className="mt-2 text-xs text-gray-300 line-clamp-3">
              {movie.overview}
            </p>
          </div>
        </div>

        {/* RIGHT: Cinema list + showtimes */}
        <div className="flex flex-col gap-4">
          {movie.cinemas.map((cinema: CinemaShowtimeGroup, index) => {
            // Lọc showtime hợp lệ (có id + chưa chiếu)
            const validShowtimes = cinema.showtimes.filter((s) => {
              const start = new Date(s.startTime);
              return !!s.id && start >= now;
            });

            // Group theo format (STANDARD, DELUXE,...)
            const groupedByFormat = validShowtimes.reduce((acc, s) => {
              const key = s.format; // enum -> string
              if (!acc[key]) acc[key] = [];
              acc[key].push(s);
              return acc;
            }, {} as Record<string, typeof validShowtimes>);

            // Nếu không còn suất chiếu thì vẫn render rạp + text, tuỳ bạn:
            // if (!validShowtimes.length) return null; // => ẩn luôn rạp

            return (
              <div
                key={cinema.cinemaId}
                className={`flex flex-col gap-2 border-t border-white/10 pt-4 ${
                  index === 0 ? 'border-t-0 pt-0' : ''
                }`}
              >
                {/* Cinema header */}
                <div className="flex flex-col gap-1">
                
                  <h3 className="text-base font-semibold">{cinema.name}</h3>
                  <p className="text-xs text-gray-300">{cinema.address}</p>
                </div>

                {/* Showtime groups by format */}
                <div className="mt-2 flex flex-col gap-4 text-xs">
                  {Object.keys(groupedByFormat).length === 0 ? (
                    <p className="text-neutral-400">
                      Không còn suất chiếu phù hợp.
                    </p>
                  ) : (
                    Object.entries(groupedByFormat).map(([format, times]) => (
                      <div key={format} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-gray-200">
                            {format}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          {times.map((s) => {
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
                                key={s.id ?? `${cinema.cinemaId}-${timeLabel}`}
                                type="button"
                                size="sm"
                                disabled={disabled}
                                className={[
                                  'rounded-xl border px-4 py-2 text-xs font-semibold',
                                  disabled
                                    ? 'border-gray-500 text-gray-500 cursor-not-allowed'
                                    : 'border-yellow-400 bg-transparent text-yellow-300 hover:bg-yellow-400 hover:text-black',
                                ].join(' ')}
                                onClick={() =>
                                  !disabled && goToShowtimeDetail(s.id)
                                }
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
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

MovieWithCinemaCard.Skeleton = function MovieWithCinemaCardSkeleton() {
  return (
    <Card className="w-full rounded-2xl bg-gradient-to-b from-[#10144a] to-[#151b60] text-white shadow-xl">
      <CardContent className="grid grid-cols-1 gap-8 p-4 md:grid-cols-[260px,1fr] md:p-6">
        {/* LEFT skeleton */}
        <div className="flex flex-col gap-4">
          <Skeleton className="h-[380px] w-full max-w-[260px] rounded-2xl bg-rose-500/20" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-40 bg-rose-500/20" />
            <Skeleton className="h-3 w-32 bg-rose-500/15" />
            <Skeleton className="h-3 w-24 bg-rose-500/15" />
            <Skeleton className="h-3 w-28 bg-rose-500/15" />
            <Skeleton className="h-3 w-20 bg-rose-500/15" />
            <Skeleton className="mt-2 h-10 w-full bg-rose-500/10" />
          </div>
        </div>

        {/* RIGHT skeleton (vài rạp + giờ chiếu) */}
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={`flex flex-col gap-2 border-t border-white/10 pt-4 ${
                i === 0 ? 'border-t-0 pt-0' : ''
              }`}
            >
              <Skeleton className="h-4 w-52 bg-rose-500/20" />
              <Skeleton className="h-3 w-64 bg-rose-500/15" />

              <div className="mt-3 flex flex-wrap gap-3">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skeleton
                    key={j}
                    className="h-8 w-16 rounded-xl bg-rose-500/20"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
