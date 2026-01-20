import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SERVICE_NAME, LoyaltyMessage, LoyaltyTransactionType } from '@movie-hub/shared-types';

@Injectable()
export class LoyaltyService {
  constructor(
    @Inject(SERVICE_NAME.BOOKING) private readonly bookingClient: ClientProxy
  ) {}

  async getBalance(userId: string) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(LoyaltyMessage.GET_BALANCE, { userId })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getTransactions(
    userId: string,
    type?: LoyaltyTransactionType,
    page?: number,
    limit?: number
  ) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(LoyaltyMessage.GET_TRANSACTIONS, {
          userId,
          query: { type, page, limit },
        })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async earnPoints(
    userId: string,
    points: number,
    transactionId?: string,
    description?: string
  ) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(LoyaltyMessage.EARN_POINTS, {
          userId,
          points,
          transactionId,
          description,
        })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async redeemPoints(
    userId: string,
    points: number,
    transactionId?: string,
    description?: string
  ) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(LoyaltyMessage.REDEEM_POINTS, {
          userId,
          points,
          transactionId,
          description,
        })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
