import { useState } from "react";

interface Props {
  selectedDate?: string;
  onSelectDate?: (dateStr: string) => void;
  blockedDates?: Set<string>;
  allowPast?: boolean;
  highlightBlocked?: boolean;
  onToggleBlocked?: (dateStr: string) => void;
  mode?: "booking" | "admin";
}

const WEEKDAY_LABELS = ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"];
const MONTH_NAMES = [
  "Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu",
  "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
];

function toDateStr(y: number, m: number, d: number): string {
  return `${y}-${String(m + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
}

function getTodayStr(): string {
  const now = new Date();
  return toDateStr(now.getFullYear(), now.getMonth(), now.getDate());
}

export function CalendarPicker({
  selectedDate,
  onSelectDate,
  blockedDates = new Set(),
  allowPast = false,
  mode = "booking",
  onToggleBlocked,
}: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const todayStr = getTodayStr();

  function prevMonth() {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(v => v - 1); }
    else setViewMonth(m => m - 1);
  }

  function nextMonth() {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(v => v + 1); }
    else setViewMonth(m => m + 1);
  }

  const firstDay = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  // Monday-based week: 0=Mon..6=Sun
  let startOffset = firstDay.getDay() - 1;
  if (startOffset < 0) startOffset = 6;

  const cells: (number | null)[] = [
    ...Array(startOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // pad to complete last row
  while (cells.length % 7 !== 0) cells.push(null);

  function handleDayClick(day: number) {
    const dateStr = toDateStr(viewYear, viewMonth, day);
    const isPast = !allowPast && dateStr < todayStr;
    if (isPast) return;

    if (mode === "admin" && onToggleBlocked) {
      onToggleBlocked(dateStr);
    } else if (mode === "booking" && onSelectDate) {
      if (!blockedDates.has(dateStr)) {
        onSelectDate(dateStr);
      }
    }
  }

  return (
    <div className="select-none">
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={prevMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Edellinen kuukausi"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6"/>
          </svg>
        </button>
        <span className="font-semibold text-foreground text-sm">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          aria-label="Seuraava kuukausi"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6"/>
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-0.5 mb-1">
        {WEEKDAY_LABELS.map((d) => (
          <div key={d} className="text-center text-xs font-medium text-muted-foreground py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, i) => {
          if (!day) return <div key={`empty-${i}`} />;

          const dateStr = toDateStr(viewYear, viewMonth, day);
          const isToday = dateStr === todayStr;
          const isSelected = selectedDate === dateStr;
          const isBlocked = blockedDates.has(dateStr);
          const isPast = !allowPast && dateStr < todayStr;

          let cellClass = "relative h-9 w-full flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-150 ";

          if (isPast) {
            cellClass += "text-muted-foreground/40 cursor-not-allowed";
          } else if (mode === "admin") {
            if (isBlocked) {
              cellClass += "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 cursor-pointer ring-1 ring-red-300 dark:ring-red-700";
            } else if (isToday) {
              cellClass += "ring-2 ring-primary text-primary hover:bg-primary/10 cursor-pointer";
            } else {
              cellClass += "text-foreground hover:bg-muted cursor-pointer";
            }
          } else {
            // booking mode
            if (isBlocked) {
              cellClass += "bg-muted/60 text-muted-foreground/40 cursor-not-allowed line-through";
            } else if (isSelected) {
              cellClass += "bg-primary text-primary-foreground shadow-sm cursor-pointer";
            } else if (isToday) {
              cellClass += "ring-2 ring-primary text-primary hover:bg-primary/10 cursor-pointer";
            } else {
              cellClass += "text-foreground hover:bg-muted cursor-pointer";
            }
          }

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => handleDayClick(day)}
              disabled={isPast || (mode === "booking" && isBlocked)}
              className={cellClass}
              title={isBlocked ? (mode === "admin" ? "Klikkaa avataksesi" : "Ei saatavilla") : undefined}
            >
              {day}
              {isBlocked && mode === "admin" && (
                <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-red-500" />
              )}
            </button>
          );
        })}
      </div>

      {mode === "admin" && (
        <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground border-t border-border pt-3">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-red-100 dark:bg-red-900/30 ring-1 ring-red-300 dark:ring-red-700 inline-block" />
            Suljettu
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-muted inline-block" />
            Avoin
          </span>
          <span className="ml-auto italic">Klikkaa paivaa sulkeaksesi / avataksesi</span>
        </div>
      )}
    </div>
  );
}
