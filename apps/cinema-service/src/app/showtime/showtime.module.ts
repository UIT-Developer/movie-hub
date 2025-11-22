import { Module } from '@nestjs/common';
import { ShowtimeController } from './showtime.controller';
import { ShowtimeService } from './showtime.service';
import { PrismaService } from '../prisma.service';
import { ShowtimeMapper } from './showtime.mapper';
import { ShowtimeSeatMapper } from './showtime-seat.mapper';
import { MovieClientModule } from '../client/movie-client.module';
import { ShowtimeCommandService } from './showtime-command.service';

@Module({
  imports: [MovieClientModule],
  controllers: [ShowtimeController],
  providers: [
    ShowtimeService,
    PrismaService,
    ShowtimeMapper,
    ShowtimeSeatMapper,
    ShowtimeCommandService
  ],
})
export class ShowtimeModule {}
