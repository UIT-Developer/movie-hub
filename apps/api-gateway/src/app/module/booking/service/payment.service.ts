import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  SERVICE_NAME,
  CreatePaymentDto,
  PaymentMessage,
  AdminFindAllPaymentsDto,
  FindPaymentsByStatusDto,
  PaymentStatisticsDto,
  PaymentDetailDto,
  PaymentStatus,
} from '@movie-hub/shared-types';

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
      this.bookingClient.send(PaymentMessage.CREATE, { bookingId, dto, ipAddr })
    );
  }

  async getPayment(id: string) {
    return firstValueFrom(
      this.bookingClient.send(PaymentMessage.FIND_ONE, { id })
    );
  }

  async getPaymentByBooking(bookingId: string) {
    return firstValueFrom(
      this.bookingClient.send(PaymentMessage.FIND_BY_BOOKING, { bookingId })
    );
  }

  async handleVNPayIPN(params: Record<string, string>) {
    return firstValueFrom(
      this.bookingClient.send(PaymentMessage.VNPAY_IPN, { params })
    );
  }

  async handleVNPayReturn(params: Record<string, string>) {
    return firstValueFrom(
      this.bookingClient.send(PaymentMessage.VNPAY_RETURN, { params })
    );
  }

  // ==================== ADMIN OPERATIONS ====================

  async adminFindAll(
    filters: AdminFindAllPaymentsDto
  ): Promise<{ data: PaymentDetailDto[]; total: number }> {
    return firstValueFrom(
      this.bookingClient.send(PaymentMessage.ADMIN_FIND_ALL, filters)
    );
  }

  async findByStatus(
    status: PaymentStatus,
    page?: number,
    limit?: number
  ): Promise<{ data: PaymentDetailDto[]; total: number }> {
    return firstValueFrom(
      this.bookingClient.send(PaymentMessage.FIND_BY_STATUS, {
        status,
        page,
        limit,
      })
    );
  }

  async cancelPayment(paymentId: string, reason?: string): Promise<PaymentDetailDto> {
    return firstValueFrom(
      this.bookingClient.send(PaymentMessage.CANCEL, { paymentId, reason })
    );
  }

  async getStatistics(
    startDate?: string,
    endDate?: string
  ): Promise<PaymentStatisticsDto> {
    return firstValueFrom(
      this.bookingClient.send(PaymentMessage.GET_STATISTICS, {
        startDate,
        endDate,
      })
    );
  }
}
