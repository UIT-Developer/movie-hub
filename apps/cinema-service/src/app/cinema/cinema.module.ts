import { Module } from '@nestjs/common';
import { CinemaController } from './cinema.controller';
import { CinemaService } from './cinema.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CinemaController],
  providers: [CinemaService, PrismaService],
})
export class CinemaModule {}
