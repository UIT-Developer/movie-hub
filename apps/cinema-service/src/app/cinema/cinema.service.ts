import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CinemaDetailResponse,
  CreateCinemaRequest,
  ResourceNotFoundException,
  UpdateCinemaRequest,
} from '@movie-hub/shared-types';
import { CinemaMapper } from './cinema.mapper';
import { ServiceResult } from '@movie-hub/shared-types/common';

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
}
