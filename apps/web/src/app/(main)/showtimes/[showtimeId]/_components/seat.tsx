'use client';

interface SeatProps {
  seatId: string;
  isSelected: boolean;
  isDisabled?: boolean;
  isHeld?: boolean;
  onClick: (seatId: string) => void;
}

export const Seat = ({ seatId, isSelected, isDisabled, isHeld, onClick }: SeatProps) => {
  return (
    <button
      onClick={() => onClick(seatId)}
      className={`h-8 w-8 rounded-lg border border-rose-500/90 cursor-pointer ${
        isSelected ? 'bg-rose-500 text-white' : 'hover:bg-rose-500/20'
      } ${isDisabled ? 'bg-gray-700 cursor-not-allowed' : ''} ${
        isHeld ? 'border border-rose-500 cursor-not-allowed' : ''
      }`}
      disabled={isDisabled || isHeld}
    >
      {seatId}
    </button>
  );
};
