import { Module } from '@nestjs/common';
import { CinemaController } from './cinema.controller';
import { CinemaService } from './cinema.service';
import { PrismaService } from '../prisma.service';
import { MovieClientModule } from '../client/movie-client.module';

@Module({
  imports: [MovieClientModule],
  controllers: [CinemaController],
  providers: [CinemaService, PrismaService],
})
export class CinemaModule {}
