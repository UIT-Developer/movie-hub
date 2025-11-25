import {
  DayTypeEnum,
  FormatEnum,
  LayoutTypeEnum,
  ReservationStatusEnum,
  SeatStatusEnum,
  SeatTypeEnum,
} from '../../../enum';

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
  movieId: string;
  start_time: Date;
  end_time: Date;
  dateType: DayTypeEnum;
  format: FormatEnum;
  language: string;
  subtitles: string[];
}

export interface TicketPricingDto {
  seatType: SeatTypeEnum;
  price: number;
}

export interface ShowtimeSeatResponse {
  showtime: ShowtimeInfoDto;
  cinemaId: string;
  cinemaName: string;
  hallId: string;
  hallName: string;
  layoutType: LayoutTypeEnum;
  seat_map: SeatRowDto[];
  ticketPrices: TicketPricingDto[];
  rules: {
    max_selectable: number;
    hold_time_seconds: number;
  };
}
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

  format: FormatEnum;
  language: string;
  subtitles: string[];
}

export interface TicketPricingDto {
  seatType: SeatTypeEnum;
  price: number;
}

export interface ShowtimeSeatResponse {
  showtime: ShowtimeInfoDto;
  cinemaId: string;
  cinemaName: string;
  hallId: string;
  hallName: string;
  layoutType: LayoutTypeEnum;
  seat_map: SeatRowDto[];
  ticketPrices: TicketPricingDto[];
  rules: {
    max_selectable: number;
    hold_time_seconds: number;
  };
}