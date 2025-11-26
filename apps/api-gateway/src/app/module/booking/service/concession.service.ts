import {
  SERVICE_NAME,
  ConcessionCategory,
  CreateConcessionDto,
  UpdateConcessionDto,
  ConcessionMessage,
} from '@movie-hub/shared-types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ConcessionService {
  constructor(
    @Inject(SERVICE_NAME.BOOKING) private readonly bookingClient: ClientProxy
  ) {}

  async findAll(
    cinemaId?: string,
    category?: ConcessionCategory,
    available?: boolean
  ) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(ConcessionMessage.FIND_ALL, {
          cinemaId,
          category,
          available,
        })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(ConcessionMessage.FIND_ONE, { id })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async create(dto: CreateConcessionDto) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(ConcessionMessage.CREATE, { dto })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async update(id: string, dto: UpdateConcessionDto) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(ConcessionMessage.UPDATE, { id, dto })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async delete(id: string) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(ConcessionMessage.DELETE, { id })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async updateInventory(
    id: string,
    quantity: number
  ) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(ConcessionMessage.UPDATE_INVENTORY, {
          id,
          quantity,
        })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
