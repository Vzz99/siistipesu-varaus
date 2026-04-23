import { useState, useCallback, useEffect } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx4UdPSSVPBPRgheiwyld2itUp2yx_JXxaP_Imp7Gmkd4j5p3T1ufPPVEkGC4J1VaGi/exec";

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00",
];

async function fetchSlots(): Promise<Record<string, string[]>> {
  try {
    const res = await fetch(SCRIPT_URL + "?nocache=" + Date.now());
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
    fetchSlots().then(setBookedSlots);
  }, []);

  // Hae tuore data Sheetistä — kutsu tätä kun siirrytään varauslomakkeelle
  const refreshSlots = useCallback(async () => {
    const fresh = await fetchSlots();
    setBookedSlots(fresh);
  }, []);

  const blockSlots = useCallback((date: string, startTime: string) => {
    const startIdx = TIME_SLOTS.indexOf(startTime);
    if (startIdx === -1) return;
    const toBlock = TIME_SLOTS.slice(startIdx, startIdx + 4);
    setBookedSlots((prev) => {
      const existing = prev[date] ?? [];
      const merged = Array.from(new Set([...existing, ...toBlock]));
      saveSlots(date, merged);
      return { ...prev, [date]: merged };
    });
  }, []);

  const blockSpecificSlots = useCallback((date: string, newSlots: string[]) => {
    setBookedSlots((prev) => {
      const existing = prev[date] ?? [];
      const merged = Array.from(new Set([...existing, ...newSlots]));
      saveSlots(date, merged);
      return { ...prev, [date]: merged };
    });
  }, []);

  const unblockSpecificSlots = useCallback((date: string, slotsToRemove: string[]) => {
    setBookedSlots((prev) => {
      const existing = prev[date] ?? [];
      const filtered = existing.filter(s => !slotsToRemove.includes(s));
      saveSlots(date, filtered);
      return { ...prev, [date]: filtered };
    });
  }, []);

  return { bookedSlots, blockSlots, blockSpecificSlots, unblockSpecificSlots, refreshSlots };
}
