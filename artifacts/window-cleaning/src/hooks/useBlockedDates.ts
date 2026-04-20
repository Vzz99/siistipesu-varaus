import { useState, useCallback, useEffect } from "react";

const STORAGE_KEY = "blocked_dates";

function loadFromStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? new Set(JSON.parse(raw)) : new Set();
  } catch {
    return new Set();
  }
}

function saveToStorage(dates: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(dates)));
  } catch {}
}

export function useBlockedDates() {
  const [blockedDates, setBlockedDates] = useState<Set<string>>(() => loadFromStorage());

  useEffect(() => {
    setBlockedDates(loadFromStorage());
  }, []);

  const toggleDate = useCallback((dateStr: string) => {
    setBlockedDates((prev) => {
      const next = new Set(prev);
      if (next.has(dateStr)) next.delete(dateStr);
      else next.add(dateStr);
      saveToStorage(next);
      return next;
    });
  }, []);

  const isBlocked = useCallback((dateStr: string) => blockedDates.has(dateStr), [blockedDates]);

  return { blockedDates, toggleDate, isBlocked };
}
