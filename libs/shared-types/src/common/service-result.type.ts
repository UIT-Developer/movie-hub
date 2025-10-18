import { PaginationMeta } from './pagination.type';

export interface ServiceResult<T> {
  data: T;

  meta?: PaginationMeta;

  message?: string;
}
