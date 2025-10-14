import {
  ShowtimeStatusEnum,
  ShowtimeSummaryResponse,
} from '@movie-hub/shared-types';
import { Injectable } from '@nestjs/common';
import { $Enums, Showtimes } from '@prisma/client';

@Injectable()
export class ShowtimeMapper {
  // private readonly PrismaToFormat: Record<$Enums.Format, FormatEnum> = {
  //   TWO_D: FormatEnum.TWO_D,
  //   THREE_D: FormatEnum.THREE_D,
  //   IMAX: FormatEnum.IMAX,
  //   FOUR_DX: FormatEnum.FOUR_DX,
  // };

  private readonly PrismaToStatus: Record<
    $Enums.ShowtimeStatus,
    ShowtimeStatusEnum
  > = {
    SCHEDULED: ShowtimeStatusEnum.SCHEDULED,
    SELLING: ShowtimeStatusEnum.SELLING,
    SOLD_OUT: ShowtimeStatusEnum.SOLD_OUT,
    CANCELLED: ShowtimeStatusEnum.CANCELLED,
    COMPLETED: ShowtimeStatusEnum.COMPLETED,
  };

  toShowtimeSummaryResponse(entity: Showtimes): ShowtimeSummaryResponse {
    return {
      id: entity.id,
      hallId: entity.hall_id,
      startTime: entity.start_time,
      endTime: entity.end_time,
      // format: this.PrismaToFormat[entity.format],
      // language: entity.language,
      // subtitles: entity.subtitles ?? [],
      // basePrice: this.parseDecimal(entity.base_price),
      status: this.PrismaToStatus[entity.status],
    };
  }

  toShowtimeSummaryList(
    entities: (Showtimes & { cinema?: any; hall?: any })[]
  ): ShowtimeSummaryResponse[] {
    return entities.map((entity) => this.toShowtimeSummaryResponse(entity));
  }

  // private parseDecimal(value: Decimal | null): number {
  //   return value ? Number(value.toFixed(2)) : 0;
  // }
}
