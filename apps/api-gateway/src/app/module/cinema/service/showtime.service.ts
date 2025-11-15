import { CinemaMessage, SERVICE_NAME } from '@movie-hub/shared-types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ShowtimeService {
  constructor(
    @Inject(SERVICE_NAME.CINEMA) private readonly cinemaClient: ClientProxy
  ) {}

  async getCinemas() {
    return lastValueFrom(this.cinemaClient.send(CinemaMessage.GET_CINEMAS, {}));
  }

  async getShowtimeSeats(showtimeId: string, userId: string) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.SHOWTIME.GET_SHOWTIME_SEATS, {
        showtimeId,
        userId,
      })
    );
  }

  async getSessionTTL(showtimeId: string, userId: string) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.SHOWTIME.GET_SESSION_TTL, {
        showtimeId,
        userId,
      })
    );
  }
}
