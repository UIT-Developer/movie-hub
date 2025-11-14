import { CinemaDetailResponse } from '@movie-hub/shared-types';

import { Injectable } from '@nestjs/common';
import { Cinemas } from 'apps/cinema-service/generated/prisma';

@Injectable()
export class CinemaMapper {
  static toCinema(request: any) {
    const { virtualTour360Url, operatingHours, socialMedia, ...rest } = request;
    const result: any = {
      ...rest,
      ...(virtualTour360Url !== undefined && {
        virtual_tour_360_url: virtualTour360Url,
      }),
      ...(operatingHours !== undefined && { operating_hours: operatingHours }),
      ...(socialMedia !== undefined && { social_media: socialMedia }),
    };

    return result;
  }

  static toResponse(cinema: Cinemas): CinemaDetailResponse {
    return {
      ...cinema,
    } as unknown as CinemaDetailResponse;
  }
}
