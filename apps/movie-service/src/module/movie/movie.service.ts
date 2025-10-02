import {
  AgeRatingEnum,
  CreateMovieRequest,
  GenreEnum,
  LanguageOptionEnum,
  MovieResponse,
  ResourceNotFoundException,
  UpdateMovieRequest,
} from '@movie-hub/libs';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MovieMapper } from './movie.mapper';

@Injectable()
export class MovieService {
  logger = new Logger(MovieService.name);

  constructor(
    private readonly prismaService: PrismaService,
    private readonly movieMapper: MovieMapper
  ) {}

  // for admin
  // async createMovie(
  //   createMovieRequest: CreateMovieRequest
  // ): Promise<MovieResponse> {
  //   const movie = await this.prismaService.movie.create({
  //     data: this.movieMapper.toMovieEntity(createMovieRequest),
  //   });

  //   return this.movieMapper.toMovieResponse(movie);
  // }

  async getMovies(): Promise<MovieResponse[]> {
    return (await this.prismaService.movie.findMany()).map(
      (movie) => ({
        ...movie,
        ageRating: movie.ageRating as AgeRatingEnum,
        type: movie.type as LanguageOptionEnum,
        genres: movie.genres as GenreEnum[],
      })
      // this.movieMapper.toMovieResponse(m)
    );
  }

  async createMovie(
    createMovieRequest: CreateMovieRequest
  ): Promise<MovieResponse> {
    const movie = await this.prismaService.movie.create({
      // data: this.movieMapper.toMovieEntity(createMovieRequest),
      data: {
        ...createMovieRequest,
        releaseDate: new Date(createMovieRequest.releaseDate),
        endDate: new Date(createMovieRequest.endDate),
        // type: createMovieRequest.type,
        // createdAt: undefined,
        // updatedAt: undefined,
        // id: undefined,
      },
    });
    return {
      ...movie,
      ageRating: movie.ageRating as AgeRatingEnum,
      type: movie.type as LanguageOptionEnum,
      genres: movie.genres as GenreEnum[],
    };
  }

  async updateMovie(
    id: string,
    updateMovieRequest: UpdateMovieRequest
  ): Promise<MovieResponse> {
    const existingMovie = await this.prismaService.movie.findUnique({
      where: {
        id,
      },
    });

    if (!existingMovie) {
      throw new ResourceNotFoundException('Movie', 'id', id);
    }

    const updateMovie = await this.prismaService.movie.update({
      data: { ...updateMovieRequest, updatedAt: new Date() },
      where: {
        id: id,
      },
    });

    return this.movieMapper.toMovieResponse(updateMovie);
  }
}
