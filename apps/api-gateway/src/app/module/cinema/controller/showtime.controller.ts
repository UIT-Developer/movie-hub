import {
  Controller,
  Get,
  Param,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ShowtimeService } from '../service/showtime.service';
import { TransformInterceptor } from '../../../common/interceptor/transform.interceptor';
import { ClerkAuthGuard } from '../../../common/guard/clerk-auth.guard';
import { CurrentUserId } from '../../../common/decorator/current-user-id.decorator';

@Controller({
  version: '1',
  path: 'showtimes',
})
@UseInterceptors(new TransformInterceptor())
export class ShowtimeController {
  constructor(private readonly showtimeService: ShowtimeService) {}

  @Get()
  @UseGuards(ClerkAuthGuard)
  test() {
    return 'Oke';
  }

  @Get(':id/seats')
  @UseGuards(ClerkAuthGuard)
  getShowtimeSeats(
    @Param('id') showtimeId: string,
    @CurrentUserId() userId: string
  ) {
    return this.showtimeService.getShowtimeSeats(showtimeId, userId);
  }

  @Get('session/ttl')
  @UseGuards(ClerkAuthGuard)
  getSessionTTL(@CurrentUserId() userId: string) {
    return this.showtimeService.getSessionTTL(userId);
  }
}
