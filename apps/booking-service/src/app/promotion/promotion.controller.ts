import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PromotionService } from './promotion.service';
import {
  PromotionDto,
  PromotionType,
  ValidatePromotionDto,
  ValidatePromotionResponseDto,
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
}
