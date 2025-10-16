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
}
