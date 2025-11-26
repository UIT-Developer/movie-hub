import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  LoyaltyBalanceDto,
  LoyaltyTransactionDto,
  LoyaltyTier,
  LoyaltyTransactionType,
  ServiceResult,
} from '@movie-hub/shared-types';

@Injectable()
export class LoyaltyService {
  constructor(private prisma: PrismaService) {}

  async getBalance(userId: string): Promise<ServiceResult<LoyaltyBalanceDto>> {
    let account = await this.prisma.loyaltyAccounts.findUnique({
      where: { user_id: userId },
    });

    // Create account if doesn't exist
    if (!account) {
      account = await this.prisma.loyaltyAccounts.create({
        data: {
          user_id: userId,
          current_points: 0,
          tier: LoyaltyTier.BRONZE,
          total_spent: 0,
        },
      });
    }

    const pointsToNextTier = this.calculatePointsToNextTier(
      account.tier as LoyaltyTier,
      Number(account.total_spent)
    );

    return {
      data: {
        currentPoints: account.current_points,
        tier: account.tier as LoyaltyTier,
        totalSpent: Number(account.total_spent),
        pointsToNextTier,
      },
    };
  }

  async getTransactions(
    userId: string,
    query: {
      type?: LoyaltyTransactionType;
      page?: number;
      limit?: number;
    }
  ): Promise<ServiceResult<LoyaltyTransactionDto[]>> {
    const { type, page = 1, limit = 20 } = query;
    
    const account = await this.prisma.loyaltyAccounts.findUnique({
      where: { user_id: userId },
    });

    if (!account) {
      return {
        data: [],
        meta: {
          page,
          limit,
          totalRecords: 0,
          totalPages: 0,
          hasPrev: false,
          hasNext: false,
        },
      };
    }

    const where: any = { loyalty_account_id: account.id };
    if (type) {
      where.type = type;
    }

    const [transactions, total] = await Promise.all([
      this.prisma.loyaltyTransactions.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { created_at: 'desc' },
      }),
      this.prisma.loyaltyTransactions.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: transactions.map((t) => this.mapToDto(t, userId)),
      meta: {
        page,
        limit,
        totalRecords: total,
        totalPages,
        hasPrev: page > 1,
        hasNext: page < totalPages,
      },
    };
  }

  async earnPoints(
    userId: string,
    points: number,
    transactionId?: string,
    description?: string
  ): Promise<ServiceResult<void>> {
    const account = await this.getOrCreateAccount(userId);

    await this.prisma.$transaction([
      this.prisma.loyaltyAccounts.update({
        where: { id: account.id },
        data: {
          current_points: { increment: points },
        },
      }),
      this.prisma.loyaltyTransactions.create({
        data: {
          loyalty_account_id: account.id,
          points,
          type: LoyaltyTransactionType.EARN,
          transaction_id: transactionId,
          description: description || 'Points earned from booking',
          expires_at: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year
        },
      }),
    ]);
    
    return { data: undefined };
  }

  async redeemPoints(
    userId: string,
    points: number,
    transactionId?: string,
    description?: string
  ): Promise<ServiceResult<void>> {
    const account = await this.getOrCreateAccount(userId);

    if (account.current_points < points) {
      throw new Error('Insufficient points');
    }

    await this.prisma.$transaction([
      this.prisma.loyaltyAccounts.update({
        where: { id: account.id },
        data: {
          current_points: { decrement: points },
        },
      }),
      this.prisma.loyaltyTransactions.create({
        data: {
          loyalty_account_id: account.id,
          points: -points,
          type: LoyaltyTransactionType.REDEEM,
          transaction_id: transactionId,
          description: description || 'Points redeemed for booking',
        },
      }),
    ]);
    
    return { data: undefined };
  }

  async updateTotalSpent(userId: string, amount: number): Promise<void> {
    const account = await this.getOrCreateAccount(userId);
    const newTotalSpent = Number(account.total_spent) + amount;

    // Determine new tier
    let newTier = LoyaltyTier.BRONZE;
    if (newTotalSpent >= 50000000) {
      newTier = LoyaltyTier.PLATINUM;
    } else if (newTotalSpent >= 20000000) {
      newTier = LoyaltyTier.GOLD;
    } else if (newTotalSpent >= 5000000) {
      newTier = LoyaltyTier.SILVER;
    }

    await this.prisma.loyaltyAccounts.update({
      where: { id: account.id },
      data: {
        total_spent: newTotalSpent,
        tier: newTier,
      },
    });
  }

  private async getOrCreateAccount(userId: string) {
    let account = await this.prisma.loyaltyAccounts.findUnique({
      where: { user_id: userId },
    });

    if (!account) {
      account = await this.prisma.loyaltyAccounts.create({
        data: {
          user_id: userId,
          current_points: 0,
          tier: LoyaltyTier.BRONZE,
          total_spent: 0,
        },
      });
    }

    return account;
  }

  private calculatePointsToNextTier(
    currentTier: LoyaltyTier,
    totalSpent: number
  ): number {
    switch (currentTier) {
      case LoyaltyTier.BRONZE:
        return 5000000 - totalSpent;
      case LoyaltyTier.SILVER:
        return 20000000 - totalSpent;
      case LoyaltyTier.GOLD:
        return 50000000 - totalSpent;
      case LoyaltyTier.PLATINUM:
        return 0;
      default:
        return 0;
    }
  }

  private mapToDto(transaction: any, userId: string): LoyaltyTransactionDto {
    return {
      id: transaction.id,
      userId,
      points: transaction.points,
      type: transaction.type as LoyaltyTransactionType,
      transactionId: transaction.transaction_id,
      description: transaction.description,
      expiresAt: transaction.expires_at,
      createdAt: transaction.created_at,
    };
  }
}
