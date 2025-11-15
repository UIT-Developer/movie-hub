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
import { TransformInterceptor } from '../../../common/interceptor/transform.interceptor';
import { ClerkAuthGuard } from '../../../common/guard/clerk-auth.guard';
import {
  CreateHallRequest,
  UpdateHallRequest,
  UpdateSeatStatusRequest,
} from '@movie-hub/shared-types';
import { HallService } from '../service/hall.service';

@Controller({
  version: '1',
  path: 'halls',
})
@UseInterceptors(new TransformInterceptor())
export class HallController {
  constructor(private readonly hallService: HallService) {}

  // CRUD Operations

  @Get('hall/:hallId')
  @UseGuards(ClerkAuthGuard)
  getHallById(@Param('hallId') hallId: string) {
    return this.hallService.getHallById(hallId);
  }

  @Get('cinema/:cinemaId')
  @UseGuards(ClerkAuthGuard)
  getHallsOfCinema(@Param('cinemaId') cinemaId: string) {
    return this.hallService.getHallsOfCinema(cinemaId);
  }

  /**
   * Create a new hall
   */
  @Post('hall')
  @UseGuards(ClerkAuthGuard)
  //@Permission('hall:create')
  createHall(@Body() createHallRequest: CreateHallRequest) {
    return this.hallService.createHall(createHallRequest);
  }

  /**
   * Get hall detail by ID
   */
  @Patch('hall/:hallId')
  @UseGuards(ClerkAuthGuard)
  //@Permission('hall:create')
  updateHall(
    @Param('hallId') hallId: string,
    @Body() updateHallDto: UpdateHallRequest
  ) {
    return this.hallService.updateHall(hallId, updateHallDto);
  }

  /**
   * Delete a hall by ID
   */
  @Delete('hall/:hallId')
  @UseGuards(ClerkAuthGuard)
  //@Permission('hall:create')
  deleteHall(@Param('hallId') hallId: string) {
    return this.hallService.deleteHall(hallId);
  }

  /**
   *  Update seat status
   */
  @Patch('seat/:seatId/status')
  @UseGuards(ClerkAuthGuard)
  //@Permission('hall:create')
  updateSeatStatus(
    @Param('seatId') seatId: string,
    @Body() updateSeatStatusRequest: UpdateSeatStatusRequest
  ) {
    return this.hallService.updateSeatStatus(seatId, updateSeatStatusRequest);
  }
}
