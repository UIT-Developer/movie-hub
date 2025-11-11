export interface CinemaSummaryResponse {
  id: string;
  name: string;
  address: string;
  city: string;
  district?: string;
  phone?: string;
  email?: string;
  rating?: number;
  total_reviews: number;
  images?: string[];
  status: string;
}
