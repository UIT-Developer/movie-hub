import { GenreRequest } from '@movie-hub/shared-types';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { TransformInterceptor } from '../../../common/interceptor/transform.interceptor';
import { GenreService } from '../service/genre.service';

@Controller({
  version: '1',
  path: 'genres',
})
@UseInterceptors(new TransformInterceptor())
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Post()
  async create(@Body() request: GenreRequest) {
    return this.genreService.create(request);
  }

  @Get()
  async findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.genreService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: GenreRequest) {
    return this.genreService.update(id, request);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.genreService.remove(id);
  }
}
