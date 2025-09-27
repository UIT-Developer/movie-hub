'use client';
import { Heart, PlayCircleIcon } from 'lucide-react';
import Link from 'next/link';

export const MovieActions = () => (
  <div className="flex items-center flew-wrap gap-4 mt-4">
    <button className="flex items-center gap-2 px-7 py-3 text-sm text-white bg-gray-800 hover:bg-gray-900 transition rounded-md font-medium cursor-pointer active:scale-95">
      <PlayCircleIcon color="white" className="w-5 h-5" />
      Xem Trailer
    </button>

    <Link
      href="#dateSelect"
      className="px-10 py-3 text-sm bg-rose-500 hover:bg-rose-500/90 transition rounded-md font-medium cursor-pointer active:scale-95 text-white"
    >
      Mua vé
    </Link>

    <button className="bg-gray-700 p-2.5 rounded-full transition cursor-pointer active:scale-95">
      <Heart color="white" className="w-5 h-5" />
    </button>
  </div>
);
