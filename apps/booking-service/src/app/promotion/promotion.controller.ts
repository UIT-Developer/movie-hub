import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PromotionService } from './promotion.service';
import {
  PromotionType,
  ValidatePromotionDto,
  CreatePromotionDto,
  UpdatePromotionDto,
} from '@movie-hub/shared-types';

@Controller()
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @MessagePattern('promotion.findAll')
  async findAll(@Payload() payload: { active?: boolean; type?: PromotionType }) {
    return this.promotionService.findAll(payload.active, payload.type);
  }

  @MessagePattern('promotion.validate')
  async validate(@Payload() payload: { code: string; dto: ValidatePromotionDto }) {
    return this.promotionService.validatePromotion(payload.code, payload.dto);
  }

  @MessagePattern('promotion.findOne')
  async findOne(@Payload() payload: { id: string }) {
    return this.promotionService.findOne(payload.id);
  }

  @MessagePattern('promotion.findByCode')
  async findByCode(@Payload() payload: { code: string }) {
    return this.promotionService.findByCode(payload.code);
  }

  @MessagePattern('promotion.create')
  async create(@Payload() payload: { dto: CreatePromotionDto }) {
    return this.promotionService.create(payload.dto);
  }

  @MessagePattern('promotion.update')
  async update(@Payload() payload: { id: string; dto: UpdatePromotionDto }) {
    return this.promotionService.update(payload.id, payload.dto);
  }

  @MessagePattern('promotion.delete')
  async delete(@Payload() payload: { id: string }) {
    return this.promotionService.delete(payload.id);
  }

  @MessagePattern('promotion.toggleActive')
  async toggleActive(@Payload() payload: { id: string }) {
    return this.promotionService.toggleActive(payload.id);
  }
}
