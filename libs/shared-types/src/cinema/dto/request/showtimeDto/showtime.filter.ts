import { z } from 'zod';

const optionalStringFromQuery = z.preprocess((val) => {
  if (val === '' || val === null || val === undefined) return undefined;
  return String(val);
}, z.string().optional());

export const ShowtimesFilterSchema = z.object({
  date: optionalStringFromQuery.refine(
    (v) => v === undefined || /^\d{4}-\d{2}-\d{2}$/.test(v),
    { message: 'date must be in YYYY-MM-DD format' }
  ),
});

/** Inferred TypeScript type */
export type ShowtimesFilterDTO = z.infer<typeof ShowtimesFilterSchema>;
