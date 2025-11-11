import { Controller, Logger, UseInterceptors } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  CinemaMessage,
  CreateCinemaRequest,
  UpdateCinemaRequest,
} from '@movie-hub/shared-types';
import { LoggingInterceptor } from '@movie-hub/shared-types/common';

@Controller('cinema')
@UseInterceptors(new LoggingInterceptor('Cinema-Service'))
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}
  logger = new Logger(CinemaController.name);

  @MessagePattern(CinemaMessage.CINEMA.CREATE)
  async createMovie(@Payload() request: CreateCinemaRequest) {
    return this.cinemaService.createCinema(request);
  }

  @MessagePattern(CinemaMessage.CINEMA.UPDATE)
  async updateMovie(
    @Payload()
    {
      cinemaId,
      updateCinemaRequest,
    }: {
      cinemaId: string;
      updateCinemaRequest: UpdateCinemaRequest;
    }
  ) {
    return this.cinemaService.updateCinema(cinemaId, updateCinemaRequest);
  }

  @MessagePattern(CinemaMessage.CINEMA.DELETE)
  async deleteMovie(@Payload() cinemaId: string) {
    return this.cinemaService.deleteCinema(cinemaId);
  }
}
