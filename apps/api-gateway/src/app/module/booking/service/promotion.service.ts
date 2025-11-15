import {
  SERVICE_NAME,
  PromotionDto,
  PromotionType,
  ValidatePromotionDto,
  ValidatePromotionResponseDto,
  CreatePromotionDto,
  UpdatePromotionDto,
  PromotionMessage,
} from '@movie-hub/shared-types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PromotionService {
  constructor(
    @Inject(SERVICE_NAME.BOOKING) private readonly bookingClient: ClientProxy
  ) {}

  async findAll(
    active?: boolean,
    type?: PromotionType
  ): Promise<PromotionDto[]> {
    return lastValueFrom(
      this.bookingClient.send(PromotionMessage.FIND_ALL, { active, type })
    );
  }

  async findOne(id: string): Promise<PromotionDto> {
    return lastValueFrom(
      this.bookingClient.send(PromotionMessage.FIND_ONE, { id })
    );
  }

  async findByCode(code: string): Promise<PromotionDto> {
    return lastValueFrom(
      this.bookingClient.send(PromotionMessage.FIND_BY_CODE, { code })
    );
  }

  async validate(
    code: string,
    dto: ValidatePromotionDto
  ): Promise<ValidatePromotionResponseDto> {
    return lastValueFrom(
      this.bookingClient.send(PromotionMessage.VALIDATE, { code, dto })
    );
  }

  async create(dto: CreatePromotionDto): Promise<PromotionDto> {
    return lastValueFrom(
      this.bookingClient.send(PromotionMessage.CREATE, { dto })
    );
  }

  async update(id: string, dto: UpdatePromotionDto): Promise<PromotionDto> {
    return lastValueFrom(
      this.bookingClient.send(PromotionMessage.UPDATE, { id, dto })
    );
  }

  async delete(id: string): Promise<{ message: string }> {
    return lastValueFrom(
      this.bookingClient.send(PromotionMessage.DELETE, { id })
    );
  }

  async toggleActive(id: string): Promise<PromotionDto> {
    return lastValueFrom(
      this.bookingClient.send(PromotionMessage.TOGGLE_ACTIVE, { id })
    );
  }
}
