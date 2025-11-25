import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import {
  SERVICE_NAME,
  RefundMessage,
  CreateRefundDto,
  FindAllRefundsDto,
  ProcessRefundDto,
  ApproveRefundDto,
  RejectRefundDto,
  RefundDetailDto,
} from '@movie-hub/shared-types';

@Injectable()
export class RefundService {
  constructor(
    @Inject(SERVICE_NAME.BOOKING) private readonly bookingClient: ClientProxy
  ) {}

  async createRefund(createRefundDto: CreateRefundDto): Promise<RefundDetailDto> {
    return lastValueFrom(
      this.bookingClient.send(RefundMessage.CREATE, createRefundDto)
    );
  }

  async findAll(
    filters: FindAllRefundsDto
  ): Promise<{ data: RefundDetailDto[]; total: number }> {
    return lastValueFrom(
      this.bookingClient.send(RefundMessage.FIND_ALL, filters)
    );
  }

  async findOne(id: string): Promise<RefundDetailDto> {
    return lastValueFrom(this.bookingClient.send(RefundMessage.FIND_ONE, id));
  }

  async findByPayment(paymentId: string): Promise<RefundDetailDto[]> {
    return lastValueFrom(
      this.bookingClient.send(RefundMessage.FIND_BY_PAYMENT, paymentId)
    );
  }

  async processRefund(
    processRefundDto: ProcessRefundDto
  ): Promise<RefundDetailDto> {
    return lastValueFrom(
      this.bookingClient.send(RefundMessage.PROCESS, processRefundDto)
    );
  }

  async approveRefund(approveRefundDto: ApproveRefundDto): Promise<RefundDetailDto> {
    return lastValueFrom(
      this.bookingClient.send(RefundMessage.APPROVE, approveRefundDto)
    );
  }

  async rejectRefund(rejectRefundDto: RejectRefundDto): Promise<RefundDetailDto> {
    return lastValueFrom(
      this.bookingClient.send(RefundMessage.REJECT, rejectRefundDto)
    );
  }
}
