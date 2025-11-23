import { RefundStatus } from '../../enum';

export interface RefundDetailDto {
  id: string;
  paymentId: string;
  amount: number;
  reason: string;
  status: RefundStatus;
  refundedAt?: Date;
  createdAt: Date;
}
