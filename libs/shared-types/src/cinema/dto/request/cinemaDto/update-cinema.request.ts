import { createZodDto } from 'nestjs-zod';
import { CreateCinemaSchema } from './create-cinema.request';
export const UpdateCinemaSchema = CreateCinemaSchema.partial();
export class UpdateCinemaRequest extends createZodDto(UpdateCinemaSchema) {
  constructor() {
    super();
  }
}
