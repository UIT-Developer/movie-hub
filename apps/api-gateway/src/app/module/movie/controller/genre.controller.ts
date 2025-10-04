import { GenreRequest } from '@movie-hub/libs';
import { ApiSuccessResponse } from '@movie-hub/libs/common';
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
import { ResponseInterceptor } from '../../../common/interceptor/response.interceptor';
import { GenreService } from '../service/genre.service';

@Controller({
  version: '1',
  path: 'genres',
})
@UseInterceptors(new ResponseInterceptor())
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
    return await this.genreService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: GenreRequest) {
    return await this.genreService.update(id, request);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ApiSuccessResponse<string>> {
    await this.genreService.remove(id);
    return null;
  }
}
