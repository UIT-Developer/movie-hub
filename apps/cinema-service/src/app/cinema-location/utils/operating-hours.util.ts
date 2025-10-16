interface DayHours {
  open: string;
  close: string;
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

export class OperatingHoursUtil {
  /**
   * Check if cinema is currently open
   */
  static isOpen(operatingHours: OperatingHours): boolean {
    if (!operatingHours) return true;

    const now = new Date();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[now.getDay()];

    const todayHours = operatingHours[today as keyof OperatingHours];
    if (!todayHours) return false;

    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    return currentTime >= todayHours.open && currentTime < todayHours.close;
  }
}