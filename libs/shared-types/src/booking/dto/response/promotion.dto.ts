import { PromotionType } from '../../enum';

export interface PromotionDto {
  id: string;
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
  currentUsage: number;
  applicableFor: string[];
  conditions?: Record<string, any>;
  active: boolean;
}

export interface ValidatePromotionResponseDto {
  valid: boolean;
  promotion?: PromotionDto;
  discountAmount?: number;
  finalAmount?: number;
  message?: string;
}
