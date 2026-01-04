'use client';

import { DateSelect7Days } from '@/components/date-select-7days';
import { useGetAllMoviesWithShowtimes } from '@/hooks/cinema-hooks';
import { Loader } from '@/components/loader'; // Assuming generic loader exists or I'll implement inline
import { useState } from 'react';
import { MovieShowtimeCard } from './_components/movie-showtime-card';

export default function ShowtimesPage() {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Using the hook to fetch all movies with showtimes for the selected date
  const {
    data: movies,
    isLoading,
    isError,
  } = useGetAllMoviesWithShowtimes({
    date: selectedDate,
  });

  return (
    <div className="min-h-screen bg-background text-white pb-20">
      {/* Header / Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl text-white md:text-4xl font-bold mb-8 text-center uppercase tracking-widest text-primary glow-text">
          Lịch Chiếu Phim
        </h1>

        <div className="flex justify-center mb-10">
          <DateSelect7Days selected={selectedDate} onSelect={setSelectedDate} />
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader size={48} />
          </div>
        ) : isError ? (
          <div className="text-center text-red-500 py-10">
            <p>Có lỗi xảy ra khi tải lịch chiếu. Vui lòng thử lại sau.</p>
          </div>
        ) : !movies || movies.length === 0 ? (
          <div className="text-center text-gray-400 py-20 bg-white/5 rounded-xl border border-white/10">
            <p className="text-xl">
              Không có lịch chiếu nào cho ngày {selectedDate}
            </p>
          </div>
        ) : (
          <div className="space-y-8 max-w-5xl mx-auto">
            {movies.map((movie) => (
              <MovieShowtimeCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
