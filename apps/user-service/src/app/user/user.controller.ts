import { UserMessage } from '@movie-hub/shared-types';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { Prisma } from '../../../generated/prisma';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(UserMessage.GET_PERMISSIONS)
  async getPermissions(data: { userId: string }) {
    return this.userService.getPermissions(data.userId);
  }

  @MessagePattern(UserMessage.GET_USERS)
  getUser() {
    return this.userService.getUser();
  }

  @MessagePattern(UserMessage.GET_USER_DETAIL)
  async getUserDetail(userId: string) {
    return this.userService.getUserDetail(userId);
  }

  @MessagePattern(UserMessage.CONFIG.GET_LIST)
  async findSettingVariables() {
    return this.userService.findSettingVariables();
  }

  @MessagePattern(UserMessage.CONFIG.UPDATED)
  async updateSettingVariable(
    @Payload()
    data: {
      key: string;
      value: Prisma.JsonObject;
      description?: string;
    }
  ) {
    return this.userService.updateSettingVariable(data);
  }
}
