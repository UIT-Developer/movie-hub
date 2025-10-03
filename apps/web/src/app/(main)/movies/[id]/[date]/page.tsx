'use client';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { BlurCircle } from '../../../../../components/blur-circle';
import { AvailableTiming } from './_components/available-timing';
import { SeatGrid } from './_components/seat-grid';
import { CinemaScreen } from './_components/cinema-screen';

const dateTime = ['08:00', '09:00', '10:00'];

const SeatBookingPage = () => {
  const groupRows = [
    ['A', 'B'],
    ['C', 'D'],
    ['E', 'F'],
    ['G', 'H'],
    ['I', 'J'],
  ];

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  const handleSeatClick = useCallback(
    (seatId: string) => {
      if (!selectedTime) {
        return toast.error('Please select time first');
      }
      if (!selectedSeats.includes(seatId) && selectedSeats.length > 4) {
        return toast.error('You can only select 5 seats');
      }
      setSelectedSeats((prev) =>
        prev.includes(seatId)
          ? prev.filter((s) => s !== seatId)
          : [...prev, seatId]
      );
    },
    [selectedSeats, selectedTime]
  );

  return (
    <div className="flex flex-col md:flex-row px-6 md:px-16 lg:px-40 py-[120px] md:pt-[120px]">
      <AvailableTiming
        times={dateTime}
        selectedTime={selectedTime}
        onSelect={setSelectedTime}
      />
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
      </div>
    </div>
  );
};

export default SeatBookingPage;
