import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConcessionService } from './concession.service';
import {
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
    payload: {
      cinemaId?: string;
      category?: ConcessionCategory;
      available?: boolean;
    }
  ) {
    return this.concessionService.findAll(
      payload.cinemaId,
      payload.category,
      payload.available
    );
  }

  @MessagePattern('concession.findOne')
  async findOne(@Payload() payload: { id: string }) {
    return this.concessionService.findOne(payload.id);
  }

  @MessagePattern('concession.create')
  async create(@Payload() payload: { dto: CreateConcessionDto }) {
    return this.concessionService.create(payload.dto);
  }

  @MessagePattern('concession.update')
  async update(@Payload() payload: { id: string; dto: UpdateConcessionDto }) {
    return this.concessionService.update(payload.id, payload.dto);
  }

  @MessagePattern('concession.delete')
  async delete(@Payload() payload: { id: string }) {
    return this.concessionService.delete(payload.id);
  }

  @MessagePattern('concession.updateInventory')
  async updateInventory(@Payload() payload: { id: string; quantity: number }) {
    return this.concessionService.updateInventory(payload.id, payload.quantity);
  }
}
