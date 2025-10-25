import {
  ReservationStatusEnum,
  SeatItemDto,
  SeatRowDto,
  SeatStatusEnum,
} from 'apps/web/src/libs/types/showtime.type';
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
  seatMap: SeatRowDto[]; // Dữ liệu từ BE
  selectedSeats: string[];
  seatReservationStatus: Record<string, ReservationStatusEnum>;
  seatHeldByUser: Record<string, boolean>;
  onSeatClick: (seatId: string) => void;
}

export const SeatGrid = ({
  seatMap,
  selectedSeats,
  seatReservationStatus,
  seatHeldByUser,
  onSeatClick,
}: SeatGridProps) => {
  const renderSeats = (rowData: SeatRowDto) => (
    <div key={rowData.row} className="flex gap-2">
      {rowData.seats.map((seat: SeatItemDto) => {
        const isSelected = selectedSeats.includes(seat.id);
        const reservationStatus = seatReservationStatus[seat.id];
        const isDisabled = seat.seatStatus !== SeatStatusEnum.ACTIVE;
        const isConfirmed =
          reservationStatus === ReservationStatusEnum.CONFIRMED;
        const isHeldingByOther =
          reservationStatus === ReservationStatusEnum.HELD &&
          !seatHeldByUser[seat.id];

        return (
          <Seat
            number={seat.number}
            key={seat.id}
            seatId={seat.id}
            isSelected={isSelected}
            isDisabled={isDisabled}
            isConfirmed={isConfirmed}
            isHeld={isHeldingByOther}
            onClick={() => !isDisabled && onSeatClick(seat.id)}
          />
        );
      })}
    </div>
  );

  if (!seatMap || seatMap.length === 0) return null;

  // Hàng đầu tiên full-width
  const firstRow = seatMap[0];
  const remainingRows = seatMap.slice(1);

  return (
    <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
      {/* Hàng đầu tiên */}
      <div className="grid grid-cols-2 md:grid-cols-1 gap-8 md:gap-2 mb-6">
        {renderSeats(firstRow)}
      </div>

      {/* Các hàng còn lại chia 2 cột */}
      <div className="grid grid-cols-2 gap-11">
        {remainingRows.map((row) => renderSeats(row))}
      </div>
    </div>
  );
};
