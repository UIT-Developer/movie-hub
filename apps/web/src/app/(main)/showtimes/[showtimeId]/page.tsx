'use client';
import { BlurCircle } from 'apps/web/src/components/blur-circle';
import { useBookingStore } from 'apps/web/src/stores/booking-store';
import { CinemaScreen } from './_components/cinema-screen';
import { SeatGrid } from './_components/seat-grid';
import { TicketTypeList } from './_components/ticket-list';
import { mockShowtimeData } from 'apps/web/src/mock-data/mock-showtime-data';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from 'sonner';
import { useClerk, useUser } from '@clerk/nextjs';
import { Button } from '@movie-hub/shacdn-ui/button';
import { Film, LogIn } from 'lucide-react';

const MAX_TICKETS = 8;
const ticketTypes = [
  { key: 'adult', label: 'Người lớn', price: 100000 },
  { key: 'student', label: 'Học sinh/Sinh viên', price: 80000 },
  { key: 'child', label: 'Trẻ em', price: 60000 },
];
const SeatBookingPage = () => {
  const { isSignedIn } = useUser();
  const { openSignIn } = useClerk();

 
  useEffect(() => {
    if (!isSignedIn) {
      openSignIn({
        afterSignInUrl: window.location.href,
         appearance: {
          elements: {
            modalCloseButton: { display: 'none' }, // ẩn nút close
          },
        },
      });
    }
  }, [isSignedIn, openSignIn]);
  const groupRows = [
    ['A', 'B'],
    ['C', 'D'],
    ['E', 'F'],
    ['G', 'H'],
    ['I', 'J'],
  ];
  const [ticketCounts, setTicketCounts] = useState(() =>
    Object.fromEntries(ticketTypes.map((t) => [t.key, 0]))
  );
  const totalTickets = useMemo(
    () => Object.values(ticketCounts).reduce((sum, count) => sum + count, 0),
    [ticketCounts]
  );
  const handleTicketChange = (type: string, delta: number) => {
    setTicketCounts((prev) => {
      const newCount = Math.max(0, prev[type] + delta);
      const updated = { ...prev, [type]: newCount };
      const totalTickets = Object.values(updated).reduce(
        (sum, count) => sum + count,
        0
      );
      if (totalTickets > MAX_TICKETS) {
        toast.error('Bạn chỉ có thể chọn tối đa ${MAX_TICKETS} vé!');
        return prev;
      }
      if (totalTickets < selectedSeats.length) {
        setSelectedSeats([]);
      }
      return updated;
    });
  };
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const handleSeatClick = useCallback(
    (seatId: string) => {
      if (totalTickets === 0) {
        return toast.error('Vui lòng chọn vé trước!');
      }
      if (
        !selectedSeats.includes(seatId) &&
        selectedSeats.length >= totalTickets
      ) {
        return toast.error('Số ghế đã chọn vượt quá số vé!');
      }
      setSelectedSeats((prev) =>
        prev.includes(seatId)
          ? prev.filter((s) => s !== seatId)
          : [...prev, seatId]
      );
    },
    [selectedSeats, totalTickets]
  );

  return (
    <div >
      {isSignedIn ? (
        <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40  w-full ">
          <div className="relative flex-1 flex flex-col items-center max-md:mt-16">
            <BlurCircle top="-100px" left="-100px" />
            <BlurCircle bottom="0" right="0" />
            <h1 className="text-2xl font-bold text-white">Chọn chỗ</h1>
            <CinemaScreen />
            <SeatGrid
              groupRows={groupRows}
              selectedSeats={selectedSeats}
              onSeatClick={handleSeatClick}
            />
            <TicketTypeList
              tickets={ticketTypes}
              ticketCounts={ticketCounts}
              onTicketChange={handleTicketChange}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <BlurCircle top="-100px" left="-100px" />
          <BlurCircle bottom="0" right="0" />
          {/* Icon + Text */}
          <div className="flex flex-col items-center text-center z-10">
            <Film className="w-16 h-16 text-rose-600 mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">
              Bạn cần đăng nhập để tiếp tục
            </h1>
            <p className="text-gray-400 max-w-md mb-6">
              Hãy đăng nhập để đặt chỗ, xem lịch chiếu và lưu vé yêu thích của
              bạn.
            </p>

            {/* Login button */}
            <Button
              onClick={() =>
                openSignIn({
                  afterSignInUrl: window.location.href,
                  appearance: {
                    elements: {
                      modalCloseButton: { display: 'none' },
                    },
                  },
                })
              }
              className="flex items-center gap-2 bg-rose-600 hover:bg-rose-700 text-white font-medium px-6 py-3 rounded-lg shadow-lg transition active:scale-95"
            >
              <LogIn className="w-5 h-5" />
              Đăng nhập ngay
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatBookingPage;
