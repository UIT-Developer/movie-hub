import {
  CinemaMessage,
  CreateHallRequest,
  HallStatusEnum,
  SERVICE_NAME,
  UpdateHallRequest,
  UpdateSeatStatusRequest,
} from '@movie-hub/shared-types';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class HallService {
  constructor(
    @Inject(SERVICE_NAME.CINEMA) private readonly cinemaClient: ClientProxy
  ) {}

  async getHallById(hallId: string) {
    return this.cinemaClient.send(CinemaMessage.HALL.GET_DETAIL, hallId);
  }

  async getHallsOfCinema(cinemaId: string, status: HallStatusEnum) {
    return this.cinemaClient.send(CinemaMessage.HALL.GET_BY_CINEMA, {
      cinemaId,
      status,
    });
  }

  async createHall(createHallRequest: CreateHallRequest) {
    return this.cinemaClient.send(CinemaMessage.HALL.CREATE, createHallRequest);
  }

  async updateHall(hallId: string, updateHallRequest: UpdateHallRequest) {
    return this.cinemaClient.send(CinemaMessage.HALL.UPDATE, {
      hallId,
      updateHallRequest,
    });
  }

  async deleteHall(hallId: string) {
    return this.cinemaClient.send(CinemaMessage.HALL.DELETE, { hallId });
  }

  async updateSeatStatus(
    seatId: string,
    updateSeatStatusRequest: UpdateSeatStatusRequest
  ) {
    return this.cinemaClient.send(CinemaMessage.HALL.UPDATE_SEAT_STATUS, {
      seatId,
      updateSeatStatusRequest,
    });
  }
}
