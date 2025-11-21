import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { PromotionService } from '../service/promotion.service';
import { ClerkAuthGuard } from '../../../common/guard/clerk-auth.guard';
import {
  PromotionDto,
  PromotionType,
  ValidatePromotionDto,
  ValidatePromotionResponseDto,
  CreatePromotionDto,
  UpdatePromotionDto,
} from '@movie-hub/shared-types';

@Controller({
  version: '1',
  path: 'promotions',
})
export class PromotionController {
  constructor(private readonly promotionService: PromotionService) {}

  @Get()
  async findAll(
    @Query('active') active?: string,
    @Query('type') type?: PromotionType
  ): Promise<PromotionDto[]> {
    return this.promotionService.findAll(
      active === 'true' ? true : active === 'false' ? false : undefined,
      type
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PromotionDto> {
    return this.promotionService.findOne(id);
  }

  @Get('code/:code')
  async findByCode(@Param('code') code: string): Promise<PromotionDto> {
    return this.promotionService.findByCode(code);
  }

  @Post('validate/:code')
  async validate(
    @Param('code') code: string,
    @Body() validateDto: ValidatePromotionDto
  ): Promise<ValidatePromotionResponseDto> {
    return this.promotionService.validate(code, validateDto);
  }

  @Post()
  @UseGuards(ClerkAuthGuard)
  async create(
    @Body() createPromotionDto: CreatePromotionDto
  ): Promise<PromotionDto> {
    return this.promotionService.create(createPromotionDto);
  }

  @Put(':id')
  @UseGuards(ClerkAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updatePromotionDto: UpdatePromotionDto
  ): Promise<PromotionDto> {
    return this.promotionService.update(id, updatePromotionDto);
  }

  @Delete(':id')
  @UseGuards(ClerkAuthGuard)
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.promotionService.delete(id);
  }

  @Patch(':id/toggle-active')
  @UseGuards(ClerkAuthGuard)
  async toggleActive(@Param('id') id: string): Promise<PromotionDto> {
    return this.promotionService.toggleActive(id);
  }
}
