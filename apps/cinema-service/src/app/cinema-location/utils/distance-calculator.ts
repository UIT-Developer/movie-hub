import { Decimal } from '@prisma/client/runtime/library';

export class DistanceCalculator {
  /**
   * Convert Prisma Decimal to number
   */
  private static toNumber(value: number | Decimal | null | undefined): number {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    return value.toNumber(); // Convert Decimal to number
  }

  /**
   * Calculate distance using Haversine formula
   */
  static calculateDistance(
    lat1: number | Decimal,
    lon1: number | Decimal,
    lat2: number | Decimal,
    lon2: number | Decimal
  ): number {
    // Convert all to numbers
    const lat1Num = this.toNumber(lat1);
    const lon1Num = this.toNumber(lon1);
    const lat2Num = this.toNumber(lat2);
    const lon2Num = this.toNumber(lon2);

    const R = 6371; // Earth radius in km
    const dLat = this.toRadians(lat2Num - lat1Num);
    const dLon = this.toRadians(lon2Num - lon1Num);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1Num)) *
        Math.cos(this.toRadians(lat2Num)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c * 10) / 10; // Round to 1 decimal
  }

  private static toRadians(degrees: number): number {
    return (degrees * Math.PI) / 180;
  }

  /**
   * Format distance for display
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
   * Check if within radius
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
}