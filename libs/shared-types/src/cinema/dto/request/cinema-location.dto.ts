export interface GetCinemasNearbyDto {
  latitude: number;
  longitude: number;
  radiusKm?: number; // default: 10
  limit?: number; // default: 20
}

export interface GetCinemasWithFiltersDto {
  // Location
  latitude?: number;
  longitude?: number;
  radiusKm?: number;

  // Filters
  city?: string;
  district?: string;
  amenities?: string[]; // ["parking", "food_court"]
  hallTypes?: string[]; // ["IMAX", "VIP"]
  minRating?: number;

  // Pagination & Sort
  page?: number;
  limit?: number;
  sortBy?: 'distance' | 'rating' | 'name';
  sortOrder?: 'asc' | 'desc';
}

export interface GetCinemaDetailDto {
  cinemaId: string;
  userLatitude?: number;
  userLongitude?: number;
}
