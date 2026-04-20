import { useState, useCallback, useEffect } from "react";

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
];

const STORAGE_KEY = "booked_slots";

function loadFromStorage(): Record<string, string[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveToStorage(data: Record<string, string[]>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function useBookedSlots() {
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>(() => loadFromStorage());

  useEffect(() => {
    setBookedSlots(loadFromStorage());
  }, []);

  const blockSlots = useCallback((date: string, startTime: string) => {
    const startIdx = TIME_SLOTS.indexOf(startTime);
    if (startIdx === -1) return;
    const toBlock = TIME_SLOTS.slice(startIdx, startIdx + 4);

    setBookedSlots((prev) => {
      const existing = prev[date] ?? [];
      const merged = Array.from(new Set([...existing, ...toBlock]));
      const next = { ...prev, [date]: merged };
      saveToStorage(next);
      return next;
    });
  }, []);

  return { bookedSlots, blockSlots };
}
