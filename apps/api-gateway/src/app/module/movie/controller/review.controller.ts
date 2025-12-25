import { ReviewQuery } from '@movie-hub/shared-types';
import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from '../../../common/interceptor/transform.interceptor';
import { ReviewService } from '../service/review.service';

@Controller({
  version: '1',
  path: 'reviews',
})
@UseInterceptors(new TransformInterceptor())
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async findAll(@Query() query: ReviewQuery) {
    return this.reviewService.findAll(query);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.reviewService.remove(id);
  }
}
