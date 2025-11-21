import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PromotionService } from './promotion.service';
import {
  PromotionDto,
  PromotionType,
  ValidatePromotionDto,
  ValidatePromotionResponseDto,
  CreatePromotionDto,
  UpdatePromotionDto,
} from '@movie-hub/shared-types';

@Controller()
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @MessagePattern('promotion.findAll')
  async findAll(
    @Payload() data: { active?: boolean; type?: PromotionType }
  ): Promise<PromotionDto[]> {
    return this.promotionService.findAll(data.active, data.type);
  }

  @MessagePattern('promotion.validate')
  async validate(
    @Payload() data: { code: string; dto: ValidatePromotionDto }
  ): Promise<ValidatePromotionResponseDto> {
    return this.promotionService.validatePromotion(data.code, data.dto);
  }

  @MessagePattern('promotion.findOne')
  async findOne(@Payload() data: { id: string }): Promise<PromotionDto> {
    return this.promotionService.findOne(data.id);
  }

  @MessagePattern('promotion.findByCode')
  async findByCode(@Payload() data: { code: string }): Promise<PromotionDto> {
    return this.promotionService.findByCode(data.code);
  }

  @MessagePattern('promotion.create')
  async create(
    @Payload() data: { dto: CreatePromotionDto }
  ): Promise<PromotionDto> {
    return this.promotionService.create(data.dto);
  }

  @MessagePattern('promotion.update')
  async update(
    @Payload() data: { id: string; dto: UpdatePromotionDto }
  ): Promise<PromotionDto> {
    return this.promotionService.update(data.id, data.dto);
  }

  @MessagePattern('promotion.delete')
  async delete(
    @Payload() data: { id: string }
  ): Promise<{ message: string }> {
    return this.promotionService.delete(data.id);
  }

  @MessagePattern('promotion.toggleActive')
  async toggleActive(@Payload() data: { id: string }): Promise<PromotionDto> {
    return this.promotionService.toggleActive(data.id);
  }
}
