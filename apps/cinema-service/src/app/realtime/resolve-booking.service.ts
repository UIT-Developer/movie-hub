import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { SeatBookingEvent } from '@movie-hub/shared-types';

@Injectable()
export class ResolveBookingService {
  constructor(private readonly prisma: PrismaService) {}

  async createSeatReservations(event: SeatBookingEvent) {
    const { userId, showtimeId, bookingId, seatIds } = event;

    const showtime = await this.prisma.showtimes.findUnique({
      where: { id: showtimeId },
    });
    if (!showtime) throw new BadRequestException('Showtime not found');

    const rows = seatIds.map((seatId) => ({
      showtime_id: showtimeId,
      seat_id: seatId,
      booking_id: bookingId ?? null,
      user_id: userId ?? null,
    }));

    await this.prisma.seatReservations.createMany({
      data: rows,
      skipDuplicates: true,
    });

    return true;
  }
}
