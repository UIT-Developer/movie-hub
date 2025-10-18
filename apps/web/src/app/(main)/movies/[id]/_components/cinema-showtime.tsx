'use client';
import { useState, useMemo } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

interface Showtime {
  id: string;
  time: string;
  format: string;
}

interface CinemaShowtimeProps {
  cinemaId: string;
  name: string;
  location: string;
  showtimes: Showtime[];
  onSelectShowtime: (showtimeId: string) => void;
}

export const CinemaShowtime = ({
  cinemaId,
  name,
  location,
  showtimes,
  onSelectShowtime,
}: CinemaShowtimeProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedShowtime, setSelectedShowtime] = useState<string | null>(null);

  const handleClick = (showtimeId: string) => {
    setSelectedShowtime(showtimeId);
    onSelectShowtime(showtimeId);
  };

  // 🔹 Group showtimes by format
  const groupedShowtimes = useMemo(() => {
    return showtimes.reduce((acc, s) => {
      if (!acc[s.format]) acc[s.format] = [];
      acc[s.format].push(s);
      return acc;
    }, {} as Record<string, Showtime[]>);
  }, [showtimes]);

  return (
    <div className="bg-rose-700/20 text-white rounded-lg overflow-hidden transition-all w-full">
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-rose-700/30 transition-colors w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <p className="text-rose-400 font-bold text-lg">{name}</p>
          <p className="text-sm text-neutral-300">{location}</p>
        </div>
        {isOpen ? (
          <ChevronUpIcon className="text-rose-400" />
        ) : (
          <ChevronDownIcon className="text-rose-400" />
        )}
      </div>

      {/* Content */}
      {isOpen && (
        <div className="p-4 border-t border-rose-700/40 space-y-5">
          {Object.entries(groupedShowtimes).map(([format, times]) => (
            <div key={format}>
              <p className="font-semibold text-rose-200 mb-3">{format}</p>
              <div className="flex flex-wrap gap-3">
                {times.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleClick(s.id)}
                    className={`border rounded-md px-3 py-1 transition-all ${
                      selectedShowtime === s.id
                        ? 'bg-rose-600 text-white border-rose-500'
                        : 'text-rose-400 border-rose-500/60 hover:bg-rose-600 hover:text-white hover:border-rose-500'
                    }`}
                  >
                    {s.time}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
