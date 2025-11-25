import { PaymentStatus } from '../../enum';

/**
 * Query parameters for admin to find all payments
 */
export interface AdminFindAllPaymentsDto {
  bookingId?: string;
  status?: PaymentStatus;
  paymentMethod?: string;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
  sortBy?: 'created_at' | 'amount' | 'paid_at';
  sortOrder?: 'asc' | 'desc';
}

/**
 * Query parameters for finding payments by status
 */
export interface FindPaymentsByStatusDto {
  status: PaymentStatus;
  page?: number;
  limit?: number;
}

/**
 * Query parameters for finding payments by date range
 */
export interface FindPaymentsByDateRangeDto {
  startDate: Date;
  endDate: Date;
  status?: PaymentStatus;
  page?: number;
  limit?: number;
}

/**
 * Request to retry a failed payment
 */
export interface RetryPaymentDto {
  paymentId: string;
  ipAddr: string;
}

/**
 * Request for payment statistics
 */
export interface GetPaymentStatisticsDto {
  startDate?: Date;
  endDate?: Date;
  paymentMethod?: string;
  groupBy?: 'day' | 'week' | 'month' | 'method';
}
