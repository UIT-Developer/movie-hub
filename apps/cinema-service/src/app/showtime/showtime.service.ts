import { Injectable, NotFoundException } from '@nestjs/common';
import { ShowtimeMapper } from './showtime.mapper';
import {
  GetShowtimesQuery,
  ShowtimeSummaryResponse,
  ShowtimeSeatResponse,
  ReservationStatusEnum,
} from '@movie-hub/shared-types';
import { PrismaService } from '../prisma.service';
import { RedisService } from '../realtime/redis.service';
import { ShowtimeSeatMapper } from './showtime-seat.mapper';

@Injectable()
export class ShowtimeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ShowtimeMapper,
    private readonly showtimeSeatMapper: ShowtimeSeatMapper,
    private readonly redisService: RedisService
  ) {}

  async getMovieShowtimesAtCinema(
    cinemaId: string,
    movieId: string,
    query: GetShowtimesQuery
  ): Promise<ShowtimeSummaryResponse[]> {
    const showtimes = await this.prisma.showtimes.findMany({
      where: {
        cinema_id: cinemaId,
        movie_id: movieId,
        start_time: {
          gte: new Date(query.date + 'T00:00:00.000Z'),
          lt: new Date(query.date + 'T23:59:59.999Z'),
        },
      },
      orderBy: { start_time: 'asc' },
    });

    return this.mapper.toShowtimeSummaryList(showtimes);
  }

  async getShowtimeSeats(
    showtimeId: string,
    userId?: string
  ): Promise<ShowtimeSeatResponse> {
    const clientKey = userId;

    const showtime = await this.prisma.showtimes.findUnique({
      where: { id: showtimeId },
      include: { hall: true },
    });
    if (!showtime) throw new NotFoundException('Showtime not found');

    const [seats, confirmedSeats, ticketPricings, heldSeats, userHeldSeatIds] =
      await Promise.all([
        this.prisma.seats.findMany({
          where: { hall_id: showtime.hall_id },
          orderBy: [{ row_letter: 'asc' }, { seat_number: 'asc' }],
        }),
        this.prisma.seatReservations.findMany({
          where: { showtime_id: showtimeId, status: 'CONFIRMED' },
          select: { seat_id: true },
        }),
        this.prisma.ticketPricing.findMany({
          where: {
            hall_id: showtime.hall_id,
            day_type: showtime.day_type,
            time_slot: showtime.time_slot,
          },
        }),
        this.redisService.getAllHeldSeats(showtimeId),
        clientKey
          ? this.redisService.getUserHeldSeats(showtimeId, clientKey)
          : [],
      ]);

    // Tạo map trạng thái ghế
    const reservedMap = new Map<string, ReservationStatusEnum>();

    confirmedSeats.forEach(({ seat_id }) =>
      reservedMap.set(seat_id, ReservationStatusEnum.CONFIRMED)
    );

    Object.keys(heldSeats).forEach((seatId) => {
      if (!reservedMap.has(seatId)) {
        reservedMap.set(seatId, ReservationStatusEnum.HELD);
      }
    });

    return this.showtimeSeatMapper.toShowtimeSeatResponse({
      showtime,
      seats,
      reservedMap,
      ticketPricings,
      userHeldSeatIds,
    });
  }
}
