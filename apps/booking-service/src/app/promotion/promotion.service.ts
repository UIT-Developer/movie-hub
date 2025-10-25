import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  PromotionDto,
  PromotionType,
  ValidatePromotionDto,
  ValidatePromotionResponseDto,
} from '@movie-hub/shared-types';

@Injectable()
export class PromotionService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    active = true,
    type?: PromotionType
  ): Promise<PromotionDto[]> {
    const where: any = {};
    
    if (active !== undefined) {
      where.active = active;
      where.valid_from = { lte: new Date() };
      where.valid_to = { gte: new Date() };
    }
    
    if (type) {
      where.type = type;
    }

    const promotions = await this.prisma.promotions.findMany({
      where,
      orderBy: { created_at: 'desc' },
    });

    return promotions.map((p) => this.mapToDto(p));
  }

  async validatePromotion(
    code: string,
    dto: ValidatePromotionDto
  ): Promise<ValidatePromotionResponseDto> {
    const promotion = await this.prisma.promotions.findUnique({
      where: { code },
    });

    if (!promotion) {
      return {
        valid: false,
        message: 'Promotion code not found',
      };
    }

    if (!promotion.active) {
      return {
        valid: false,
        message: 'Promotion code is not active',
      };
    }

    const now = new Date();
    if (promotion.valid_from > now || promotion.valid_to < now) {
      return {
        valid: false,
        message: 'Promotion code has expired',
      };
    }

    if (
      promotion.usage_limit &&
      promotion.current_usage >= promotion.usage_limit
    ) {
      return {
        valid: false,
        message: 'Promotion usage limit reached',
      };
    }

    if (
      promotion.min_purchase &&
      dto.bookingAmount < Number(promotion.min_purchase)
    ) {
      return {
        valid: false,
        message: `Minimum purchase amount is ${promotion.min_purchase}`,
      };
    }

    // Calculate discount
    let discountAmount = 0;
    if (promotion.type === PromotionType.PERCENTAGE) {
      discountAmount = (dto.bookingAmount * Number(promotion.value)) / 100;
      if (promotion.max_discount) {
        discountAmount = Math.min(
          discountAmount,
          Number(promotion.max_discount)
        );
      }
    } else if (promotion.type === PromotionType.FIXED_AMOUNT) {
      discountAmount = Number(promotion.value);
    }

    const finalAmount = dto.bookingAmount - discountAmount;

    return {
      valid: true,
      promotion: this.mapToDto(promotion),
      discountAmount,
      finalAmount,
      message: 'Promotion code is valid',
    };
  }

  private mapToDto(promotion: any): PromotionDto {
    return {
      id: promotion.id,
      code: promotion.code,
      name: promotion.name,
      description: promotion.description,
      type: promotion.type as PromotionType,
      value: Number(promotion.value),
      minPurchase: promotion.min_purchase ? Number(promotion.min_purchase) : undefined,
      maxDiscount: promotion.max_discount ? Number(promotion.max_discount) : undefined,
      validFrom: promotion.valid_from,
      validTo: promotion.valid_to,
      usageLimit: promotion.usage_limit,
      usagePerUser: promotion.usage_per_user,
      currentUsage: promotion.current_usage,
      applicableFor: promotion.applicable_for,
      conditions: promotion.conditions,
      active: promotion.active,
    };
  }
}
