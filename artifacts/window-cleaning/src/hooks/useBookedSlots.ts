import { useState, useCallback, useEffect } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx4wRphpFjDf5g4yY5i_AY66RQ7hXfVFXG5VkP_s1M_83KNG18bYyPTidvp8zfXla5p/exec";

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
];

async function fetchSlots(): Promise<Record<string, string[]>> {
  try {
    const res = await fetch(SCRIPT_URL);
    const data = await res.json();
    return data.slots ?? {};
  } catch {
    return {};
  }
}

async function saveSlots(date: string, slots: string[]): Promise<void> {
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: "blockSlots", date, slots }),
    });
  } catch {}
}

export function useBookedSlots() {
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetchSlots().then((slots) => {
      setBookedSlots(slots);
    });
  }, []);

  const blockSlots = useCallback(async (date: string, startTime: string) => {
    const startIdx = TIME_SLOTS.indexOf(startTime);
    if (startIdx === -1) return;
    const toBlock = TIME_SLOTS.slice(startIdx, startIdx + 4);

    setBookedSlots((prev) => {
      const existing = prev[date] ?? [];
      const merged = Array.from(new Set([...existing, ...toBlock]));
      const next = { ...prev, [date]: merged };
      saveSlots(date, merged);
      return next;
    });
  }, []);

  const blockSpecificSlots = useCallback(async (date: string, slots: string[]) => {
    setBookedSlots((prev) => {
      const existing = prev[date] ?? [];
      const merged = Array.from(new Set([...existing, ...slots]));
      const next = { ...prev, [date]: merged };
      saveSlots(date, merged);
      return next;
    });
  }, []);

  const unblockSpecificSlots = useCallback(async (date: string, slots: string[]) => {
    setBookedSlots((prev) => {
      const existing = prev[date] ?? [];
      const filtered = existing.filter(s => !slots.includes(s));
      const next = { ...prev, [date]: filtered };
      saveSlots(date, filtered);
      return next;
    });
  }, []);

  return { bookedSlots, blockSlots, blockSpecificSlots, unblockSpecificSlots };
}
