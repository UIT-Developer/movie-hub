import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import {
  CreatePaymentDto,
  PaymentDetailDto,
  PaymentStatus,
  AdminFindAllPaymentsDto,
  FindPaymentsByStatusDto,
  FindPaymentsByDateRangeDto,
  GetPaymentStatisticsDto,
} from '@movie-hub/shared-types';

@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @MessagePattern('payment.create')
  async create(
    @Payload()
    data: {
      bookingId: string;
      dto: CreatePaymentDto;
      ipAddr: string;
    }
  ): Promise<PaymentDetailDto> {
    return this.paymentService.createPayment(
      data.bookingId,
      data.dto,
      data.ipAddr
    );
  }

  @MessagePattern('payment.findOne')
  async findOne(@Payload() data: { id: string }): Promise<PaymentDetailDto> {
    return this.paymentService.findOne(data.id);
  }

  @MessagePattern('payment.findByBooking')
  async findByBooking(
    @Payload() data: { bookingId: string }
  ): Promise<PaymentDetailDto[]> {
    return this.paymentService.findByBooking(data.bookingId);
  }

  @MessagePattern('payment.vnpay.ipn')
  async handleVNPayIPN(
    @Payload() data: { params: Record<string, string> }
  ): Promise<{ RspCode: string; Message: string }> {
    return this.paymentService.handleVNPayIPN(data.params);
  }

  @MessagePattern('payment.vnpay.return')
  async handleVNPayReturn(
    @Payload() data: { params: Record<string, string> }
  ): Promise<{ status: string; code: string }> {
    return this.paymentService.handleVNPayReturn(data.params);
  }

  // ==================== ADMIN OPERATIONS ====================

  @MessagePattern('payment.admin.findAll')
  async adminFindAll(
    @Payload() filters: AdminFindAllPaymentsDto
  ): Promise<{ data: PaymentDetailDto[]; total: number }> {
    return this.paymentService.adminFindAllPayments(filters);
  }

  @MessagePattern('payment.findByStatus')
  async findByStatus(
    @Payload() data: FindPaymentsByStatusDto
  ): Promise<{ data: PaymentDetailDto[]; total: number }> {
    return this.paymentService.findPaymentsByStatus(
      data.status,
      data.page,
      data.limit
    );
  }

  @MessagePattern('payment.findByDateRange')
  async findByDateRange(
    @Payload() data: FindPaymentsByDateRangeDto
  ): Promise<{ data: PaymentDetailDto[]; total: number }> {
    return this.paymentService.findPaymentsByDateRange(data);
  }

  @MessagePattern('payment.cancel')
  async cancel(
    @Payload() data: { paymentId: string }
  ): Promise<PaymentDetailDto> {
    return this.paymentService.cancelPayment(data.paymentId);
  }

  @MessagePattern('payment.getStatistics')
  async getStatistics(@Payload() filters: GetPaymentStatisticsDto) {
    return this.paymentService.getPaymentStatistics(filters);
  }
}
