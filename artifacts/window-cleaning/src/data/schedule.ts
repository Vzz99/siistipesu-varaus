/* Varausajat yhdessä paikassa.

   Lista oli aiemmin kolmena erillisenä kopiona: BookingForm,
   AdminPanel ja useBookedSlots. Ne ehtivät eriytyä toisistaan —
   asiakkaalle tarjottiin klo 19, mutta varauksen estologiikka ei
   tuntenut sitä aikaa, joten klo 19 varaus ei varannut kalenterista
   mitään ja sama aika oli yhä vapaana seuraavalle. Yksi lähde
   estää sen toistumisen. */

export const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
] as const;

export type TimeSlot = (typeof TIME_SLOTS)[number];

/** Montako peräkkäistä tuntia yksi keikka varaa kalenterista. */
export const SLOTS_PER_JOB = 4;

/** Arkisin aloitus aikaisintaan tähän aikaan — koulu loppuu ensin. */
export const WEEKDAY_EARLIEST = "16:00";

/* Arkisin (ma–pe) vain koulun jälkeen, viikonloppuisin koko päivä. */
export function slotsForDate(dateStr: string): string[] {
  if (!dateStr) return [...TIME_SLOTS];
  const [y, m, d] = dateStr.split("-").map(Number);
  const day = new Date(y, m - 1, d).getDay(); // 0 = su, 6 = la
  const isWeekend = day === 0 || day === 6;
  if (isWeekend) return [...TIME_SLOTS];
  return TIME_SLOTS.filter((t) => t >= WEEKDAY_EARLIEST);
}
