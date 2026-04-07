import { useState, useCallback, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
];

export function useBookedSlots() {
  const [bookedSlots, setBookedSlots] = useState<Record<string, string[]>>({});

  useEffect(() => {
    supabase
      .from("bookings")
      .select("date, slots")
      .then(({ data }) => {
        if (!data) return;
        const result: Record<string, string[]> = {};
        data.forEach((row) => {
          result[row.date] = JSON.parse(row.slots || "[]");
        });
        setBookedSlots(result);
      });
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

    const { data } = await supabase
      .from("bookings")
      .select("slots")
      .eq("date", date)
      .single();

    const existing = data ? JSON.parse(data.slots || "[]") : [];
    const merged = Array.from(new Set([...existing, ...toBlock]));

    if (data) {
      await supabase
        .from("bookings")
        .update({ slots: JSON.stringify(merged) })
        .eq("date", date);
    } else {
      await supabase
        .from("bookings")
        .insert({ date, time: startTime, slots: JSON.stringify(merged) });
    }
  }, []);

  return { bookedSlots, blockSlots };
}
