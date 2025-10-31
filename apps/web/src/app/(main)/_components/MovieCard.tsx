import { Button } from '@movie-hub/shacdn-ui/button';
import { Skeleton } from '@movie-hub/shacdn-ui/skeleton';
import { AgeRatingEnum, LanguageOptionEnum } from '@movie-hub/shared-types';
import { StarIcon, Clock, Globe } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

type Props = {
  id: string;
  title: string;
  posterUrl: string;
  backdropUrl: string;
  runtime: number;
  ageRating: AgeRatingEnum;
  productionCountry: string;
  languageType: LanguageOptionEnum;
};

export default function MovieCard({
  id,
  title,
  backdropUrl,
  runtime,
  ageRating,
  productionCountry,
  languageType,
}: Props) {
  const router = useRouter();
  useEffect(() => {
    router.prefetch(`/movies/${id}`);
  }, [router, id]);
  const onClickDetail = useCallback(() => {
    router.push(`/movies/${id}`);
    scrollTo(0, 0);
  }, [router, id]);

  const safeBackdrop =
    typeof backdropUrl === 'string' && backdropUrl.trim() !== ''
      ? backdropUrl
      : '/images/placeholder-bg.png';

  return (
    <div className="flex flex-col justify-between p-4 bg-gray-900 rounded-2xl hover:-translate-y-1 transition duration-300 w-66">
      {/* Backdrop image */}
      <div
        onClick={onClickDetail}
        className="relative w-full h-60 rounded-lg cursor-pointer overflow-hidden"
      >
        <Image
          src={safeBackdrop}
          alt={title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Movie info */}
      <div className="mt-3 space-y-4">
        <p className="font-semibold text-white truncate">{title}</p>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2 text-gray-400 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{runtime} phút</span>
          </div>

          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            <span>{productionCountry}</span>
          </div>

          <p>
            {languageType} | {ageRating}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pb-2">
        <Link href={`/movies/${id}`}>
          <Button className="rounded-xl">Mua vé</Button>
        </Link>

        <p className="flex items-center gap-1 text-sm text-gray-400">
          <StarIcon className="w-4 h-4 text-rose-500 fill-rose-500" />
          5.0
        </p>
      </div>
    </div>
  );
}

MovieCard.Skeleton = function MovieCardSkeleton() {
  return (
    <div className="flex flex-col justify-between p-4 bg-gray-900 rounded-2xl w-66 animate-pulse">
      {/* Poster */}
      <Skeleton className="w-full h-60 rounded-lg mb-3" />

      {/* Title */}
      <Skeleton className="h-5 w-3/4 rounded mb-2" />

      {/* Info row/col responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2">
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-4 w-16 rounded" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pb-2">
        <Skeleton className="h-9 w-20 rounded-xl" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-6 rounded" />
        </div>
      </div>
    </div>
  );
};
