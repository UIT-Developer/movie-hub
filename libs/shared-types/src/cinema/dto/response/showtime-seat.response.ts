import {
  DayTypeEnum,
  FormatEnum,
  LayoutTypeEnum,
  ReservationStatusEnum,
  SeatStatusEnum,
  SeatTypeEnum,
  TicketTypeEnum,
  TimeSlotEnum,
} from '../../enum';

export interface SeatItemDto {
  id: string;
  number: number;
  seatType: SeatTypeEnum;
  seatStatus: SeatStatusEnum;
  reservationStatus: ReservationStatusEnum;
  isHeldByCurrentUser?: boolean;
}

export interface SeatRowDto {
  row: string;
  seats: SeatItemDto[];
}

export interface ShowtimeInfoDto {
  id: string;
  start_time: Date;
  end_time: Date;
  dateType: DayTypeEnum;
  timeSlot: TimeSlotEnum;
  format: FormatEnum;
  language: string;
  subtitles: string[];
}

export interface TicketPricingDto {
  seatType: SeatTypeEnum;
  ticketType: TicketTypeEnum;
  price: number;
}

export interface ShowtimeSeatResponse {
  showtime: ShowtimeInfoDto;
  cinemaName: string;
  layoutType: LayoutTypeEnum;
  seat_map: SeatRowDto[];
  ticketTypes: TicketTypeEnum[];
  ticketPrices: TicketPricingDto[];
  rules: {
    max_selectable: number;
    hold_time_seconds: number;
  };
}
