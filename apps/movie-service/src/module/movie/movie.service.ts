/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateMovieRequest,
  MovieDetailResponse,
  MovieQuery,
  MovieSummary,
  ResourceNotFoundException,
  UpdateMovieRequest,
} from '@movie-hub/shared-types';
import { ServiceResult } from '@movie-hub/shared-types/common';
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MovieMapper } from './movie.mapper';

@Injectable()
export class MovieService {
  logger = new Logger(MovieService.name);

  constructor(private readonly prismaService: PrismaService) {}

  async getMovies(query: MovieQuery): Promise<ServiceResult<MovieSummary[]>> {
    const page = query && query.page ? Number(query.page) : 1;
    const limit = query && query.limit ? Number(query.limit) : undefined;
    const skip = limit ? (page - 1) * limit : 0;
    const today = new Date();

    const where: any = {};

    if (query.status === 'now_show') {
      where.movieReleases = {
        some: {
          startDate: { lte: today },
          OR: [{ endDate: { gte: today } }, { endDate: null }],
        },
      };
    } else if (query.status === 'upcoming') {
      where.movieReleases = {
        some: {
          startDate: { gt: today },
        },
      };
    }

    const movies = await this.prismaService.movie.findMany({
      where,
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
      orderBy: {
        [query.sortBy]: query.sortOrder,
      },
      skip,
      take: limit,
    });

    let meta = null;
    if (query && limit) {
      const totalRecords = await this.prismaService.movie.count({ where });
      meta = {
        page,
        limit,
        totalRecords,
        totalPages: Math.ceil(totalRecords / limit),
        hasPrev: page > 1,
        hasNext: page * limit < totalRecords,
      };
    }

    return {
      data: movies as MovieSummary[],
      meta,
    };
  }

  async getMovieDetail(
    id: string
  ): Promise<ServiceResult<MovieDetailResponse>> {
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

    return {
      data: MovieMapper.toResponse(movie),
    };
  }

  async createMovie(
    createMovieRequest: CreateMovieRequest
  ): Promise<ServiceResult<MovieDetailResponse>> {
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

    return {
      data: MovieMapper.toResponse(movie),
      message: 'Create movie successfully!',
    };
  }

  async updateMovie(
    id: string,
    updateMovieRequest: UpdateMovieRequest
  ): Promise<ServiceResult<MovieDetailResponse>> {
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

    return {
      data: MovieMapper.toResponse(updatedMovie),
      message: 'Update movie successfully!',
    };
  }

  async deleteMovie(id: string) {
    await this.prismaService.movie.delete({
      where: { id },
    });
    return {
      message: 'Delete movie successfully!',
    };
  }
}
