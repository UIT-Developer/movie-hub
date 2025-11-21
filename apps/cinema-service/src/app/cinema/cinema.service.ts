import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CinemaDetailResponse,
  CreateCinemaRequest,
  ResourceNotFoundException,
  UpdateCinemaRequest,
} from '@movie-hub/shared-types';
import { CinemaMapper } from './cinema.mapper';
import { PaginationQuery, ServiceResult } from '@movie-hub/shared-types/common';
import { ShowtimeStatus } from 'apps/cinema-service/generated/prisma';

@Injectable()
export class CinemaService {
  constructor(private readonly prisma: PrismaService) {}

  async createCinema(createCinemaDto: CreateCinemaRequest) {
    const cinema = await this.prisma.$transaction(async (db) => {
      return await db.cinemas.create({
        data: CinemaMapper.toCinema(createCinemaDto),
      });
    });

    return {
      data: CinemaMapper.toResponse(cinema),
      message: 'Create cinema successfully!',
    };
  }

  async updateCinema(
    id: string,
    updateCinemaRequest: UpdateCinemaRequest
  ): Promise<ServiceResult<CinemaDetailResponse>> {
    const existingCinema = await this.prisma.cinemas.findUnique({
      where: { id },
    });

    if (!existingCinema) {
      throw new ResourceNotFoundException('Cinema', 'id', id);
    }

    const updatedCinema = await this.prisma.$transaction(async (db) => {
      return await db.cinemas.update({
        data: CinemaMapper.toCinema(updateCinemaRequest),
        where: {
          id: id,
        },
      });
    });

    return {
      data: CinemaMapper.toResponse(updatedCinema),
      message: 'Update cinema successfully!',
    };
  }

  async deleteCinema(id: string) {
    await this.prisma.cinemas.delete({
      where: { id },
    });
    return {
      message: 'Delete cinema successfully!',
    };
  }

  async getMoviesByCinema(cinemaId: string, query: PaginationQuery) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    // 1. Lấy tất cả showtimes của cinema (từ hôm nay trở đi)
    const now = new Date();
    const showtimes = await this.prisma.showtimes.findMany({
      where: {
        cinema_id: cinemaId,
        start_time: {
          gte: now,
        },
        status: ShowtimeStatus.SELLING,
      },
      orderBy: {
        start_time: 'asc',
      },
    });

    if (showtimes.length === 0) {
      return {
        meta: {
          page,
          limit,
          totalRecords: 0,
          totalPages: 0,
          hasPrev: false,
          hasNext: false,
        },
        data: [],
      };
    }

    // 2. Group theo movie_id
    const mapByMovie: Record<string, { movieId: string; showtimes: any[] }> =
      {};
    for (const st of showtimes) {
      if (!mapByMovie[st.movie_id]) {
        mapByMovie[st.movie_id] = { movieId: st.movie_id, showtimes: [] };
      }
      mapByMovie[st.movie_id].showtimes.push(st);
    }

    // 3. Danh sách movieId
    const allMovieIds = Object.keys(mapByMovie);

    // 4. Pagination áp dụng trên movie
    const totalRecords = allMovieIds.length;
    const totalPages = Math.ceil(totalRecords / limit);

    const paginatedMovieIds = allMovieIds.slice(skip, skip + limit);

    // 5. Lấy thông tin movie
    // const movies = await this.prisma.movies.findMany({
    //   where: { id: { in: paginatedMovieIds } },
    // });
    const movies = [];

    // 6. Ghép showtimes sắp tới vào từng movie (giới hạn 3 suất chiếu)
    const response = movies.map((movie) => ({
      ...movie,
      showtimes: mapByMovie[movie.id].showtimes.slice(0, 3),
    }));

    // 7. Trả về meta + data
    return {
      meta: {
        page,
        limit,
        totalRecords,
        totalPages,
        hasPrev: page > 1,
        hasNext: page < totalPages,
      },
      data: response,
    };
  }
}
