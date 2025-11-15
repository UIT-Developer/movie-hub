'use client';

import { Button } from '@movie-hub/shacdn-ui/button';
import { SeatTypeEnum } from 'apps/web/src/libs/types/showtime.type';

interface SeatProps {
  number: number; // số ghế đầu tiên
  seatId: string;
  type: SeatTypeEnum;
  isSelected: boolean;
  isConfirmed?: boolean;
  isDisabled?: boolean;
  isHeld?: boolean;
  onClick: (seatId: string) => void;
}

export const Seat = ({
  number,
  seatId,
  type,
  isSelected,
  isConfirmed,
  isDisabled,
  isHeld,
  onClick,
}: SeatProps) => {
  const baseClass =
    'rounded-lg border cursor-pointer flex items-center justify-center';

  // Kiểu ghế
  let typeClass = '';
  switch (type) {
    case SeatTypeEnum.STANDARD:
      typeClass = 'border-rose-500/90 w-8 h-8';
      break;
    case SeatTypeEnum.VIP:
      typeClass = 'border-yellow-500 w-8 h-8';
      break;
    case SeatTypeEnum.COUPLE:
      typeClass = 'border-purple-500 w-16 h-8';
      break;
  }

  // Trạng thái
  let stateClass = 'bg-transparent';
  if (isSelected) stateClass = 'bg-rose-500 text-white';
  if (isConfirmed)
    stateClass = 'bg-rose-700 text-neutral-200 cursor-not-allowed';
  if (isDisabled) stateClass = 'bg-gray-700 cursor-not-allowed';
  if (isHeld) stateClass = 'bg-neutral-400 animate-pulse cursor-not-allowed';

  // Ghế đôi với nếp gấp
  if (type === SeatTypeEnum.COUPLE) {
    return (
      <Button
        onClick={() => onClick(seatId)}
        className={`${baseClass} ${typeClass} ${stateClass} p-0`}
        disabled={isDisabled || isHeld || isConfirmed}
      >
        <div className="flex w-full h-full gap-1">
          <div className="flex-1 border-r border-purple-500 flex items-center justify-center">
            {number}
          </div>
          <div className="flex-1 flex items-center justify-center">
            {number + 1}
          </div>
        </div>
      </Button>
    );
  }

  // Ghế đơn
  return (
    <Button
      onClick={() => onClick(seatId)}
      className={`${baseClass} ${typeClass} ${stateClass}`}
      disabled={isDisabled || isHeld || isConfirmed}
    >
      {number}
    </Button>
  );
};
