'use client';

import { Button } from '@movie-hub/shacdn-ui/button';
import { is } from 'zod/v4/locales';

interface SeatProps {
  number: number;
  seatId: string;
  isSelected: boolean;
  isConfirmed?: boolean;
  isDisabled?: boolean;
  isHeld?: boolean;
  onClick: (seatId: string) => void;
}

export const Seat = ({
  number,
  seatId,
  isSelected,
  isConfirmed,
  isDisabled,
  isHeld,
  onClick,
}: SeatProps) => {
  return (
    <Button
      onClick={() => onClick(seatId)}
      className={`h-8 w-8 rounded-lg border border-rose-500/90 cursor-pointer bg-transparent
    ${isSelected ? 'bg-rose-500 text-white' : 'hover:bg-rose-500/20'}
    ${isConfirmed ? 'bg-rose-700 text-neutral-500' : ''}
    ${isDisabled ? 'bg-gray-700 cursor-not-allowed' : ''}
    ${isHeld ? 'bg-neutral-400 animate-pulse cursor-not-allowed' : ''}
  `}
      disabled={isDisabled || isHeld || isConfirmed}
    >
      {number}
    </Button>
  );
};
