export interface ValidatePromotionItemDto {
  type: 'ticket' | 'concession';
  id: string;
  quantity: number;
}

export interface ValidatePromotionDto {
  bookingAmount: number;
  items?: ValidatePromotionItemDto[];
}
