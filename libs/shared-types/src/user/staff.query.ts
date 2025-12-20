import { PaginationQuery, SortQuery } from '@movie-hub/shared-types/common';
import {
  Gender,
  ShiftType,
  StaffPosition,
  StaffStatus,
  WorkType,
} from './enum';

export interface StaffQuery extends PaginationQuery, SortQuery {
  cinemaId?: string;
  fullName?: string;
  gender?: Gender;
  dob?: Date;
  position?: StaffPosition;
  status?: StaffStatus;
  workType?: WorkType;
  shiftType?: ShiftType;
}
