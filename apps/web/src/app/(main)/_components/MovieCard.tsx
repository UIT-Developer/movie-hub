import { Button } from '@movie-hub/shacdn-ui/button';
import { AgeRatingEnum, LanguageOptionEnum } from '@movie-hub/shared-types';
import { StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
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
  posterUrl,
  backdropUrl,
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
  return (
    <div className="flex flex-col justify-between p-4 bg-gray-900 rounded-2xl hover:-translate-y-1 transition duration-300 w-66">
      {/* Poster */}
      <div
        onClick={() => {
          router.push(`/movies/`);
          scrollTo(0, 0);
        }}
        className="relative  w-full h-60 rounded-lg cursor-pointer"
      >
        <Image
          src={backdropUrl}
          alt={title}
          fill
          className="object-right-bottom object-cover rounded-lg"
        />
      </div>

      <p className="font-semibold mt-2 truncate text-white ">{title}</p>
      <p className="text-sm text-gray-400 mt-2 overflow-ellipsis whitespace-nowrap">
        {languageType} | {runtime}
      </p>
      <div className="flex items-center justify-between mt-4 pb-4">
        <Button onClick={onClickDetail} className="rounded-xl">Mua vé</Button>
        <p className="flex items-center gap-1 text-sm text-gray-400 mt-1 pr-1">
          <StarIcon className="w-4 h-4 text-rose-500 fill-rose-500" />
          5.0
        </p>
      </div>
    </div>
  );
}
