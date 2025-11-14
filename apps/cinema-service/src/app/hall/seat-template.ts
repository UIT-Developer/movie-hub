import { LayoutTypeEnum } from '@movie-hub/shared-types';
import { SeatStatus, SeatType } from 'apps/cinema-service/generated/prisma';

export const StandardLayoutTemplate = {
  capacity: 100,
  rows: 10, // A → J
  seats: [
    ...['A', 'B', 'C', 'F', 'G', 'H'].flatMap((row) =>
      Array.from({ length: 10 }, (_, i) => ({
        row_letter: row,
        seat_number: i + 1,
        type: SeatType.STANDARD,
      }))
    ),

    // Row D & E (VIP giữa)
    ...['D', 'E'].flatMap((row) =>
      Array.from({ length: 10 }, (_, i) => ({
        row_letter: row,
        seat_number: i + 1,
        type: i >= 3 && i <= 6 ? SeatType.VIP : SeatType.STANDARD,
      }))
    ),

    // Row I & J (ghế đôi)
    ...['I', 'J'].flatMap((row) =>
      Array.from({ length: 10 }, (_, i) => ({
        row_letter: row,
        seat_number: i + 1,
        type: SeatType.COUPLE,
      }))
    ),
  ],
};

export const DualAisleLayoutTemplate = {
  capacity: 96,
  rows: 8, // A → H
  seats: [
    ...['A', 'B', 'E', 'F', 'G', 'H'].flatMap((row) =>
      Array.from({ length: 13 }, (_, i) => {
        if (i === 3 || i === 8) return null;
        return {
          row_letter: row,
          seat_number: i + 1,
          type: SeatType.STANDARD,
        };
      }).filter(Boolean)
    ),

    // Row C & D (VIP giữa 5–7)
    ...['C', 'D'].flatMap((row) =>
      Array.from({ length: 13 }, (_, i) => {
        if (i === 3 || i === 8) return null;
        return {
          row_letter: row,
          seat_number: i + 1,
          type: i >= 4 && i <= 6 ? SeatType.VIP : SeatType.STANDARD,
        };
      }).filter(Boolean)
    ),
  ],
};

export const StadiumLayoutTemplate = {
  rows: 11, // A → K
  capacity: 0,
  seats: [],
};

const stadiumRows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

stadiumRows.forEach((row, idx) => {
  const baseSeats = 10; // hàng đầu 10 ghế
  const extra = Math.floor(idx / 2); // mỗi 2 hàng tăng 1 ghế
  const totalSeats = baseSeats + extra; // tối đa 16 ghế

  for (let i = 1; i <= totalSeats; i++) {
    StadiumLayoutTemplate.seats.push({
      row_letter: row,
      seat_number: i,
      type:
        row === 'F' || row === 'G' || row === 'H'
          ? SeatType.VIP // 3 hàng VIP chính giữa
          : SeatType.STANDARD,
      tier: idx + 1, // mô phỏng bậc stadium
    });
  }
});

// Tính capacity
StadiumLayoutTemplate.capacity = StadiumLayoutTemplate.seats.length;

export const HallSeatsTemplates: Record<LayoutTypeEnum, any> = {
  [LayoutTypeEnum.STANDARD]: StandardLayoutTemplate,
  [LayoutTypeEnum.DUAL_AISLE]: DualAisleLayoutTemplate,
  [LayoutTypeEnum.STADIUM]: StadiumLayoutTemplate,
};
