import { Decimal } from '@prisma/client/runtime/library';

/**
 * Utility class for calculating distances between geographical coordinates
 */
export class DistanceCalculator {
  /**
   * Convert Prisma Decimal to number
   */
  private static toNumber(value: number | Decimal | null | undefined): number {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    return value.toNumber();
  }

  /**
   * Calculate distance between two points using Haversine formula
   * @returns distance in kilometers, rounded to 1 decimal place
   */
  static calculateDistance(
    lat1: number | Decimal,
    lon1: number | Decimal,
    lat2: number | Decimal,
    lon2: number | Decimal
  ): number {
    const lat1Num = this.toNumber(lat1);
    const lon1Num = this.toNumber(lon1);
    const lat2Num = this.toNumber(lat2);
    const lon2Num = this.toNumber(lon2);

    const R = 6371; // Earth radius in kilometers
    const dLat = this.toRadians(lat2Num - lat1Num);
    const dLon = this.toRadians(lon2Num - lon1Num);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1Num)) *
        Math.cos(this.toRadians(lat2Num)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10;
  }

  /**
   * Convert degrees to radians
   */
  private static toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Format distance for user-friendly display
   * @returns formatted distance string (e.g., "2.5km" or "500m")
   */
  static formatDistance(distanceKm: number): string {
    if (distanceKm < 1) {
      return `${Math.round(distanceKm * 1000)}m`;
    }
    return `${distanceKm.toFixed(1)}km`;
  }

  /**
   * Generate Google Maps directions URL
   */
  static getDirectionsUrl(
    userLat: number | Decimal,
    userLon: number | Decimal,
    cinemaLat: number | Decimal,
    cinemaLon: number | Decimal
  ): string {
    const lat1 = this.toNumber(userLat);
    const lon1 = this.toNumber(userLon);
    const lat2 = this.toNumber(cinemaLat);
    const lon2 = this.toNumber(cinemaLon);

    return `https://www.google.com/maps/dir/?api=1&origin=${lat1},${lon1}&destination=${lat2},${lon2}`;
  }

  /**
   * Generate Google Maps location URL
   */
  static getMapUrl(lat: number | Decimal, lon: number | Decimal): string {
    const latNum = this.toNumber(lat);
    const lonNum = this.toNumber(lon);
    return `https://www.google.com/maps/search/?api=1&query=${latNum},${lonNum}`;
  }

  /**
   * Check if a location is within a specified radius
   */
  static isWithinRadius(
    lat1: number | Decimal,
    lon1: number | Decimal,
    lat2: number | Decimal,
    lon2: number | Decimal,
    radiusKm: number
  ): boolean {
    const distance = this.calculateDistance(lat1, lon1, lat2, lon2);
    return distance <= radiusKm;
  }

  /**
   * Calculate bounding box for efficient database queries
   * @returns {minLat, maxLat, minLon, maxLon}
   */
  static getBoundingBox(
    centerLat: number,
    centerLon: number,
    radiusKm: number
  ): {
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
  } {
    const latDelta = radiusKm / 111; // 1 degree latitude ≈ 111 km
    const lonDelta = radiusKm / (111 * Math.cos(centerLat * (Math.PI / 180)));

    return {
      minLat: centerLat - latDelta,
      maxLat: centerLat + latDelta,
      minLon: centerLon - lonDelta,
      maxLon: centerLon + lonDelta,
    };
  }
}
