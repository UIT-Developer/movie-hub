import { PaymentMethod, PaymentStatus } from '../../enum';

export interface PaymentDetailDto {
  id: string;
  bookingId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  providerTransactionId?: string;
  paymentUrl?: string;
  paidAt?: Date;
  metadata?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}
