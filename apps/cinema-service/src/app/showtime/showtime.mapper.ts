import {
  FormatEnum,
  ShowtimeStatusEnum,
  ShowtimeSummaryResponse,
} from '@movie-hub/shared-types';
import { $Enums, Showtimes } from '../../../generated/prisma/client';

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

  // private parseDecimal(value: Decimal | null): number {
  //   return value ? Number(value.toFixed(2)) : 0;
  // }
}
