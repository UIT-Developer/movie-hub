import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookingService } from './booking.service';
import {
  CreateBookingDto,
  BookingDetailDto,
  BookingSummaryDto,
  BookingCalculationDto,
  BookingStatus,
} from '@movie-hub/shared-types';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @MessagePattern('booking.create')
  async create(
    @Payload() data: { userId: string; dto: CreateBookingDto }
  ): Promise<BookingDetailDto> {
    return this.bookingService.createBooking(data.userId, data.dto);
  }

  @MessagePattern('booking.findAll')
  async findAll(
    @Payload()
    data: {
      userId: string;
      status?: BookingStatus;
      page?: number;
      limit?: number;
    }
  ): Promise<{ data: BookingSummaryDto[]; total: number }> {
    return this.bookingService.findAllByUser(
      data.userId,
      data.status,
      data.page,
      data.limit
    );
  }

  @MessagePattern('booking.findOne')
  async findOne(
    @Payload() data: { id: string; userId: string }
  ): Promise<BookingDetailDto> {
    return this.bookingService.findOne(data.id, data.userId);
  }

  @MessagePattern('booking.cancel')
  async cancel(
    @Payload() data: { id: string; userId: string; reason?: string }
  ): Promise<BookingDetailDto> {
    return this.bookingService.cancelBooking(
      data.id,
      data.userId,
      data.reason
    );
  }

  @MessagePattern('booking.getSummary')
  async getSummary(
    @Payload() data: { id: string; userId: string }
  ): Promise<BookingCalculationDto> {
    return this.bookingService.getBookingSummary(data.id, data.userId);
  }
}
