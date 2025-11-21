import { createZodDto } from 'nestjs-zod';
import { createShowtimeSchema } from './create-showtime.request';

export const UpdateShowtimeSchema = createShowtimeSchema.partial();

export class UpdateShowtimeRequest extends createZodDto(UpdateShowtimeSchema) {}
