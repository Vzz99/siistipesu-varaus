import { motion } from "framer-motion";
import { useState } from "react";
import { CalendarPicker } from "@/components/CalendarPicker";

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00",
];

const MONTH_NAMES = [
  "Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu",
  "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
];

function formatDateFi(dateStr: string): string {
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d}. ${MONTH_NAMES[m - 1]} ${y}`;
}

interface Props {
  blockedDates: Set<string>;
  onToggleDate: (dateStr: string) => void;
  onLogout: () => void;
  bookedSlots: Record<string, string[]>;
  onBlockSlots: (date: string, slots: string[]) => void;
  onUnblockSlots: (date: string, slots: string[]) => void;
}

export function AdminPanel({ blockedDates, onToggleDate, onLogout, bookedSlots, onBlockSlots, onUnblockSlots }: Props) {
  const sortedBlocked = Array.from(blockedDates).sort();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"dates" | "hours">("dates");

  const selectedSlots = selectedDate ? (bookedSlots[selectedDate] ?? []) : [];

  function toggleSlot(slot: string) {
    if (!selectedDate) return;
    if (selectedSlots.includes(slot)) {
      onUnblockSlots(selectedDate, [slot]);
    } else {
      onBlockSlots(selectedDate, [slot]);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.22 }}
      className="max-w-4xl mx-auto"
    >
      <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-md flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600 dark:text-amber-400">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Yllapito</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-1">Kalenteri</h1>
          <p className="text-muted-foreground text-sm">Hallitse varauskalenteria.</p>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
          </svg>
          Kirjaudu ulos
        </button>
      </div>

      {/* Välilehdet */}
      <div className="bg-card border border-card-border rounded-2xl p-1.5 flex gap-1 mb-6">
        <button
          onClick={() => setActiveTab("dates")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === "dates"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          📅 Sulje päiviä
        </button>
        <button
          onClick={() => setActiveTab("hours")}
          className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-semibold transition-all duration-200 ${
            activeTab === "hours"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          🕐 Sulje tunteja
        </button>
      </div>

      {activeTab === "dates" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-card border border-card-border rounded-2xl shadow-xs overflow-hidden">
            <div className="px-5 py-4 border-b border-border bg-muted/30">
              <h2 className="font-semibold text-foreground">Varauskalenteri</h2>
            </div>
            <div className="px-5 py-5">
              <CalendarPicker
                blockedDates={blockedDates}
                allowPast={false}
                mode="admin"
                onToggleBlocked={onToggleDate}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border border-card-border rounded-2xl shadow-xs overflow-hidden">
              <div className="px-5 py-4 border-b border-border bg-muted/30 flex items-center justify-between">
                <h2 className="font-semibold text-foreground">Suljetut paivat</h2>
                {sortedBlocked.length > 0 && (
                  <span className="text-xs bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded-full font-medium">
                    {sortedBlocked.length}
                  </span>
                )}
              </div>
              <div className="px-5 py-4">
                {sortedBlocked.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-6">
                    Ei suljettuja paivii
                  </p>
                ) : (
                  <div className="space-y-2">
                    {sortedBlocked.map((dateStr) => (
                      <motion.div
                        key={dateStr}
                        layout
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        className="flex items-center justify-between py-2 px-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30"
                      >
                        <span className="text-sm font-medium text-foreground">
                          {formatDateFi(dateStr)}
                        </span>
                        <button
                          onClick={() => onToggleDate(dateStr)}
                          className="text-xs text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium transition-colors flex items-center gap-1 ml-2"
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6 6 18"/>
                            <path d="m6 6 12 12"/>
                          </svg>
                          Avaa
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "hours" && (
        <div className="bg-card border border-card-border rounded-2xl shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-muted/30">
            <h2 className="font-semibold text-foreground">Sulje yksittäisiä tunteja</h2>
            <p className="text-xs text-muted-foreground mt-1">Valitse päivä ja klikkaa tunteja sulkeaksesi tai avataksesi ne.</p>
          </div>
          <div className="px-5 py-5 space-y-5">
            {/* Päivän valinta */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Valitse päivä</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-input bg-background text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>

            {/* Tunnit */}
            {selectedDate && (
              <div>
                <label className="text-sm font-medium text-foreground block mb-3">
                  Tunnit — {formatDateFi(selectedDate)}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isBlocked = selectedSlots.includes(slot);
                    return (
                      <button
                        key={slot}
                        onClick={() => toggleSlot(slot)}
                        className={`py-3 rounded-xl text-sm font-semibold transition-all duration-150 ${
                          isBlocked
                            ? "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800"
                            : "bg-muted text-foreground hover:bg-primary/10 hover:text-primary border border-transparent"
                        }`}
                      >
                        {slot}
                        <span className="block text-xs font-normal mt-0.5 opacity-70">
                          {isBlocked ? "Suljettu" : "Avoin"}
                        </span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Punaiset tunnit ovat suljettuja — asiakkaat eivät voi varata niitä.
                </p>
              </div>
            )}

            {!selectedDate && (
              <p className="text-sm text-muted-foreground text-center py-8">
                Valitse ensin päivä ylhäältä
              </p>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}
