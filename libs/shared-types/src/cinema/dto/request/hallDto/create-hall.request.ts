import {
  HallTypeEnum,
  LayoutTypeEnum,
} from '@movie-hub/shared-types/cinema/enum';
import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const CreateHallSchema = z.object({
  cinemaId: z.uuid({ message: 'cinema_id phải là UUID hợp lệ' }),
  name: z.string().min(1, 'Tên phòng chiếu không được để trống').max(100),
  type: z.enum(Object.values(HallTypeEnum) as [string, ...string[]], {
    message: 'Loại phòng chiếu không hợp lệ',
  }),
  screenType: z.string().max(50).optional(),
  soundSystem: z.string().max(50).optional(),
  features: z.array(z.string()).default([]),
  layoutType: z
    .enum(Object.values(LayoutTypeEnum) as [string, ...string[]])
    .default(LayoutTypeEnum.STANDARD),
});

export class CreateHallRequest extends createZodDto(CreateHallSchema) {}
