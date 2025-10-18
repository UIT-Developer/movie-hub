import {
  CreateMovieRequest,
  MovieQuery,
  MovieServiceMessage,
  UpdateMovieRequest,
} from '@movie-hub/shared-types';
import {
  Controller,
  Logger,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MovieService } from './movie.service';
import { AllExceptionsFilter } from '../../filter/all-exceptions.filter';
import { LoggingInterceptor } from '@movie-hub/shared-types/common';

@Controller('movies')
@UseFilters(new AllExceptionsFilter())
@UseInterceptors(new LoggingInterceptor('Movie-Service'))
export class MovieController {
  logger = new Logger(MovieController.name);

  constructor(private readonly movieService: MovieService) {}

  @MessagePattern(MovieServiceMessage.MOVIE.GET_LIST)
  async getMovies(@Payload() query: MovieQuery) {
    return this.movieService.getMovies(query);
  }

  @MessagePattern(MovieServiceMessage.MOVIE.GET_DETAIL)
  async getDetail(@Payload() id: string) {
    return this.movieService.getMovieDetail(id);
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
    return this.movieService.updateMovie(id, updateMovieRequest);
  }

  @MessagePattern(MovieServiceMessage.MOVIE.DELETED)
  async deleteMovie(@Payload() id: string) {
    return this.movieService.deleteMovie(id);
  }
}
