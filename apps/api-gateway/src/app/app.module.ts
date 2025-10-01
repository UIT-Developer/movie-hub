import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import Joi from 'joi';
import { MovieModule } from './module/movie/movie.module';
import { APP_PIPE } from '@nestjs/core'
import { ZodValidationPipe } from 'nestjs-zod';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/api-gateway/.env',
      validationSchema: Joi.object({
        CLERK_SECRET_KEY: Joi.string().required(),
        USER_HOST: Joi.string().required(),
        USER_PORT: Joi.number().required(),
        MOVIE_HOST: Joi.string().required(),
        MOVIE_PORT: Joi.number().required(),
      }),
    }),
    UserModule,
    MovieModule,
  ],
  controllers: [],
  providers: [{
    provide: APP_PIPE,
    useClass: ZodValidationPipe
  }],
})
export class AppModule {}
