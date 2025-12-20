import {
  Gender,
  ShiftType,
  StaffPosition,
  StaffStatus,
  WorkType,
} from './enum';

export interface StaffResponse {
  id: string;
  cinemaId: string;

  fullName: string;
  email: string;
  phone: string;
  gender: Gender;
  dob: Date;
  position: StaffPosition;
  status: StaffStatus;
  workType: WorkType;
  shiftType: ShiftType;
  salary: number;
  hireDate: Date;
}
