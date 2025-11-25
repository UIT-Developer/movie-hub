import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RefundService } from './refund.service';
import {
  CreateRefundDto,
  RefundDetailDto,
  FindAllRefundsDto,
} from '@movie-hub/shared-types';

@Controller()
export class RefundController {
  constructor(private readonly refundService: RefundService) {}

  @MessagePattern('refund.create')
  async create(@Payload() dto: CreateRefundDto): Promise<RefundDetailDto> {
    return this.refundService.createRefund(dto);
  }

  @MessagePattern('refund.findAll')
  async findAll(
    @Payload() filters: FindAllRefundsDto
  ): Promise<{ data: RefundDetailDto[]; total: number }> {
    return this.refundService.findAllRefunds(filters);
  }

  @MessagePattern('refund.findOne')
  async findOne(@Payload() data: { id: string }): Promise<RefundDetailDto> {
    return this.refundService.findOne(data.id);
  }

  @MessagePattern('refund.findByPayment')
  async findByPayment(
    @Payload() data: { paymentId: string }
  ): Promise<RefundDetailDto[]> {
    return this.refundService.findByPayment(data.paymentId);
  }

  @MessagePattern('refund.process')
  async process(
    @Payload() data: { refundId: string }
  ): Promise<RefundDetailDto> {
    return this.refundService.processRefund(data.refundId);
  }

  @MessagePattern('refund.approve')
  async approve(
    @Payload() data: { refundId: string }
  ): Promise<RefundDetailDto> {
    return this.refundService.approveRefund(data.refundId);
  }

  @MessagePattern('refund.reject')
  async reject(
    @Payload() data: { refundId: string; reason: string }
  ): Promise<RefundDetailDto> {
    return this.refundService.rejectRefund(data.refundId, data.reason);
  }
}
