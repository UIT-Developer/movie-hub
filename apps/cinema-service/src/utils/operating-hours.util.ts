interface DayHours {
  open: string; // Format: "HH:mm"
  close: string; // Format: "HH:mm"
}

interface OperatingHours {
  monday?: DayHours;
  tuesday?: DayHours;
  wednesday?: DayHours;
  thursday?: DayHours;
  friday?: DayHours;
  saturday?: DayHours;
  sunday?: DayHours;
}

/**
 * Utility class for handling cinema operating hours
 */
export class OperatingHoursUtil {
  private static readonly DAYS = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];

  /**
   * Check if cinema is currently open based on operating hours
   * @returns true if open, false if closed, undefined if no operating hours
   */
  static isOpen(operatingHours: OperatingHours | null | undefined): boolean | undefined {
    if (!operatingHours) return undefined;

    const now = new Date();
    const today = this.DAYS[now.getDay()];

    const todayHours = operatingHours[today as keyof OperatingHours];
    if (!todayHours) return false;

    const currentTime = this.formatTime(now);
    return currentTime >= todayHours.open && currentTime < todayHours.close;
  }

  /**
   * Format time to "HH:mm" string
   */
  private static formatTime(date: Date): string {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  /**
   * Get today's operating hours
   */
  static getTodayHours(
    operatingHours: OperatingHours | null | undefined
  ): DayHours | undefined {
    if (!operatingHours) return undefined;

    const now = new Date();
    const today = this.DAYS[now.getDay()];

    return operatingHours[today as keyof OperatingHours];
  }

  /**
   * Validate operating hours format
   */
  static isValidFormat(operatingHours: unknown): boolean {
    if (!operatingHours || typeof operatingHours !== 'object') return false;

    for (const day of this.DAYS) {
      const hours = operatingHours[day];
      if (hours) {
        if (!hours.open || !hours.close) return false;
        if (!this.isValidTimeFormat(hours.open) || !this.isValidTimeFormat(hours.close)) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Check if time string is in valid "HH:mm" format
   */
  private static isValidTimeFormat(time: string): boolean {
    const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
    return timeRegex.test(time);
  }
}
