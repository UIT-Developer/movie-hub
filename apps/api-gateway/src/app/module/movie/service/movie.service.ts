import {
  CreateMovieReleaseRequest,
  CreateMovieRequest,
  CreateReviewRequest,
  MovieQuery,
  MovieServiceMessage,
  ReviewQuery,
  SERVICE_NAME,
  UpdateMovieReleaseRequest,
  UpdateMovieRequest,
  UpdateReviewRequest,
} from '@movie-hub/shared-types';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class MovieService {
  logger = new Logger(MovieService.name);

  constructor(
    @Inject(SERVICE_NAME.Movie) private readonly client: ClientProxy
  ) {}

  async getMovies(query: MovieQuery) {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.MOVIE.GET_LIST, query)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getMovieDetail(id: string) {
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

  async updateMovie(id: string, updateMovieRequest: UpdateMovieRequest) {
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
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.MOVIE.DELETED, id)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // Movie Release Date
  async getMovieRelease(movieId: string) {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.MOVIE.GET_LIST_RELEASE, movieId)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async createMovieRelease(request: CreateMovieReleaseRequest) {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.MOVIE_RELEASE.CREATED, request)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
  async updateMovieRelease(
    id: string,
    updateMovieReleaseRequest: UpdateMovieReleaseRequest
  ) {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.MOVIE_RELEASE.UPDATED, {
          id,
          updateMovieReleaseRequest,
        })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async deleteMovieRelease(id: string) {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.MOVIE_RELEASE.DELETED, id)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // reviews
  async getReviews(query: ReviewQuery) {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.MOVIE.GET_REVIEWS, query)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async createReviews(request: CreateReviewRequest) {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.MOVIE.CREATED_REVIEW, request)
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateReview(id: string, request: UpdateReviewRequest) {
    try {
      return await firstValueFrom(
        this.client.send(MovieServiceMessage.MOVIE.UPDATED_REVIEW, {
          id,
          request,
        })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
