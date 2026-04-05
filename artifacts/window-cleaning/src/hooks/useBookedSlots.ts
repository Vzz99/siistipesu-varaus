import { useState, useCallback } from "react";

const STORAGE_KEY = "ikkunanpesu_booked_slots";

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
];

function load(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, string[]>) : {};
  } catch {
    return {};
  }
}

function save(data: Record<string, string[]>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function useBookedSlots() {
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>(load);

  const blockSlots = useCallback((date: string, startTime: string) => {
    const startIdx = TIME_SLOTS.indexOf(startTime);
    if (startIdx === -1) return;

    const toBlock = TIME_SLOTS.slice(startIdx, startIdx + 4);

    setBookedSlots((prev) => {
      const existing = prev[date] ?? [];
      const merged = Array.from(new Set([...existing, ...toBlock]));
      const next = { ...prev, [date]: merged };
      save(next);
      return next;
    });
  }, []);

  function isSlotsBlockedOnDate(date: string, slot: string): boolean {
    return (bookedSlots[date] ?? []).includes(slot);
  }

  return { bookedSlots, blockSlots, isSlotsBlockedOnDate };
}
