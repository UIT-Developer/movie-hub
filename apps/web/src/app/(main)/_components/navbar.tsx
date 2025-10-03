'use client';
import Link from 'next/link';
import { Clapperboard, MenuIcon, SearchIcon, XIcon } from 'lucide-react';
import { useCallback, useState } from 'react';
import { useClerk, UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@movie-hub/shacdn-ui/button';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  return (
    <nav className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5 ">
      <Link href="/" className="max-md:flex-1">
        <Clapperboard size={36} color="white" />
      </Link>

      <div
        className="max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium
  max-md:text-lg z-50 flex flex-col md:flex-row items-center
  max-md:justify-center gap-8 min-md:px-8 py-3 max-md:h-screen
  md:rounded-full backdrop-blur bg-black/70 md:bg-white/10 md:border
  border-gray-300/20 overflow-hidden transition-[width] duration-300 p-4 text-white"
      >
        <XIcon className="md:hidden absolute top-6 right-6 w-6 h-5 cursor-pointer" />

        <Link href="/">Home</Link>
        <Link href="/theaters">Movies</Link>
        <Link href="/releases">Releases</Link>
        <Link href="/favorite">Favorites</Link>
      </div>

      <div className="flex items-center gap-8">
        <SearchIcon
          color="white"
          className="max-md:hidden w-6 h-6 cursor-pointer"
        />
        {!user ? (
          <Button
            onClick={() => openSignIn()}
            className="px-4 py-1 sm:px-7 sm:py-2 text-gray-50 bg-rose-500 hover:bg-rose-500/90 transition rounded-full font-medium cursor-pointer"
          >
            Login
          </Button>
        ) : (
          <UserButton />
        )}
      </div>
      <MenuIcon
        color="white"
        className="max-md:ml-4 md:hidden w-8 h-8 cursor-pointer"
      />
    </nav>
  );
};
