import { PaymentStatus } from '../../enum';
import { PaginationQuery, SortQuery } from '../../../common';

/**
 * Query parameters for admin to find all payments
 */
export interface AdminFindAllPaymentsDto extends PaginationQuery, SortQuery {
  bookingId?: string;
  status?: PaymentStatus;
  paymentMethod?: string;
  startDate?: Date;
  endDate?: Date;
  sortBy?: 'created_at' | 'amount' | 'paid_at';
}

/**
 * Query parameters for finding payments by status
 */
export interface FindPaymentsByStatusDto extends PaginationQuery {
  status: PaymentStatus;
}

/**
 * Query parameters for finding payments by date range
 */
export interface FindPaymentsByDateRangeDto extends PaginationQuery {
  startDate: Date;
  endDate: Date;
  status?: PaymentStatus;
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
