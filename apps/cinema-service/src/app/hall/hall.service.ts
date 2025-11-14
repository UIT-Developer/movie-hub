import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CreateHallRequest,
  HallDetailResponse,
  HallSummaryResponse,
  ResourceNotFoundException,
  UpdateHallRequest,
} from '@movie-hub/shared-types';
import { ServiceResult } from '@movie-hub/shared-types/common';
import { HallMapper } from './hall.mapper';

@Injectable()
export class HallService {
  constructor(private readonly prisma: PrismaService) {}

  async getHallById(id: string): Promise<ServiceResult<HallDetailResponse>> {
    const hall = await this.prisma.halls.findUnique({
      where: { id },
      include: { seats: true },
    });
    if (!hall) {
      throw new ResourceNotFoundException('Hall', 'id', id);
    }
    return {
      data: HallMapper.toDetailResponse(hall),
      message: 'Get hall successfully!',
    };
  }

  async getHallsOfCinema(
    cinemaId: string
  ): Promise<ServiceResult<HallSummaryResponse[]>> {
    const halls = await this.prisma.halls.findMany({
      where: { cinema_id: cinemaId },
      include: { seats: true },
    });
    return {
      data: halls.map(HallMapper.toSummaryResponse),
      message: 'Get halls of cinema successfully!',
    };
  }

  async createHall(createHallDto: CreateHallRequest) {
    const hall = await this.prisma.$transaction(async (db) => {
      return await db.halls.create({
        data: HallMapper.toHallCreate(createHallDto),
        include: { seats: true },
      });
    });

    return {
      data: HallMapper.toDetailResponse(hall),
      message: 'Create hall successfully!',
    };
  }

  async updateHall(
    id: string,
    updateHallRequest: UpdateHallRequest
  ): Promise<ServiceResult<HallDetailResponse>> {
    const existingHall = await this.prisma.halls.findUnique({
      where: { id },
    });

    if (!existingHall) {
      throw new ResourceNotFoundException('Hall', 'id', id);
    }

    const updatedHall = await this.prisma.$transaction(async (db) => {
      return await db.halls.update({
        data: HallMapper.toHallUpdate(updateHallRequest),
        where: {
          id: id,
        },
      });
    });

    return {
      data: HallMapper.toDetailResponse(updatedHall),
      message: 'Update hall successfully!',
    };
  }

  async deleteHall(id: string) {
    await this.prisma.halls.delete({
      where: { id },
    });
    return {
      message: 'Delete hall successfully!',
    };
  }
}
