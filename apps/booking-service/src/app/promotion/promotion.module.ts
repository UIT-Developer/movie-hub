import { Module } from '@nestjs/common';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [PromotionController],
  providers: [PromotionService, PrismaService],
  exports: [PromotionService],
})
export class PromotionModule {}
