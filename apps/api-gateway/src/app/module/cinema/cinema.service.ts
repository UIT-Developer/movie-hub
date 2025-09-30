import { CinemaMessage, SERVICE_NAME } from '@movie-hub/libs';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CinemaService {
  constructor(
    @Inject(SERVICE_NAME.CINEMA) private readonly cinemaClient: ClientProxy
  ) {}

  async getCinemas() {
    return lastValueFrom(this.cinemaClient.send(CinemaMessage.GET_CINEMAS, {}));
  }
}
