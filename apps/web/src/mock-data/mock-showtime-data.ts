import {
  DayTypeEnum,
  FormatEnum,
  ReservationStatusEnum,
  SeatItemDto,
  SeatStatusEnum,
  SeatTypeEnum,
  ShowtimeSeatResponse,
  TicketTypeEnum,
  TimeSlotEnum,
} from '@movie-hub/shared-types';

export const mockShowtimeData: ShowtimeSeatResponse = {
  showtime: {
    id: 'showtime1',
    start_time: new Date('2024-07-01T14:00:00Z'),
    end_time: new Date('2024-07-01T16:00:00Z'),
    dateType: DayTypeEnum.WEEKDAY,
    timeSlot: TimeSlotEnum.AFTERNOON,
    format: FormatEnum.TWO_D,
    language: '',
    subtitles: [],
  },
  seat_map: [
    {
      row: 'A',
      seats: Array.from(
        { length: 8 },
        (_, i): SeatItemDto => ({
          id: `A${i + 1}`,
          number: i + 1,
          seatType: i % 4 === 0 ? SeatTypeEnum.VIP : SeatTypeEnum.STANDARD,
          seatStatus: i === 5 ? SeatStatusEnum.BROKEN : SeatStatusEnum.ACTIVE,
          reservationStatus:
            i === 1
              ? ReservationStatusEnum.HELD
              : i === 2
              ? ReservationStatusEnum.CONFIRMED
              : ReservationStatusEnum.AVAILABLE,
          isHeldByCurrentUser: i === 0 ? true : false,
        })
      ),
    },
    {
      row: 'B',
      seats: Array.from(
        { length: 8 },
        (_, i): SeatItemDto => ({
          id: `B${i + 1}`,
          number: i + 1,
          seatType: SeatTypeEnum.STANDARD,
          seatStatus: SeatStatusEnum.ACTIVE,
          reservationStatus:
            i === 3
              ? ReservationStatusEnum.HELD
              : ReservationStatusEnum.AVAILABLE,
        })
      ),
    },
    {
      row: 'C',
      seats: Array.from(
        { length: 9 },
        (_, i): SeatItemDto => ({
          id: `C${i + 1}`,
          number: i + 1,
          seatType: SeatTypeEnum.STANDARD,
          seatStatus: SeatStatusEnum.ACTIVE,
          reservationStatus: ReservationStatusEnum.AVAILABLE,
        })
      ),
    },
    {
      row: 'D',
      seats: Array.from(
        { length: 9 },
        (_, i): SeatItemDto => ({
          id: `D${i + 1}`,
          number: i + 1,
          seatType: i === 0 ? SeatTypeEnum.VIP : SeatTypeEnum.STANDARD,
          seatStatus:
            i === 4 ? SeatStatusEnum.MAINTENANCE : SeatStatusEnum.ACTIVE,
          reservationStatus:
            i === 2
              ? ReservationStatusEnum.CONFIRMED
              : ReservationStatusEnum.AVAILABLE,
        })
      ),
    },
    {
      row: 'E',
      seats: Array.from(
        { length: 10 },
        (_, i): SeatItemDto => ({
          id: `E${i + 1}`,
          number: i + 1,
          seatType: SeatTypeEnum.STANDARD,
          seatStatus: SeatStatusEnum.ACTIVE,
          reservationStatus: ReservationStatusEnum.AVAILABLE,
        })
      ),
    },
  ],
  ticketTypes: [
    TicketTypeEnum.ADULT,
    TicketTypeEnum.STUDENT,
    TicketTypeEnum.CHILD,
  ],
  ticketPrices: [
    {
      seatType: SeatTypeEnum.STANDARD,
      ticketType: TicketTypeEnum.ADULT,
      price: 100000,
    },
    {
      seatType: SeatTypeEnum.STANDARD,
      ticketType: TicketTypeEnum.STUDENT,
      price: 80000,
    },
    {
      seatType: SeatTypeEnum.STANDARD,
      ticketType: TicketTypeEnum.CHILD,
      price: 60000,
    },
    {
      seatType: SeatTypeEnum.VIP,
      ticketType: TicketTypeEnum.ADULT,
      price: 150000,
    },
    {
      seatType: SeatTypeEnum.VIP,
      ticketType: TicketTypeEnum.STUDENT,
      price: 120000,
    },
    {
      seatType: SeatTypeEnum.VIP,
      ticketType: TicketTypeEnum.CHILD,
      price: 100000,
    },
  ],
  rules: {
    max_selectable: 8,
    hold_time_seconds: 300, // 5 phút
  },
};
