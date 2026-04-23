import { useState, useCallback, useEffect } from "react";

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz4uRczQ0oNB89XyNmxf8NBQ2nTyZtGBcsVi4ml04N9CYftW7Hx5CsE9y3r1CcGHFF6/exec";

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
