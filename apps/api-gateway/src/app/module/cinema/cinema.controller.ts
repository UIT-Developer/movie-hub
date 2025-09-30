import { Controller, Get } from '@nestjs/common';
import { CinemaService } from './cinema.service';

@Controller('cinemas')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}

  @Get()
  getUser() {
    return this.cinemaService.getCinemas();
  }
}
