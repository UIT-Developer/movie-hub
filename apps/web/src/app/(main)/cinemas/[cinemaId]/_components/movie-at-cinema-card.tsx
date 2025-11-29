import { Button } from "@movie-hub/shacdn-ui/button";
import { Card, CardContent } from "@movie-hub/shacdn-ui/card";
import { MovieWithShowtimeResponse } from "apps/web/src/libs/types/movie.type";
import { motion } from "framer-motion";

export const MovieAtCinemaCard = ({ movie }: { movie: MovieWithShowtimeResponse }) => {
  return (
    <Card className="w-full p-4 rounded-2xl shadow-lg bg-[#0f1335] text-white">
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Poster */}
        <motion.img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover rounded-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        />

        {/* Right section */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {/* Movie info */}
          <div>
            <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>

            <div className="flex items-center gap-3 text-sm text-gray-300 flex-wrap">
              <span>🎭 {movie.genre.map((g) => g.name).join(', ')}</span>
              <span>⏱ {movie.runtime} phút</span>
              <span>🇻🇳 {movie.productionCountry}</span>
            </div>

            <p className="text-sm text-gray-300 mt-2 line-clamp-3">
              {movie.overview}
            </p>
          </div>

          {/* Showtime groups by date */}
          <div className="flex flex-col gap-4 mt-2">
            {Object.entries(
              movie.showtimes.reduce((acc, s) => {
                const date = new Date(s.startTime).toLocaleDateString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                });
                if (!acc[date]) acc[date] = [];
                acc[date].push(s);
                return acc;
              }, {} as Record<string, typeof movie.showtimes[number][]>)
            ).map(([date, times]) => (
              <div key={date} className="bg-[#1a1f47] p-4 rounded-xl shadow">
                <p className="text-sm font-semibold text-gray-200 mb-2">
                  {date}
                </p>
                <div className="flex flex-wrap gap-3">
                  {times.map((s) => (
                    <Button
                      key={s.id}
                      className="rounded-xl px-4 py-2 bg-yellow-400 text-black font-semibold shadow"
                    >
                      {new Date(s.startTime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Xem thêm */}
          <a
            href={`/movie/${movie.id}`}
            className="underline text-yellow-400 text-sm font-bold mt-2"
          >
            Xem thêm lịch chiếu
          </a>
        </div>
      </CardContent>
    </Card>
  );
}