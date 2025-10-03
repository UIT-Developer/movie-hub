import { Controller } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CinemaMessage } from '@movie-hub/libs';
import {
  GetShowtimesQuery,
  ShowtimeSummaryResponse,
} from '@movie-hub/libs/cinema';

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
