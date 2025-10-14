export interface GetCinemasNearbyDto {
  latitude: number;
  longitude: number;
  radiusKm?: number;  // default: 10
  limit?: number;     // default: 20
}

export interface GetCinemasWithFiltersDto {
  // Location
  latitude?: number;
  longitude?: number;
  radiusKm?: number;
  
  // Filters
  city?: string;
  district?: string;
  amenities?: string[];  // ["parking", "food_court"]
  hallTypes?: string[];  // ["IMAX", "VIP"]
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

export interface CinemaLocationResponse {
  id: string;
  name: string;
  address: string;
  city: string;
  district?: string;
  phone?: string;
  email?: string;
  website?: string;
  
  location: {
    latitude: number;
    longitude: number;
    distance?: number;      // in km
    distanceText?: string;  // "2.5 km"
  };
  
  description?: string;
  amenities: string[];
  images: string[];
  
  rating?: number;
  totalReviews: number;
  
  operatingHours?: any;
  isOpen?: boolean;
  
  availableHallTypes: string[];
  totalHalls: number;
  
  status: string;
  
  mapUrl?: string;
  directionsUrl?: string;
  
  createdAt: string;
  updatedAt: string;
}

export interface CinemaListResponse {
  cinemas: CinemaLocationResponse[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}