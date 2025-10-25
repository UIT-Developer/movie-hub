import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PaymentService } from './payment.service';
import {
  CreatePaymentDto,
  PaymentDetailDto,
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

  @MessagePattern('payment.vnpay.ipn')
  async handleVNPayIPN(
    @Payload() data: { params: any }
  ): Promise<{ RspCode: string; Message: string }> {
    return this.paymentService.handleVNPayIPN(data.params);
  }

  @MessagePattern('payment.vnpay.return')
  async handleVNPayReturn(
    @Payload() data: { params: any }
  ): Promise<{ status: string; code: string }> {
    return this.paymentService.handleVNPayReturn(data.params);
  }
}
