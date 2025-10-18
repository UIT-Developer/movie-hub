'use client';
import Image from 'next/image';
import { BlurCircle } from '../../../../../components/blur-circle';
import {
  Clock,
  FileText,
  FileTextIcon,
  Heart,
  PlayCircleIcon,
  StarIcon,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@movie-hub/shacdn-ui/button';
import { MovieDetailResponse } from '@movie-hub/shared-types';
interface MovieHeaderProps {
  data: MovieDetailResponse;
}

export const MovieHeader = ({ data }: MovieHeaderProps) => (
  <div className="flex flex-col w-full flex-wrap md:flex-row items-center gap-8 mx-auto aspect-video rounded-2xl">
    <Image
      src={data.backdropUrl}
      alt={data.title}
      fill
      priority
      className="object-cover brightness-20 rounded-2xl"
    />
    {/* Overlay tối để chữ nổi hơn */}
    <div className="absolute inset-0 bg-black/50"></div>

    {/* Nội dung */}
    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
      <Image
        width={288}
        height={104}
        src={data.posterUrl}
        alt={data.title}
        className="rounded-xl h-[416px] w-[288px] object-cover shadow-lg"
      />
      <div className="flex flex-1 flex-col gap-3 text-white max-w-xl">
        <BlurCircle top="-100px" left="-100px" />
        <p className="text-rose-400 font-bold">{data.languageType}</p>
        <h1 className="text-4xl font-semibold">{data.title}</h1>
        <div className="flex items-center gap-2 text-gray-200">
          <StarIcon className="w-5 h-5 text-rose-400 fill-rose-400" />8 / 10
        </div>
        <div className="flex items-center gap-2 mt-2 text-gray-300">
          <FileTextIcon className="w-10 h-10 text-rose-500" />
          <p className="text-sm leading-tight">{data.overview}</p>
        </div>

        <div className="flex items-center gap-2 mt-2 text-gray-400">
          <Clock className="w-4 h-4 text-rose-500" />
          <p className="text-sm">{data.runtime}&apos;</p>
        </div>
        <p className="text-sm">
          {data.genre.map((g)=>g.name).join(" | ")} - {data.productionCountry}
        </p>

        <div className="flex items-center gap-4 mt-4">
          <button className="flex items-center gap-2 px-7 py-3 bg-gray-800 hover:bg-gray-900 rounded-md text-sm font-medium active:scale-95 transition">
            <PlayCircleIcon className="w-5 h-5" />
            Xem Trailer
          </button>

          <Button>
            <Link
              href="#dateSelect"
              className="px-10 py-3 rounded-md text-sm font-medium active:scale-95 transition"
            >
              Mua vé
            </Link>
          </Button>

          <button className="bg-gray-700 p-2.5 rounded-full active:scale-95 transition">
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);
