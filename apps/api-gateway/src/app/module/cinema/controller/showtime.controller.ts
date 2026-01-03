import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ShowtimeService } from '../service/showtime.service';
import { TransformInterceptor } from '../../../common/interceptor/transform.interceptor';
import { ClerkAuthGuard } from '../../../common/guard/clerk-auth.guard';
import { CurrentUserId } from '../../../common/decorator/current-user-id.decorator';
import {
  AdminShowtimeFilterDTO,
  BatchCreateShowtimesInput,
  batchCreateShowtimesSchema,
  CreateShowtimeRequest,
  createShowtimeSchema,
  UpdateShowtimeRequest,
} from '@movie-hub/shared-types';
import { ZodValidationPipe } from 'nestjs-zod';

@Controller({
  version: '1',
  path: 'showtimes',
})
@UseInterceptors(new TransformInterceptor())
export class ShowtimeController {
  constructor(private readonly showtimeService: ShowtimeService) {}

  @Get()
  @UseGuards(ClerkAuthGuard)
  getShowtimes(@Query() filter: AdminShowtimeFilterDTO) {
    return this.showtimeService.getShowtimes(filter);
  }

  @Get(':id/seats')
  @UseGuards(ClerkAuthGuard)
  getShowtimeSeats(
    @Param('id') showtimeId: string,
    @CurrentUserId() userId: string
  ) {
    return this.showtimeService.getShowtimeSeats(showtimeId, userId);
  }

  @Get(':id')
  @UseGuards(ClerkAuthGuard)
  getShowtime(@Param('id') showtimeId: string) {
    return this.showtimeService.getShowtime(showtimeId);
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
  @UsePipes(new ZodValidationPipe(createShowtimeSchema))
  createShowtime(@Body() body: CreateShowtimeRequest) {
    return this.showtimeService.createShowtime(body);
  }

  @Post('/batch')
  @UseGuards(ClerkAuthGuard)
  @UsePipes(new ZodValidationPipe(batchCreateShowtimesSchema))
  createBatchShowtimes(@Body() body: BatchCreateShowtimesInput) {
    return this.showtimeService.createBatchShowtimes(body);
  }

  @Patch('/showtime/:id')
  @UseGuards(ClerkAuthGuard)
  updateShowtime(
    @Param('id') showtimeId: string,
    @Body() updateData: UpdateShowtimeRequest
  ) {
    return this.showtimeService.updateShowtime(showtimeId, updateData);
  }

  @Delete('/showtime/:id')
  @UseGuards(ClerkAuthGuard)
  deleteShowtime(@Param('id') showtimeId: string) {
    return this.showtimeService.deleteShowtime(showtimeId);
  }
}
