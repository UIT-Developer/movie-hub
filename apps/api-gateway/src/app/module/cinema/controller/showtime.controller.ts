import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ShowtimeService } from '../service/showtime.service';
import { TransformInterceptor } from '../../../common/interceptor/transform.interceptor';
import { ClerkAuthGuard } from '../../../common/guard/clerk-auth.guard';
import { CurrentUserId } from '../../../common/decorator/current-user-id.decorator';
import {
  BatchCreateShowtimesInput,
  CreateShowtimeRequest,
  UpdateSeatStatusRequest,
} from '@movie-hub/shared-types';

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

  @Get('showtime/:showtimeId/ttl')
  @UseGuards(ClerkAuthGuard)
  getSessionTTL(
    @Param('showtimeId') showtimeId: string,
    @CurrentUserId() userId: string
  ) {
    return this.showtimeService.getSessionTTL(showtimeId, userId);
  }

  @Post('showtime')
  @UseGuards(ClerkAuthGuard)
  createShowtime(@Body() body: CreateShowtimeRequest) {
    return this.showtimeService.createShowtime(body);
  }

  @Post('/batch')
  @UseGuards(ClerkAuthGuard)
  createBatchShowtimes(@Body() body: BatchCreateShowtimesInput) {
    return this.showtimeService.createBatchShowtimes(body);
  }

  @Patch('/showtime/:id')
  @UseGuards(ClerkAuthGuard)
  updateShowtime(
    @Param('id') showtimeId: string,
    @Body() updateData: UpdateSeatStatusRequest
  ) {
    return this.showtimeService.updateShowtime(showtimeId, updateData);
  }

  @Delete('/showtime/:id')
  @UseGuards(ClerkAuthGuard)
  deleteShowtime(@Param('id') showtimeId: string) {
    return this.showtimeService.deleteShowtime(showtimeId);
  }
}
