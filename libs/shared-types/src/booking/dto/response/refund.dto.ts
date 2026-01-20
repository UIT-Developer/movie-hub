import { RefundStatus } from '../../enum';

export interface RefundDetailDto {
  id: string;
  paymentId: string;
  bookingId: string;
  bookingCode: string;
  amount: number;
  reason: string;
  status: RefundStatus;
  refundedAt?: Date;
  createdAt: Date;
  payment?: {
    id: string;
    amount: number;
    paymentMethod: string;
    transactionId?: string;
  };
}
