import {
  CreateMovieRequest,
  MovieMessage,
  MovieResponse,
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

  async getMovies(): Promise<MovieResponse> {
    return firstValueFrom(this.client.send(MovieMessage.MOVIE.GET_LIST, {}));
  }

  async createMovie(request: CreateMovieRequest) {
    return firstValueFrom(
      this.client.send(MovieMessage.MOVIE.CREATED, request)
    );
  }

  async updateMovie(id: string, updateMovieRequest: UpdateMovieRequest): Promise<MovieResponse> {
    try {
      return await firstValueFrom(
        this.client.send(MovieMessage.MOVIE.UPDATED, { id, updateMovieRequest })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
