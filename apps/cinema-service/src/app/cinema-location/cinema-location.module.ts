import { Module } from '@nestjs/common';
import { CinemaLocationController } from './cinema-location.controller';
import { CinemaLocationService } from './cinema-location.service';
import { CinemaLocationMapper } from './cinema-location.mapper';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [CinemaLocationController],
  providers: [CinemaLocationService, CinemaLocationMapper, PrismaService],
  exports: [CinemaLocationService],
})
export class CinemaLocationModule {}