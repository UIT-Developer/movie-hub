import {
  HallDetailResponse,
  HallSummaryResponse,
} from '@movie-hub/shared-types';
import { Halls } from 'apps/cinema-service/generated/prisma';

export class HallMapper {
  static toHall(request) {
    return {
      ...request,
    };
  }

  static toSummaryResponse(hall: Halls): HallSummaryResponse {
    return {
      ...hall,
    } as unknown as HallSummaryResponse;
  }

  static toDetailResponse(hall: Halls): HallDetailResponse {
    return {
      ...hall,
    } as unknown as HallDetailResponse;
  }
}
