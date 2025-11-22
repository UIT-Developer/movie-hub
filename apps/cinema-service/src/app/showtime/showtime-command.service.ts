// cinema.service.ts
import {
  Injectable,
  BadRequestException,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma.service';
import {
  BatchCreateShowtimesInput,
  CreateShowtimeRequest,
  MovieServiceMessage,
  UpdateShowtimeRequest,
} from '@movie-hub/shared-types';
import {
  DayType,
  Format,
  ShowtimeStatus,
} from 'apps/cinema-service/generated/prisma';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ShowtimeCommandService {
  constructor(
    private prisma: PrismaService,
    @Inject('MOVIE_SERVICE') private readonly movieClient: ClientProxy
  ) {}

  // ===========================
  // CREATE SINGLE SHOWTIME
  // ===========================
  async createShowtime(dto: CreateShowtimeRequest) {
    const {
      movieId,
      movieReleaseId,
      cinemaId,
      hallId,
      startTime,
      format,
      language,
      subtitles,
    } = dto;

    const hall = await this.validateHall(cinemaId, hallId);
    const { movie, release } = await this.fetchMovieAndRelease(
      movieId,
      movieReleaseId
    );

    const start = new Date(startTime);
    const end = new Date(start.getTime() + movie.runtime * 60000 + 15 * 60000);

    await this.checkHallConflict(hallId, start, end);

    const totalSeats = await this.getTotalSeats(hallId);
    const dayType = this.getDayType(start);

    return this.prisma.showtimes.create({
      data: {
        movie_id: movie.id,
        movie_release_id: release?.id ?? null,
        cinema_id: cinemaId,
        hall_id: hallId,
        start_time: start,
        end_time: end,
        format: format as Format,
        language,
        subtitles,
        total_seats: totalSeats,
        available_seats: totalSeats,
        day_type: dayType,
      },
    });
  }

  // ===========================
  // BATCH CREATE SHOWTIME
  // ===========================
  async batchCreateShowtimes(input: BatchCreateShowtimesInput) {
    const {
      movieId,
      movieReleaseId,
      cinemaId,
      hallId,
      startDate,
      endDate,
      timeSlots,
      repeatType,
      weekdays,
      format,
      language,
      subtitles,
    } = input;

    const hall = await this.validateHall(cinemaId, hallId);
    const { movie, release } = await this.fetchMovieAndRelease(
      movieId,
      movieReleaseId
    );

    if (release) {
      if (
        new Date(startDate) < release.startDate ||
        new Date(endDate) > release.endDate
      ) {
        throw new BadRequestException(
          'Showtimes must be within the movie release period'
        );
      }
    }

    const runtime = movie.runtime;
    const bufferMin = 15;

    // generate days
    const days: Date[] = [];
    let d = new Date(startDate);
    while (d <= new Date(endDate)) {
      const dow = d.getDay();
      if (
        repeatType === 'DAILY' ||
        (repeatType === 'WEEKLY' && true) ||
        (repeatType === 'CUSTOM_WEEKDAYS' && weekdays.includes(dow))
      ) {
        days.push(new Date(d));
      }
      d.setDate(d.getDate() + 1);
    }

    const candidateShowtimes = [];
    for (const day of days) {
      for (const slot of timeSlots) {
        const [hh, mm] = slot.split(':').map(Number);
        const start = new Date(day);
        start.setHours(hh, mm, 0, 0);
        const end = new Date(start.getTime() + (runtime + bufferMin) * 60000);
        candidateShowtimes.push({ start, end });
      }
    }

    const created: any[] = [];
    const skipped: any[] = [];

    for (const c of candidateShowtimes) {
      const conflict = await this.prisma.showtimes.findFirst({
        where: {
          hall_id: hallId,
          start_time: { lt: c.end },
          end_time: { gt: c.start },
        },
      });

      if (conflict) {
        skipped.push({ start: c.start, reason: 'TIME_CONFLICT' });
        continue;
      }

      const totalSeats = await this.getTotalSeats(hallId);
      const dayType = this.getDayType(c.start);

      const st = await this.prisma.showtimes.create({
        data: {
          movie_id: movie.id,
          movie_release_id: release?.id ?? null,
          cinema_id: cinemaId,
          hall_id: hallId,
          start_time: c.start,
          end_time: c.end,
          format: format as Format,
          language,
          subtitles,
          total_seats: totalSeats,
          available_seats: totalSeats,
          day_type: dayType,
        },
      });

      created.push(st);
    }

    return {
      createdCount: created.length,
      skippedCount: skipped.length,
      created,
      skipped,
    };
  }

  // ===========================
  // UPDATE & CANCEL SHOWTIME
  // ===========================

  async updateShowtime(id: string, dto: UpdateShowtimeRequest) {
    const showtime = await this.prisma.showtimes.findUnique({ where: { id } });
    if (!showtime) throw new NotFoundException('Showtime not found');

    const hasReservation = await this.prisma.seatReservations.count({
      where: { showtime_id: id },
    });
    if (hasReservation > 0 && (dto.startTime || dto.hallId)) {
      throw new BadRequestException(
        'Cannot update time or hall because reservations exist'
      );
    }

    // lấy runtime
    let movieRuntime: number;
    if (dto.movieId && dto.movieId !== showtime.movie_id) {
      const { movie } = await this.fetchMovieAndRelease(dto.movieId); // helper trả về movie + optional release
      movieRuntime = movie.runtime;
    } else {
      const { movie } = await this.fetchMovieAndRelease(showtime.movie_id);
      movieRuntime = movie.runtime;
    }

    const start = dto.startTime ? new Date(dto.startTime) : showtime.start_time;
    const end = new Date(start.getTime() + movieRuntime * 60 * 1000);

    // check conflict nếu đổi start/hall
    if (dto.startTime || dto.hallId) {
      const hallId = dto.hallId ?? showtime.hall_id;
      const conflict = await this.prisma.showtimes.findFirst({
        where: {
          hall_id: hallId,
          id: { not: id },
          start_time: { lte: end },
          end_time: { gte: start },
        },
      });
      if (conflict)
        throw new BadRequestException(`Conflict with showtime ${conflict.id}`);
    }

    return this.prisma.showtimes.update({
      where: { id },
      data: {
        movie_id: dto.movieId ?? showtime.movie_id,
        hall_id: dto.hallId ?? showtime.hall_id,
        start_time: start,
        end_time: end,
        format: dto.format ? (dto.format as Format) : showtime.format,
        language: dto.language ?? showtime.language,
        subtitles: dto.subtitles ?? showtime.subtitles,
        updated_at: new Date(),
      },
    });
  }

  async cancelShowtime(id: string) {
    const showtime = await this.prisma.showtimes.findUnique({
      where: { id },
    });
    if (!showtime) throw new NotFoundException('Showtime not found');

    const hasReservation = await this.prisma.seatReservations.count({
      where: { showtime_id: id },
    });

    // Nếu có người đặt → chuyển trạng thái
    if (hasReservation > 0) {
      return this.prisma.showtimes.update({
        where: { id },
        data: {
          status: ShowtimeStatus.CANCELLED,
          updated_at: new Date(),
        },
      });
    }

    // Nếu không ai đặt → xoá cứng hoặc soft delete
    return this.prisma.showtimes.delete({
      where: { id },
    });
  }

  // ===========================
  // HELPERS
  // ===========================
  private async validateHall(cinemaId: string, hallId: string) {
    const hall = await this.prisma.halls.findFirst({
      where: { id: hallId, cinema_id: cinemaId },
    });
    if (!hall) throw new NotFoundException('Hall not found in this cinema');
    return hall;
  }

  private async getTotalSeats(hallId: string) {
    return this.prisma.seats.count({ where: { hall_id: hallId } });
  }

  private async checkHallConflict(hallId: string, start: Date, end: Date) {
    const overlap = await this.prisma.showtimes.findFirst({
      where: {
        hall_id: hallId,
        start_time: { lt: end },
        end_time: { gt: start },
      },
    });
    if (overlap)
      throw new BadRequestException(
        'This hall already has a showtime in that time range'
      );
  }

  private async fetchMovieAndRelease(movieId: string, movieReleaseId?: string) {
    try {
      const [movieRes, releaseRes] = await Promise.all([
        firstValueFrom(
          this.movieClient.send(MovieServiceMessage.MOVIE.GET_DETAIL, movieId)
        ),
        firstValueFrom(
          this.movieClient.send(
            MovieServiceMessage.MOVIE.GET_LIST_RELEASE,
            movieId
          )
        ),
      ]);

      const movie = movieRes.data;
      const releases = releaseRes.data;

      const release = releases.find((r) => r.id === movieReleaseId);

      // validate movie status / formats nếu muốn
      if (!movie) throw new NotFoundException('Movie not found');
      if (movieReleaseId && !release)
        throw new NotFoundException('Movie release not found');

      return { movie, release };
    } catch {
      throw new BadRequestException('Cannot fetch movie or release');
    }
  }

  private getDayType(date: Date): DayType {
    return date.getDay() === 0 || date.getDay() === 6
      ? DayType.WEEKEND
      : DayType.WEEKDAY;
  }
}
