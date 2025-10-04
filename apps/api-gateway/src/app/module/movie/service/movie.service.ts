import {
  CreateMovieRequest,
  MovieDetailResponse,
  MovieServiceMessage,
  MovieSummary,
  SERVICE_NAME,
  UpdateMovieRequest,
} from '@movie-hub/libs';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MovieService {
  logger = new Logger(MovieService.name);

  constructor(
    @Inject(SERVICE_NAME.Movie) private readonly client: ClientProxy
  ) {}

  async getMovies(): Promise<MovieSummary> {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.MOVIE.GET_LIST, {})
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getMovieDetail(id: string): Promise<MovieDetailResponse> {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.MOVIE.GET_DETAIL, id)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async createMovie(request: CreateMovieRequest) {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.MOVIE.CREATED, request)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateMovie(
    id: string,
    updateMovieRequest: UpdateMovieRequest
  ): Promise<MovieDetailResponse> {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.MOVIE.UPDATED, {
          id,
          updateMovieRequest,
        })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteMovie(id: string) {
    try {
      firstValueFrom(this.client.send(MovieServiceMessage.MOVIE.DELETED, id));
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
