import { Controller, Get } from '@nestjs/common';
import { CinemaService } from '../service/cinema.service';

@Controller('cinemas')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Get()
  getCinemas() {
    return this.cinemaService.getCinemas();
  }
}
