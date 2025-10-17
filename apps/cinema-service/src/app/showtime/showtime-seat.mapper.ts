import {
  DayTypeEnum,
  FormatEnum,
  ReservationStatusEnum,
  SeatItemDto,
  SeatRowDto,
  SeatStatusEnum,
  SeatTypeEnum,
  ShowtimeInfoDto,
  ShowtimeSeatResponse,
  ShowtimeStatusEnum,
  TicketPricingDto,
  TicketTypeEnum,
  TimeSlotEnum,
} from '@movie-hub/shared-types';
import { Injectable } from '@nestjs/common';
import {
  $Enums,
  Seats,
  Showtimes,
  TicketPricing,
} from '../../../generated/prisma/client';

@Injectable()
export class ShowtimeSeatMapper {
  private readonly PrismaToFormat: Record<$Enums.Format, FormatEnum> = {
    TWO_D: FormatEnum.TWO_D,
    THREE_D: FormatEnum.THREE_D,
    IMAX: FormatEnum.IMAX,
    FOUR_DX: FormatEnum.FOUR_DX,
  };

  private readonly PrismaToStatus: Record<
    $Enums.ShowtimeStatus,
    ShowtimeStatusEnum
  > = {
    SCHEDULED: ShowtimeStatusEnum.SCHEDULED,
    SELLING: ShowtimeStatusEnum.SELLING,
    SOLD_OUT: ShowtimeStatusEnum.SOLD_OUT,
    CANCELLED: ShowtimeStatusEnum.CANCELLED,
    COMPLETED: ShowtimeStatusEnum.COMPLETED,
  };

  private readonly PrismaToDayType: Record<$Enums.DayType, DayTypeEnum> = {
    WEEKDAY: DayTypeEnum.WEEKDAY,
    WEEKEND: DayTypeEnum.WEEKEND,
    HOLIDAY: DayTypeEnum.HOLIDAY,
  };

  private readonly PrismaToTimeSlot: Record<$Enums.TimeSlot, TimeSlotEnum> = {
    AFTERNOON: TimeSlotEnum.AFTERNOON,
    MORNING: TimeSlotEnum.MORNING,
    EVENING: TimeSlotEnum.EVENING,
    LATE_NIGHT: TimeSlotEnum.LATE_NIGHT,
  };

  private readonly PrismaToSeatStatus: Record<
    $Enums.SeatStatus,
    SeatStatusEnum
  > = {
    ACTIVE: SeatStatusEnum.ACTIVE,
    BROKEN: SeatStatusEnum.BROKEN,
    MAINTENANCE: SeatStatusEnum.MAINTENANCE,
  };

  private readonly PrismaToSeatType: Record<$Enums.SeatType, SeatTypeEnum> = {
    COUPLE: SeatTypeEnum.COUPLE,
    PREMIUM: SeatTypeEnum.PREMIUM,
    STANDARD: SeatTypeEnum.STANDARD,
    VIP: SeatTypeEnum.VIP,
    WHEELCHAIR: SeatTypeEnum.WHEELCHAIR,
  };

  private readonly PrismaToTicketType: Record<
    $Enums.TicketType,
    TicketTypeEnum
  > = {
    ADULT: TicketTypeEnum.ADULT,
    CHILD: TicketTypeEnum.CHILD,
    COUPLE: TicketTypeEnum.COUPLE,
    STUDENT: TicketTypeEnum.STUDENT,
  };

  toShowtimeInfoDto(entity: Showtimes): ShowtimeInfoDto {
    return {
      id: entity.id,
      start_time: entity.start_time,
      end_time: entity.end_time,
      dateType: this.PrismaToDayType[entity.day_type],
      timeSlot: this.PrismaToTimeSlot[entity.time_slot],
      format: this.PrismaToFormat[entity.format],
      language: entity.language,
      subtitles: entity.subtitles,
    };
  }

  toSeatItemDto(
    seat: Seats,
    reservationStatus: ReservationStatusEnum,
    isHeldByCurrentUser?: boolean
  ): SeatItemDto {
    return {
      id: seat.id,
      number: seat.seat_number,
      seatType: this.PrismaToSeatType[seat.type],
      seatStatus: this.PrismaToSeatStatus[seat.status],
      reservationStatus,
      isHeldByCurrentUser: !!isHeldByCurrentUser,
    };
  }

  toTicketPricing(entity: TicketPricing): TicketPricingDto {
    return {
      price: Number(entity.price),
      seatType: this.PrismaToSeatType[entity.seat_type],
      ticketType: this.PrismaToTicketType[entity.ticket_type],
    };
  }

  toListTicketPricing(entities: TicketPricing[]): TicketPricingDto[] {
    return entities.map((e) => {
      return this.toTicketPricing(e);
    });
  }

  toShowtimeSeatResponse(params: {
    showtime: Showtimes;
    seats: Seats[];
    reservedMap: Map<string, ReservationStatusEnum>;
    ticketPricings: TicketPricing[];
    userHeldSeatIds?: string[];
  }): ShowtimeSeatResponse {
    const {
      showtime,
      seats,
      reservedMap,
      ticketPricings,
      userHeldSeatIds = [],
    } = params;

    const ticketTypes = Object.values(TicketTypeEnum);

    const userHeldSet = new Set(userHeldSeatIds);
    const seatMapObj: Record<string, SeatItemDto[]> = {};

    for (const seat of seats) {
      const reservationStatus =
        reservedMap.get(seat.id) ?? ReservationStatusEnum.AVAILABLE;

      const item = this.toSeatItemDto(
        seat,
        reservationStatus,
        userHeldSet.has(seat.id)
      );

      if (!seatMapObj[seat.row_letter]) {
        seatMapObj[seat.row_letter] = [];
      }
      seatMapObj[seat.row_letter].push(item);
    }

    const seat_map: SeatRowDto[] = Object.keys(seatMapObj).map((row) => ({
      row,
      seats: seatMapObj[row],
    }));

    return {
      showtime: this.toShowtimeInfoDto(showtime),
      seat_map,
      ticketTypes,
      ticketPrices: this.toListTicketPricing(ticketPricings),
      rules: {
        max_selectable: 8,
        hold_time_seconds: 300,
      },
    };
  }
}
