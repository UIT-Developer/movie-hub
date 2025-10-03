import { Module } from '@nestjs/common';
import { ShowtimeController } from './showtime.controller';
import { ShowtimeService } from './showtime.service';
import { PrismaService } from '../prisma.service';
import { ShowtimeMapper } from './showtime.mapper';

@Module({
  controllers: [ShowtimeController],
  providers: [ShowtimeService, PrismaService, ShowtimeMapper],
})
export class ShowtimeModule {}
