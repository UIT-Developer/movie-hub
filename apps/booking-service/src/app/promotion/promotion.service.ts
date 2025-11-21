import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  PromotionDto,
  PromotionType,
  ValidatePromotionDto,
  ValidatePromotionResponseDto,
  CreatePromotionDto,
  UpdatePromotionDto,
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

  async findOne(id: string): Promise<PromotionDto> {
    const promotion = await this.prisma.promotions.findUnique({
      where: { id },
    });

    if (!promotion) {
      throw new NotFoundException('Promotion not found');
    }

    return this.mapToDto(promotion);
  }

  async findByCode(code: string): Promise<PromotionDto> {
    const promotion = await this.prisma.promotions.findUnique({
      where: { code },
    });

    if (!promotion) {
      throw new NotFoundException('Promotion not found');
    }

    return this.mapToDto(promotion);
  }

  async create(dto: CreatePromotionDto): Promise<PromotionDto> {
    // Check if promotion code already exists
    const existing = await this.prisma.promotions.findUnique({
      where: { code: dto.code },
    });

    if (existing) {
      throw new BadRequestException('Promotion code already exists');
    }

    // Validate dates
    if (dto.validFrom >= dto.validTo) {
      throw new BadRequestException(
        'Valid from date must be before valid to date'
      );
    }

    const promotion = await this.prisma.promotions.create({
      data: {
        code: dto.code.toUpperCase(),
        name: dto.name,
        description: dto.description,
        type: dto.type,
        value: dto.value,
        min_purchase: dto.minPurchase,
        max_discount: dto.maxDiscount,
        valid_from: dto.validFrom,
        valid_to: dto.validTo,
        usage_limit: dto.usageLimit,
        usage_per_user: dto.usagePerUser,
        current_usage: 0,
        applicable_for: dto.applicableFor || [],
        conditions: dto.conditions,
        active: dto.active ?? true,
      },
    });

    return this.mapToDto(promotion);
  }

  async update(id: string, dto: UpdatePromotionDto): Promise<PromotionDto> {
    // Check if promotion exists
    const existing = await this.prisma.promotions.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Promotion not found');
    }

    // Validate dates if provided
    const validFrom = dto.validFrom || existing.valid_from;
    const validTo = dto.validTo || existing.valid_to;

    if (validFrom >= validTo) {
      throw new BadRequestException(
        'Valid from date must be before valid to date'
      );
    }

    const promotion = await this.prisma.promotions.update({
      where: { id },
      data: {
        name: dto.name,
        description: dto.description,
        type: dto.type,
        value: dto.value,
        min_purchase: dto.minPurchase,
        max_discount: dto.maxDiscount,
        valid_from: dto.validFrom,
        valid_to: dto.validTo,
        usage_limit: dto.usageLimit,
        usage_per_user: dto.usagePerUser,
        applicable_for: dto.applicableFor,
        conditions: dto.conditions,
        active: dto.active,
      },
    });

    return this.mapToDto(promotion);
  }

  async delete(id: string): Promise<{ message: string }> {
    // Check if promotion exists
    const promotion = await this.prisma.promotions.findUnique({
      where: { id },
    });

    if (!promotion) {
      throw new NotFoundException('Promotion not found');
    }

    // Check if promotion is used in any active bookings
    const activeBookings = await this.prisma.bookings.count({
      where: {
        promotion_code: promotion.code,
        status: {
          in: ['PENDING', 'CONFIRMED'],
        },
      },
    });

    if (activeBookings > 0) {
      throw new BadRequestException(
        'Cannot delete promotion that is used in active bookings. Consider deactivating it instead.'
      );
    }

    await this.prisma.promotions.delete({
      where: { id },
    });

    return { message: 'Promotion deleted successfully' };
  }

  async toggleActive(id: string): Promise<PromotionDto> {
    const promotion = await this.prisma.promotions.findUnique({
      where: { id },
    });

    if (!promotion) {
      throw new NotFoundException('Promotion not found');
    }

    const updated = await this.prisma.promotions.update({
      where: { id },
      data: {
        active: !promotion.active,
      },
    });

    return this.mapToDto(updated);
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
