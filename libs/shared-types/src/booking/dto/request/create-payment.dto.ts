import { PaymentMethod } from '../../enum';

export interface CreatePaymentDto {
  paymentMethod?: PaymentMethod;
  amount?: number;
  returnUrl?: string;
  cancelUrl?: string;
}
