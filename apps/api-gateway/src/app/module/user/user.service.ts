import { SERVICE_NAME, UserMessage } from '@movie-hub/libs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
@Injectable()
export class UserService {
  constructor(@Inject(SERVICE_NAME.USER) private readonly userClient: ClientProxy) {}

  async getUsers() {
    return lastValueFrom(this.userClient.send(UserMessage.GET_USERS, {}));
  }
}
