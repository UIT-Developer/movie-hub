import {
  CreateMovieRequest,
  MovieServiceMessage,
  UpdateMovieRequest,
} from '@movie-hub/libs';
import { Controller, Logger, UseFilters } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MovieService } from './movie.service';
import { AllExceptionsFilter } from '../../filter/all-exceptions.filter';

@Controller('movies')
@UseFilters(new AllExceptionsFilter())
export class MovieController {
  logger = new Logger(MovieController.name);

  constructor(private readonly movieService: MovieService) {}

  @MessagePattern(MovieServiceMessage.MOVIE.GET_LIST)
  async getMovies() {
    return await this.movieService.getMovies();
  }

  @MessagePattern(MovieServiceMessage.MOVIE.GET_DETAIL)
  async getDetail(@Payload() id: string) {
    return await this.movieService.getMovieDetail(id);
  }

  @MessagePattern(MovieServiceMessage.MOVIE.CREATED)
  async createMovie(@Payload() request: CreateMovieRequest) {
    return this.movieService.createMovie(request);
  }

  @MessagePattern(MovieServiceMessage.MOVIE.UPDATED)
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
    return await this.movieService.updateMovie(id, updateMovieRequest);
  }

  @MessagePattern(MovieServiceMessage.MOVIE.DELETED)
  async deleteMovie(@Payload() id: string) {
    await this.movieService.deleteMovie(id);
    return null;
  }
}
