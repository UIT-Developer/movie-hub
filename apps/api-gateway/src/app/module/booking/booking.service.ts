import {
  SERVICE_NAME,
  CreateBookingDto,
  BookingDetailDto,
  BookingSummaryDto,
  BookingStatus,
} from '@movie-hub/shared-types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BookingService {
  constructor(
    @Inject(SERVICE_NAME.BOOKING) private readonly bookingClient: ClientProxy
  ) {}

  async createBooking(
    userId: string,
    dto: CreateBookingDto
  ): Promise<BookingDetailDto> {
    return lastValueFrom(
      this.bookingClient.send('booking.create', { userId, dto })
    );
  }

  async findAllByUser(
    userId: string,
    status?: BookingStatus,
    page?: number,
    limit?: number
  ): Promise<{ data: BookingSummaryDto[]; total: number }> {
    return lastValueFrom(
      this.bookingClient.send('booking.findAll', {
        userId,
        status,
        page,
        limit,
      })
    );
  }

  async findOne(id: string, userId: string): Promise<BookingDetailDto> {
    return lastValueFrom(
      this.bookingClient.send('booking.findOne', { id, userId })
    );
  }

  async cancelBooking(
    id: string,
    userId: string,
    reason?: string
  ): Promise<BookingDetailDto> {
    return lastValueFrom(
      this.bookingClient.send('booking.cancel', { id, userId, reason })
    );
  }
}
