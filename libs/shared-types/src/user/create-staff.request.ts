import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
import {
  Gender,
  ShiftType,
  StaffPosition,
  StaffStatus,
  WorkType,
} from './enum';

export const CreateStaffSchema = z.object({
  cinemaId: z.uuid(),

  fullName: z.string().min(1),
  email: z.email(),
  phone: z.string().min(9),
  gender: z.enum(Object.values(Gender) as [string, ...string[]]),
  dob: z.coerce.date(),
  position: z.enum(Object.values(StaffPosition) as [string, ...string[]]),
  status: z.enum(Object.values(StaffStatus) as [string, ...string[]]),
  workType: z.enum(Object.values(WorkType) as [string, ...string[]]),
  shiftType: z.enum(Object.values(ShiftType) as [string, ...string[]]),
  salary: z.number().int().min(0),
  hireDate: z.coerce.date(),
});

export class CreateStaffRequest extends createZodDto(CreateStaffSchema) {}
