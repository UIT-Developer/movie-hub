import { DayTypeEnum, SeatTypeEnum } from '@movie-hub/shared-types/cinema/enum';

export interface TicketPricingResponse {
  id: string;
  hallId: string;
  seatType: SeatTypeEnum;
  dayType: DayTypeEnum;
  price: number;
}
