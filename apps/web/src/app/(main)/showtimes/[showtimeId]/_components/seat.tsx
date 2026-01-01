'use client';

import { Button } from '@movie-hub/shacdn-ui/button';
import { SeatTypeEnum } from '@/libs/types/showtime.type';
import { Accessibility, Star, Armchair } from 'lucide-react';
import { cn } from '@movie-hub/shacdn-utils';

interface SeatProps {
  number: number;
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
  // Base: Glassmorphic, subtle border, transition
  const baseClass =
    'relative flex items-center justify-center transition-all duration-200 p-0 rounded-md border shadow-sm hover:scale-105 active:scale-95 focus:ring-2 focus:ring-primary/20';
  
  // Default State Colors (Available)
  let stateClass = 'bg-card border-white/10 text-muted-foreground hover:border-primary/50 hover:text-primary hover:bg-primary/10';
  let iconClass = 'w-3 h-3 md:w-4 md:h-4 opacity-70';

  // Active States overrides
  if (isSelected) {
    stateClass = 'bg-primary border-primary text-primary-foreground shadow-[0_0_15px_-3px_hsl(var(--primary))] z-10 scale-110';
    iconClass = 'w-3 h-3 md:w-4 md:h-4 opacity-100';
  } else if (isConfirmed) {
    stateClass = 'bg-secondary/50 border-transparent text-muted-foreground/30 cursor-not-allowed hover:scale-100 shadow-none';
  } else if (isDisabled) {
    stateClass = 'bg-secondary/30 border-transparent opacity-20 cursor-not-allowed hover:scale-100';
  } else if (isHeld) {
    stateClass = 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500 animate-pulse cursor-not-allowed';
  }

  // Type-specific sizing and styling
  let sizeClass = 'w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[10px] sm:text-xs font-medium';
  let content = <span className={isSelected ? 'font-bold' : ''}>{number}</span>;

  switch (type) {
    case SeatTypeEnum.STANDARD:
      // Standard is default
      break;

    case SeatTypeEnum.VIP:
       // Gold/Amber accent for VIP if not selected
      if (!isSelected && !isConfirmed && !isDisabled) {
        stateClass += ' border-amber-500/40 text-amber-500/80 hover:bg-amber-500/10 hover:border-amber-500';
      }
      content = <Star className={iconClass} fill={isSelected ? "currentColor" : "none"} />;
      break;

    case SeatTypeEnum.PREMIUM:
      if (!isSelected && !isConfirmed && !isDisabled) {
        stateClass += ' border-sky-500/40 text-sky-500/80 hover:bg-sky-500/10 hover:border-sky-500';
      }
      break;

    case SeatTypeEnum.WHEELCHAIR:
      if (!isSelected && !isConfirmed && !isDisabled) {
        stateClass += ' border-cyan-500/40 text-cyan-500/80 hover:bg-cyan-500/10 hover:border-cyan-500';
      }
      content = <Accessibility className={iconClass} />;
      break;

    case SeatTypeEnum.COUPLE:
      sizeClass = 'w-12 h-6 sm:w-16 sm:h-8 md:w-20 md:h-10'; // Double width
      if (!isSelected && !isConfirmed && !isDisabled) {
        stateClass += ' border-pink-500/40 text-pink-500/80 hover:bg-pink-500/10 hover:border-pink-500';
      }
      content = (
        <div className="flex items-center gap-1">
          <Armchair className={iconClass} />
          <span className="text-[10px] font-bold">{number}</span>
        </div>
      );
      break;
  }

  return (
    <Button
      onClick={() => onClick(seatId)}
      className={`${baseClass} ${sizeClass} ${stateClass}`}
      disabled={isDisabled || isHeld || isConfirmed}
      variant="ghost" // Override shadcn default solid
    >
      {content}
    </Button>
  );
};
