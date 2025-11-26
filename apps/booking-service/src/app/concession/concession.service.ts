import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  ConcessionDto,
  ConcessionCategory,
  CreateConcessionDto,
  UpdateConcessionDto,
  ServiceResult,
} from '@movie-hub/shared-types';

@Injectable()
export class ConcessionService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    cinemaId?: string,
    category?: ConcessionCategory,
    available = true
  ): Promise<ServiceResult<ConcessionDto[]>> {
    const where: any = {};
    
    if (cinemaId) {
      where.cinema_id = cinemaId;
    }
    
    if (category) {
      where.category = category;
    }
    
    if (available !== undefined) {
      where.available = available;
    }

    const concessions = await this.prisma.concessions.findMany({
      where,
      orderBy: { name: 'asc' },
    });

    return {
      data: concessions.map((c) => this.mapToDto(c)),
    };
  }

  async findOne(id: string): Promise<ServiceResult<ConcessionDto>> {
    const concession = await this.prisma.concessions.findUnique({
      where: { id },
    });

    if (!concession) {
      throw new NotFoundException('Concession not found');
    }

    return {
      data: this.mapToDto(concession),
    };
  }

  async create(dto: CreateConcessionDto): Promise<ServiceResult<ConcessionDto>> {
    // Check if concession with same name exists in same cinema
    if (dto.cinemaId) {
      const existing = await this.prisma.concessions.findFirst({
        where: {
          name: dto.name,
          cinema_id: dto.cinemaId,
        },
      });

      if (existing) {
        throw new BadRequestException(
          'Concession with this name already exists in this cinema'
        );
      }
    }

    const concession = await this.prisma.concessions.create({
      data: {
        name: dto.name,
        name_en: dto.nameEn,
        description: dto.description,
        category: dto.category,
        price: dto.price,
        image_url: dto.imageUrl,
        available: dto.available ?? true,
        inventory: dto.inventory,
        cinema_id: dto.cinemaId,
        nutrition_info: dto.nutritionInfo,
        allergens: dto.allergens,
      },
    });

    return {
      data: this.mapToDto(concession),
      message: 'Concession created successfully',
    };
  }

  async update(id: string, dto: UpdateConcessionDto): Promise<ServiceResult<ConcessionDto>> {
    // Check if concession exists
    const existing = await this.prisma.concessions.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException('Concession not found');
    }

    // Check if updating name would create duplicate
    if (dto.name && dto.name !== existing.name) {
      const duplicate = await this.prisma.concessions.findFirst({
        where: {
          name: dto.name,
          cinema_id: existing.cinema_id,
          id: { not: id },
        },
      });

      if (duplicate) {
        throw new BadRequestException(
          'Concession with this name already exists in this cinema'
        );
      }
    }

    const concession = await this.prisma.concessions.update({
      where: { id },
      data: {
        name: dto.name,
        name_en: dto.nameEn,
        description: dto.description,
        category: dto.category,
        price: dto.price,
        image_url: dto.imageUrl,
        available: dto.available,
        inventory: dto.inventory,
        cinema_id: dto.cinemaId,
        nutrition_info: dto.nutritionInfo,
        allergens: dto.allergens,
      },
    });

    return {
      data: this.mapToDto(concession),
      message: 'Concession updated successfully',
    };
  }

  async delete(id: string): Promise<ServiceResult<{ message: string }>> {
    // Check if concession exists
    const concession = await this.prisma.concessions.findUnique({
      where: { id },
    });

    if (!concession) {
      throw new NotFoundException('Concession not found');
    }

    // Check if concession is used in any active bookings
    const activeBookings = await this.prisma.bookingConcessions.count({
      where: {
        concession_id: id,
        booking: {
          status: {
            in: ['PENDING', 'CONFIRMED'],
          },
        },
      },
    });

    if (activeBookings > 0) {
      throw new BadRequestException(
        'Cannot delete concession that is used in active bookings. Consider marking it as unavailable instead.'
      );
    }

    await this.prisma.concessions.delete({
      where: { id },
    });

    return {
      data: { message: 'Concession deleted successfully' },
    };
  }

  async updateInventory(
    id: string,
    quantity: number
  ): Promise<ServiceResult<ConcessionDto>> {
    const concession = await this.prisma.concessions.findUnique({
      where: { id },
    });

    if (!concession) {
      throw new NotFoundException('Concession not found');
    }

    const updated = await this.prisma.concessions.update({
      where: { id },
      data: {
        inventory: concession.inventory
          ? concession.inventory + quantity
          : quantity,
        available: concession.inventory && concession.inventory + quantity > 0,
      },
    });

    return {
      data: this.mapToDto(updated),
      message: 'Inventory updated successfully',
    };
  }

  private mapToDto(concession: any): ConcessionDto {
    return {
      id: concession.id,
      name: concession.name,
      nameEn: concession.name_en,
      description: concession.description,
      category: concession.category as ConcessionCategory,
      price: Number(concession.price),
      imageUrl: concession.image_url,
      available: concession.available,
      inventory: concession.inventory,
      cinemaId: concession.cinema_id,
      nutritionInfo: concession.nutrition_info,
      allergens: concession.allergens,
    };
  }
}
