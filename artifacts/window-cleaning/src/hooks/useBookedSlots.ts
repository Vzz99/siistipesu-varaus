import { useState, useCallback, useEffect } from "react";

const API_BASE = "/api-server/api";

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
];

export function useBookedSlots() {
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetch(`${API_BASE}/bookings/booked-slots`)
      .then((r) => r.json())
      .then((data: { slots: Record<string, string[]> }) => {
        setBookedSlots(data.slots ?? {});
      })
      .catch(() => {});
  }, []);

  const blockSlots = useCallback(async (date: string, startTime: string) => {
    const startIdx = TIME_SLOTS.indexOf(startTime);
    if (startIdx === -1) return;
    const toBlock = TIME_SLOTS.slice(startIdx, startIdx + 4);

    setBookedSlots((prev) => {
      const existing = prev[date] ?? [];
      const merged = Array.from(new Set([...existing, ...toBlock]));
      return { ...prev, [date]: merged };
    });

    try {
      await fetch(`${API_BASE}/bookings/booked-slots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, startTime }),
      });
    } catch {}
  }, []);

  return { bookedSlots, blockSlots };
}
