import {
  DayType,
  SeatType,
  TicketType,
  TimeSlot,
} from 'apps/cinema-service/generated/prisma';

export const BaseSeatPrice: Record<SeatType, number> = {
  STANDARD: 70000,
  VIP: 90000,
  PREMIUM: 110000,
  COUPLE: 160000,
  WHEELCHAIR: 60000,
};

export const TicketTypeModifier: Record<TicketType, number> = {
  ADULT: 1,
  CHILD: 0.7,
  STUDENT: 0.85,
  COUPLE: 1,
};

export const DayTypeModifier: Record<DayType, number> = {
  WEEKDAY: 1,
  WEEKEND: 1.2,
  HOLIDAY: 1.3,
};

export const TimeSlotModifier: Record<TimeSlot, number> = {
  MORNING: 0.9,
  AFTERNOON: 1,
  EVENING: 1.25,
  LATE_NIGHT: 0.8,
};

const ticketTypesAll = [
  TicketType.ADULT,
  TicketType.CHILD,
  TicketType.STUDENT,
  TicketType.COUPLE,
];

const dayTypes = [DayType.WEEKDAY, DayType.WEEKEND, DayType.HOLIDAY];

const timeSlots = [
  TimeSlot.MORNING,
  TimeSlot.AFTERNOON,
  TimeSlot.EVENING,
  TimeSlot.LATE_NIGHT,
];

export const AutoPricingGenerator = {
  generate: (hallId: string, seatTypes: SeatType[]) => {
    const items = [];

    for (const seatType of seatTypes) {
      const ticketTypes =
        seatType === SeatType.COUPLE
          ? [TicketType.COUPLE]
          : [TicketType.ADULT, TicketType.CHILD, TicketType.STUDENT];

      const base = BaseSeatPrice[seatType];

      for (const ticketType of ticketTypes) {
        for (const dayType of dayTypes) {
          for (const timeSlot of timeSlots) {
            const price =
              base *
              TicketTypeModifier[ticketType] *
              DayTypeModifier[dayType] *
              TimeSlotModifier[timeSlot];

            items.push({
              hall_id: hallId,
              seat_type: seatType,
              ticket_type: ticketType,
              day_type: dayType,
              time_slot: timeSlot,
              price: Math.round(price / 1000) * 1000,
            });
          }
        }
      }
    }

    return items;
  },
};
