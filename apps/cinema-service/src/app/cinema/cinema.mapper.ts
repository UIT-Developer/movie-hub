import { CinemaDetailResponse } from '@movie-hub/shared-types';

import { Injectable } from '@nestjs/common';
import { Cinemas } from 'apps/cinema-service/generated/prisma';

@Injectable()
export class CinemaMapper {
  static toCinema(request) {
    return {
      ...request,
    };
  }

  static toResponse(cinema: Cinemas): CinemaDetailResponse {
    return {
      ...cinema,
    } as unknown as CinemaDetailResponse;
  }
}
