import { SeatTypeEnum } from '../../enum';

export interface SeatPricingDto {
  id: string;
  hallId: string;
  rowLetter: string;
  seatNumber: number;
  type: SeatTypeEnum;
  price: number;
}
