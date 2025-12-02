'use client';
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  useClerk,
  UserButton,
  useUser,
} from '@clerk/nextjs';
import { Button } from '@movie-hub/shacdn-ui/button';
import { Logo } from 'apps/web/src/components/logo';
import { MenuIcon, TicketPlus, XIcon } from 'lucide-react';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { Search } from './search';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@movie-hub/shacdn-ui/select';
import { Skeleton } from '@movie-hub/shacdn-ui/skeleton';
import { useRouter } from 'next/navigation';

export interface CinemaSelector {
  id: string;
  name: string;
}
interface NavbarProps {
  cinemas: CinemaSelector[];
}
export const Navbar = ({ cinemas }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const [cinemaSelected, setCinemaSelected] = useState<string | undefined>();

  const handleSelectCinema = (cinemaId: string) => {
    setCinemaSelected(cinemaId);
    router.push(`/cinemas/${cinemaId}`);
  };

  return (
    <nav className="fixed top-0 left-0 w-screen z-50 bg-black/10 backdrop-blur-lg shadow-lg">
      <div className="px-6 lg:px-36 flex items-center h-20">
        <div className="flex items-center gap-4">
          <Logo />
          <Select value={cinemaSelected} onValueChange={handleSelectCinema}>
            <SelectTrigger className="w-40 text-white bg-black/20 border border-gray-300/20 rounded-full px-4 py-2">
              <SelectValue placeholder="Chọn rạp" />
            </SelectTrigger>
            <SelectContent
              className="bg-black text-white rounded-lg max-h-64 overflow-y-auto"
              position="popper"
            >
              {cinemas.map((cinema) => (
                <SelectItem
                  key={cinema.id}
                  value={cinema.id}
                  className="cursor-pointer"
                >
                  {cinema.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-1 justify-center">
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
              { href: '/movies', label: 'Phim' },
              { href: '/showtimes', label: 'Lịch chiếu' },
              { href: '/promotions', label: 'Ưu đãi' },
              { href: '/services', label: 'Dịch vụ' },
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
                <span className="px-4 py-2 rounded-full font-semibold uppercase tracking-wide transition-all duration-300 bg-transparent group-hover:bg-rose-500 group-hover:text-neutral-100">
                  {item.label}
                </span>
                {/* Optional underline effect */}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-8 ml-2">
          <Search />
          {/* Khi Clerk đang load → hiện skeleton hình tròn */}
          <ClerkLoading>
            <Skeleton className="h-10 w-10 rounded-full" />
          </ClerkLoading>

          {/* Khi Clerk đã load → render SignedIn/SignedOut */}
          <ClerkLoaded>
            <SignedOut>
              <SignInButton mode="modal">
                <Button className="px-4 py-1 sm:px-7 sm:py-2 transition rounded-full font-medium cursor-pointer">
                  Login
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Vé của tôi"
                    labelIcon={<TicketPlus size={15} />}
                    onClick={() => {
                      router.push('/my-booking');
                    }}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </SignedIn>
          </ClerkLoaded>
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
