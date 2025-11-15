import { CinemaSummaryResponse } from './cinema-summary.response';

export interface CinemaDetailResponse extends CinemaSummaryResponse {
  website?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  amenities?: string[];
  facilities?: Record<string, any>;
  virtual_tour_360_url?: string;
  operating_hours?: Record<string, any>;
  social_media?: Record<string, any>;
  timezone: string;
  created_at: string;
  updated_at: string;
}
