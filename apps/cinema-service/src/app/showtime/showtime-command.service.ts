// cinema.service.ts
import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from '../prisma.service';
import {
  BatchCreateShowtimeResponse,
  BatchCreateShowtimesInput,
  CreateShowtimeRequest,
  MovieServiceMessage,
  ShowtimeDetailResponse,
  UpdateShowtimeRequest,
} from '@movie-hub/shared-types';
import { DayType, Format, ShowtimeStatus } from '../../../generated/prisma';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { ServiceResult } from '@movie-hub/shared-types/common';
import { ShowtimeMapper } from './showtime.mapper';
import { RealtimeService } from '../realtime/realtime.service';

@Injectable()
export class ShowtimeCommandService {
  constructor(
    private prisma: PrismaService,
    private readonly realtimeService: RealtimeService,
    @Inject('MOVIE_SERVICE') private readonly movieClient: ClientProxy
  ) {}

  // ===========================
  // CREATE SINGLE SHOWTIME
  // ===========================
  async createShowtime(
    dto: CreateShowtimeRequest
  ): Promise<ServiceResult<ShowtimeDetailResponse>> {
    try {
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

      await this.checkCinemaAndHallStatus(cinemaId, hallId);

      const { movie, release } = await this.fetchMovieAndRelease(
        movieId,
        movieReleaseId
      );

      if (!release) {
        throw new RpcException({
          summary: 'Movie release is required',
          statusCode: 409,
          code: 'MOVIE_RELEASE_REQUIRED',
          message: 'Movie release is required',
        });
      }

      // startTime: "2025-12-15 18:30:00"
      const start = new Date(startTime.replace(' ', 'T') + 'Z');
      const end = new Date(
        start.getTime() + movie.runtime * 60000 + 15 * 60000
      );

      // ===========================
      // CHECK RELEASE PERIOD
      // ===========================
      if (start < release.startDate || end > release.endDate) {
        throw new RpcException({
          summary: 'Movie release period violation',
          statusCode: 409,
          code: 'MOVIE_RELEASE_PERIOD_VIOLATION',
          message: 'Showtime must be within the movie release period',
        });
      }

      await this.checkHallConflict(hallId, start, end);

      const totalSeats = await this.getTotalSeats(hallId);
      const dayType = this.getDayType(start);

      const showtime = await this.prisma.showtimes.create({
        data: {
          movie_id: movie.id,
          movie_release_id: release.id,
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
      return {
        data: ShowtimeMapper.toShowtimDetailResponse(showtime),
        message: 'Showtime created successfully',
      };
    } catch (exception) {
      throw new RpcException(exception);
    }
  }

  // ===========================
  // BATCH CREATE SHOWTIME (UTC LOGIC TIME)
  // ===========================
  async batchCreateShowtimes(
    input: BatchCreateShowtimesInput
  ): Promise<ServiceResult<BatchCreateShowtimeResponse>> {
    try {
      const {
        movieId,
        movieReleaseId,
        cinemaId,
        hallId,
        startDate, // "yyyy-MM-dd"
        endDate, // "yyyy-MM-dd"
        timeSlots, // ["HH:mm", ...]
        repeatType,
        weekdays,
        format,
        language,
        subtitles,
      } = input;

      await this.checkCinemaAndHallStatus(cinemaId, hallId);

      const { movie, release } = await this.fetchMovieAndRelease(
        movieId,
        movieReleaseId
      );

      if (!release) {
        throw new RpcException({
          summary: 'Movie release is required',
          statusCode: 409,
          code: 'MOVIE_RELEASE_REQUIRED',
          message: 'Movie release is required',
        });
      }

      // ===========================
      // PARSE DATE RANGE AS UTC
      // ===========================
      const rangeStart = new Date(`${startDate}T00:00:00Z`);
      const rangeEnd = new Date(`${endDate}T23:59:59Z`);

      if (rangeStart < release.startDate || rangeEnd > release.endDate) {
        throw new RpcException({
          summary: 'Movie release period violation',
          statusCode: 409,
          code: 'MOVIE_RELEASE_PERIOD_VIOLATION',
          message: 'Showtimes must be within the movie release period',
        });
      }

      const runtime = movie.runtime;
      const bufferMin = 15;

      // ===========================
      // BUILD VALID DAYS (UTC)
      // ===========================
      const days: Date[] = [];
      const cursor = new Date(rangeStart);

      while (cursor <= rangeEnd) {
        const dow = cursor.getUTCDay();

        if (
          repeatType === 'DAILY' ||
          repeatType === 'WEEKLY' ||
          (repeatType === 'CUSTOM_WEEKDAYS' && weekdays.includes(dow))
        ) {
          days.push(new Date(cursor));
        }

        cursor.setUTCDate(cursor.getUTCDate() + 1);
      }

      // ===========================
      // BUILD CANDIDATE SHOWTIMES
      // ===========================
      const candidateShowtimes: { start: Date; end: Date }[] = [];

      for (const day of days) {
        for (const slot of timeSlots) {
          const [hh, mm] = slot.split(':').map(Number);

          const start = new Date(day);
          start.setUTCHours(hh, mm, 0, 0);

          const end = new Date(start.getTime() + (runtime + bufferMin) * 60000);

          candidateShowtimes.push({ start, end });
        }
      }

      // ===========================
      // CREATE SHOWTIMES
      // ===========================
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

        const showtime = await this.prisma.showtimes.create({
          data: {
            movie_id: movie.id,
            movie_release_id: release.id,
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

        created.push(showtime);
      }

      // ===========================
      // RESPONSE
      // ===========================
      return {
        data: {
          createdCount: created.length,
          skippedCount: skipped.length,
          created: ShowtimeMapper.toShowtimeDetailList(created),
          skipped,
        },
        message: 'Batch create showtimes completed',
      };
    } catch (e) {
      throw new RpcException(e);
    }
  }

  // ===========================
  // UPDATE & CANCEL SHOWTIME
  // ===========================

  async updateShowtime(
    id: string,
    dto: UpdateShowtimeRequest
  ): Promise<ServiceResult<ShowtimeDetailResponse>> {
    const showtime = await this.prisma.showtimes.findUnique({ where: { id } });
    if (!showtime) throw new NotFoundException('Showtime not found');

    const hasReservation = await this.prisma.seatReservations.count({
      where: { showtime_id: id },
    });
    if (hasReservation > 0 && (dto.startTime || dto.hallId)) {
      throw new RpcException({
        summary: 'Cannot update showtime with reservations',
        statusCode: 409,
        code: 'SHOWTIME_WITH_RESERVATIONS',
        message: 'Cannot update showtime with existing reservations',
      });
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
        throw new RpcException({
          summary: `Conflict with showtime ${conflict.id}`,
          statusCode: 409,
          code: 'SHOWTIME_CONFLICT',
          message: `Conflict with showtime ${conflict.id}`,
        });
    }

    const updatedShowtime = await this.prisma.showtimes.update({
      where: { id },
      data: {
        movie_id: dto.movieId ?? showtime.movie_id,
        movie_release_id: dto.movieReleaseId ?? showtime.movie_release_id,
        hall_id: dto.hallId ?? showtime.hall_id,
        cinema_id: dto.cinemaId ?? showtime.cinema_id,
        start_time: start,
        end_time: end,
        format: dto.format ? (dto.format as Format) : showtime.format,
        language: dto.language ?? showtime.language,
        subtitles: dto.subtitles ?? showtime.subtitles,
        updated_at: new Date(),
      },
    });

    return {
      data: ShowtimeMapper.toShowtimDetailResponse(updatedShowtime),
      message: 'Showtime updated successfully',
    };
  }

  async cancelShowtime(id: string): Promise<ServiceResult<void>> {
    const showtime = await this.prisma.showtimes.findUnique({
      where: { id },
    });

    if (!showtime) {
      throw new RpcException({
        statusCode: 404,
        code: 'SHOWTIME_NOT_FOUND',
        message: 'Showtime not found',
      });
    }

    // 1️⃣ Check booking (DB)
    const hasReservation = await this.prisma.seatReservations.count({
      where: { showtime_id: id },
    });

    // 2️⃣ Check hold seat (Redis)
    const hasHeldSeats = await this.realtimeService.hasHeldSeats(id);

    if (hasHeldSeats) {
      throw new RpcException({
        statusCode: 409,
        code: 'SHOWTIME_HAS_HELD_SEATS',
        message: 'Cannot cancel showtime while seats are being held',
      });
    }

    // 3️⃣ Có booking → chỉ cancel
    if (hasReservation > 0) {
      await this.prisma.showtimes.update({
        where: { id },
        data: {
          status: ShowtimeStatus.CANCELLED,
          updated_at: new Date(),
        },
      });

      return {
        data: undefined,
        message: 'Showtime cancelled successfully',
      };
    }

    // 4️⃣ Không booking, không hold → xoá cứng
    await this.prisma.showtimes.delete({
      where: { id },
    });

    return {
      data: undefined,
      message: 'Showtime deleted successfully',
    };
  }

  // ===========================
  // HELPERS
  // ===========================
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
      throw new RpcException({
        summary: `Conflict with showtime ${overlap.id}`,
        statusCode: 409,
        code: 'SHOWTIME_CONFLICT',
        message: `Conflict with showtime ${overlap.id}`,
      });
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
      if (!movie)
        throw new RpcException({
          summary: 'Movie not found',
          statusCode: 404,
          code: 'MOVIE_NOT_FOUND',
          message: 'Movie not found',
        });
      if (movieReleaseId && !release)
        throw new RpcException({
          summary: 'Movie release not found',
          statusCode: 404,
          code: 'MOVIE_RELEASE_NOT_FOUND',
          message: 'Movie release not found',
        });

      return { movie, release };
    } catch {
      throw new RpcException({
        summary: 'Failed to fetch movie or release',
        statusCode: 500,
        code: 'FETCH_MOVIE_RELEASE_FAILED',
        message: 'Could not fetch movie or movie release information',
      });
    }
  }

  private getDayType(date: Date): DayType {
    return date.getDay() === 0 || date.getDay() === 6
      ? DayType.WEEKEND
      : DayType.WEEKDAY;
  }

  private async checkCinemaAndHallStatus(cinemaId: string, hallId: string) {
    const [cinema, hall] = await Promise.all([
      this.prisma.cinemas.findUnique({
        where: { id: cinemaId },
        select: { status: true },
      }),
      this.prisma.halls.findUnique({
        where: { id: hallId },
        select: { status: true },
      }),
    ]);

    if (!cinema) {
      throw new RpcException({
        summary: 'Cinema not found',
        statusCode: 404,
        code: 'CINEMA_NOT_FOUND',
        message: 'Cinema not found',
      });
    }

    if (!hall) {
      throw new RpcException({
        summary: 'Hall not found',
        statusCode: 404,
        code: 'HALL_NOT_FOUND',
        message: 'Hall not found',
      });
    }

    if (cinema.status !== 'ACTIVE') {
      throw new RpcException({
        summary: 'Cinema inactive',
        statusCode: 409,
        code: 'CINEMA_INACTIVE',
        message: 'Cinema is not active',
      });
    }

    if (hall.status !== 'ACTIVE') {
      throw new RpcException({
        summary: 'Hall inactive',
        statusCode: 409,
        code: 'HALL_INACTIVE',
        message: 'Hall is not active',
      });
    }
  }
}
