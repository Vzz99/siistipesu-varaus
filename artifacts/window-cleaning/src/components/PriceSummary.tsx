import { WINDOW_TYPES, OUTDOOR_WINDOW_TYPES } from "@/data/windows";
import { type WindowCounts } from "@/pages/BookingPage";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  windowCounts: WindowCounts;
  travelFee: number;
  minimumCharge: number;
  onProceed?: () => void;
  compact?: boolean;
}

export function PriceSummary({
  windowCounts,
  travelFee,
  minimumCharge,
  onProceed,
  compact,
}: Props) {
  const allWindowTypes = [...WINDOW_TYPES, ...OUTDOOR_WINDOW_TYPES];
  const selectedItems = allWindowTypes.filter((w) => (windowCounts[w.id] ?? 0) > 0).map((w) => ({
    window: w,
    count: windowCounts[w.id],
    subtotal: w.price * windowCounts[w.id],
  }));

  const windowsSubtotal = selectedItems.reduce((sum, i) => sum + i.subtotal, 0);
  const subtotalWithTravel = windowsSubtotal + travelFee;
  const total = Math.max(subtotalWithTravel, minimumCharge);
  const kotitalousHinta = Math.round(total * 0.65);

  const hasItems = selectedItems.length > 0;
  const isMinimumApplied = subtotalWithTravel < minimumCharge && hasItems;

  return (
    <div className="bg-card border border-card-border rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border bg-primary/5">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M9 14 4 9l5-5"/>
            <path d="M20 20v-7a4 4 0 0 0-4-4H4"/>
          </svg>
          Hinta-arvio
        </h3>
      </div>

      <div className="px-5 py-4 space-y-3">
        {!hasItems && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Valitse ikkunoita vasemmalta
          </p>
        )}

        {hasItems && !compact && (
          <div className="space-y-1.5">
            <AnimatePresence>
              {selectedItems.map(({ window, count, subtotal }) => (
                <motion.div
                  key={window.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-between text-sm"
                >
                  <span className="text-muted-foreground">
                    {window.name} × {count}
                  </span>
                  <span className="font-medium text-foreground tabular-nums">{subtotal} €</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {hasItems && compact && (
          <p className="text-xs text-muted-foreground">{selectedItems.length} ikkunatyyppi valittu</p>
        )}

        {hasItems && (
          <div className="border-t border-border pt-3 space-y-2">
            {!compact && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ikkunat yhteensä</span>
                <span className="font-medium tabular-nums">{windowsSubtotal} €</span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Matkamaksu</span>
              <span className="font-medium tabular-nums">{travelFee} €</span>
            </div>

            {isMinimumApplied && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-between text-sm"
              >
                <span className="text-amber-600 dark:text-amber-400 text-xs flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  Minimilaskutus ({minimumCharge} €) käytössä
                </span>
              </motion.div>
            )}
          </div>
        )}

        {hasItems && (
          <div className="border-t border-border pt-3 space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="font-semibold text-foreground">Yhteensä</span>
              <motion.span
                key={total}
                initial={{ scale: 1.1, color: "hsl(var(--primary))" }}
                animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold tabular-nums"
              >
                {total.toFixed(2)} €
              </motion.span>
            </div>
            <div className="flex justify-between items-baseline">
              <span className="text-xs text-muted-foreground">Kotitalousvähennyksellä</span>
              <span className="text-sm font-semibold tabular-nums" style={{ color: "#22c55e" }}>
                n. {kotitalousHinta} €
              </span>
            </div>
          </div>
        )}

        {!hasItems && (
          <div className="border-t border-border pt-3 flex justify-between items-baseline">
            <span className="font-semibold text-foreground">Yhteensä</span>
            <span className="text-2xl font-bold text-muted-foreground">0,00 €</span>
          </div>
        )}

        {onProceed && (
          <button
            onClick={onProceed}
            disabled={!hasItems}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 mt-1 ${
              hasItems
                ? "bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] shadow-sm"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
          >
            {hasItems ? "Jatka varaukseen" : "Valitse ensin ikkunoita"}
          </button>
        )}
      </div>
    </div>
  );
}
