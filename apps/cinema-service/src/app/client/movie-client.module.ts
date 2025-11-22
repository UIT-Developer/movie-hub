import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MOVIE_SERVICE',
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('MOVIE_HOST'),
            port: configService.get<number>('MOVIE_PORT'),
          },
        }),
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class MovieClientModule {}
