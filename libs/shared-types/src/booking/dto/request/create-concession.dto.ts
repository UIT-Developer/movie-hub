import { ConcessionCategory } from '../../enum';

export interface CreateConcessionDto {
  name: string;
  nameEn?: string;
  description?: string;
  category: ConcessionCategory;
  price: number;
  imageUrl?: string;
  available?: boolean;
  inventory?: number;
  cinemaId?: string;
  nutritionInfo?: Record<string, any>;
  allergens?: string[];
}

export interface UpdateConcessionDto {
  name?: string;
  nameEn?: string;
  description?: string;
  category?: ConcessionCategory;
  price?: number;
  imageUrl?: string;
  available?: boolean;
  inventory?: number;
  cinemaId?: string;
  nutritionInfo?: Record<string, any>;
  allergens?: string[];
}
