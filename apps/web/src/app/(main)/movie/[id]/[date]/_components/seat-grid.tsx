'use client';
import { Seat } from './seat';

interface SeatGridProps {
  groupRows: string[][];
  selectedSeats: string[];
  onSeatClick: (seatId: string) => void;
}

export const SeatGrid = ({
  groupRows,
  selectedSeats,
  onSeatClick,
}: SeatGridProps) => {
  const renderSeats = (row: string, count = 9) => (
    <div key={row} className="flex gap-2 mt-2">
      <div className="flex flex-wrap items-center justify-center gap-2">
        {Array.from({ length: count }, (_, i) => {
          const seatId = `${row}${i + 1}`;
          return (
            <Seat
              key={seatId}
              seatId={seatId}
              isSelected={selectedSeats.includes(seatId)}
              onClick={onSeatClick}
            />
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
      <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
        {groupRows[0].map((row) => renderSeats(row))}
      </div>
      <div className="grid grid-cols-2 gap-11">
        {groupRows.slice(1).map((group, idx) => (
          <div key={idx}>{group.map((row) => renderSeats(row))}</div>
        ))}
      </div>
    </div>
  );
};
