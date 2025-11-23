import { PromotionType } from '../../enum';

export interface CreatePromotionDto {
  code: string;
  name: string;
  description?: string;
  type: PromotionType;
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  validFrom: Date;
  validTo: Date;
  usageLimit?: number;
  usagePerUser?: number;
  applicableFor?: string[];
  conditions?: Record<string, any>;
  active?: boolean;
}

export interface UpdatePromotionDto {
  name?: string;
  description?: string;
  type?: PromotionType;
  value?: number;
  minPurchase?: number;
  maxDiscount?: number;
  validFrom?: Date;
  validTo?: Date;
  usageLimit?: number;
  usagePerUser?: number;
  applicableFor?: string[];
  conditions?: Record<string, any>;
  active?: boolean;
}
