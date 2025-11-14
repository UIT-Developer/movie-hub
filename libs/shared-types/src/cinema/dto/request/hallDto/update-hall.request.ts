import { createZodDto } from 'nestjs-zod';
import { CreateHallSchema } from './create-hall.request';

export const UpdateHallSchema = CreateHallSchema.omit({
  layoutType: true,
}).partial();

export class UpdateHallRequest extends createZodDto(UpdateHallSchema) {}
