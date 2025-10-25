import { Module } from '@nestjs/common';
import { ConcessionController } from './concession.controller';
import { ConcessionService } from './concession.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ConcessionController],
  providers: [ConcessionService, PrismaService],
  exports: [ConcessionService],
})
export class ConcessionModule {}
