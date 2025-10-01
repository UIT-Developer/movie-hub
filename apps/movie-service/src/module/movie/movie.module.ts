import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MovieController } from './movie.controller';
import { MovieMapper } from './movie.mapper';
import { MovieService } from './movie.service';

@Module({
  imports: [PrismaModule],
  controllers: [MovieController],
  providers: [MovieService, MovieMapper],
  exports: [],
})
export class MovieModule {}
