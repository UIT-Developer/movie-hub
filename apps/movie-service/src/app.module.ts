import Joi from 'joi';
import { Module } from '@nestjs/common';import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './module/movie/movie.module';

@Module({
  imports: [
    MovieModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/movie-service/.env',
      validationSchema: Joi.object({
        TCP_PORT: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
  ],
})
export class AppModule {}
