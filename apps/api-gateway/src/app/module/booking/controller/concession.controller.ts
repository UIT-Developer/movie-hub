import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { ConcessionService } from '../service/concession.service';
import { ClerkAuthGuard } from '../../../common/guard/clerk-auth.guard';
import {
  ConcessionDto,
  ConcessionCategory,
  CreateConcessionDto,
  UpdateConcessionDto,
} from '@movie-hub/shared-types';

@Controller({
  version: '1',
  path: 'concessions',
})
export class ConcessionController {
  constructor(private readonly concessionService: ConcessionService) {}

  @Get()
  async findAll(
    @Query('cinemaId') cinemaId?: string,
    @Query('category') category?: ConcessionCategory,
    @Query('available') available?: string
  ): Promise<ConcessionDto[]> {
    return this.concessionService.findAll(
      cinemaId,
      category,
      available === 'true' ? true : available === 'false' ? false : undefined
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ConcessionDto> {
    return this.concessionService.findOne(id);
  }

  @Post()
  @UseGuards(ClerkAuthGuard)
  async create(
    @Body() createConcessionDto: CreateConcessionDto
  ): Promise<ConcessionDto> {
    return this.concessionService.create(createConcessionDto);
  }

  @Put(':id')
  @UseGuards(ClerkAuthGuard)
  async update(
    @Param('id') id: string,
    @Body() updateConcessionDto: UpdateConcessionDto
  ): Promise<ConcessionDto> {
    return this.concessionService.update(id, updateConcessionDto);
  }

  @Delete(':id')
  @UseGuards(ClerkAuthGuard)
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    return this.concessionService.delete(id);
  }

  @Patch(':id/inventory')
  @UseGuards(ClerkAuthGuard)
  async updateInventory(
    @Param('id') id: string,
    @Body('quantity') quantity: number
  ): Promise<ConcessionDto> {
    return this.concessionService.updateInventory(id, quantity);
  }
}
