import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';
import { GenreModule } from './module/genre/genre.module';
import { MovieModule } from './module/movie/movie.module';

@Module({
  imports: [
    MovieModule,
    GenreModule,
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
