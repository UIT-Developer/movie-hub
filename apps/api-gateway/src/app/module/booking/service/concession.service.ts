import {
  SERVICE_NAME,
  ConcessionDto,
  ConcessionCategory,
  CreateConcessionDto,
  UpdateConcessionDto,
  ConcessionMessage,
} from '@movie-hub/shared-types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class ConcessionService {
  constructor(
    @Inject(SERVICE_NAME.BOOKING) private readonly bookingClient: ClientProxy
  ) {}

  async findAll(
    cinemaId?: string,
    category?: ConcessionCategory,
    available?: boolean
  ): Promise<ConcessionDto[]> {
    return lastValueFrom(
      this.bookingClient.send(ConcessionMessage.FIND_ALL, {
        cinemaId,
        category,
        available,
      })
    );
  }

  async findOne(id: string): Promise<ConcessionDto> {
    return lastValueFrom(
      this.bookingClient.send(ConcessionMessage.FIND_ONE, { id })
    );
  }

  async create(dto: CreateConcessionDto): Promise<ConcessionDto> {
    return lastValueFrom(
      this.bookingClient.send(ConcessionMessage.CREATE, { dto })
    );
  }

  async update(id: string, dto: UpdateConcessionDto): Promise<ConcessionDto> {
    return lastValueFrom(
      this.bookingClient.send(ConcessionMessage.UPDATE, { id, dto })
    );
  }

  async delete(id: string): Promise<{ message: string }> {
    return lastValueFrom(
      this.bookingClient.send(ConcessionMessage.DELETE, { id })
    );
  }

  async updateInventory(
    id: string,
    quantity: number
  ): Promise<ConcessionDto> {
    return lastValueFrom(
      this.bookingClient.send(ConcessionMessage.UPDATE_INVENTORY, {
        id,
        quantity,
      })
    );
  }
}
