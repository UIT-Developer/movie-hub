import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { MovieService } from '../service/movie.service';
import { CreateMovieReleaseRequest } from '@movie-hub/shared-types';

@Controller({
  version: '1',
  path: 'movie-releases',
})
export class MovieReleaseController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async createMovieRelease(@Body() request: CreateMovieReleaseRequest) {
    return this.movieService.createMovieRelease(request);
  }

  @Put(':id')
  async updateMovieRelease(
    @Param('id') id: string,
    @Body() request: CreateMovieReleaseRequest
  ) {
    return this.movieService.updateMovieRelease(id, request);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.movieService.deleteMovieRelease(id);
    return null;
  }
}
