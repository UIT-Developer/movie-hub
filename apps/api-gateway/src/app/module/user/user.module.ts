import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { SERVICE_NAME } from '@movie-hub/shared-types';
import { StaffController } from './controller/staff.controller';
import { StaffService } from './service/staff.service';
import { ConfigController } from './controller/config.controller';
import { ConfigService as SettingService } from './service/config.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: SERVICE_NAME.USER,
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('USER_HOST'),
            port: configService.get<number>('USER_PORT'),
          },
        }),
      },
    ]),
  ],
  controllers: [UserController, StaffController, ConfigController],
  providers: [UserService, StaffService, SettingService],
})
export class UserModule {}
