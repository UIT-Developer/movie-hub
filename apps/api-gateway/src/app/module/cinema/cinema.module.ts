import { Module } from '@nestjs/common';
import { CinemaController } from './cinema.controller';
import { CinemaService } from './cinema.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SERVICE_NAME } from '@movie-hub/libs';
import { ConfigService } from '@nestjs/config';

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
    ]),
  ],
  controllers: [CinemaController],
  providers: [CinemaService],
})
export class CinemaModule {}
