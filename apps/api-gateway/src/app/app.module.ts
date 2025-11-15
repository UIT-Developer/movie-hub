import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { CinemaModule } from './module/cinema/cinema.module';
import Joi from 'joi';
import { MovieModule } from './module/movie/movie.module';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { RealtimeModule } from './module/realtime/realtime.module';
import { BookingModule } from './module/booking/booking.module';
import { PaymentModule } from './module/payment/payment.module';
import { ConcessionModule } from './module/concession/concession.module';
import { PromotionModule } from './module/promotion/promotion.module';

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
        CINEMA_HOST: Joi.string().required(),
        CINEMA_PORT: Joi.number().required(),
        BOOKING_HOST: Joi.string().required(),
        BOOKING_PORT: Joi.number().required(),
      }),
    }),
    UserModule,
    MovieModule,
    CinemaModule,
    BookingModule,
    PaymentModule,
    ConcessionModule,
    PromotionModule,
    RealtimeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
