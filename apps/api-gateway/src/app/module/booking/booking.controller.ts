import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { ClerkAuthGuard } from '../../common/guard/clerk-auth.guard';
import { Permission } from '../../common/decorator/permission.decorator';
import { CurrentUserId } from '../../common/decorator/current-user-id.decorator';
import { CreateBookingDto, BookingStatus } from '@movie-hub/shared-types';

@Controller({
  version: '1',
  path: 'bookings',
})
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(ClerkAuthGuard)
  
  async create(
    @CurrentUserId() userId: string,
    @Body() createBookingDto: CreateBookingDto
  ) {
    return this.bookingService.createBooking(userId, createBookingDto);
  }

  @Get()
  @UseGuards(ClerkAuthGuard)
  
  async findAll(
    @CurrentUserId() userId: string,
    @Query('status') status?: BookingStatus,
    @Query('page') page?: number,
    @Query('limit') limit?: number
  ) {
    return this.bookingService.findAllByUser(userId, status, page, limit);
  }

  @Get(':id')
  @UseGuards(ClerkAuthGuard)
 
  async findOne(@CurrentUserId() userId: string, @Param('id') id: string) {
    return this.bookingService.findOne(id, userId);
  }

  @Post(':id/cancel')
  @UseGuards(ClerkAuthGuard)

  async cancel(
    @CurrentUserId() userId: string ,
    @Param('id') id: string,
    @Body('reason') reason?: string
  ) {
    return this.bookingService.cancelBooking(id, userId, reason);
  }
}
