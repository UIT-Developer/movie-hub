import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { CinemaModule } from './cinema/cinema.module';
import { ShowtimeModule } from './showtime/showtime.module';
import { CinemaLocationModule } from './cinema-location/cinema-location.module';
import { RealtimeModule } from './realtime/realtime.module';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/cinema-service/.env',
      validationSchema: Joi.object({
        TCP_HOST: Joi.string().required(),
        TCP_PORT: Joi.number().required(),
      }),
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    CinemaModule,
    ShowtimeModule,
    CinemaLocationModule,
    RealtimeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
