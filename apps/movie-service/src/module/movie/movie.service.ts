/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CreateMovieReleaseRequest,
  CreateMovieRequest,
  MovieDetailResponse,
  MovieQuery,
  MovieReleaseResponse,
  MovieSummary,
  ResourceNotFoundException,
  UpdateMovieReleaseRequest,
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
  // CRUD Movie

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

  // CRUD Movie Release Date
  async getMovieRelease(movieId: string) {
    const movieRelease = await this.prismaService.movieRelease.findMany({
      where: { movieId },
      select: {
        id: true,
        startDate: true,
        endDate: true,
        note: true,
      },
    });

    return {
      data: movieRelease,
    };
  }

  async createMovieRelease(
    movieRelese: CreateMovieReleaseRequest
  ): Promise<ServiceResult<MovieReleaseResponse>> {
    const createdMovieRelease = await this.prismaService.$transaction(
      async (db) => {
        return await db.movieRelease.create({
          data: {
            movieId: movieRelese.movieId,
            startDate: movieRelese.startDate,
            endDate: movieRelese.endDate,
            note: movieRelese.note,
          },
          select: {
            id: true,
            startDate: true,
            endDate: true,
            note: true,
          },
        });
      }
    );

    return {
      data: {
        ...createdMovieRelease,
      },
      message: 'Create movie release successfully!',
    };
  }

  async updateMovieRelease(
    id: string,
    movieRelese: UpdateMovieReleaseRequest
  ): Promise<ServiceResult<MovieReleaseResponse>> {
    const updateMovieRelease = await this.prismaService.$transaction(
      async (db) => {
        return await db.movieRelease.update({
          where: { id },
          data: {
            ...movieRelese,
          },
          select: {
            id: true,
            startDate: true,
            endDate: true,
            note: true,
          },
        });
      }
    );

    return {
      data: {
        ...updateMovieRelease,
      },
      message: 'Update movie release successfully!',
    };
  }

  async deleteMovieRelease(id: string) {
    await this.prismaService.movieRelease.delete({
      where: { id },
    });
    return {
      message: 'Delete movie release successfully!',
    };
  }

  // Function for internal microservice
  async getMovieByListId(movieIs: string[]) {
    const movies = await this.prismaService.movie.findMany({
      where: {
        id: {
          in: movieIs,
        },
      },
      include: {
        movieGenres: {
          include: {
            genre: true,
          },
        },
        movieReleases: true,
      },
    });

    return movies.map((movie) => MovieMapper.toResponse(movie));
  }
}
