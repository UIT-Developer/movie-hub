
export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  MOMO = 'MOMO',
  ZALOPAY = 'ZALOPAY',
  VNPAY = 'VNPAY',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH = 'CASH',
}
export interface PaymentMethodUI {
  method: PaymentMethod;
  supported: boolean;
  logo: string;
}

export const paymentMethods: PaymentMethodUI[] = [
  {
    method: PaymentMethod.VNPAY,
    supported: true,
    logo: '/logo/vnpay.png'
  },
  {
    method: PaymentMethod.MOMO,
    supported: false,
    logo: '/logo/momo.png'
  },
  {
    method: PaymentMethod.ZALOPAY,
    supported: false,
    logo: '/logo/zalo-pay.png'
  },
];
