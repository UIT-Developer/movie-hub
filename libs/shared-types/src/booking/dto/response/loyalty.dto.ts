import { LoyaltyTier, LoyaltyTransactionType } from '../../enum';

export interface LoyaltyBalanceDto {
  currentPoints: number;
  tier: LoyaltyTier;
  totalSpent: number;
  pointsToNextTier?: number;
}

export interface LoyaltyTransactionDto {
  id: string;
  userId: string;
  points: number;
  type: LoyaltyTransactionType;
  transactionId?: string;
  description?: string;
  expiresAt?: Date;
  createdAt: Date;
}
