import {
  AgeRatingEnum,
  CreateMovieRequest,
  LanguageOptionEnum,
  MovieDetailResponse,
  MovieSummary,
  ResourceNotFoundException,
  UpdateMovieRequest,
} from '@movie-hub/libs';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MovieMapper } from './movie.mapper';

@Injectable()
export class MovieService {
  logger = new Logger(MovieService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getMovies(): Promise<MovieSummary[]> {
    return (
      await this.prismaService.movie.findMany({
        select: {
          id: true,
          title: true,
          posterUrl: true,
          backdropUrl: true,
          runtime: true,
          ageRating: true,
          productionCountry: true,
          languageType: true,
        },
      })
    ).map((movie) => ({
      ...movie,
      ageRating: movie.ageRating as AgeRatingEnum,
      languageType: movie.languageType as LanguageOptionEnum,
    }));
  }

  async getMovieDetail(id: string): Promise<MovieDetailResponse> {
    const movie = await this.prismaService.movie.findUnique({
      where: { id },
      include: {
        movieGenres: {
          include: {
            genre: true,
          },
        },
      },
    });

    return MovieMapper.toResponse(movie);
  }

  async createMovie(
    createMovieRequest: CreateMovieRequest
  ): Promise<MovieDetailResponse> {
    const movie = await this.prismaService.$transaction(async (db) => {
      return await db.movie.create({
        data: MovieMapper.toMovie(createMovieRequest),
        include: {
          movieGenres: {
            include: {
              genre: true,
            },
          },
        },
      });
    });

    return MovieMapper.toResponse(movie);
  }

  async updateMovie(
    id: string,
    updateMovieRequest: UpdateMovieRequest
  ): Promise<MovieDetailResponse> {
    const existingMovie = await this.prismaService.movie.findUnique({
      where: { id },
    });

    if (!existingMovie) {
      throw new ResourceNotFoundException('Movie', 'id', id);
    }

    const updatedMovie = await this.prismaService.$transaction(async (db) => {
      if (updateMovieRequest.genreIds) {
        await db.movieGenre.deleteMany({
          where: {
            movieId: id,
          },
        });
      }

      return await db.movie.update({
        data: MovieMapper.toMovie(updateMovieRequest),
        where: {
          id: id,
        },
        include: {
          movieGenres: {
            include: {
              genre: true,
            },
          },
        },
      });
    });
    return MovieMapper.toResponse(updatedMovie);
  }

  async deleteMovie(id: string): Promise<void> {
    await this.prismaService.movie.delete({
      where: { id },
    });
  }
}
