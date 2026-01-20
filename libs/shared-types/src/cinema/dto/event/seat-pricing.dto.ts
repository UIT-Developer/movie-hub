import { SeatTypeEnum } from '../../enum';

export interface SeatPricingDto {
  id: string;
  hallId: string;
  rowLetter: string;
  seatNumber: number;
  type: SeatTypeEnum;
  price: number;
}

export interface SeatPricingWithTtlDto {
  seats: SeatPricingDto[];
  lockTtl: number; // Remaining lock time in seconds
}
