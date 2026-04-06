import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";

export const blockedDatesTable = pgTable("blocked_dates", {
  date: text("date").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const bookedSlotsTable = pgTable("booked_slots", {
  date: text("date").notNull(),
  timeSlot: text("time_slot").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
}, (table) => [
  primaryKey({ columns: [table.date, table.timeSlot] }),
]);

export type BlockedDate = typeof blockedDatesTable.$inferSelect;
export type BookedSlot = typeof bookedSlotsTable.$inferSelect;
