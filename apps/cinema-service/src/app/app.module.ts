import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CinemaModule } from './cinema/cinema.module';
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
    CinemaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
