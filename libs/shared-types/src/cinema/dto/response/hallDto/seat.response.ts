import {
  SeatStatusEnum,
  SeatTypeEnum,
} from '@movie-hub/shared-types/cinema/enum';

export interface SeatResponse {
  id: string;
  row_letter: string;
  seat_number: number;
  type: SeatTypeEnum;
  status: SeatStatusEnum;
}

export interface PhysicalSeatRowDto {
  row: string;
  seats: SeatResponse[];
}
