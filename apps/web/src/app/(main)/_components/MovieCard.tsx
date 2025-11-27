'use client';

import { AgeRatingEnum, LanguageOptionEnum } from '@movie-hub/shared-types';
import { Clock, Globe } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

type Props = {
  id: string;
  title: string;
  posterUrl: string;
  runtime: number;
  ageRating: AgeRatingEnum;
  productionCountry: string;
  languageType: LanguageOptionEnum;
};

export default function MovieCard({
  id,
  title,
  posterUrl,
  runtime,
  ageRating,
  productionCountry,
  languageType,
}: Props) {
  const router = useRouter();

  const onClickDetail = useCallback(() => {
    router.push(`/movies/${id}`);
    scrollTo(0, 0);
  }, [router, id]);

  const safePoster =
    typeof posterUrl === 'string' && posterUrl.trim() !== ''
      ? posterUrl
      : '/images/placeholder-bg.png';

  return (
    <div className="w-48 flex flex-col cursor-pointer justify-center items-center group">
      {/* Poster */}
      <div
        className="relative w-full h-[280px] rounded-xl overflow-hidden group"
        onClick={onClickDetail}
      >
        <Image
          src={safePoster}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay info on hover */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-3 text-rose-200 text-xs space-y-1">
          <span className="text-center font-bold text-rose-500">
            {title}
          </span>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-rose-700" />{' '}
            <span>{runtime} phút</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-rose-700" />{' '}
            <span>{productionCountry}</span>
          </div>
          <div className="text-rose-500">
            {languageType} | {ageRating}
          </div>
        </div>
      </div>

      {/* Movie title */}
      <p
        className="mt-2 text-white group-hover:text-rose-700 font-semibold text-sm line-clamp-1 truncate w-full text-center"
        onClick={onClickDetail}
      >
        {title}
      </p>
    </div>
  );
}

MovieCard.Skeleton = function MovieCardSkeleton() {
  return (
    <div className="w-48 flex flex-col animate-pulse justify-center items-center">
      <div className="relative w-full h-[280px] rounded-xl bg-gray-800 mb-2" />
      <div className="h-4 w-32 bg-gray-700 rounded" />
    </div>
  );
};
