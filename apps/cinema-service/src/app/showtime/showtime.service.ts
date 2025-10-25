import { Injectable, NotFoundException } from '@nestjs/common';
import { ShowtimeMapper } from './showtime.mapper';
import {
  GetShowtimesQuery,
  ShowtimeSummaryResponse,
  ShowtimeSeatResponse,
  ReservationStatusEnum,
} from '@movie-hub/shared-types';
import { PrismaService } from '../prisma.service';
import { RealtimeService } from '../realtime/realtime.service';
import { ShowtimeSeatMapper } from './showtime-seat.mapper';

@Injectable()
export class ShowtimeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ShowtimeMapper,
    private readonly showtimeSeatMapper: ShowtimeSeatMapper,
    private readonly realtimeService: RealtimeService
  ) {}

  /**
   * 📅 Lấy danh sách suất chiếu của 1 phim tại 1 rạp (có cache)
   */
  async getMovieShowtimesAtCinema(
    cinemaId: string,
    movieId: string,
    query: GetShowtimesQuery
  ): Promise<ShowtimeSummaryResponse[]> {
    const cacheKey = `showtime:list:${cinemaId}:${movieId}:${query.date}`;

    return this.realtimeService.getOrSetCache(cacheKey, 3600, async () => {
      const showtimes = await this.prisma.showtimes.findMany({
        where: {
          cinema_id: cinemaId,
          movie_id: movieId,
          start_time: {
            gte: new Date(`${query.date}T00:00:00.000Z`),
            lt: new Date(`${query.date}T23:59:59.999Z`),
          },
        },
        orderBy: { start_time: 'asc' },
      });

      return this.mapper.toShowtimeSummaryList(showtimes);
    });
  }

  /**
   * 🎟️ Lấy toàn bộ ghế, giá vé và trạng thái giữ/đặt (có cache phần tĩnh)
   */
  async getShowtimeSeats(
    showtimeId: string,
    userId?: string
  ): Promise<ShowtimeSeatResponse> {
    const clientKey = userId;

    // ✅ Cache thông tin suất chiếu + hall
    const showtimeCacheKey = `showtime:detail:${showtimeId}`;
    const showtime = await this.realtimeService.getOrSetCache(
      showtimeCacheKey,
      3600 * 6,
      async () => {
        const data = await this.prisma.showtimes.findUnique({
          where: { id: showtimeId },
          include: { hall: true },
        });
        if (!data) throw new NotFoundException('Showtime not found');
        return data;
      }
    );

    // ✅ Cache danh sách ghế vật lý trong rạp
    const seatsCacheKey = `hall:${showtime.hall_id}:seats`;
    const seats = await this.realtimeService.getOrSetCache(
      seatsCacheKey,
      3600 * 12,
      async () => {
        return this.prisma.seats.findMany({
          where: { hall_id: showtime.hall_id },
          orderBy: [{ row_letter: 'asc' }, { seat_number: 'asc' }],
        });
      }
    );

    // ✅ Cache ticket pricing
    const ticketPricingCacheKey = `ticketPricing:${showtime.hall_id}:${showtime.day_type}:${showtime.time_slot}`;
    const ticketPricings = await this.realtimeService.getOrSetCache(
      ticketPricingCacheKey,
      3600 * 6,
      async () => {
        return this.prisma.ticketPricing.findMany({
          where: {
            hall_id: showtime.hall_id,
            day_type: showtime.day_type,
            time_slot: showtime.time_slot,
          },
        });
      }
    );

    // ⚡ Dữ liệu realtime (không cache)
    const [confirmedSeats, heldSeats, userHeldSeatIds] = await Promise.all([
      this.prisma.seatReservations.findMany({
        where: { showtime_id: showtimeId, status: 'CONFIRMED' },
        select: { seat_id: true },
      }),
      this.realtimeService.getAllHeldSeats(showtimeId),
      clientKey
        ? this.realtimeService.getUserHeldSeats(showtimeId, clientKey)
        : [],
    ]);

    // 🧩 Tạo map trạng thái ghế
    const reservedMap = new Map<string, ReservationStatusEnum>();

    confirmedSeats.forEach(({ seat_id }) =>
      reservedMap.set(seat_id, ReservationStatusEnum.CONFIRMED)
    );

    Object.keys(heldSeats).forEach((seatId) => {
      if (!reservedMap.has(seatId)) {
        reservedMap.set(seatId, ReservationStatusEnum.HELD);
      }
    });

    // 🧠 Mapping response cuối cùng
    return this.showtimeSeatMapper.toShowtimeSeatResponse({
      showtime,
      seats,
      reservedMap,
      ticketPricings,
      userHeldSeatIds,
    });
  }

  /**
   * 🧹 Xóa cache khi có thay đổi dữ liệu tĩnh (admin update)
   */
  async clearShowtimeCache(cinemaId?: string, hallId?: string) {
    if (cinemaId)
      await this.realtimeService.deleteCacheByPrefix(
        `showtime:list:${cinemaId}`
      );
    if (hallId)
      await this.realtimeService.deleteCacheByPrefix(`hall:${hallId}:seats`);
    await this.realtimeService.deleteCacheByPrefix('ticketPricing');
  }
}
