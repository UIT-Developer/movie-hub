import { RefundStatus } from '../../enum';

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
export interface FindAllRefundsDto {
  paymentId?: string;
  status?: RefundStatus;
  startDate?: Date;
  endDate?: Date;
  page?: number;
  limit?: number;
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
