import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { PromotionController } from './promotion.controller';
import { PromotionService } from './promotion.service';
import { SERVICE_NAME } from '@movie-hub/shared-types';
import { AuthModule } from '../../common/auth/auth.module';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAME.BOOKING,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('BOOKING_HOST') || 'localhost',
            port: configService.get<number>('BOOKING_PORT') || 3002,
          },
        }),
        inject: [ConfigService],
      },
    ]),
    AuthModule
  ],
  controllers: [PromotionController],
  providers: [PromotionService],
  exports: [PromotionService],
})
export class PromotionModule {}
