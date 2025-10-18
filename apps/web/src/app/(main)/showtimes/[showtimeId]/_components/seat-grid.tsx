import { ReservationStatusEnum, SeatItemDto, SeatRowDto, SeatStatusEnum } from '@movie-hub/shared-types';
import { Seat } from './seat';


// interface SeatGridProps {
//   seatMap: SeatRowDto[];
//   seatReservationStatus: Record<string, ReservationStatusEnum>;
//   selectedSeats: string[];
//   onSeatClick: (seatId: string) => void;
// }

// export const SeatGrid = ({
//   seatMap,
//   seatReservationStatus,
//   selectedSeats,
//   onSeatClick,
// }: SeatGridProps) => {
//   const renderSeats = (rowData: SeatRowDto) => (
//     <div key={rowData.row} className="flex gap-2 mt-2">
//       <div className="flex flex-wrap items-center justify-center gap-2">
//         {rowData.seats.map((seat: SeatItemDto) => {
//           const isSelected = selectedSeats.includes(seat.id);
//           const reservationStatus = seatReservationStatus[seat.id];
//           const isDisabled =
//             seat.seatStatus !== SeatStatusEnum.ACTIVE ||
//             reservationStatus === ReservationStatusEnum.CONFIRMED;
//           const isHeld = reservationStatus === ReservationStatusEnum.HELD;

//           return (
//             <Seat
//               key={seat.id}
//               seatId={seat.id}
//               isSelected={isSelected}
//               isDisabled={isDisabled}
//               isHeld={isHeld}
//               onClick={() => !isDisabled && onSeatClick(seat.id)}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );

//   if (!seatMap || seatMap.length === 0) return null;

//   // Hàng đầu tiên
//   const firstRow = seatMap[0];
//   const remainingRows = seatMap.slice(1);

//   return (
//     <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
//       {/* render hàng đầu tiên */}
//       <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
//         {renderSeats(firstRow)}
//       </div>

//       {/* render các hàng còn lại theo 2 cột */}
//       <div className="grid grid-cols-2 gap-11">
//         {remainingRows.map((row) => renderSeats(row))}
//       </div>
//     </div>
//   );
// };

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
