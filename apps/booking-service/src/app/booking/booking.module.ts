import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { PrismaService } from '../prisma.service';
import { NotificationModule } from '../notification/notification.module';
import { SERVICE_NAME } from '@movie-hub/shared-types';

@Module({
  imports: [
    NotificationModule,
    ClientsModule.register([
      {
        name: SERVICE_NAME.CINEMA,
        transport: Transport.TCP,
        options: {
          host: process.env.CINEMA_HOST || 'localhost',
          port: parseInt(process.env.CINEMA_PORT) || 3003,
        },
      },
      {
        name: SERVICE_NAME.USER,
        transport: Transport.TCP,
        options: {
          host: process.env.USER_HOST || 'localhost',
          port: parseInt(process.env.USER_PORT) || 3001,
        },
      },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService, PrismaService],
  exports: [BookingService],
})
export class BookingModule {}
