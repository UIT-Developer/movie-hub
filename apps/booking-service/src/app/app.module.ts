import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
import { BookingModule } from './booking/booking.module';
import { PaymentModule } from './payment/payment.module';
import { ConcessionModule } from './concession/concession.module';
import { PromotionModule } from './promotion/promotion.module';
import { LoyaltyModule } from './loyalty/loyalty.module';
import { TicketModule } from './ticket/ticket.module';
import { BookingRedisModule } from './redis/redis.module';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/booking-service/.env',
      validationSchema: Joi.object({
        TCP_HOST: Joi.string().required(),
        TCP_PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
        CINEMA_HOST: Joi.string().default('localhost'),
        CINEMA_PORT: Joi.number().default(3003),
        NODE_ENV: Joi.string().valid('development', 'production').default('development'),
        LOG_LEVEL: Joi.string().default('debug'),
      }),
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    BookingRedisModule,
    BookingModule,
    PaymentModule,
    ConcessionModule,
    PromotionModule,
    LoyaltyModule,
    TicketModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
