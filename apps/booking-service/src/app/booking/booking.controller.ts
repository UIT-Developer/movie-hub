import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { BookingService } from './booking.service';
import {
  CreateBookingDto,
  BookingDetailDto,
  BookingSummaryDto,
  BookingCalculationDto,
  BookingStatus,
  AdminFindAllBookingsDto,
  FindBookingsByShowtimeDto,
  FindBookingsByDateRangeDto,
  UpdateBookingStatusDto,
  GetBookingStatisticsDto,
  GetRevenueReportDto,
  UpdateBookingDto,
  RescheduleBookingDto,
  RefundCalculationDto,
  CancelBookingWithRefundDto,
} from '@movie-hub/shared-types';

@Controller()
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @MessagePattern('booking.create')
  async create(
    @Payload() data: { userId: string; dto: CreateBookingDto }
  ): Promise<BookingCalculationDto> {
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

  // ==================== ADMIN OPERATIONS ====================

  @MessagePattern('booking.admin.findAll')
  async adminFindAll(
    @Payload() filters: AdminFindAllBookingsDto
  ): Promise<{ data: BookingSummaryDto[]; total: number }> {
    return this.bookingService.adminFindAllBookings(filters);
  }

  @MessagePattern('booking.findByShowtime')
  async findByShowtime(
    @Payload() data: FindBookingsByShowtimeDto
  ): Promise<BookingSummaryDto[]> {
    return this.bookingService.findBookingsByShowtime(
      data.showtimeId,
      data.status
    );
  }

  @MessagePattern('booking.findByDateRange')
  async findByDateRange(
    @Payload() data: FindBookingsByDateRangeDto
  ): Promise<{ data: BookingSummaryDto[]; total: number }> {
    return this.bookingService.findBookingsByDateRange(data);
  }

  @MessagePattern('booking.updateStatus')
  async updateStatus(
    @Payload() data: UpdateBookingStatusDto
  ): Promise<BookingDetailDto> {
    return this.bookingService.updateBookingStatus(
      data.bookingId,
      data.status,
      data.reason
    );
  }

  @MessagePattern('booking.confirm')
  async confirm(
    @Payload() data: { bookingId: string }
  ): Promise<BookingDetailDto> {
    return this.bookingService.confirmBooking(data.bookingId);
  }

  @MessagePattern('booking.complete')
  async complete(
    @Payload() data: { bookingId: string }
  ): Promise<BookingDetailDto> {
    return this.bookingService.completeBooking(data.bookingId);
  }

  @MessagePattern('booking.expire')
  async expire(
    @Payload() data: { bookingId: string }
  ): Promise<BookingDetailDto> {
    return this.bookingService.expireBooking(data.bookingId);
  }

  // ==================== STATISTICS & REPORTS ====================

  @MessagePattern('booking.getStatistics')
  async getStatistics(@Payload() filters: GetBookingStatisticsDto) {
    return this.bookingService.getBookingStatistics(filters);
  }

  @MessagePattern('booking.getRevenueReport')
  async getRevenueReport(@Payload() filters: GetRevenueReportDto) {
    return this.bookingService.getRevenueReport(filters);
  }

  // ==================== NEW FEATURES ====================

  @MessagePattern('booking.calculateRefund')
  async calculateRefund(
    @Payload() data: { id: string; userId: string }
  ): Promise<RefundCalculationDto> {
    return this.bookingService.calculateRefund(data.id, data.userId);
  }

  @MessagePattern('booking.cancelWithRefund')
  async cancelWithRefund(
    @Payload() data: { id: string; userId: string; dto: CancelBookingWithRefundDto }
  ): Promise<{ booking: BookingDetailDto; refund?: RefundCalculationDto }> {
    return this.bookingService.cancelBookingWithRefund(data.id, data.userId, data.dto);
  }

  @MessagePattern('booking.update')
  async update(
    @Payload() data: { id: string; userId: string; dto: UpdateBookingDto }
  ): Promise<BookingDetailDto> {
    return this.bookingService.updateBooking(data.id, data.userId, data.dto);
  }

  @MessagePattern('booking.reschedule')
  async reschedule(
    @Payload() data: { id: string; userId: string; dto: RescheduleBookingDto }
  ): Promise<BookingDetailDto> {
    return this.bookingService.rescheduleBooking(data.id, data.userId, data.dto);
  }

  @MessagePattern('booking.getCancellationPolicy')
  async getCancellationPolicy() {
    return this.bookingService.getCancellationPolicy();
  }

  @MessagePattern('booking.findUserBookingByShowtime')
  async findUserBookingByShowtime(
    @Payload() data: { 
      showtimeId: string; 
      userId: string; 
      includeStatuses?: BookingStatus[];
    }
  ): Promise<BookingCalculationDto | null> {
    return this.bookingService.findUserBookingByShowtime(
      data.showtimeId,
      data.userId,
      data.includeStatuses
    );
  }
}
