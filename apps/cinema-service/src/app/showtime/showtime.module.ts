import { Module } from '@nestjs/common';
import { ShowtimeController } from './showtime.controller';
import { ShowtimeService } from './showtime.service';
import { PrismaService } from '../prisma.service';
import { ShowtimeMapper } from './showtime.mapper';
import { ShowtimeSeatMapper } from './showtime-seat.mapper';

@Module({
  controllers: [ShowtimeController],
  providers: [
    ShowtimeService,
    PrismaService,
    ShowtimeMapper,
    ShowtimeSeatMapper,
  ],
})
export class ShowtimeModule {}
