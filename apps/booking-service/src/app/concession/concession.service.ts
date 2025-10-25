import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ConcessionDto, ConcessionCategory } from '@movie-hub/shared-types';

@Injectable()
export class ConcessionService {
  constructor(private prisma: PrismaService) {}

  async findAll(
    cinemaId?: string,
    category?: ConcessionCategory,
    available = true
  ): Promise<ConcessionDto[]> {
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

    return concessions.map((c) => this.mapToDto(c));
  }

  async findOne(id: string): Promise<ConcessionDto> {
    const concession = await this.prisma.concessions.findUnique({
      where: { id },
    });

    if (!concession) {
      throw new Error('Concession not found');
    }

    return this.mapToDto(concession);
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
