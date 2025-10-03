import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { CinemaService } from '../service/cinema.service';
import { ApiSuccessResponse } from '@movie-hub/libs/common';
import { Request } from 'express';
import {
  GetShowtimesQuery,
  ShowtimeSummaryResponse,
} from '@movie-hub/libs/cinema';

@Controller('cinemas')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Get()
  getCinemas() {
    return this.cinemaService.getCinemas();
  }

  @Get(':cinemaId/movies/:movieId/showtimes')
  async getMovieShowtimesAtCinema(
    @Param('cinemaId') cinemaId: string,
    @Param('movieId') movieId: string,
    @Query() query: GetShowtimesQuery,
    @Req() req: Request
  ): Promise<ApiSuccessResponse<ShowtimeSummaryResponse[]>> {
    console.log(cinemaId, movieId, query);
    const showtimes = await this.cinemaService.getMovieShowtimesAtCinema(
      cinemaId,
      movieId,
      query
    );
    return {
      success: true,
      data: showtimes,
      timestamp: new Date().toISOString(),
      path: req.path,
    };
  }
}
