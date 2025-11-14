import {
  DayTypeEnum,
  SeatTypeEnum,
  TicketTypeEnum,
  TimeSlotEnum,
} from '@movie-hub/shared-types/cinema/enum';

export interface TicketPricingResponse {
  id: string;
  hallId: string;
  seatType: SeatTypeEnum;
  ticketType: TicketTypeEnum;
  dayType: DayTypeEnum;
  timeSlot: TimeSlotEnum;
  price: number;
}
