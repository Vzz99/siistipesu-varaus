import { useState, useCallback, useEffect } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxej3ApvlS4Rw2pdN2rcEZByHoHzHB4G7LKLF9ZleWDoF2m-o_n4ETyi_NCowqjblM4/exec";

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
];

async function fetchAllData(): Promise<{ dates: string[], slots: Record<string, string[]> }> {
  try {
    const res = await fetch(SCRIPT_URL + "?t=" + Date.now());
    const data = await res.json();
    return {
      dates: data.dates ?? [],
      slots: data.slots ?? {},
    };
  } catch {
    return { dates: [], slots: {} };
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

  const refresh = useCallback(() => {
    fetchAllData().then(({ slots }) => {
      setBookedSlots(slots);
    });
  }, []);

  useEffect(() => {
    refresh();
    // Päivitä joka 30 sekunti
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, [refresh]);

  const blockSlots = useCallback(async (date: string, startTime: string) => {
    const startIdx = TIME_SLOTS.indexOf(startTime);
    if (startIdx === -1) return;
    const toBlock = TIME_SLOTS.slice(startIdx, startIdx + 4);

    setBookedSlots((prev) => {
      const existing = prev[date] ?? [];
      const merged = Array.from(new Set([...existing, ...toBlock]));
      const next = { ...prev, [date]: merged };
      saveSlots(date, merged).then(refresh);
      return next;
    });
  }, [refresh]);

  const blockSpecificSlots = useCallback(async (date: string, slots: string[]) => {
    setBookedSlots((prev) => {
      const existing = prev[date] ?? [];
      const merged = Array.from(new Set([...existing, ...slots]));
      const next = { ...prev, [date]: merged };
      saveSlots(date, merged).then(refresh);
      return next;
    });
  }, [refresh]);

  const unblockSpecificSlots = useCallback(async (date: string, slots: string[]) => {
    setBookedSlots((prev) => {
      const existing = prev[date] ?? [];
      const filtered = existing.filter(s => !slots.includes(s));
      const next = { ...prev, [date]: filtered };
      saveSlots(date, filtered).then(refresh);
      return next;
    });
  }, [refresh]);

  return { bookedSlots, blockSlots, blockSpecificSlots, unblockSpecificSlots, refresh };
}
