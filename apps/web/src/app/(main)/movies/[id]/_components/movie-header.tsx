'use client';
import { Button } from '@movie-hub/shacdn-ui/button';
import { Skeleton } from '@movie-hub/shacdn-ui/skeleton';
import { GenreResponse, MovieDetailResponse } from '@movie-hub/shared-types';
import {
  CalendarDays,
  Clock,
  FileTextIcon,
  Film,
  Globe2,
  Heart,
  PlayCircleIcon,
  StarIcon,
  User2
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { BlurCircle } from '../../../../../components/blur-circle';
interface MovieHeaderProps {
  movie: Partial<MovieDetailResponse>;
}

export const MovieHeader = ({ movie }: MovieHeaderProps) => {
  const {
    title = 'Đang cập nhật',
    languageType = 'Không rõ',
    runtime = 0,
    ageRating = 'NR',
    productionCountry = 'Không rõ',
    originalTitle = '',
    posterUrl,
    backdropUrl,
    overview = 'Chưa có mô tả cho phim này.',
    trailerUrl,
    releaseDate,
    originalLanguage = '',
    spokenLanguages = [],
    director = 'Chưa rõ đạo diễn',
    genre = [],
  } = movie;

  const formattedDate = releaseDate
    ? new Date(releaseDate).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : 'Chưa rõ ngày phát hành';

  return (
    <div className="flex flex-col flex-wrap md:flex-row items-center gap-8 aspect-video rounded-2xl">
      {/* Backdrop */}
      {backdropUrl && backdropUrl.trim() !== '' ? (
        <Image
          src={backdropUrl}
          alt={title}
          fill
          priority
          className="object-cover brightness-20 rounded-2xl"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-900 rounded-2xl" />
      )}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className=" z-10 flex flex-col md:flex-row items-center gap-8 px-6 md:px-12 py-8">
        <Image
          width={288}
          height={416}
          src={
            posterUrl && posterUrl.trim() !== ''
              ? posterUrl
              : '/images/placeholder-bg.png'
          }
          alt={title}
          className="rounded-xl h-[416px] w-[288px] object-cover shadow-lg"
        />

        <div className="flex flex-1 flex-col gap-3 text-white max-w-2xl">

          <div className="flex items-center gap-2 text-sm text-rose-500 font-bold">
            <span>{languageType}</span>
            <span>•</span>
            <span>{ageRating}</span>
            <span>•</span>
            <span>{productionCountry}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
          {originalTitle && (
            <p className="text-gray-400 italic text-lg">({originalTitle})</p>
          )}

          <div className="flex items-center gap-2">
            <StarIcon className="w-5 h-5 text-rose-600 fill-rose-500" />
            <span>8 / 10</span>
          </div>

          <div className="flex items-start gap-2 mt-3 text-gray-300">
            <FileTextIcon className="w-5 h-5 text-rose-500 mt-0.5" />
            <p className="text-sm leading-tight">{overview}</p>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-rose-500" />
              <span>{runtime} phút</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4 text-rose-500" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <User2 className="w-4 h-4 text-rose-500" />
              <span>{director}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-rose-500" />
              <span>
                {spokenLanguages?.length
                  ? spokenLanguages.join(', ')
                  : 'Không có thông tin ngôn ngữ'}
                {originalLanguage && ` (${originalLanguage.toUpperCase()})`}
              </span>
            </div>
          </div>

          <p className="text-sm text-gray-300 mt-3">
            <Film className="inline w-4 h-4 text-rose-500 mr-1" />
            {genre?.length
              ? genre.map((g: GenreResponse) => g.name).join(' | ')
              : 'Chưa có thể loại'}
          </p>

          <div className="flex items-center gap-2 mt-4">
            <a
              href={trailerUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-7 py-3 bg-gray-800 hover:bg-gray-900 rounded-md text-sm font-medium active:scale-95 transition"
            >
              <PlayCircleIcon className="w-5 h-5" />
              {trailerUrl ? 'Xem Trailer' : 'Trailer chưa có'}
            </a>

            <Button>
              <Link
                href="#dateSelect"
                className="px-10 py-3 rounded-md text-sm font-medium active:scale-95 transition"
              >
                Mua vé
              </Link>
            </Button>

            <button className="bg-gray-700 p-2.5 rounded-full active:scale-95 transition hover:bg-gray-600">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


MovieHeader.Skeleton = function MovieHeaderSkeleton() {
  return (
    <div className="flex flex-col w-full flex-wrap md:flex-row items-center gap-8 mx-auto aspect-video rounded-2xl relative overflow-hidden bg-gray-900">
      {/* Overlay tối */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

      {/* Nội dung */}
      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 px-6 md:px-12 py-8 w-full">
        {/* Poster Skeleton */}
        <Skeleton className="rounded-xl h-[416px] w-[288px]" />

        {/* Info skeleton */}
        <div className="flex flex-1 flex-col gap-3 text-white max-w-2xl">
          <BlurCircle top="-100px" left="-100px" />

          {/* Sub info row */}
          <div className="flex items-center gap-2 text-sm font-bold">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-6" />
            <Skeleton className="h-4 w-16" />
          </div>

          {/* Title + original title */}
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-1/2" />

          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <Skeleton className="h-5 w-5 rounded-full" />
            <Skeleton className="h-4 w-12" />
          </div>

          {/* Overview */}
          <Skeleton className="h-20 w-full mt-3" />

          {/* Grid info */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>

          {/* Genres */}
          <Skeleton className="h-4 w-1/2 mt-3" />

          {/* Buttons */}
          <div className="flex items-center gap-4 mt-4">
            <Skeleton className="h-10 w-32 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
