import { Body, Controller, Get, Param, Put, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '../service/config.service';
import { TransformInterceptor } from '../../../common/interceptor/transform.interceptor';

@Controller({
  version: '1',
  path: 'config',
})
@UseInterceptors(new TransformInterceptor())
export class ConfigController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  async findAll() {
    return this.configService.findAll();
  }

  @Put(':key')
  async update(
    @Param('key') id: string,
    @Body() request: { key: string; value: unknown; description?: string }
  ) {
    return this.configService.update(request);
  }
}
