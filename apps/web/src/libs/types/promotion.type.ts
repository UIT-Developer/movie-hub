export enum PromotionType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
  FREE_ITEM = 'FREE_ITEM',
  POINTS = 'POINTS',
}

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


export interface ValidatePromotionItemDto {
  type: 'ticket' | 'concession';
  id: string;
  quantity: number;
}

export interface ValidatePromotionDto {
  bookingAmount: number;
  items?: ValidatePromotionItemDto[];
}
