import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { RealtimeService } from '../app/realtime/realtime.service';

@Injectable()
export class ConsumerService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly realtimeService: RealtimeService
  ) {}

  async createSeatReservations(event: any) {
    const { userId, showtimeId, bookingId, seatIds } = event;

    const showtime = await this.prisma.showtimes.findUnique({
      where: { id: showtimeId },
    });
    if (!showtime) throw new BadRequestException('Showtime not found');

    await this.prisma.seatReservations.createMany({
      data: seatIds.map((seatId) => ({
        showtime_id: showtimeId,
        seat_id: seatId,
        booking_id: bookingId,
        user_id: userId,
      })),
    });

    this.realtimeService.handleSeatBooked(showtimeId, userId, seatIds);
  }
}
