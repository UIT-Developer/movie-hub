import { PaginationQuery, SortQuery } from '@movie-hub/shared-types/common';

export interface MovieQuery extends PaginationQuery, SortQuery {
  status?: string;
}
