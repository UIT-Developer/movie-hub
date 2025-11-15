import { DayType, SeatType } from '../../../generated/prisma';

export const BaseSeatPrice: Record<SeatType, number> = {
  STANDARD: 70000,
  VIP: 90000,
  PREMIUM: 110000,
  COUPLE: 160000,
  WHEELCHAIR: 60000,
};

export const DayTypeModifier: Record<DayType, number> = {
  WEEKDAY: 1,
  WEEKEND: 1.2,
  HOLIDAY: 1.3,
};

const dayTypes = [DayType.WEEKDAY, DayType.WEEKEND, DayType.HOLIDAY];

export const AutoPricingGenerator = {
  generate: (hallId: string, seatTypes: SeatType[]) => {
    const items = [];

    for (const seatType of seatTypes) {
      const base = BaseSeatPrice[seatType];

      for (const dayType of dayTypes) {
        const price = base * DayTypeModifier[dayType];

        items.push({
          hall_id: hallId,
          seat_type: seatType,
          day_type: dayType,
          price: Math.round(price / 1000) * 1000,
        });
      }
    }

    return items;
  },
};
