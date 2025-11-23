import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConcessionService } from './concession.service';
import {
  ConcessionDto,
  ConcessionCategory,
  CreateConcessionDto,
  UpdateConcessionDto,
} from '@movie-hub/shared-types';

@Controller()
export class ConcessionController {
  constructor(private readonly concessionService: ConcessionService) {}

  @MessagePattern('concession.findAll')
  async findAll(
    @Payload()
    data: {
      cinemaId?: string;
      category?: ConcessionCategory;
      available?: boolean;
    }
  ): Promise<ConcessionDto[]> {
    return this.concessionService.findAll(
      data.cinemaId,
      data.category,
      data.available
    );
  }

  @MessagePattern('concession.findOne')
  async findOne(@Payload() data: { id: string }): Promise<ConcessionDto> {
    return this.concessionService.findOne(data.id);
  }

  @MessagePattern('concession.create')
  async create(
    @Payload() data: { dto: CreateConcessionDto }
  ): Promise<ConcessionDto> {
    return this.concessionService.create(data.dto);
  }

  @MessagePattern('concession.update')
  async update(
    @Payload() data: { id: string; dto: UpdateConcessionDto }
  ): Promise<ConcessionDto> {
    return this.concessionService.update(data.id, data.dto);
  }

  @MessagePattern('concession.delete')
  async delete(
    @Payload() data: { id: string }
  ): Promise<{ message: string }> {
    return this.concessionService.delete(data.id);
  }

  @MessagePattern('concession.updateInventory')
  async updateInventory(
    @Payload() data: { id: string; quantity: number }
  ): Promise<ConcessionDto> {
    return this.concessionService.updateInventory(data.id, data.quantity);
  }
}
