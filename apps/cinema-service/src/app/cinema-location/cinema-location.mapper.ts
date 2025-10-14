import { Injectable } from '@nestjs/common';
import { Cinemas, Halls } from '../../../generated/prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { CinemaLocationResponse } from './dto/cinema-location.dto';
import { DistanceCalculator } from './utils/distance-calculator';
import { OperatingHoursUtil } from './utils/operating-hours.util';

@Injectable()
export class CinemaLocationMapper {
  /**
   * Convert Decimal to number safely
   */
  private toNumber(value: number | Decimal | null | undefined): number {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    return value.toNumber();
  }

  toCinemaLocationResponse(
    cinema: Cinemas & { halls?: Halls[] },
    userLatitude?: number,
    userLongitude?: number
  ): CinemaLocationResponse {
    // Calculate distance
    let distance: number | undefined;
    let distanceText: string | undefined;
    let directionsUrl: string | undefined;

    const cinemaLat = this.toNumber(cinema.latitude);
    const cinemaLon = this.toNumber(cinema.longitude);

    if (userLatitude && userLongitude && cinemaLat && cinemaLon) {
      distance = DistanceCalculator.calculateDistance(
        userLatitude,
        userLongitude,
        cinemaLat,
        cinemaLon
      );
      distanceText = DistanceCalculator.formatDistance(distance);
      directionsUrl = DistanceCalculator.getDirectionsUrl(
        userLatitude,
        userLongitude,
        cinemaLat,
        cinemaLon
      );
    }

    // Handle amenities
    const amenities = Array.isArray(cinema.amenities) ? cinema.amenities : [];

    // Handle images
    const images = Array.isArray(cinema.images) ? cinema.images : [];

    // Get unique hall types
    const availableHallTypes: string[] = cinema.halls
      ? Array.from(new Set(cinema.halls.map((h) => String(h.type))))
      : [];

    // Check if open
    const isOpen = cinema.operating_hours
      ? OperatingHoursUtil.isOpen(cinema.operating_hours as any)
      : undefined;

    // Generate map URL
    const mapUrl =
      cinemaLat && cinemaLon
        ? `https://www.google.com/maps/search/?api=1&query=${cinemaLat},${cinemaLon}`
        : undefined;

    return {
      id: cinema.id,
      name: cinema.name,
      address: cinema.address,
      city: cinema.city,
      district: cinema.district || undefined,
      phone: cinema.phone || undefined,
      email: cinema.email || undefined,
      website: cinema.website || undefined,
      location: {
        latitude: cinemaLat,
        longitude: cinemaLon,
        distance,
        distanceText,
      },
      description: cinema.description || undefined,
      amenities,
      images,
      rating: this.toNumber(cinema.rating),
      totalReviews: cinema.total_reviews,
      operatingHours: cinema.operating_hours || undefined,
      isOpen,
      availableHallTypes,
      totalHalls: cinema.halls?.length || 0,
      status: cinema.status,
      mapUrl,
      directionsUrl,
      createdAt: cinema.created_at.toISOString(),
      updatedAt: cinema.updated_at.toISOString(),
    };
  }

  toCinemaLocationList(
    cinemas: (Cinemas & { halls?: Halls[] })[],
    userLatitude?: number,
    userLongitude?: number
  ): CinemaLocationResponse[] {
    return cinemas.map((cinema) =>
      this.toCinemaLocationResponse(cinema, userLatitude, userLongitude)
    );
  }
}
