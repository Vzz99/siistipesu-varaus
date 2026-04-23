import { useState, useCallback, useEffect } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx4wRphpFjDf5g4yY5i_AY66RQ7hXfVFXG5VkP_s1M_83KNG18bYyPTidvp8zfXla5p/exec";

async function fetchDates(): Promise<string[]> {
  try {
    const res = await fetch(SCRIPT_URL);
    const data = await res.json();
    return data.dates ?? [];
  } catch {
    return [];
  }
}

async function toggleDateRemote(date: string): Promise<string[]> {
  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify({ action: "toggleDate", date }),
    });
    const data = await res.json();
    return data.dates ?? [];
  } catch {
    return [];
  }
}

export function useBlockedDates() {
  const [blockedDates, setBlockedDates] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDates().then((dates) => {
      setBlockedDates(new Set(dates));
      setLoading(false);
    });
  }, []);

  const toggleDate = useCallback(async (dateStr: string) => {
    setBlockedDates((prev) => {
      const next = new Set(prev);
      if (next.has(dateStr)) next.delete(dateStr);
      else next.add(dateStr);
      return next;
    });
    const newDates = await toggleDateRemote(dateStr);
    setBlockedDates(new Set(newDates));
  }, []);

  const isBlocked = useCallback(
    (dateStr: string) => blockedDates.has(dateStr),
    [blockedDates]
  );

  return { blockedDates, toggleDate, isBlocked, loading };
}
