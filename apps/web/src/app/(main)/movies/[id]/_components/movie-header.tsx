'use client';
import Image from 'next/image';
import { BlurCircle } from '../../../../../components/blur-circle';
import { Heart, PlayCircleIcon, StarIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@movie-hub/shacdn-ui/button';

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
  <div className="flex flex-col w-full flex-wrap md:flex-row items-center gap-8 px-6 mx-auto aspect-video rounded-2xl -z-10">
    <Image
      src="https://scontent.fsgn19-1.fna.fbcdn.net/v/t39.30808-6/496448427_23999126249671308_7117960729654160791_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=86c6b0&_nc_eui2=AeGKfeXJNzZH7uE0RPpzn1snZu7kbpjy0Rdm7uRumPLRF4uLevUYMKrNox8Rvm5uZeWTFaNB6Pg62RQILnkFEymz&_nc_ohc=lznGzgpT8qkQ7kNvwGreQFz&_nc_oc=AdkI7zxMY6tjobg3-o_7RxqSmt8hIAJHCTVUhXatY5J9NQBfc1ybycuhjrk7e67nMDg&_nc_zt=23&_nc_ht=scontent.fsgn19-1.fna&_nc_gid=oyyaOA9hoPprTepwOglojg&oh=00_AffkcllvuTfGW4ilzwQZBocxG2LgN4z3kwQ1pbnnq55Ltg&oe=68F6F890"
      alt={title}
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
        src={posterUrl}
        alt={title}
        className="rounded-xl h-[416px] w-[288px] object-cover shadow-lg"
      />
      <div className="flex flex-col gap-3 text-white max-w-xl">
        <BlurCircle top="-100px" left="-100px" />
        <p className="text-rose-400 font-bold">{language}</p>
        <h1 className="text-4xl font-semibold">{title}</h1>
        <div className="flex items-center gap-2 text-gray-200">
          <StarIcon className="w-5 h-5 text-rose-400 fill-rose-400" />
          {rating} / 10
        </div>
        <p className="text-gray-300 mt-2 text-sm leading-tight">
          {description}
        </p>
        <p className="text-gray-400">{duration}</p>

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
