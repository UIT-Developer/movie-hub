import { Module } from '@nestjs/common';
import { CinemaController } from './controller/cinema.controller';
import { CinemaService } from './service/cinema.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { SERVICE_NAME } from '@movie-hub/shared-types';
import { ShowtimeController } from './controller/showtime.controller';
import { ShowtimeService } from './service/showtime.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAME.CINEMA,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('CINEMA_HOST'),
            port: configService.get<number>('CINEMA_PORT'),
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
  controllers: [CinemaController, ShowtimeController],
  providers: [CinemaService, ShowtimeService],
})
export class CinemaModule {}
