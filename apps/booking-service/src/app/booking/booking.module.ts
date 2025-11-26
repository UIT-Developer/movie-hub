import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { PrismaService } from '../prisma.service';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [
    NotificationModule,
    ClientsModule.register([
      {
        name: 'CINEMA_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.CINEMA_HOST || 'localhost',
          port: parseInt(process.env.CINEMA_PORT) || 3003,
        },
      },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService, PrismaService],
  exports: [BookingService],
})
export class BookingModule {}
