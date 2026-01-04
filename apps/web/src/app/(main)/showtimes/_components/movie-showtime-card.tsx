'use client';

import { MovieWithCinemaAndShowtimeResponse } from '@/libs/types/movie.type';
import Image from 'next/image';
import Link from 'next/link';
import { CinemaShowtimeGroup } from './cinema-showtime-group';

interface Props {
  movie: MovieWithCinemaAndShowtimeResponse;
}

export const MovieShowtimeCard = ({ movie }: Props) => {
  // If no showtimes, we might still want to show the movie but say "No showtimes"
  // But usually we filter those out in the parent.

  return (
    <div className="flex flex-col md:flex-row gap-6 bg-[#0f1014] border border-white/5 p-4 rounded-xl hover:border-white/10 transition-colors">
      {/* Poster */}
      <div className="flex-shrink-0 w-full md:w-[180px]">
        <Link
          href={`/movies/${movie.id}`}
          className="block relative aspect-[2/3] w-full overflow-hidden rounded-lg"
        >
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 180px"
          />
        </Link>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <Link href={`/movies/${movie.id}`} className="group">
              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors mb-2">
                {movie.title}
              </h3>
            </Link>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
              <span className="bg-white/10 px-2 py-0.5 rounded text-white text-xs">
                {movie.ageRating}
              </span>
              <span>•</span>
              <span>{movie.runtime} phút</span>
              {movie.genre && movie.genre.length > 0 && (
                <>
                  <span>•</span>
                  <span>{movie.genre.map((g) => g.name).join(', ')}</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Cinemas List */}
        <div className="bg-[#1a1c24]/50 rounded-lg p-4 border border-white/5 max-h-[400px] overflow-y-auto custom-scroll">
          {movie.cinemas && movie.cinemas.length > 0 ? (
            movie.cinemas.map((cinemaGroup) => (
              <CinemaShowtimeGroup
                key={cinemaGroup.cinemaId}
                cinemaGroup={cinemaGroup}
              />
            ))
          ) : (
            <p className="text-gray-500 italic">
              Chưa có lịch chiếu cho ngày này.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
