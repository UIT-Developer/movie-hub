import { Injectable, NotFoundException } from '@nestjs/common';
import { ShowtimeMapper } from './showtime.mapper';
import {
  GetShowtimesQuery,
  ShowtimeSummaryResponse,
  ShowtimeSeatResponse,
  ReservationStatusEnum,
  AdminGetShowtimesQuery,
  SeatPricingDto,
  SeatTypeEnum,
} from '@movie-hub/shared-types';
import { PrismaService } from '../prisma.service';
import { RealtimeService } from '../realtime/realtime.service';
import { ShowtimeSeatMapper } from './showtime-seat.mapper';
import {
  Format,
  LayoutType,
  Prisma,
  SeatType,
  ShowtimeStatus,
} from '../../../generated/prisma';

@Injectable()
export class ShowtimeService {
  constructor(
    private readonly prisma: PrismaService,
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
          status: ShowtimeStatus.SELLING,
        },
        orderBy: { start_time: 'asc' },
      });

      return ShowtimeMapper.toShowtimeSummaryList(showtimes);
    });
  }

  async adminGetMovieShowtimes(
    cinemaId: string,
    movieId: string,
    query: AdminGetShowtimesQuery
  ): Promise<ShowtimeSummaryResponse[]> {
    const { date, status, format, hallId, language } = query;

    // Tạo điều kiện where động cho Prisma
    const where: Prisma.ShowtimesWhereInput = {
      cinema_id: cinemaId,
      movie_id: movieId,
      start_time: {
        gte: new Date(`${date}T00:00:00.000Z`),
        lt: new Date(`${date}T23:59:59.999Z`),
      },
    };

    if (status) {
      where.status = status as ShowtimeStatus;
    }

    if (format) {
      where.format = format as Format;
    }

    if (hallId) {
      where.hall_id = hallId;
    }

    if (language) {
      where.language = language;
    }

    const showtimes = await this.prisma.showtimes.findMany({
      where,
      orderBy: { start_time: 'asc' },
    });

    return ShowtimeMapper.toShowtimeSummaryList(showtimes);
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
    const ticketPricingCacheKey = `ticketPricing:${showtime.hall_id}:${showtime.day_type}`;
    const ticketPricings = await this.realtimeService.getOrSetCache(
      ticketPricingCacheKey,
      3600 * 6,
      async () => {
        return this.prisma.ticketPricing.findMany({
          where: {
            hall_id: showtime.hall_id,
            day_type: showtime.day_type,
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

    // Lấy cinema name
    const cinemaName = await this.prisma.cinemas
      .findUnique({ where: { id: showtime.cinema_id } })
      .then((c) => c?.name ?? '');

    // Lấy hall (trả về object an toàn)
    const hall = await this.prisma.halls.findUnique({
      where: { id: showtime.hall_id },
    });

    // Chuẩn bị giá trị mặc định nếu hall null
    const hallName = hall?.name ?? '';
    const layoutType = hall?.layout_type ?? LayoutType.STANDARD;

    // 🧠 Mapping response cuối cùng
    return this.showtimeSeatMapper.toShowtimeSeatResponse({
      showtime,
      cinemaName,
      hallName,
      layoutType,
      seats,
      reservedMap,
      ticketPricings,
      userHeldSeatIds,
    });
  }

  // 🔒 Lấy danh sách ghế đang giữ của user
  async getSeatsHeldByUser(
    showtimeId: string,
    userId: string
  ): Promise<SeatPricingDto[]> {
    const showtime = await this.prisma.showtimes.findUnique({
      where: { id: showtimeId },
      select: { id: true, hall_id: true, day_type: true },
    });
    if (!showtime) throw new NotFoundException('Showtime not found');

    // 1) seatIds từ realtime
    const seatIds = await this.realtimeService.getUserHeldSeats(
      showtimeId,
      userId
    );
    if (!seatIds || seatIds.length === 0) return [];

    // 2) Lấy seats (chỉ cần id và type)
    const seats = await this.prisma.seats.findMany({
      where: { id: { in: seatIds } },
      select: {
        id: true,
        type: true,
        hall_id: true,
        row_letter: true,
        seat_number: true,
      },
    });

    // 3) Nếu không có seat types thì trả giá 0
    const seatTypes = Array.from(
      new Set(seats.map((s) => s.type).filter(Boolean))
    ) as SeatType[];
    let ticketPricings = [];
    if (seatTypes.length > 0) {
      // 4) Lấy tất cả pricings cho hall + day + các seat types cần thiết
      ticketPricings = await this.prisma.ticketPricing.findMany({
        where: {
          hall_id: showtime.hall_id,
          day_type: showtime.day_type,
          seat_type: { in: seatTypes },
        },
        // chọn trường cần thiết
        select: { seat_type: true, price: true },
      });
    }

    // 5) Map seat_type -> pricing (để tra nhanh O(1))
    const pricingBySeatType = new Map<SeatType, number>();
    for (const tp of ticketPricings) {
      // nếu có nhiều bản ghi cùng seat_type, bạn có thể decide lấy first/lowest/highest
      // Convert Prisma Decimal to number to avoid precision issues
      pricingBySeatType.set(tp.seat_type, Number(tp.price));
    }

    // 6) Build response
    const response: SeatPricingDto[] = seats.map((seat) => {
      const price = seat.type ? pricingBySeatType.get(seat.type) ?? 0 : 0;
      return {
        id: seat.id,
        hallId: seat.hall_id,
        rowLetter: seat.row_letter,
        seatNumber: seat.seat_number,
        type: seat.type as SeatTypeEnum,
        price,
      };
    });

    return response;
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

  async getSessionTTL(
    showtimeId: string,
    userId: string
  ): Promise<{ ttl: number }> {
    const ttl = await this.realtimeService.getUserTTL(showtimeId, userId);
    return { ttl };
  }
}
