import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ConcessionService } from './concession.service';
import { ConcessionDto, ConcessionCategory } from '@movie-hub/shared-types';

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
}
