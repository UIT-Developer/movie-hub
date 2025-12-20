import { Clapperboard } from 'lucide-react';
import Link from 'next/link';

export const Logo = () => {
  return (
    <Link
      href="/"
      className="hover:opacity-75 transition items-center gap-x-2 flex"
    >
      <Clapperboard size={36} color="white" />
      <p className="text-lg font-bold hidden 2xl:flex text-gray-100">
        Moviehub
      </p>
    </Link>
  );
};
