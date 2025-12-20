import { Decimal } from '@prisma/client/runtime/library';

/**
 * Utility class for handling Prisma Decimal type conversions
 */
export class DecimalUtil {
  /**
   * Convert Prisma Decimal to number safely
   */
  static toNumber(value: number | Decimal | null | undefined): number {
    if (value === null || value === undefined) return 0;
    if (typeof value === 'number') return value;
    return value.toNumber();
  }

  /**
   * Convert number to Prisma Decimal
   */
  static toDecimal(value: number): Decimal {
    return new Decimal(value);
  }

  /**
   * Convert Decimal to number or return null
   */
  static toNumberOrNull(value: number | Decimal | null | undefined): number | null {
    if (value === null || value === undefined) return null;
    if (typeof value === 'number') return value;
    return value.toNumber();
  }

  /**
   * Convert Decimal to number with default value
   */
  static toNumberWithDefault(
    value: number | Decimal | null | undefined,
    defaultValue: number
  ): number {
    if (value === null || value === undefined) return defaultValue;
    if (typeof value === 'number') return value;
    return value.toNumber();
  }
}
