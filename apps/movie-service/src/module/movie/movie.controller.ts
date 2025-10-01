import {
  CreateMovieRequest,
  MovieMessage,
  UpdateMovieRequest,
} from '@movie-hub/libs';
import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MovieService } from './movie.service';

@Controller('movies')
export class MovieController {
  logger = new Logger(MovieController.name);

  constructor(private readonly movieService: MovieService) {}

  @MessagePattern(MovieMessage.MOVIE.CREATED)
  async createMovie(@Payload() request: CreateMovieRequest) {
    this.logger.debug('request from api gate way', request);
    return this.movieService.createMovie(request);
  }

  @MessagePattern(MovieMessage.MOVIE.GET_LIST)
  async getMovies() {
    return this.movieService.getMovies();
  }

  @MessagePattern(MovieMessage.MOVIE.UPDATED)
  async updateMovie(
    @Payload()
    {
      id,
      updateMovieRequest,
    }: {
      id: string;
      updateMovieRequest: UpdateMovieRequest;
    }
  ) {
    return this.movieService.updateMovie(id, updateMovieRequest);
  }
}
