'use client';
import { Button } from '@movie-hub/shacdn-ui/button';
import { Input } from '@movie-hub/shacdn-ui/input';
import { CinemaLocationResponse } from 'apps/web/src/libs/types/cinema.type';
import { SearchIcon, XIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

export const Search = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // const { data: cinemas, isLoading } = useSearchCinemas(query);
  // const list = cinemas ?? [];

  const handleSearch = useDebouncedCallback((value: string) => {
    setQuery(value);
  }, 300);

  const handleClear = () => {
    setQuery('');
    // nếu muốn giữ popup mở thì bỏ dòng dưới
    setOpen(false);
  };

  const handleSelect = (cinema: CinemaLocationResponse) => {
    setOpen(false);
    // ví dụ: router.push(`/cinemas/${cinema.id}`)
  };
  return (
    <div className="relative flex items-center">
      {/* Icon search luôn hiển thị */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(!open)}
        className="text-white rounded-full z-10"
      >
        <SearchIcon className="w-6 h-6" />
      </Button>

      {/* Input overlay tuyệt đối, không chiếm layout */}
      <div
        className={`absolute right-0 top-0 transform translate-x-0 translate-y-full mt-2 transition-all duration-300 ${
          open
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="bg-black/90 p-2 rounded-lg shadow-lg w-60 md:w-72">
          {/* Thanh input */}
          <div className="flex items-center gap-2">
            <Input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm rạp..."
              className="w-full"
            />
            <Button variant="outline" size="icon" onClick={handleClear}>
              <XIcon className="w-5 h-5" />
            </Button>
          </div>

          {/* Popup kết quả bên dưới */}
          {/* {query.trim() !== '' && (
            <div className="mt-2 max-h-60 overflow-y-auto border-t border-white/10 pt-1">
              {cinemas.length > 0 ? (
                filteredCinemas.map((cinema) => (
                  <button
                    key={cinema}
                    type="button"
                    className="w-full text-left text-sm px-2 py-1.5 rounded-md hover:bg-white/10"
                    onClick={() => handleSelect(cinema)}
                  >
                    {cinema}
                  </button>
                ))
              ) : (
                <p className="text-xs text-gray-400 px-2 py-2">
                  Không tìm thấy rạp phù hợp
                </p>
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
