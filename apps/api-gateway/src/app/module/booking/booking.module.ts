import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { SERVICE_NAME } from '@movie-hub/shared-types';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAME.BOOKING,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('BOOKING_HOST') || 'localhost',
            port: configService.get<number>('BOOKING_PORT') || 3004,
          },
        }),
      },
      {
        name: SERVICE_NAME.USER,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('USER_HOST'),
            port: configService.get<number>('USER_PORT'),
          },
        }),
      },
    ]),
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
