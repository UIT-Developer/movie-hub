import { UserMessage } from '@movie-hub/libs';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { UserService } from './user.service';

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
}
