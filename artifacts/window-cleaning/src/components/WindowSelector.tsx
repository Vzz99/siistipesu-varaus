import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

/* Nämä ryhmät ovat auki heti. Muut avataan klikkaamalla,
   tai itsestään jos niissä on jo valintoja. */
const DEFAULT_OPEN = ["PESTAVAT", "ULKOPESU"];

interface Props {
  windowCounts: WindowCounts;
  onCountChange: (windowId: string, count: number) => void;
}

export function WindowSelector({ windowCounts, onCountChange }: Props) {
  const [washType, setWashType] = useState<"sisa" | "ulko">("sisa");
  const [toggled, setToggled] = useState<Record<string, boolean>>({});

  function handleWashTypeChange(type: "sisa" | "ulko") {
    [...WINDOW_TYPES, ...OUTDOOR_WINDOW_TYPES].forEach((w) => onCountChange(w.id, 0));
    setToggled({});
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
      {grouped.map(({ category, label, windows }) => {
        const picked = windows.reduce((s, w) => s + (windowCounts[w.id] ?? 0), 0);
        const defaultOpen = DEFAULT_OPEN.includes(category);
        const open = toggled[category] ?? (defaultOpen || picked > 0);

        return (
          <div
            key={category}
            className="rounded-2xl overflow-hidden bg-white"
            style={{ border: `1px solid ${BORDER}` }}
          >
            <button
              onClick={() => setToggled((p) => ({ ...p, [category]: !open }))}
              className="w-full px-5 py-4 flex items-center gap-3 text-left transition-colors duration-150 hover:bg-slate-50"
              style={{ borderBottom: open ? `1px solid ${BORDER}` : "none" }}
              aria-expanded={open}
            >
              <h2 className="font-bold text-base" style={{ color: DARK }}>
                {label}
              </h2>

              {picked > 0 && (
                <span
                  className="px-2 py-0.5 rounded-full text-xs font-bold tabular-nums"
                  style={{ background: "#eff6ff", color: BLUE }}
                >
                  {picked}
                </span>
              )}

              <svg
                className="ml-auto flex-shrink-0 transition-transform duration-200"
                style={{ transform: open ? "rotate(180deg)" : "none", color: GRAY }}
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22 }}
                  style={{ overflow: "hidden" }}
                >
                  <div className="p-3 sm:p-4 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {windows.map((w) => (
                      <WindowCard
                        key={w.id}
                        window={w}
                        count={windowCounts[w.id] ?? 0}
                        onCountChange={onCountChange}
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

interface CardProps {
  window: WindowType;
  count: number;
  onCountChange: (id: string, count: number) => void;
}

/* Mobiilissa kortti on matala vaakarivi: kuva · nimi · laskuri.
   sm-koosta ylöspäin se palaa vanhaan pystysuuntaiseen muotoon.
   Järjestys hoidetaan order-luokilla, jotta sama JSX riittää. */
function WindowCard({ window, count, onCountChange }: CardProps) {
  const selected = count > 0;

  return (
    <div
      className="rounded-xl flex items-center gap-3 px-3 py-2.5 sm:flex-col sm:gap-0 sm:px-4 sm:py-4 transition-colors duration-200"
      style={{
        background: selected ? "#eff6ff" : "#f8fafc",
        border: `1px solid ${selected ? "#bfdbfe" : "transparent"}`,
      }}
    >
      <div className="order-1 sm:order-2 flex-shrink-0 sm:flex-1 sm:w-full sm:flex sm:items-center sm:justify-center sm:mb-3">
        <WindowIcon id={window.id} className="w-11 h-11 sm:w-20 sm:h-20" />
      </div>

      <p
        className="order-2 sm:order-1 flex-1 min-w-0 sm:flex-none sm:w-full font-bold text-sm leading-snug text-left sm:text-center sm:mb-3"
        style={{ color: selected ? BLUE : DARK }}
      >
        {window.name}
      </p>

      <div className="order-3 flex items-center gap-2 sm:gap-3 flex-shrink-0 sm:w-full">
        <button
          onClick={() => onCountChange(window.id, count - 1)}
          disabled={count === 0}
          aria-label={`Vähennä ${window.name}`}
          className="w-10 h-10 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-150 active:scale-95"
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
          className="w-6 sm:w-auto sm:flex-1 text-center font-bold text-base tabular-nums"
          style={{ color: selected ? BLUE : DARK }}
        >
          {count}
        </span>

        <button
          onClick={() => onCountChange(window.id, count + 1)}
          aria-label={`Lisää ${window.name}`}
          className="w-10 h-10 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center flex-shrink-0 text-white transition-all duration-150 active:scale-95 hover:opacity-90"
          style={{ background: DARK }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
