import { Injectable } from '@nestjs/common';
import { ShowtimeMapper } from './showtime.mapper';
import {
  GetShowtimesQuery,
  ShowtimeSummaryResponse,
} from '@movie-hub/libs/cinema';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ShowtimeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: ShowtimeMapper
  ) {}

  async getMovieShowtimesAtCinema(
    cinemaId: string,
    movieId: string,
    query: GetShowtimesQuery
  ): Promise<ShowtimeSummaryResponse[]> {
    const showtimes = await this.prisma.showtimes.findMany({
      where: {
        cinema_id: cinemaId,
        movie_id: movieId,
        start_time: {
          gte: new Date(query.date + 'T00:00:00.000Z'),
          lt: new Date(query.date + 'T23:59:59.999Z'),
        },
      },
      orderBy: { start_time: 'asc' },
    });

    return this.mapper.toShowtimeSummaryList(showtimes);
  }
}
