import { Controller } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CinemaMessage,
  GetShowtimesQuery,
  ShowtimeSummaryResponse,
} from '@movie-hub/shared-types';

@Controller('showtimes')
export class ShowtimeController {
  constructor(private readonly showtimeService: ShowtimeService) {}

  @MessagePattern(CinemaMessage.CINEMA.GET_SHOWTIME)
  getMovieShowtimesAtCinema(
    @Payload()
    payload: {
      cinemaId: string;
      movieId: string;
      query: GetShowtimesQuery;
    }
  ): Promise<ShowtimeSummaryResponse[]> {
    return this.showtimeService.getMovieShowtimesAtCinema(
      payload.cinemaId,
      payload.movieId,
      payload.query
    );
  }

  @MessagePattern(CinemaMessage.SHOWTIME.GET_SHOWTIME_SEATS)
  getShowtimeSeats(
    @Payload() payload: { showtimeId: string; userId?: string }
  ) {
    return this.showtimeService.getShowtimeSeats(
      payload.showtimeId,
      payload.userId
    );
  }

  @MessagePattern(CinemaMessage.SHOWTIME.GET_SESSION_TTL)
  getSessionTTL(@Payload() payload: { userId: string }) {
    return this.showtimeService.getSessionTTL(payload.userId);
  }
}
