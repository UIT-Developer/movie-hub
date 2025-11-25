import {
  SERVICE_NAME,
  CreateBookingDto,
  BookingDetailDto,
  BookingSummaryDto,
  BookingCalculationDto,
  BookingStatus,
  BookingMessage,
  AdminFindAllBookingsDto,
  FindBookingsByShowtimeDto,
  FindBookingsByDateRangeDto,
  UpdateBookingStatusDto,
  GetBookingStatisticsDto,
  GetRevenueReportDto,
  BookingStatisticsDto,
  RevenueReportDto,
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
  ): Promise<BookingCalculationDto> {
    return lastValueFrom(
      this.bookingClient.send(BookingMessage.CREATE, { userId, dto })
    );
  }

  async findAllByUser(
    userId: string,
    status?: BookingStatus,
    page?: number,
    limit?: number
  ): Promise<{ data: BookingSummaryDto[]; total: number }> {
    return lastValueFrom(
      this.bookingClient.send(BookingMessage.FIND_ALL, {
        userId,
        status,
        page,
        limit,
      })
    );
  }

  async findOne(id: string, userId: string): Promise<BookingDetailDto> {
    return lastValueFrom(
      this.bookingClient.send(BookingMessage.FIND_ONE, { id, userId })
    );
  }

  async cancelBooking(
    id: string,
    userId: string,
    reason?: string
  ): Promise<BookingDetailDto> {
    return lastValueFrom(
      this.bookingClient.send(BookingMessage.CANCEL, { id, userId, reason })
    );
  }

  async getBookingSummary(
    id: string,
    userId: string
  ): Promise<BookingCalculationDto> {
    return lastValueFrom(
      this.bookingClient.send(BookingMessage.GET_SUMMARY, { id, userId })
    );
  }

  /**
   * Find user's booking at a specific showtime
   * Used when entering showtime screen to check if user already has a booking
   */
  async findUserBookingByShowtime(
    showtimeId: string,
    userId: string,
    includeStatuses?: BookingStatus[]
  ): Promise<BookingCalculationDto | null> {
    return lastValueFrom(
      this.bookingClient.send(BookingMessage.FIND_USER_BOOKING_BY_SHOWTIME, {
        showtimeId,
        userId,
        includeStatuses,
      })
    );
  }

  // ==================== ADMIN OPERATIONS ====================

  async adminFindAll(
    filters: AdminFindAllBookingsDto
  ): Promise<{ data: BookingSummaryDto[]; total: number }> {
    return lastValueFrom(
      this.bookingClient.send(BookingMessage.ADMIN_FIND_ALL, filters)
    );
  }

  async findByShowtime(
    showtimeId: string,
    status?: BookingStatus
  ): Promise<BookingSummaryDto[]> {
    return lastValueFrom(
      this.bookingClient.send(BookingMessage.FIND_BY_SHOWTIME, {
        showtimeId,
        status,
      })
    );
  }

  async findByDateRange(
    filters: FindBookingsByDateRangeDto
  ): Promise<{ data: BookingSummaryDto[]; total: number }> {
    return lastValueFrom(
      this.bookingClient.send(BookingMessage.FIND_BY_DATE_RANGE, filters)
    );
  }

  async updateStatus(
    bookingId: string,
    status: BookingStatus,
    reason?: string
  ): Promise<BookingDetailDto> {
    return lastValueFrom(
      this.bookingClient.send(BookingMessage.UPDATE_STATUS, {
        bookingId,
        status,
        reason,
      })
    );
  }

  async confirmBooking(bookingId: string): Promise<BookingDetailDto> {
    return lastValueFrom(
      this.bookingClient.send(BookingMessage.CONFIRM, { bookingId })
    );
  }

  async completeBooking(bookingId: string): Promise<BookingDetailDto> {
    return lastValueFrom(
      this.bookingClient.send(BookingMessage.COMPLETE, { bookingId })
    );
  }

  async expireBooking(bookingId: string): Promise<BookingDetailDto> {
    return lastValueFrom(
      this.bookingClient.send(BookingMessage.EXPIRE, { bookingId })
    );
  }

  async getStatistics(
    filters: GetBookingStatisticsDto
  ): Promise<BookingStatisticsDto> {
    return lastValueFrom(
      this.bookingClient.send(BookingMessage.GET_STATISTICS, filters)
    );
  }

  async getRevenueReport(
    filters: GetRevenueReportDto
  ): Promise<RevenueReportDto> {
    return lastValueFrom(
      this.bookingClient.send(BookingMessage.GET_REVENUE_REPORT, filters)
    );
  }
}
