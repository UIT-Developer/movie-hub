import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CinemaLocationService } from './cinema-location.service';
import {
  GetCinemasNearbyDto,
  GetCinemasWithFiltersDto,
  GetCinemaDetailDto,
} from '@movie-hub/shared-types';

@Controller()
export class CinemaLocationController {
  constructor(private readonly cinemaLocationService: CinemaLocationService) {}

  @MessagePattern('CINEMA.GET_CINEMAS_NEARBY')
  async getCinemasNearby(@Payload() dto: GetCinemasNearbyDto) {
    return this.cinemaLocationService.getCinemasNearby(dto);
  }

  @MessagePattern('CINEMA.GET_CINEMAS_WITH_FILTERS')
  async getCinemasWithFilters(@Payload() filter: GetCinemasWithFiltersDto) {
    return this.cinemaLocationService.getCinemasWithFilters(filter);
  }

  @MessagePattern('CINEMA.GET_CINEMA_DETAIL')
  async getCinemaDetail(@Payload() dto: GetCinemaDetailDto) {
    return this.cinemaLocationService.getCinemaDetail(dto);
  }

  @MessagePattern('CINEMA.SEARCH_CINEMAS')
  async searchCinemas(
    @Payload() payload: { query: string; userLatitude?: number; userLongitude?: number }
  ) {
    return this.cinemaLocationService.searchCinemas(
      payload.query,
      payload.userLatitude,
      payload.userLongitude
    );
  }

  @MessagePattern('CINEMA.GET_AVAILABLE_CITIES')
  async getAvailableCities() {
    return this.cinemaLocationService.getAvailableCities();
  }

  @MessagePattern('CINEMA.GET_AVAILABLE_DISTRICTS')
  async getAvailableDistricts(@Payload() payload: { city: string }) {
    return this.cinemaLocationService.getAvailableDistricts(payload.city);
  }
}