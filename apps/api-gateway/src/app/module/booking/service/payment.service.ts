import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SERVICE_NAME, CreatePaymentDto } from '@movie-hub/shared-types';

@Injectable()
export class PaymentService {
  constructor(
    @Inject(SERVICE_NAME.BOOKING) private readonly bookingClient: ClientProxy
  ) {}

  async createPayment(
    bookingId: string,
    dto: CreatePaymentDto,
    ipAddr: string
  ) {
    return firstValueFrom(
      this.bookingClient.send('payment.create', { bookingId, dto, ipAddr })
    );
  }

  async getPayment(id: string) {
    return firstValueFrom(
      this.bookingClient.send('payment.findOne', { id })
    );
  }

  async handleVNPayIPN(params: Record<string, string>) {
    return firstValueFrom(
      this.bookingClient.send('payment.vnpay.ipn', { params })
    );
  }

  async handleVNPayReturn(params: Record<string, string>) {
    return firstValueFrom(
      this.bookingClient.send('payment.vnpay.return', { params })
    );
  }
}
