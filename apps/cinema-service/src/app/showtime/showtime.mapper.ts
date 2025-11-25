import {
  DayTypeEnum,
  FormatEnum,
  ShowtimeDetailResponse,
  ShowtimeStatusEnum,
  ShowtimeSummaryResponse,
} from '@movie-hub/shared-types';
import { $Enums, DayType, Showtimes } from '../../../generated/prisma/client';

export class ShowtimeMapper {
  static toShowtimeSummaryResponse(entity: Showtimes): ShowtimeSummaryResponse {
    return {
      id: entity.id,
      hallId: entity.hall_id,
      startTime: entity.start_time,
      endTime: entity.end_time,
      format: entity.format as FormatEnum,
      // language: entity.language,
      // subtitles: entity.subtitles ?? [],
      // basePrice: this.parseDecimal(entity.base_price),
      status: entity.status as ShowtimeStatusEnum,
    };
  }

  static toShowtimeSummaryList(
    entities: (Showtimes & { cinema?: any; hall?: any })[]
  ): ShowtimeSummaryResponse[] {
    return entities.map((entity) => this.toShowtimeSummaryResponse(entity));
  }

  static toShowtimDetailResponse(entity: Showtimes): ShowtimeDetailResponse {
    return {
      id: entity.id,
      movieId: entity.movie_id,
      movieReleaseId: entity.movie_release_id ?? undefined,
      cinemaId: entity.cinema_id,
      hallId: entity.hall_id,
      startTime: entity.start_time,
      endTime: entity.end_time,
      format: entity.format as FormatEnum,
      language: entity.language,
      subtitles: entity.subtitles ?? [],
      availableSeats: entity.available_seats,
      totalSeats: entity.total_seats,
      status: entity.status as ShowtimeStatusEnum,
      dayType: entity.day_type as DayTypeEnum,
      createdAt: entity.created_at,
      updatedAt: entity.updated_at,
    };
  }

  static toShowtimeDetailList(entities: Showtimes[]): ShowtimeDetailResponse[] {
    return entities.map((entity) => this.toShowtimDetailResponse(entity));
  }

  // private parseDecimal(value: Decimal | null): number {
  //   return value ? Number(value.toFixed(2)) : 0;
  // }
}
