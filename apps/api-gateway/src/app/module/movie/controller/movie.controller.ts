import { CreateMovieRequest, UpdateMovieRequest } from '@movie-hub/libs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from '../service/movie.service';

@Controller({
  version: '1',
  path: 'movies',
})
// @UseInterceptors(RpcErrorInterceptor)
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getMovies() {
    return this.movieService.getMovies();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.movieService.getMovieDetail(id);
  }

  @Post()
  async createMovie(@Body() request: CreateMovieRequest) {
    return this.movieService.createMovie(request);
  }

  @Put(':id')
  async updateMovie(
    @Param('id') id: string,
    @Body() request: UpdateMovieRequest
  ) {
    return this.movieService.updateMovie(id, request);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.movieService.deleteMovie(id);
    return null;
  }
}
