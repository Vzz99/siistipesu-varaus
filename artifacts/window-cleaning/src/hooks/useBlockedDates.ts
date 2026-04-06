import { useState, useCallback, useEffect } from "react";

const API_BASE = "/api-server/api";

export function useBlockedDates() {
  const [blockedDates, setBlockedDates] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch(`${API_BASE}/bookings/blocked-dates`)
      .then((r) => r.json())
      .then((data: { dates: string[] }) => {
        setBlockedDates(new Set(data.dates));
      })
      .catch(() => {});
  }, []);

  const toggleDate = useCallback(async (dateStr: string) => {
    setBlockedDates((prev) => {
      const next = new Set(prev);
      if (next.has(dateStr)) next.delete(dateStr);
      else next.add(dateStr);
      return next;
    });
    try {
      await fetch(`${API_BASE}/bookings/blocked-dates/toggle`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: dateStr }),
      });
    } catch {}
  }, []);

  const isBlocked = useCallback((dateStr: string) => blockedDates.has(dateStr), [blockedDates]);

  return { blockedDates, toggleDate, isBlocked };
}
