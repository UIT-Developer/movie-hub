import {
  BatchCreateShowtimesInput,
  CinemaMessage,
  CreateShowtimeRequest,
  SERVICE_NAME,
  UpdateShowtimeRequest,
} from '@movie-hub/shared-types';
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
    const result = await lastValueFrom(
      this.cinemaClient.send(CinemaMessage.SHOWTIME.GET_SHOWTIME_SEATS, {
        showtimeId,
        userId,
      })
    );
    return { data: result };
  }

  async getSessionTTL(showtimeId: string, userId: string) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.SHOWTIME.GET_SESSION_TTL, {
        showtimeId,
        userId,
      })
    );
  }

  async createShowtime(body: CreateShowtimeRequest) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.SHOWTIME.CREATE_SHOWTIME, body)
    );
  }

  async createBatchShowtimes(body: BatchCreateShowtimesInput) {
    return lastValueFrom(
      this.cinemaClient.send(
        CinemaMessage.SHOWTIME.BATCH_CREATE_SHOWTIMES,
        body
      )
    );
  }

  async updateShowtime(showtimeId: string, updateData: UpdateShowtimeRequest) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.SHOWTIME.UPDATE_SHOWTIME, {
        showtimeId,
        updateData,
      })
    );
  }

  async deleteShowtime(showtimeId: string) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.SHOWTIME.DELETE_SHOWTIME, {
        showtimeId,
      })
    );
  }
}
