import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoyaltyService } from './loyalty.service';
import {
  LoyaltyTransactionType,
} from '@movie-hub/shared-types';

@Controller()
export class LoyaltyController {
  constructor(private readonly loyaltyService: LoyaltyService) {}

  @MessagePattern('loyalty.getBalance')
  async getBalance(@Payload() payload: { userId: string }) {
    return this.loyaltyService.getBalance(payload.userId);
  }

  @MessagePattern('loyalty.getTransactions')
  async getTransactions(
    @Payload()
    payload: {
      userId: string;
      query: {
        type?: LoyaltyTransactionType;
        page?: number;
        limit?: number;
      };
    }
  ) {
    return this.loyaltyService.getTransactions(
      payload.userId,
      payload.query
    );
  }

  @MessagePattern('loyalty.earnPoints')
  async earnPoints(
    @Payload()
    payload: {
      userId: string;
      points: number;
      transactionId?: string;
      description?: string;
    }
  ) {
    return this.loyaltyService.earnPoints(
      payload.userId,
      payload.points,
      payload.transactionId,
      payload.description
    );
  }

  @MessagePattern('loyalty.redeemPoints')
  async redeemPoints(
    @Payload()
    payload: {
      userId: string;
      points: number;
      transactionId?: string;
      description?: string;
    }
  ) {
    return this.loyaltyService.redeemPoints(
      payload.userId,
      payload.points,
      payload.transactionId,
      payload.description
    );
  }
}
