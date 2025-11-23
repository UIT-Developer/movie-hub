import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { SERVICE_NAME } from '@movie-hub/shared-types';
import { ClerkAuthGuard } from '../guard/clerk-auth.guard';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAME.USER,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('USER_HOST') || 'localhost',
            port: configService.get<number>('USER_PORT') || 3001,
          },
        }),
      },
    ]),
  ],
  providers: [ClerkAuthGuard],
  exports: [ClientsModule, ClerkAuthGuard],
})
export class AuthModule {}
