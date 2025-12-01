import { Injectable } from '@nestjs/common';
import { Cinemas, Halls } from '../../../generated/prisma/client';
import {
  CinemaLocationResponse,
  OperatingHours,
} from '@movie-hub/shared-types';
import { DistanceCalculator } from '../../utils/distance-calculator.util';
import { OperatingHoursUtil } from '../../utils/operating-hours.util';
import { DecimalUtil } from '../../utils/decimal.util';

@Injectable()
export class CinemaLocationMapper {
  toCinemaLocationResponse(
    cinema: Cinemas & { halls?: Halls[] },
    userLatitude?: number,
    userLongitude?: number
  ): CinemaLocationResponse {
    const cinemaLat = DecimalUtil.toNumber(cinema.latitude);
    const cinemaLon = DecimalUtil.toNumber(cinema.longitude);

    // Calculate distance and generate URLs
    let distance: number | undefined;
    let distanceText: string | undefined;
    let directionsUrl: string | undefined;

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

    // Check if cinema is currently open
    const isOpen = cinema.operating_hours
      ? OperatingHoursUtil.isOpen(cinema.operating_hours as OperatingHours)
      : undefined;

    // Generate Google Maps URL
    const mapUrl =
      cinemaLat && cinemaLon
        ? DistanceCalculator.getMapUrl(cinemaLat, cinemaLon)
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
      rating: DecimalUtil.toNumberOrNull(cinema.rating) ?? undefined,
      totalReviews: cinema.total_reviews,
      operatingHours: (cinema.operating_hours as OperatingHours) || undefined,
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
