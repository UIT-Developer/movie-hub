import { PaginationQuery, SortQuery } from '@movie-hub/shared-types/common';

export interface ReviewQuery extends PaginationQuery, SortQuery {
  rating?: string;
  userId?: string;
  movieId?: string;
}
