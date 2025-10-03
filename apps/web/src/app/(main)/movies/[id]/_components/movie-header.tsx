'use client';
import Image from 'next/image';
import { BlurCircle } from '../../../../../components/blur-circle';
import { StarIcon } from 'lucide-react';

interface MovieHeaderProps {
  title: string;
  rating: number;
  language: string;
  duration: string;
  description: string;
  posterUrl: string;
}

export const MovieHeader = ({
  title,
  rating,
  language,
  duration,
  description,
  posterUrl,
}: MovieHeaderProps) => (
  <div className="flex flex-col flex-wrap md:flex-row items-center gap-8 w-full mx-auto">
    <Image
      width={288}
      height={104}
      src={posterUrl}
      alt={title}
      className="rounded-xl h-104 max-w-72 object-cover"
    />
    <div className="flex flex-col flex-wrap gap-3">
      <BlurCircle top="-100px" left="-100px" />
      <p className="text-rose-400 font-bold">{language}</p>
      <h1 className="text-4xl text-neutral-400 font-semibold max-w-96 text-balance">
        {title}
      </h1>
      <div className="flex items-center gap-2 text-gray-300">
        <StarIcon className="w-5 h5 text-rose-400 fill-rose-400" />
        {rating} User Rating
      </div>
      <p className="text-gray-400 mt-2 text-sm leading-tight max-w-xl">
        {description}
      </p>
      <p className="text-neutral-200">{duration}</p>
    </div>
  </div>
);
