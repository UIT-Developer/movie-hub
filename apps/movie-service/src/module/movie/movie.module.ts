import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';

@Module({
  imports: [PrismaModule],
  controllers: [MovieController],
  providers: [MovieService],
  exports: [],
})
export class MovieModule {}
