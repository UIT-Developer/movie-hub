import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ConcessionController } from './concession.controller';
import { ConcessionService } from './concession.service';
import { AuthModule } from '../../common/auth/auth.module';
import { SERVICE_NAME } from '@movie-hub/shared-types';

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
      // USER client is provided by AuthModule
    ]),
    AuthModule,
  ],
  controllers: [ConcessionController],
  providers: [ConcessionService],
  exports: [ConcessionService],
})
export class ConcessionModule {}
