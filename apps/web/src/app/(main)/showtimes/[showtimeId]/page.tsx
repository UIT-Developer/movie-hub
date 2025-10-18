'use client';
import { BlurCircle } from 'apps/web/src/components/blur-circle';
import { useBookingStore } from 'apps/web/src/stores/booking-store';
import { CinemaScreen } from './_components/cinema-screen';
import { SeatGrid } from './_components/seat-grid';
import { TicketTypeList } from './_components/ticket-list';
import { mockShowtimeData } from 'apps/web/src/mock-data/mock-showtime-data';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { toast } from 'sonner';

const MAX_TICKETS = 8;
const ticketTypes = [
  { key: 'adult', label: 'Người lớn', price: 100000 },
  { key: 'student', label: 'Học sinh/Sinh viên', price: 80000 },
  { key: 'child', label: 'Trẻ em', price: 60000 },
];
const SeatBookingPage = () => {
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
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40  ">
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
  );
};

export default SeatBookingPage;
