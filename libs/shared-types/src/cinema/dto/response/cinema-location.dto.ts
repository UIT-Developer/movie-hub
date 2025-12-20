interface DayHours {
  open: string; // Format: "HH:mm"
  close: string; // Format: "HH:mm"
}

export interface OperatingHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
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
    distance?: number; // in km
    distanceText?: string; // "2.5 km"
  };

  description?: string;
  amenities: string[];
  images: string[];

  rating?: number;
  totalReviews: number;

  operatingHours?: OperatingHours;
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
