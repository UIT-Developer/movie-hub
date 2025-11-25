import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SERVICE_NAME, LoyaltyMessage, LoyaltyTransactionType } from '@movie-hub/shared-types';

@Injectable()
export class LoyaltyService {
  constructor(
    @Inject(SERVICE_NAME.BOOKING) private readonly bookingClient: ClientProxy
  ) {}

  async getBalance(userId: string) {
    return firstValueFrom(
      this.bookingClient.send(LoyaltyMessage.GET_BALANCE, { userId })
    );
  }

  async getTransactions(
    userId: string,
    type?: LoyaltyTransactionType,
    page?: number,
    limit?: number
  ) {
    return firstValueFrom(
      this.bookingClient.send(LoyaltyMessage.GET_TRANSACTIONS, {
        userId,
        type,
        page,
        limit,
      })
    );
  }

  async earnPoints(
    userId: string,
    points: number,
    transactionId?: string,
    description?: string
  ) {
    return firstValueFrom(
      this.bookingClient.send(LoyaltyMessage.EARN_POINTS, {
        userId,
        points,
        transactionId,
        description,
      })
    );
  }

  async redeemPoints(
    userId: string,
    points: number,
    transactionId?: string,
    description?: string
  ) {
    return firstValueFrom(
      this.bookingClient.send(LoyaltyMessage.REDEEM_POINTS, {
        userId,
        points,
        transactionId,
        description,
      })
    );
  }
}
