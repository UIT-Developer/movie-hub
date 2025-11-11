import { createZodDto } from 'nestjs-zod';
import { CreateHallSchema } from './create-hall.request';
export const UpdateHallSchema = CreateHallSchema.partial();
export class UpdateHallRequest extends createZodDto(UpdateHallSchema) {
  constructor() {
    super();
  }
}
