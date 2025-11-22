import {
  CinemaDetailResponse,
  CinemaStatusEnum,
} from '@movie-hub/shared-types';

import { Injectable } from '@nestjs/common';
import { Cinemas } from '../../../generated/prisma';

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
    const parseJsonToRecord = (val: any): Record<string, any> | undefined => {
      if (val == null) return undefined;
      if (typeof val === 'string') {
        try {
          const parsed = JSON.parse(val);
          return typeof parsed === 'object'
            ? (parsed as Record<string, any>)
            : undefined;
        } catch {
          return undefined;
        }
      }
      if (typeof val === 'object') return val as Record<string, any>;
      return undefined;
    };

    return {
      id: cinema.id,
      name: cinema.name,
      address: cinema.address,
      city: cinema.city,
      district: cinema.district,
      phone: cinema.phone,
      email: cinema.email,
      rating: cinema.rating != null ? Number(cinema.rating) : undefined,
      totalReviews: cinema.total_reviews,
      images: cinema.images,
      status: cinema.status as CinemaStatusEnum,
      virtualTour360Url: cinema.virtual_tour_360_url,
      operatingHours: parseJsonToRecord(cinema.operating_hours),
      socialMedia: parseJsonToRecord(cinema.social_media),
      timezone: cinema.timezone,
      createdAt: cinema.created_at,
      updatedAt: cinema.updated_at,
    };
  }
}
