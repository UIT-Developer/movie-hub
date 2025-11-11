import {
  HallStatusEnum,
  HallTypeEnum,
} from '@movie-hub/shared-types/cinema/enum';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateHallSchema = z.object({
  cinema_id: z.string().uuid({ message: 'cinema_id phải là UUID hợp lệ' }),
  name: z.string().min(1, 'Tên phòng chiếu không được để trống').max(100),
  type: z.enum(Object.values(HallTypeEnum) as [string, ...string[]], {
    message: 'Loại phòng chiếu không hợp lệ',
  }),
  capacity: z.coerce.number().int().min(1, 'Sức chứa phải lớn hơn 0'),
  rows: z.coerce.number().int().min(1, 'Số hàng ghế phải lớn hơn 0'),
  screen_type: z.string().max(50).optional(),
  sound_system: z.string().max(50).optional(),
  features: z.array(z.string()).default([]),
  layout_data: z.any().optional(), // JSON
  status: z
    .enum(Object.values(HallStatusEnum) as [string, ...string[]])
    .default(HallStatusEnum.ACTIVE),
});

export class CreateHallRequest extends createZodDto(CreateHallSchema) {}
