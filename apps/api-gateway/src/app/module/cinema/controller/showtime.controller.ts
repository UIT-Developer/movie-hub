import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ShowtimeService } from '../service/showtime.service';
import { TransformInterceptor } from '../../../common/interceptor/transform.interceptor';

@Controller({
  version: '1',
  path: 'showtimes',
})
@UseInterceptors(new TransformInterceptor())
export class ShowtimeController {
  constructor(private readonly showtimeService: ShowtimeService) {}

  @Get(':id/seats')
  //@UseGuards(ClerkAuthGuard)
  getShowtimeSeats(
    @Param('id') showtimeId: string
    //@CurrentUserId() userId: string
  ) {
    const userId = '3249f15e-bfd9-4bc5-a6d8-e8ed0c82a407';
    return this.showtimeService.getShowtimeSeats(showtimeId, userId);
  }
}
