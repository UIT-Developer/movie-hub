import {
  CreateStaffRequest,
  StaffQuery,
  UpdateStaffRequest,
} from '@movie-hub/shared-types';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from '@nestjs/common';
import { StaffService } from '../service/staff.service';
import { TransformInterceptor } from '../../../common/interceptor/transform.interceptor';

@Controller({
  version: '1',
  path: 'staffs',
})
@UseInterceptors(new TransformInterceptor())
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  async create(@Body() request: CreateStaffRequest) {
    return this.staffService.create(request);
  }

  @Get()
  async findAll(@Query() query: StaffQuery) {
    return this.staffService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.staffService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() request: UpdateStaffRequest) {
    return this.staffService.update(id, request);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.staffService.remove(id);
  }
}
