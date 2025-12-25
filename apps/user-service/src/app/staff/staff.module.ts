import { Module } from '@nestjs/common';
import { StaffController } from './staff.controller';
import { StaffService } from './staff.service';
import { PrismaService } from '../prisma.service';
@Module({
  imports: [],
  controllers: [StaffController],
  providers: [StaffService, PrismaService],
  exports: [],
})
export class StaffModule {}
