import {
  SERVICE_NAME,
  PromotionType,
  ValidatePromotionDto,
  CreatePromotionDto,
  UpdatePromotionDto,
  PromotionMessage,
} from '@movie-hub/shared-types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PromotionService {
  constructor(
    @Inject(SERVICE_NAME.BOOKING) private readonly bookingClient: ClientProxy
  ) {}

  async findAll(active?: boolean, type?: PromotionType) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(PromotionMessage.FIND_ALL, { active, type })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findOne(id: string) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(PromotionMessage.FIND_ONE, { id })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async findByCode(code: string) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(PromotionMessage.FIND_BY_CODE, { code })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async validate(code: string, dto: ValidatePromotionDto) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(PromotionMessage.VALIDATE, { code, dto })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async create(dto: CreatePromotionDto) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(PromotionMessage.CREATE, { dto })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async update(id: string, dto: UpdatePromotionDto) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(PromotionMessage.UPDATE, { id, dto })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async delete(id: string) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(PromotionMessage.DELETE, { id })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async toggleActive(id: string) {
    try {
      return await firstValueFrom(
        this.bookingClient.send(PromotionMessage.TOGGLE_ACTIVE, { id })
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
