import { useState, useCallback, useEffect } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycby_mE84KA7ZDyy9bpR3oJwIigQ5x7v1Rhd1gP1EnSAR4HWOY-x5jeXtHTFyEfarPgmA/exec";

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
      body: JSON.stringify({ date }),
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
    // Päivitä UI heti
    setBlockedDates((prev) => {
      const next = new Set(prev);
      if (next.has(dateStr)) next.delete(dateStr);
      else next.add(dateStr);
      return next;
    });
    // Tallenna Sheetsiin
    const newDates = await toggleDateRemote(dateStr);
    setBlockedDates(new Set(newDates));
  }, []);

  const isBlocked = useCallback(
    (dateStr: string) => blockedDates.has(dateStr),
    [blockedDates]
  );

  return { blockedDates, toggleDate, isBlocked, loading };
}
