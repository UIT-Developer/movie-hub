import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoyaltyService } from './loyalty.service';
import {
  LoyaltyBalanceDto,
  LoyaltyTransactionDto,
  LoyaltyTransactionType,
} from '@movie-hub/shared-types';

@Controller()
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @MessagePattern('loyalty.getBalance')
  async getBalance(
    @Payload() data: { userId: string }
  ): Promise<LoyaltyBalanceDto> {
    return this.loyaltyService.getBalance(data.userId);
  }

  @MessagePattern('loyalty.getTransactions')
  async getTransactions(
    @Payload()
    data: {
      userId: string;
      type?: LoyaltyTransactionType;
      page?: number;
      limit?: number;
    }
  ): Promise<{ data: LoyaltyTransactionDto[]; total: number }> {
    return this.loyaltyService.getTransactions(
      data.userId,
      data.type,
      data.page,
      data.limit
    );
  }

  @MessagePattern('loyalty.earnPoints')
  async earnPoints(
    @Payload()
    data: {
      userId: string;
      points: number;
      transactionId?: string;
      description?: string;
    }
  ): Promise<void> {
    return this.loyaltyService.earnPoints(
      data.userId,
      data.points,
      data.transactionId,
      data.description
    );
  }

  @MessagePattern('loyalty.redeemPoints')
  async redeemPoints(
    @Payload()
    data: {
      userId: string;
      points: number;
      transactionId?: string;
      description?: string;
    }
  ): Promise<void> {
    return this.loyaltyService.redeemPoints(
      data.userId,
      data.points,
      data.transactionId,
      data.description
    );
  }
}
