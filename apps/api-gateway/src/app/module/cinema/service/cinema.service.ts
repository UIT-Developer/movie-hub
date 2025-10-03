import { CinemaMessage, SERVICE_NAME } from '@movie-hub/libs';
import {
  GetShowtimesQuery,
  ShowtimeSummaryResponse,
} from '@movie-hub/libs/cinema';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class CinemaService {
  constructor(
    @Inject(SERVICE_NAME.CINEMA) private readonly cinemaClient: ClientProxy
  ) {}

  async getCinemas() {
    return lastValueFrom(this.cinemaClient.send(CinemaMessage.GET_CINEMAS, {}));
  }

  async getMovieShowtimesAtCinema(
    cinemaId: string,
    movieId: string,
    query: GetShowtimesQuery
  ): Promise<ShowtimeSummaryResponse[]> {
    return firstValueFrom(
      this.cinemaClient.send(CinemaMessage.CINEMA.GET_SHOWTIME, {
        cinemaId,
        movieId,
        query,
      })
    );
  }
}
