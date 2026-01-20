import { createZodDto } from "nestjs-zod";
import { CreateStaffSchema } from "./create-staff.request";

export const UpdateStaffSchema = CreateStaffSchema.partial().omit({
  cinemaId: true,
  email: true,
});

export class UpdateStaffRequest extends createZodDto(UpdateStaffSchema) {}
