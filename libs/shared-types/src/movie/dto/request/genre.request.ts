import { createZodDto } from "nestjs-zod";
import z from "zod";

export const CreateGenreSchema = z.object({
  name: z.string().min(1, 'Name cannot be empty')
}).strict()

export class GenreRequest  extends createZodDto(CreateGenreSchema) {
  constructor() {
    super()
  }
}
