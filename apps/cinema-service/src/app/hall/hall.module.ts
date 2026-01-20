import { Module } from '@nestjs/common';
import { HallController } from './hall.controller';
import { HallService } from './hall.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [HallController],
  providers: [HallService, PrismaService],
})
export class HallModule {}
