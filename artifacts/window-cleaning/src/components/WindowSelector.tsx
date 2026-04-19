import { WINDOW_TYPES, OUTDOOR_WINDOW_TYPES, CATEGORY_LABELS, CATEGORY_ORDER, type WindowType } from "@/data/windows";
import { type WindowCounts } from "@/pages/BookingPage";
import { motion } from "framer-motion";
import { useState } from "react";

interface Props {
  windowCounts: WindowCounts;
  onCountChange: (windowId: string, count: number) => void;
}

export function WindowSelector({ windowCounts, onCountChange }: Props) {
  const [washType, setWashType] = useState<"sisapesu" | "ulkopersu">("sisapesu");

  function handleWashTypeChange(type: "sisapesu" | "ulkopersu") {
    // Tyhjennä valinnat kun vaihdetaan tyyppiä
    const allIds = [...WINDOW_TYPES, ...OUTDOOR_WINDOW_TYPES].map((w) => w.id);
    allIds.forEach((id) => onCountChange(id, 0));
    setWashType(type);
  }

  const isOutdoor = washType === "ulkopersu";

  const grouped = isOutdoor
    ? [{ category: "ULKOPESU" as const, label: "Ulkopesun ikkunat", windows: OUTDOOR_WINDOW_TYPES }]
    : CATEGORY_ORDER.map((cat) => ({
        category: cat,
        label: CATEGORY_LABELS[cat],
        windows: WINDOW_TYPES.filter((w) => w.category === cat),
      }));

  return (
    <div className="space-y-5">
      {/* Vaihtonappula */}
      <div className="bg-card border border-card-border rounded-2xl p-1.5 flex gap-1">
        <button
          onClick={() => handleWashTypeChange("sisapesu")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
            !isOutdoor
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          🪟 Sisä- ja ulkopinnat
        </button>
        <button
          onClick={() => handleWashTypeChange("ulkopersu")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
            isOutdoor
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          🏠 Vain ulkopinta
        </button>
      </div>

      {/* Selite */}
      <div className="px-1">
        {isOutdoor ? (
          <p className="text-xs text-muted-foreground">
            Pelkkä ulkopinta pestään. Hinnat ovat alhaisemmat koska työ on nopeampaa.
          </p>
        ) : (
          <p className="text-xs text-muted-foreground">
            Ikkunat pestään sekä sisä- että ulkopuolelta. Karmit ja välit puhdistetaan.
          </p>
        )}
      </div>

      {/* Ikkunalistat */}
      {grouped.map(({ category, label, windows }) => (
        <div key={category} className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-xs">
          <div className="px-5 py-3.5 border-b border-border bg-muted/40">
            <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">{label}</h2>
          </div>
          <div className="divide-y divide-border">
            {windows.map((window, i) => (
              <WindowRow
                key={window.id}
                window={window}
                count={windowCounts[window.id] ?? 0}
                onCountChange={onCountChange}
                index={i}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

interface RowProps {
  window: WindowType;
  count: number;
  onCountChange: (id: string, count: number) => void;
  index: number;
}

function WindowRow({ window, count, onCountChange, index }: RowProps) {
  const isSelected = count > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`flex items-center gap-4 px-5 py-4 transition-colors duration-150 ${
        isSelected ? "bg-primary/5" : "hover:bg-muted/30"
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`font-medium text-sm ${isSelected ? "text-primary" : "text-foreground"}`}>
            {window.name}
          </span>
          {isSelected && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium"
            >
              Valittu
            </motion.span>
          )}
        </div>
        {window.description && (
          <p className="text-xs text-muted-foreground mt-0.5">{window.description}</p>
        )}
      </div>

      <div className="flex items-center gap-4 flex-shrink-0">
        <span className="font-semibold text-sm text-foreground w-12 text-right">
          {window.price} €
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onCountChange(window.id, count - 1)}
            disabled={count === 0}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 font-medium text-base
              ${count === 0
                ? "bg-muted text-muted-foreground cursor-not-allowed opacity-40"
                : "bg-primary/10 text-primary hover:bg-primary/20 active:scale-95"
              }`}
            aria-label="Vähennä"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>

          <span className={`w-7 text-center font-semibold text-sm tabular-nums ${
            isSelected ? "text-primary" : "text-foreground"
          }`}>
            {count}
          </span>

          <button
            onClick={() => onCountChange(window.id, count + 1)}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/10 text-primary hover:bg-primary/20 active:scale-95 transition-all duration-150 font-medium"
            aria-label="Lisää"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
