import {
  SeatStatusEnum,
  SeatTypeEnum,
} from '@movie-hub/shared-types/cinema/enum';

export interface SeatResponse {
  id: string;
  rowLetter: string;
  seatNumber: number;
  type: SeatTypeEnum;
  status: SeatStatusEnum;
}

export interface PhysicalSeatRowDto {
  row: string;
  seats: SeatResponse[];
}
