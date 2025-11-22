import { Controller } from '@nestjs/common';
import { ShowtimeService } from './showtime.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  AdminGetShowtimesQuery,
  BatchCreateShowtimesInput,
  CinemaMessage,
  CreateShowtimeRequest,
  GetShowtimesQuery,
  ShowtimeSummaryResponse,
  UpdateShowtimeRequest,
} from '@movie-hub/shared-types';
import { ShowtimeCommandService } from './showtime-command.service';

@Controller('showtimes')
export class ShowtimeController {
  constructor(
    private readonly showtimeService: ShowtimeService,
    private readonly showtimeCommandService: ShowtimeCommandService
  ) {}

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

  @MessagePattern(CinemaMessage.CINEMA.ADMIN_GET_SHOWTIME)
  adminGetMovieShowtimes(
    @Payload()
    payload: {
      cinemaId: string;
      movieId: string;
      query: AdminGetShowtimesQuery;
    }
  ): Promise<ShowtimeSummaryResponse[]> {
    return this.showtimeService.adminGetMovieShowtimes(
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
  getSessionTTL(@Payload() payload: { showtimeId: string; userId: string }) {
    return this.showtimeService.getSessionTTL(
      payload.showtimeId,
      payload.userId
    );
  }

  @MessagePattern(CinemaMessage.SHOWTIME.CREATE_SHOWTIME)
  createShowtime(@Payload() payload: CreateShowtimeRequest) {
    return this.showtimeCommandService.createShowtime(payload);
  }

  @MessagePattern(CinemaMessage.SHOWTIME.BATCH_CREATE_SHOWTIMES)
  batchCreateShowtimes(@Payload() payload: BatchCreateShowtimesInput) {
    return this.showtimeCommandService.batchCreateShowtimes(payload);
  }

  @MessagePattern(CinemaMessage.SHOWTIME.UPDATE_SHOWTIME)
  updateShowtime(
    @Payload()
    payload: {
      showtimeId: string;
      updateData: UpdateShowtimeRequest;
    }
  ) {
    return this.showtimeCommandService.updateShowtime(
      payload.showtimeId,
      payload.updateData
    );
  }

  @MessagePattern(CinemaMessage.SHOWTIME.DELETE_SHOWTIME)
  deleteShowtime(@Payload() payload: { showtimeId: string }) {
    return this.showtimeCommandService.cancelShowtime(payload.showtimeId);
  }

  @MessagePattern(CinemaMessage.SHOWTIME.GET_SEATS_HELD_BY_USER)
  getSeatsHeldByUser(
    @Payload() payload: { showtimeId: string; userId: string }
  ): Promise<string[]> {
    return this.showtimeService.getSeatsHeldByUser(
      payload.showtimeId,
      payload.userId
    );
  }
}
