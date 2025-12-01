'use client';

import { useState } from 'react';
import { DateSelect7Days } from 'apps/web/src/components/date-select-7days';
import { useGetAllMoviesWithShowtimes } from 'apps/web/src/hooks/cinema-hooks';

import { AlertCircle } from 'lucide-react';
import { MovieWithCinemaCard } from './_components/movie-with-cinema-card';
import { ErrorFallback } from 'apps/web/src/components/error-fallback';

export const ShowtimesList = () => {
  const [selected, setSelected] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const {
    data: movies,
    isLoading,
    isError,
    error,
  } = useGetAllMoviesWithShowtimes({ date: selected });

  return (
    <div className="flex w-full flex-col gap-6">
      {/* Chọn ngày */}
      <DateSelect7Days selected={selected} onSelect={setSelected} />

      {/* Nội dung danh sách phim + rạp */}
      <div className="mt-4 flex flex-col gap-4">
        {isLoading ? (
          // Skeleton khi load
          Array.from({ length: 3 }).map((_, i) => (
            <MovieWithCinemaCard.Skeleton key={i} />
          ))
        ) : isError ? (
          // Error state
          <ErrorFallback message={error?.message} />
        ) : !movies || movies.length === 0 ? (
          // Empty state
          <p className="text-center text-sm font-semibold text-neutral-400">
            Không có suất chiếu nào cho ngày này.
          </p>
        ) : (
          // List phim + rạp
          movies.map((movie) => (
            <MovieWithCinemaCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
    </div>
  );
};
