'use client';
import { useClerk, UserButton, useUser } from '@clerk/nextjs';
import { Button } from '@movie-hub/shacdn-ui/button';
import { Logo } from 'apps/web/src/components/logo';
import { MenuIcon, SearchIcon, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();
  return (
    <nav className="fixed top-0 left-0 w-screen z-50 bg-black/10 backdrop-blur-lg shadow-lg">
      <div className="px-6 lg:px-36 flex items-center h-20">
        <div className="max-md:flex-1">
          <Logo />
        </div>
        <div className='flex flex-1 justify-center'>
          <div
            className={`max-md:absolute max-md:top-0 max-md:left-0 max-md:font-medium
  max-md:text-lg z-50 flex flex-col md:flex-row items-center
  max-md:justify-center gap-8 md:px-8 py-3 max-md:h-screen
  md:rounded-full backdrop-blur bg-black md:bg-white/10 md:border
  border-gray-300/20 overflow-hidden transition-[width] duration-300 p-4 text-white ${
    isOpen ? 'max-md:w-full' : 'max-md:hidden'
  }`}
          >
            <XIcon
              className="md:hidden absolute top-6 right-6 w-6 h-5 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            />

            {[
              { href: '/rap', label: 'Chọn rạp' },
              { href: '/lich-chieu', label: 'Lịch chiếu' },
              { href: '/uu-dai', label: 'Ưu đãi' },
              { href: '/dich-vu', label: 'Dịch vụ' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => {
                  scrollTo(0, 0);
                  setIsOpen(false);
                }}
                className="relative group"
              >
                <span className="px-4 py-2 rounded-full font-semibold uppercase tracking-wide transition-all duration-300 bg-transparent group-hover:bg-gradient-to-r from-red-500 via-yellow-400 to-red-500 group-hover:text-black">
                  {item.label}
                </span>
                {/* Optional underline effect */}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8 ml-2">
          <SearchIcon
            color="white"
            className="max-md:hidden w-6 h-6 cursor-pointer"
          />
          { !isSignedIn ? (
            <Button
              onClick={() => openSignIn()}
              className="px-4 py-1 sm:px-7 sm:py-2 transition rounded-full font-medium cursor-pointer"
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
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>
    </nav>
  );
};
