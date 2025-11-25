import { BookingStatus, PaymentStatus } from '../../enum';

/**
 * Query parameters for admin to find all bookings
 */
export interface AdminFindAllBookingsDto {
  userId?: string;
  showtimeId?: string;
  cinemaId?: string;
  status?: BookingStatus;
  paymentStatus?: PaymentStatus;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
  sortBy?: 'created_at' | 'final_amount' | 'expires_at';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Query parameters for finding bookings by showtime
 */
export interface FindBookingsByShowtimeDto {
  showtimeId: string;
  status?: BookingStatus;
}

/**
 * Query parameters for finding bookings by cinema
 */
export interface FindBookingsByCinemaDto {
  cinemaId: string;
  startDate?: Date;
  endDate?: Date;
  status?: BookingStatus;
  page?: number;
  limit?: number;
}

/**
 * Query parameters for finding bookings by date range
 */
export interface FindBookingsByDateRangeDto {
  startDate: Date;
  endDate: Date;
  status?: BookingStatus;
  page?: number;
  limit?: number;
}

/**
 * Request to update booking status (admin only)
 */
export interface UpdateBookingStatusDto {
  bookingId: string;
  status: BookingStatus;
  reason?: string;
}

/**
 * Request for booking statistics
 */
export interface GetBookingStatisticsDto {
  startDate?: Date;
  endDate?: Date;
  cinemaId?: string;
  showtimeId?: string;
  groupBy?: 'day' | 'week' | 'month' | 'cinema' | 'movie';
}

/**
 * Request for revenue report
 */
export interface GetRevenueReportDto {
  startDate: Date;
  endDate: Date;
  cinemaId?: string;
  groupBy?: 'day' | 'week' | 'month' | 'cinema';
}
