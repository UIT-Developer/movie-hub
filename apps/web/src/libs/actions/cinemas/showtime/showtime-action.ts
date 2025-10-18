import { GetShowtimesQuerySchema } from "@movie-hub/shared-types";
import z from "zod";

export type GetShowtimesQuery = z.infer<typeof GetShowtimesQuerySchema>;

