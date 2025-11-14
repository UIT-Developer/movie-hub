import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateCinemaSchema = z.object({
  name: z.string().min(1, 'Tên rạp không được để trống').max(255),
  address: z.string().min(1, 'Địa chỉ không được để trống'),
  city: z.string().min(1, 'Thành phố không được để trống').max(100),
  district: z.string().max(100).optional(),
  phone: z.string().max(20).optional(),
  email: z
    .string()
    .max(255)
    .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
      message: 'Email không hợp lệ',
    })
    .optional(),
  website: z.string().optional(),
  latitude: z.coerce.number().optional(),
  longitude: z.coerce.number().optional(),
  description: z.string().optional(),
  amenities: z.array(z.string()).default([]),
  facilities: z.any().optional(), // JSON
  images: z.array(z.string()).default([]),
  virtualTour360Url: z.string().optional(),
  operatingHours: z.any().optional(),
  socialMedia: z.any().optional(),
  timezone: z.string().default('Asia/Ho_Chi_Minh'),
});

export class CreateCinemaRequest extends createZodDto(CreateCinemaSchema) {
  // constructor() {
  //   super();
  // }
}
