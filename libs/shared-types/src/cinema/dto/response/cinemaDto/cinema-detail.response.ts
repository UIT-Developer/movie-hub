import { CinemaSummaryResponse } from './cinema-summary.response';

export interface CinemaDetailResponse extends CinemaSummaryResponse {
  website?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  amenities?: string[];
  facilities?: Record<string, any>;
  virtualTour360Url?: string;
  operatingHours?: Record<string, any>;
  socialMedia?: Record<string, any>;
  timezone: string;
  createdAt: Date;
  updatedAt: Date;
}
