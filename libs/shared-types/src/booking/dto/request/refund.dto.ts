import { RefundStatus } from '../../enum';
import { PaginationQuery } from '../../../common';

/**
 * Create refund request
 */
export interface CreateRefundDto {
  paymentId: string;
  amount: number;
  reason: string;
}

/**
 * Query parameters for finding all refunds
 */
export interface FindAllRefundsDto extends PaginationQuery {
  paymentId?: string;
  status?: RefundStatus;
  startDate?: Date;
  endDate?: Date;
}

/**
 * Process refund request
 */
export interface ProcessRefundDto {
  refundId: string;
}

/**
 * Approve refund request
 */
export interface ApproveRefundDto {
  refundId: string;
  note?: string;
}

/**
 * Reject refund request
 */
export interface RejectRefundDto {
  refundId: string;
  reason: string;
}
