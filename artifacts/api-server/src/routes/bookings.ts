import { Router, type IRouter } from "express";
import { db, blockedDatesTable, bookedSlotsTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router: IRouter = Router();

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
];

router.get("/bookings/blocked-dates", async (_req, res): Promise<void> => {
  const rows = await db.select({ date: blockedDatesTable.date }).from(blockedDatesTable);
  res.json({ dates: rows.map((r) => r.date) });
});

router.post("/bookings/blocked-dates/toggle", async (req, res): Promise<void> => {
  const { date } = req.body as { date?: string };
  if (!date) {
    res.status(400).json({ error: "date required" });
    return;
  }
  const existing = await db
    .select()
    .from(blockedDatesTable)
    .where(eq(blockedDatesTable.date, date));
  if (existing.length > 0) {
    await db.delete(blockedDatesTable).where(eq(blockedDatesTable.date, date));
    res.json({ blocked: false });
  } else {
    await db.insert(blockedDatesTable).values({ date });
    res.json({ blocked: true });
  }
});

router.get("/bookings/booked-slots", async (_req, res): Promise<void> => {
  const rows = await db
    .select({ date: bookedSlotsTable.date, timeSlot: bookedSlotsTable.timeSlot })
    .from(bookedSlotsTable);
  const grouped: Record<string, string[]> = {};
  for (const row of rows) {
    if (!grouped[row.date]) grouped[row.date] = [];
    grouped[row.date].push(row.timeSlot);
  }
  res.json({ slots: grouped });
});

router.post("/bookings/booked-slots", async (req, res): Promise<void> => {
  const { date, startTime } = req.body as { date?: string; startTime?: string };
  if (!date || !startTime) {
    res.status(400).json({ error: "date and startTime required" });
    return;
  }
  const startIdx = TIME_SLOTS.indexOf(startTime);
  if (startIdx === -1) {
    res.status(400).json({ error: "invalid time slot" });
    return;
  }
  const toBlock = TIME_SLOTS.slice(startIdx, startIdx + 4);
  const values = toBlock.map((timeSlot) => ({ date, timeSlot }));
  await db.insert(bookedSlotsTable).values(values).onConflictDoNothing();
  res.json({ blocked: toBlock });
});

export default router;
