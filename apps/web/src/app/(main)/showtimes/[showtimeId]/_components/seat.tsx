'use client';

import { Button } from '@movie-hub/shacdn-ui/button';
import { SeatTypeEnum } from 'apps/web/src/libs/types/showtime.type';
import { Accessibility } from 'lucide-react';

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
      typeClass = 'w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-rose-500/90';
      break;

    case SeatTypeEnum.VIP:
      typeClass = 'w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-yellow-500';
      break;

    case SeatTypeEnum.PREMIUM:
      typeClass =
        'w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 border-blue-400 shadow-[0_0_6px_#60a5fa]';
      break;

    case SeatTypeEnum.WHEELCHAIR:
      typeClass =
        'w-5 h-5 sm:w-7 sm:h-7 md:w-9 md:h-9 border-cyan-400 flex items-center justify-center text-[10px] md:text-xs';
      break;

    case SeatTypeEnum.COUPLE:
      typeClass = 'w-8 h-4 sm:w-12 sm:h-6 md:w-16 md:h-8 border-purple-500';
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
        <div className="flex w-full h-full items-center justify-center">
          {/* Hiển thị một số duy nhất ở giữa */}
          <span className="font-semibold">{number}</span>
        </div>
      </Button>
    );
  }
   if (type === SeatTypeEnum.WHEELCHAIR) {
    return (
      <Button
        onClick={() => onClick(seatId)}
        className={`${baseClass} ${typeClass} ${stateClass}`}
        disabled={isDisabled || isHeld || isConfirmed}
      >
        <Accessibility className="w-3 h-3 md:w-4 md:h-4" />
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
