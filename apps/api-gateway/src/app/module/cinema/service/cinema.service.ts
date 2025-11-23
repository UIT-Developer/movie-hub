import {
  AdminGetShowtimesQuery,
  CinemaMessage,
  CreateCinemaRequest,
  GetShowtimesQuery,
  SERVICE_NAME,
  UpdateCinemaRequest,
} from '@movie-hub/shared-types';
import { PaginationQuery } from '@movie-hub/shared-types/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CinemaService {
  constructor(
    @Inject(SERVICE_NAME.CINEMA) private readonly cinemaClient: ClientProxy
  ) {}

  async getCinemas() {
    return lastValueFrom(this.cinemaClient.send(CinemaMessage.GET_CINEMAS, {}));
  }

  async createCinema(createCinemaDto: CreateCinemaRequest) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.CINEMA.CREATE, createCinemaDto)
    );
  }

  async updateCinema(
    cinemaId: string,
    updateCinemaRequest: UpdateCinemaRequest
  ) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.CINEMA.UPDATE, {
        cinemaId,
        updateCinemaRequest,
      })
    );
  }

  async deleteCinema(cinemaId: string) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.CINEMA.DELETE, cinemaId)
    );
  }

  /**
   * Get cinemas nearby user location
   */
  async getCinemasNearby(data: {
    latitude: number;
    longitude: number;
    radiusKm?: number;
    limit?: number;
  }) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.GET_CINEMAS_NEARBY, data)
    );
  }

  /**
   * Get cinemas with advanced filters
   */
  async getCinemasWithFilters(filter: {
    latitude?: number;
    longitude?: number;
    radiusKm?: number;
    city?: string;
    district?: string;
    amenities?: string[];
    hallTypes?: string[];
    minRating?: number;
    page?: number;
    limit?: number;
    sortBy?: 'distance' | 'rating' | 'name';
    sortOrder?: 'asc' | 'desc';
  }) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.GET_CINEMAS_WITH_FILTERS, filter)
    );
  }

  /**
   * Get cinema detail by ID with optional user location
   */
  async getCinemaDetail(
    cinemaId: string,
    userLatitude?: number,
    userLongitude?: number
  ) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.GET_CINEMA_DETAIL, {
        cinemaId,
        userLatitude,
        userLongitude,
      })
    );
  }

  /**
   * Search cinemas by name or address
   */
  async searchCinemas(
    query: string,
    userLatitude?: number,
    userLongitude?: number
  ) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.SEARCH_CINEMAS, {
        query,
        userLatitude,
        userLongitude,
      })
    );
  }

  /**
   * Get available cities
   */
  async getAvailableCities() {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.GET_AVAILABLE_CITIES, {})
    );
  }

  /**
   * Get available districts by city
   */
  async getAvailableDistricts(city: string) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.GET_AVAILABLE_DISTRICTS, { city })
    );
  }

  async getMovieShowtimesAtCinema(
    cinemaId: string,
    movieId: string,
    query: GetShowtimesQuery
  ) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.CINEMA.GET_SHOWTIME, {
        cinemaId,
        movieId,
        query,
      })
    );
  }

  async adminGetMovieShowtimes(
    cinemaId: string,
    movieId: string,
    query: AdminGetShowtimesQuery
  ) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.CINEMA.ADMIN_GET_SHOWTIME, {
        cinemaId,
        movieId,
        query,
      })
    );
  }

  async getMovieAtCinemas(cinemaId: string, query: PaginationQuery) {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.MOVIE.GET_MOVIES_BY_CINEMA, {
        cinemaId,
        query,
      })
    );
  }

  async getAllMoviesWithShowtimes() {
    return lastValueFrom(
      this.cinemaClient.send(CinemaMessage.MOVIE.GET_ALL_MOVIES_AT_CINEMAS, {})
    );
  }
}
