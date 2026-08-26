import { useState } from "react";
import { motion } from "framer-motion";
import {
  WINDOW_TYPES,
  OUTDOOR_WINDOW_TYPES,
  CATEGORY_LABELS,
  CATEGORY_ORDER,
  type WindowType,
} from "@/data/windows";
import { type WindowCounts } from "@/pages/BookingPage";
import { WindowIcon } from "@/components/WindowIcon";

const BLUE = "#2563eb";
const DARK = "#0f172a";
const GRAY = "#64748b";
const BORDER = "#e2e8f0";

interface Props {
  windowCounts: WindowCounts;
  onCountChange: (windowId: string, count: number) => void;
}

export function WindowSelector({ windowCounts, onCountChange }: Props) {
  const [washType, setWashType] = useState<"sisa" | "ulko">("sisa");

  function handleWashTypeChange(type: "sisa" | "ulko") {
    [...WINDOW_TYPES, ...OUTDOOR_WINDOW_TYPES].forEach((w) => onCountChange(w.id, 0));
    setWashType(type);
  }

  const isOutdoor = washType === "ulko";

  const grouped = isOutdoor
    ? [
        {
          category: "ULKOPESU" as const,
          label: CATEGORY_LABELS.ULKOPESU,
          windows: OUTDOOR_WINDOW_TYPES,
        },
      ]
    : CATEGORY_ORDER.map((cat) => ({
        category: cat,
        label: CATEGORY_LABELS[cat],
        windows: WINDOW_TYPES.filter((w) => w.category === cat),
      }));

  return (
    <div className="space-y-5">
      {/* Pesutyypin valinta */}
      <div
        className="rounded-2xl p-1.5 flex gap-1.5 bg-white"
        style={{ border: `1px solid ${BORDER}` }}
      >
        <button
          onClick={() => handleWashTypeChange("sisa")}
          className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200"
          style={
            !isOutdoor
              ? { background: DARK, color: "#ffffff" }
              : { color: GRAY }
          }
        >
          Sisä- ja ulkopinnat
        </button>
        <button
          onClick={() => handleWashTypeChange("ulko")}
          className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold transition-all duration-200"
          style={
            isOutdoor
              ? { background: DARK, color: "#ffffff" }
              : { color: GRAY }
          }
        >
          Vain ulkopinta
        </button>
      </div>

      <p className="text-sm px-1 leading-relaxed" style={{ color: GRAY }}>
        {isOutdoor
          ? "Pesemme vain ulkopinnan. Hinta on edullisempi, koska työ on nopeampaa."
          : "Pesemme ikkunat molemmin puolin. Karmit ja välit puhdistetaan."}
      </p>

      {/* Ryhmät */}
      {grouped.map(({ category, label, windows }) => (
        <div
          key={category}
          className="rounded-2xl overflow-hidden bg-white"
          style={{ border: `1px solid ${BORDER}` }}
        >
          <div className="px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
            <h2 className="font-bold text-base" style={{ color: DARK }}>
              {label}
            </h2>
          </div>

          <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {windows.map((w, i) => (
              <WindowCard
                key={w.id}
                window={w}
                count={windowCounts[w.id] ?? 0}
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

interface CardProps {
  window: WindowType;
  count: number;
  onCountChange: (id: string, count: number) => void;
  index: number;
}

function WindowCard({ window, count, onCountChange, index }: CardProps) {
  const selected = count > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="rounded-xl px-4 py-4 flex flex-col transition-colors duration-200"
      style={{
        background: selected ? "#eff6ff" : "#f8fafc",
        border: `1px solid ${selected ? "#bfdbfe" : "transparent"}`,
      }}
    >
      <p
        className="font-bold text-sm leading-snug text-center mb-3"
        style={{ color: selected ? BLUE : DARK }}
      >
        {window.name}
      </p>

      <div className="flex-1 flex items-center justify-center mb-3">
        <WindowIcon id={window.id} className="w-20 h-20" />
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onCountChange(window.id, count - 1)}
          disabled={count === 0}
          aria-label="Vähennä"
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150 active:scale-95"
          style={
            count === 0
              ? { background: "#ffffff", color: "#cbd5e1", border: `1px solid ${BORDER}`, cursor: "not-allowed" }
              : { background: "#ffffff", color: DARK, border: `1px solid #cbd5e1` }
          }
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>

        <span
          className="flex-1 text-center font-bold text-base tabular-nums"
          style={{ color: selected ? BLUE : DARK }}
        >
          {count}
        </span>

        <button
          onClick={() => onCountChange(window.id, count + 1)}
          aria-label="Lisää"
          className="w-9 h-9 rounded-lg flex items-center justify-center text-white transition-all duration-150 active:scale-95 hover:opacity-90"
          style={{ background: DARK }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
