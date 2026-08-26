import { motion, AnimatePresence } from "framer-motion";
import {
  WINDOW_TYPES,
  OUTDOOR_WINDOW_TYPES,
  CAMPAIGN,
  isCampaignActive,
} from "@/data/windows";
import { type WindowCounts } from "@/pages/BookingPage";

const BLUE = "#2563eb";
const DARK = "#0f172a";
const GRAY = "#64748b";
const BORDER = "#e2e8f0";

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
  const allTypes = [...WINDOW_TYPES, ...OUTDOOR_WINDOW_TYPES];

  const selected = allTypes
    .filter((w) => (windowCounts[w.id] ?? 0) > 0)
    .map((w) => ({
      window: w,
      count: windowCounts[w.id],
      subtotal: w.price * windowCounts[w.id],
    }));

  const hasItems = selected.length > 0;

  const windowsSubtotal = selected.reduce((s, i) => s + i.subtotal, 0);

  const campaignOn = isCampaignActive();
  const discount = campaignOn ? Math.round(windowsSubtotal * (CAMPAIGN.percent / 100)) : 0;
  const laborAfterDiscount = windowsSubtotal - discount;

  const subtotalWithTravel = laborAfterDiscount + travelFee;
  const total = Math.max(subtotalWithTravel, minimumCharge);
  const isMinimumApplied = subtotalWithTravel < minimumCharge && hasItems;

  const effectiveWork = Math.max(laborAfterDiscount, minimumCharge - travelFee);
  const kotitalousHinta = Math.round(effectiveWork * 0.65) + travelFee;

  return (
    <div className="rounded-2xl bg-white overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
      <div className="px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <h3 className="font-bold text-sm" style={{ color: DARK }}>
          Hinta-arvio
        </h3>
      </div>

      <div className="px-5 py-5 space-y-4">
        {!hasItems && (
          <p className="text-sm text-center py-6 leading-relaxed" style={{ color: GRAY }}>
            Valitse ikkunat vasemmalta, niin hinta lasketaan tähän.
          </p>
        )}

        {/* Valitut kohteet */}
        {hasItems && !compact && (
          <div className="space-y-2">
            <AnimatePresence>
              {selected.map(({ window, count }) => (
                <motion.div
                  key={window.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex justify-between items-baseline text-sm gap-3"
                >
                  <span style={{ color: GRAY }}>{window.name}</span>
                  <span className="font-semibold tabular-nums flex-shrink-0" style={{ color: DARK }}>
                    × {count}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {hasItems && compact && (
          <p className="text-xs" style={{ color: GRAY }}>
            {selected.length} kohdetta valittu
          </p>
        )}

        {/* Erittely */}
        {hasItems && (
          <div className="pt-4 space-y-2.5" style={{ borderTop: `1px solid ${BORDER}` }}>
            <div className="flex justify-between text-sm">
              <span style={{ color: GRAY }}>Ikkunat yhteensä</span>
              <span className="font-semibold tabular-nums" style={{ color: DARK }}>
                {windowsSubtotal} €
              </span>
            </div>

            {campaignOn && discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="font-semibold" style={{ color: BLUE }}>
                  {CAMPAIGN.label} −{CAMPAIGN.percent} %
                </span>
                <span className="font-semibold tabular-nums" style={{ color: BLUE }}>
                  −{discount} €
                </span>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <span style={{ color: GRAY }}>Matkamaksu</span>
              <span className="font-semibold tabular-nums" style={{ color: DARK }}>
                {travelFee} €
              </span>
            </div>

            {isMinimumApplied && (
              <p className="text-xs leading-relaxed pt-1" style={{ color: GRAY }}>
                Minimiveloitus {minimumCharge} € on käytössä.
              </p>
            )}
          </div>
        )}

        {/* Loppusumma */}
        <div className="pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
          <div className="flex justify-between items-baseline mb-1">
            <span className="font-bold text-base" style={{ color: DARK }}>
              Yhteensä
            </span>
            <motion.span
              key={total}
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.25 }}
              className="text-2xl font-extrabold tabular-nums"
              style={{ color: hasItems ? DARK : "#cbd5e1" }}
            >
              {hasItems ? `${total.toFixed(2)} €` : "0,00 €"}
            </motion.span>
          </div>

          {hasItems && (
            <div className="flex justify-between items-baseline">
              <span className="text-xs" style={{ color: GRAY }}>
                Kotitalousvähennyksellä
              </span>
              <span className="text-sm font-bold tabular-nums" style={{ color: BLUE }}>
                n. {kotitalousHinta} €
              </span>
            </div>
          )}
        </div>

        {onProceed && (
          <button
            onClick={onProceed}
            disabled={!hasItems}
            className="w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
            style={
              hasItems
                ? { background: DARK, color: "#ffffff" }
                : { background: "#f1f5f9", color: "#94a3b8", cursor: "not-allowed" }
            }
          >
            {hasItems ? "Jatka varaukseen" : "Valitse ensin ikkunoita"}
          </button>
        )}
      </div>
    </div>
  );
}
