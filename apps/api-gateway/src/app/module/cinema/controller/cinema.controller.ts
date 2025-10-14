import {
  Controller,
  Get,
  Param,
  Query,
  ParseFloatPipe,
  ParseIntPipe,
  BadRequestException,
  DefaultValuePipe,
} from '@nestjs/common';
import { CinemaService } from '../service/cinema.service';

@Controller('cinemas')
export class CinemaController {
  constructor(private readonly cinemaService: CinemaService) {}
  
  @Get()
  getCinemas() {
    return this.cinemaService.getCinemas();
  }

  /** 
   * Get cinemas nearby user location
   */
  @Get('nearby')
  async getCinemasNearby(
    @Query('lat', ParseFloatPipe) latitude: number,
    @Query('lon', ParseFloatPipe) longitude: number,
    @Query('radius', new DefaultValuePipe(10), ParseFloatPipe) radiusKm: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number
  ) {
    return this.cinemaService.getCinemasNearby({
      latitude,
      longitude,
      radiusKm,
      limit,
    });
  }

  /**
   * Search cinemas by name/address with optional user location
   */
  @Get('search')
  async searchCinemas(
    @Query('query') query: string,
    @Query('lat') latitude?: string,
    @Query('lon') longitude?: string
  ) {
    if (!query || query.trim().length === 0) {
      throw new BadRequestException('Query parameter is required');
    }

    const userLat = latitude ? parseFloat(latitude) : undefined;
    const userLon = longitude ? parseFloat(longitude) : undefined;

    return this.cinemaService.searchCinemas(query, userLat, userLon);
  }

  /**
   * Get cinemas with advanced filters
   */
  @Get('filters')
  async getCinemasWithFilters(
    @Query('lat') latitude?: string,
    @Query('lon') longitude?: string,
    @Query('radius') radiusKm?: string,
    @Query('city') city?: string,
    @Query('district') district?: string,
    @Query('amenities') amenities?: string,
    @Query('hallTypes') hallTypes?: string,
    @Query('minRating') minRating?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('sortBy') sortBy?: 'distance' | 'rating' | 'name',
    @Query('sortOrder') sortOrder?: 'asc' | 'desc'
  ) {
    const filter: any = {};

    // Parse coordinates
    if (latitude && longitude) {
      filter.latitude = parseFloat(latitude);
      filter.longitude = parseFloat(longitude);
      if (radiusKm) filter.radiusKm = parseFloat(radiusKm);
    }

    // Parse filters
    if (city) filter.city = city;
    if (district) filter.district = district;
    if (amenities) {
      filter.amenities = amenities.split(',').map(a => a.trim());
    }
    if (hallTypes) {
      filter.hallTypes = hallTypes.split(',').map(h => h.trim());
    }
    if (minRating) filter.minRating = parseFloat(minRating);

    // Parse pagination
    if (page) filter.page = parseInt(page, 10);
    if (limit) filter.limit = parseInt(limit, 10);
    if (sortBy) filter.sortBy = sortBy;
    if (sortOrder) filter.sortOrder = sortOrder;

    return this.cinemaService.getCinemasWithFilters(filter);
  }

  /**
   * Get available cities
   */
  @Get('locations/cities')
  async getAvailableCities() {
    return this.cinemaService.getAvailableCities();
  }

  /**
   * Get available districts by city
   */
  @Get('locations/districts')
  async getAvailableDistricts(@Query('city') city: string) {
    if (!city || city.trim().length === 0) {
      throw new BadRequestException('City parameter is required');
    }
    return this.cinemaService.getAvailableDistricts(city);
  }

  /**
   * Get cinema detail by ID with optional user location
   *MUST BE LAST to avoid route conflicts
   */
  @Get(':id')
  async getCinemaDetail(
    @Param('id') id: string,
    @Query('lat') latitude?: string,
    @Query('lon') longitude?: string
  ) {
    const userLat = latitude ? parseFloat(latitude) : undefined;
    const userLon = longitude ? parseFloat(longitude) : undefined;

    return this.cinemaService.getCinemaDetail(id, userLat, userLon);
  }
}