'use client';
import { useState, useRef, useEffect } from 'react';
import { Input } from '@movie-hub/shacdn-ui/input';
import { Button } from '@movie-hub/shacdn-ui/button';
import { SearchIcon, XIcon } from 'lucide-react';

export const Search = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

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
        <div className="flex items-center gap-2 bg-black/90 p-2 rounded-lg shadow-lg">
          <Input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm rạp..."
            className="w-48 md:w-64"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setOpen(false);
              setQuery('');
            }}
          >
            <XIcon className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
