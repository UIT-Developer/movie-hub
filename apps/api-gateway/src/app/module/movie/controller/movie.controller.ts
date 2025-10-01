import {
  CreateMovieRequest,
  MovieResponse,
  UpdateMovieRequest,
} from '@movie-hub/libs';
import { ApiSuccessResponse } from '@movie-hub/libs/common';
import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { Request } from 'express'; // Để lấy thông tin `path` từ request
import { MovieService } from '../service/movie.service';

@Controller({
  version: '1',
  path: 'movies',
})
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getMovies(
    @Req() req: Request
  ): Promise<ApiSuccessResponse<MovieResponse>> {
    return {
      success: true,
      data: await this.movieService.getMovies(),
      timestamp: new Date().toISOString(),
      path: req.path,
    };
  }

  @Post()
  async createMovie(
    @Body() request: CreateMovieRequest,
    @Req() req: Request
  ): Promise<ApiSuccessResponse<MovieResponse>> {
    return {
      success: true,
      data: await this.movieService.createMovie(request),
      timestamp: new Date().toISOString(),
      path: req.path,
    };
  }

  @Put(':id')
  async updateMovie(
    @Param('id') id: string,
    @Body() request: UpdateMovieRequest,
    @Req() req: Request
  ): Promise<ApiSuccessResponse<MovieResponse>> {
    return {
      success: true,
      data: await this.movieService.updateMovie(id, request),
      timestamp: new Date().toISOString(),
      path: req.path,
    };
  }
}
