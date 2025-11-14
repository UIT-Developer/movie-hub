import {
  ReservationStatusEnum,
  SeatItemDto,
  SeatRowDto,
  SeatStatusEnum,
} from 'apps/web/src/libs/types/showtime.type';
import { Seat } from './seat';

interface SeatGridProps {
  seatMap: SeatRowDto[]; // Dữ liệu từ BE
  selectedSeats: string[]; // Danh sách seatLabel (vd: A5, B10)
  seatReservationStatus: Record<string, ReservationStatusEnum>; // key = seatLabel
  seatHeldByUser: Record<string, boolean>; // key = seatLabel
  onSeatClick: (seatLabel: string) => void; // callback theo label
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
        // 👇 Tự tạo label nếu BE không trả về
        const label = `${rowData.row}${seat.number}`;

        const isSelected = selectedSeats.includes(label);
        const reservationStatus = seatReservationStatus[label];
        const isDisabled = seat.seatStatus !== SeatStatusEnum.ACTIVE;
        const isConfirmed =
          reservationStatus === ReservationStatusEnum.CONFIRMED;
        const isHeldByOther =
          reservationStatus === ReservationStatusEnum.HELD &&
          !seatHeldByUser[label];

        return (
          <Seat
            key={label}
            seatId={seat.id}
            number={seat.number}
            isSelected={isSelected}
            isDisabled={isDisabled}
            isConfirmed={isConfirmed}
            isHeld={isHeldByOther}
            onClick={() => !isDisabled && onSeatClick(label)}
          />
        );
      })}
    </div>
  );

  if (!seatMap || seatMap.length === 0) return null;

  const firstRow = seatMap[0];
  const remainingRows = seatMap.slice(1);

  return (
    <div className="flex flex-col items-center mt-10 text-xs text-gray-300">
     
        {/* Hàng đầu tiên */}
        <div className="grid grid-cols-1 gap-8 md:gap-2 mb-6">
          {renderSeats(firstRow)}
        </div>

        {/* Các hàng còn lại chia 2 cột */}
        <div className="grid grid-cols-2 gap-11">
          {remainingRows.map((row) => renderSeats(row))}
        </div>
      
    </div>
  );
};
