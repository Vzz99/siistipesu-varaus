import { useState, useCallback } from "react";

const STORAGE_KEY = "ikkunanpesu_blocked_dates";

function loadFromStorage(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return new Set<string>(parsed);
  } catch {
    // ignore
  }
  return new Set();
}

function saveToStorage(dates: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(dates)));
  } catch {
    // ignore
  }
}

export function useBlockedDates() {
  const [blockedDates, setBlockedDates] = useState<Set<string>>(() => loadFromStorage());

  const toggleDate = useCallback((dateStr: string) => {
    setBlockedDates((prev) => {
      const next = new Set(prev);
      if (next.has(dateStr)) {
        next.delete(dateStr);
      } else {
        next.add(dateStr);
      }
      saveToStorage(next);
      return next;
    });
  }, []);

  const blockDate = useCallback((dateStr: string) => {
    setBlockedDates((prev) => {
      const next = new Set(prev);
      next.add(dateStr);
      saveToStorage(next);
      return next;
    });
  }, []);

  const unblockDate = useCallback((dateStr: string) => {
    setBlockedDates((prev) => {
      const next = new Set(prev);
      next.delete(dateStr);
      saveToStorage(next);
      return next;
    });
  }, []);

  const isBlocked = useCallback((dateStr: string) => blockedDates.has(dateStr), [blockedDates]);

  return { blockedDates, toggleDate, blockDate, unblockDate, isBlocked };
}
