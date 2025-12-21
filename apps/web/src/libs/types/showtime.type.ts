export enum ReservationStatusEnum {
  AVAILABLE = 'AVAILABLE',
  HELD = 'HELD',
  CONFIRMED = 'CONFIRMED',
  CANCELLED = 'CANCELLED',
}
export enum SeatStatusEnum {
  ACTIVE = 'ACTIVE',
  BROKEN = 'BROKEN',
  MAINTENANCE = 'MAINTENANCE',
}
export enum SeatTypeEnum {
  STANDARD = 'STANDARD',
  VIP = 'VIP',
  COUPLE = 'COUPLE',
  PREMIUM = 'PREMIUM',
  WHEELCHAIR = 'WHEELCHAIR',
}

export enum DayTypeEnum {
  WEEKDAY = 'WEEKDAY',
  WEEKEND = 'WEEKEND',
  HOLIDAY = 'HOLIDAY',
}
export enum FormatEnum {
  TWO_D = 'TWO_D',
  THREE_D = 'THREE_D',
  IMAX = 'IMAX',
  FOUR_DX = 'FOUR_DX',
}
export enum ShowtimeStatusEnum {
  SCHEDULED = 'SCHEDULED',
  SELLING = 'SELLING',
  SOLD_OUT = 'SOLD_OUT',
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
}

export enum LayoutTypeEnum {
  STANDARD = 'STANDARD',
  DUAL_AISLE = 'DUAL_AISLE',
  STADIUM = 'STADIUM',
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
  movieId: string;
  movieTitle: string;
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


export interface ShowtimeSummaryResponse {
  id?: string;
  hallId: string;
  startTime: Date;
  endTime: Date;
  format: FormatEnum;
  status: ShowtimeStatusEnum;
}
