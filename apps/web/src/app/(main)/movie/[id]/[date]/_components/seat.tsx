'use client';

interface SeatProps {
  seatId: string;
  isSelected: boolean;
  onClick: (seatId: string) => void;
}

export const Seat = ({ seatId, isSelected, onClick }: SeatProps) => {
  return (
    <button
      onClick={() => onClick(seatId)}
      className={`h-8 w-8 rounded-lg border border-rose-500/90 cursor-pointer ${
        isSelected ? 'bg-rose-500 text-white' : 'hover:bg-rose-500/20'
      }`}
    >
      {seatId}
    </button>
  );
};
