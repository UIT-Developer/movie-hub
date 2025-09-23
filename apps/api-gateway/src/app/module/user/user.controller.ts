import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ClerkAuthGuard } from '../../common/guard/clerk-auth.guard';
import { Permission } from '../../common/decorator/permission.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Get()
  @UseGuards(ClerkAuthGuard)
  @Permission("USER.LIST")
  getUser() {
    return this.userService.getUsers();
  }
}
