import { Controller } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { MessagePattern } from '@nestjs/microservices';
import { CinemaMessage } from '@movie-hub/shared-types';

@Controller('cinema')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @MessagePattern(CinemaMessage.GET_CINEMAS)
  async getCinemas() {
    return this.cinemaService.getCinemas();
  }
}
