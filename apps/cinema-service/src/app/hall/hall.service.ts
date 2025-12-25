import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  CreateHallRequest,
  HallDetailResponse,
  HallStatusEnum,
  HallSummaryResponse,
  ResourceNotFoundException,
  UpdateHallRequest,
  UpdateSeatStatusRequest,
} from '@movie-hub/shared-types';
import { ServiceResult } from '@movie-hub/shared-types/common';
import { HallMapper } from './hall.mapper';
import { AutoPricingGenerator } from './pricing-ticket-template';
import { SeatStatus } from '../../../generated/prisma';
import { RpcException } from '@nestjs/microservices';
import { PrismaClientKnownRequestError } from '../../../generated/prisma/runtime/library';

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
    cinemaId: string,
    status: HallStatusEnum
  ): Promise<ServiceResult<HallSummaryResponse[]>> {
    const halls = await this.prisma.halls.findMany({
      where: { cinema_id: cinemaId, status: status },
      include: { seats: true },
    });
    return {
      data: halls.map(HallMapper.toSummaryResponse),
      message: 'Get halls of cinema successfully!',
    };
  }

  async createHall(
    createHallDto: CreateHallRequest
  ): Promise<ServiceResult<HallDetailResponse>> {
    try {
      const hall = await this.prisma.$transaction(async (db) => {
        const cinema = await this.prisma.cinemas.findUnique({
          where: { id: createHallDto.cinemaId },
          select: { status: true },
        });

        if (!cinema) {
          throw new ResourceNotFoundException(
            'Cinema',
            'id',
            createHallDto.cinemaId
          );
        }

        if (cinema.status !== 'ACTIVE') {
          throw new RpcException({
            summary: 'Cinema inactive',
            statusCode: 409,
            code: 'CINEMA_INACTIVE',
            message: 'Cinema is not active',
          });
        }

        const newHall = await db.halls.create({
          data: HallMapper.toHallCreate(createHallDto),
          include: { seats: true },
        });

        // Lấy seatTypes unique từ seats đã sinh
        const seatTypes = [...new Set(newHall.seats.map((s) => s.type))];

        // Tạo bảng giá mặc định
        const pricingItems = AutoPricingGenerator.generate(
          newHall.id,
          seatTypes
        );

        // Insert pricing
        await db.ticketPricing.createMany({
          data: pricingItems,
        });

        return newHall;
      });

      return {
        data: HallMapper.toDetailResponse(hall),
        message: 'Create hall successfully!',
      };
    } catch (e) {
      throw new RpcException(e);
    }
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

  async deleteHall(id: string): Promise<ServiceResult<void>> {
    try {
      await this.prisma.halls.delete({
        where: { id },
      });

      return {
        data: undefined,
        message: 'Delete hall successfully!',
      };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        // Hall không tồn tại
        if (e.code === 'P2025') {
          throw new RpcException({
            summary: 'Delete hall failed',
            statusCode: 404,
            code: 'HALL_NOT_FOUND',
            message: 'Hall does not exist',
          });
        }

        // Hall đang được dùng (showtime / seat / pricing ...)
        if (e.code === 'P2003') {
          throw new RpcException({
            summary: 'Delete hall failed',
            statusCode: 400,
            code: 'HALL_IN_USE',
            message:
              'Hall cannot be deleted because it is referenced by other entities',
          });
        }
      }

      // Fallback
      throw new RpcException({
        summary: 'Delete hall failed',
        statusCode: 500,
        code: 'DELETE_HALL_FAILED',
        message: 'Unexpected error occurred while deleting hall',
      });
    }
  }

  async updateSeatStatus(
    seatId: string,
    updateSeatStatusRequest: UpdateSeatStatusRequest
  ): Promise<ServiceResult<void>> {
    const seat = await this.prisma.seats.findUnique({
      where: { id: seatId },
    });

    if (!seat) {
      throw new NotFoundException('Seat not found');
    }

    await this.prisma.seats.update({
      where: { id: seatId },
      data: {
        status: updateSeatStatusRequest.status as SeatStatus,
      },
    });

    return {
      message: 'Seat updated successfully',
      data: undefined,
    };
  }
}
