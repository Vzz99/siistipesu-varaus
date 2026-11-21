import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import {
  WINDOW_TYPES,
  OUTDOOR_WINDOW_TYPES,
  CAMPAIGN,
  isCampaignActive,
} from "@/data/windows";
import { type WindowCounts } from "@/pages/BookingPage";
import { hintaVahennyksenJalkeen, vahennysTyosta, KV_OMAVASTUU } from "@/data/kotitalousvahennys";
import { ACCENT, BORDER, BORDER_STRONG, DISABLED, INK, MUTED, SURFACE_SUNK, WHITE } from "@/lib/theme";

/* Suomalainen euromuotoilu: 40 € eikä 40.00 €,
   mutta 40,50 € jos desimaaleja oikeasti on. */
function euro(n: number): string {
  return `${n.toLocaleString("fi-FI", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })} €`;
}

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
  /* 40 % tyon osuudesta, josta vahennetaan 150 euron vuotuinen
     omavastuu. Pienessa keikassa vahennys voi jaada kokonaan
     saamatta, joten summaa ei nayteta jos se ei tuo saastoa. */
  const kotitalousHinta = hintaVahennyksenJalkeen(effectiveWork, travelFee);
  const kotitalousSaasto = vahennysTyosta(effectiveWork);
  const naytaVahennys = hasItems && kotitalousSaasto > 0;

  /* Mobiilin kiinteä alapalkki.
     Renderöidään portaalilla suoraan bodyyn, koska Framer Motionin
     transform vanhemmassa elementissä rikkoisi position: fixed. */
  const mobileBar =
    onProceed && typeof document !== "undefined"
      ? createPortal(
          <div
            className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
            style={{
              background: "rgba(255,255,255,0.94)",
              backdropFilter: "blur(12px)",
              borderTop: `1px solid ${BORDER}`,
              paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))",
            }}
          >
            <div className="px-4 pt-3 flex items-center gap-3">
              <div className="min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <motion.span
                    key={total}
                    initial={{ scale: 1.08 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="text-xl font-extrabold tabular-nums leading-none"
                    style={{ color: hasItems ? INK : BORDER_STRONG }}
                  >
                    {hasItems ? euro(total) : euro(0)}
                  </motion.span>
                </div>
                <span className="text-xs leading-tight block mt-1" style={{ color: MUTED }}>
                  {!hasItems ? (
                    "Valitse ikkunoita"
                  ) : naytaVahennys ? (
                    <>
                      Kotitalousvähennyksellä{" "}
                      <span className="font-bold" style={{ color: ACCENT }}>
                        n. {euro(kotitalousHinta)}
                      </span>
                    </>
                  ) : (
                    "Hinta sisältää matkakulun"
                  )}
                </span>
              </div>

              <button
                onClick={onProceed}
                disabled={!hasItems}
                className="ml-auto flex-shrink-0 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 active:scale-95"
                style={
                  hasItems
                    ? { background: INK, color: WHITE }
                    : { background: SURFACE_SUNK, color: DISABLED, cursor: "not-allowed" }
                }
              >
                Jatka
              </button>
            </div>
          </div>,
          document.body
        )
      : null;

  return (
    <>
      <div className="rounded-2xl bg-white overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
        <div className="px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
          <h3 className="font-bold text-sm" style={{ color: INK }}>
            Hinta-arvio
          </h3>
        </div>

        <div className="px-5 py-5 space-y-4">
          {!hasItems && (
            <p className="text-sm text-center py-6 leading-relaxed" style={{ color: MUTED }}>
              Valitse ikkunat ja kappalemäärät, niin hinta lasketaan tähän.
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
                    <span style={{ color: MUTED }}>{window.name}</span>
                    <span className="font-semibold tabular-nums flex-shrink-0" style={{ color: INK }}>
                      × {count}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {hasItems && compact && (
            <p className="text-xs" style={{ color: MUTED }}>
              {selected.length} kohdetta valittu
            </p>
          )}

          {/* Erittely */}
          {hasItems && (
            <div className="pt-4 space-y-2.5" style={{ borderTop: `1px solid ${BORDER}` }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: MUTED }}>Ikkunat yhteensä</span>
                <span className="font-semibold tabular-nums" style={{ color: INK }}>
                  {euro(windowsSubtotal)}
                </span>
              </div>

              {campaignOn && discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="font-semibold" style={{ color: ACCENT }}>
                    {CAMPAIGN.label} −{CAMPAIGN.percent} %
                  </span>
                  <span className="font-semibold tabular-nums" style={{ color: ACCENT }}>
                    −{euro(discount)}
                  </span>
                </div>
              )}

              {/* Matkamaksurivi näkyy vain jos maksu on oikeasti käytössä.
                 Nyt TRAVEL_FEE = 0, joten rivi on piilossa. */}
              {travelFee > 0 && (
                <div className="flex justify-between text-sm">
                  <span style={{ color: MUTED }}>Matkamaksu</span>
                  <span className="font-semibold tabular-nums" style={{ color: INK }}>
                    {euro(travelFee)}
                  </span>
                </div>
              )}

              {isMinimumApplied && (
                <p className="text-xs leading-relaxed pt-1" style={{ color: MUTED }}>
                  Minimiveloitus {euro(minimumCharge)} on käytössä.
                </p>
              )}
            </div>
          )}

          {/* Loppusumma */}
          <div className="pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
            <div className="flex justify-between items-baseline mb-1">
              <span className="font-bold text-base" style={{ color: INK }}>
                Yhteensä
              </span>
              <motion.span
                key={total}
                initial={{ scale: 1.08 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.25 }}
                className="text-2xl font-extrabold tabular-nums"
                style={{ color: hasItems ? INK : BORDER_STRONG }}
              >
                {hasItems ? euro(total) : euro(0)}
              </motion.span>
            </div>

            {naytaVahennys && (
              <>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs" style={{ color: MUTED }}>
                    Kotitalousvähennyksellä
                  </span>
                  <span className="text-sm font-bold tabular-nums" style={{ color: ACCENT }}>
                    n. {euro(kotitalousHinta)}
                  </span>
                </div>
                <p className="text-[11px] leading-snug mt-1" style={{ color: MUTED }}>
                  Arvio: 40 % työn osuudesta, josta on vähennetty{" "}
                  {KV_OMAVASTUU} € vuotuinen omavastuu. Lopullisen
                  vähennyksen vahvistaa Verohallinto.
                </p>
              </>
            )}
          </div>

          {/* Työpöydällä nappi on kortissa. Mobiilissa se on alapalkissa,
             joten tämä piilotetaan pienillä näytöillä. */}
          {onProceed && (
            <button
              onClick={onProceed}
              disabled={!hasItems}
              className="hidden lg:block w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-200"
              style={
                hasItems
                  ? { background: INK, color: WHITE }
                  : { background: SURFACE_SUNK, color: DISABLED, cursor: "not-allowed" }
              }
            >
              {hasItems ? "Jatka varaukseen" : "Valitse ensin ikkunoita"}
            </button>
          )}
        </div>
      </div>

      {/* Tila alapalkille, ettei se peitä sivun loppua */}
      {onProceed && <div className="lg:hidden" style={{ height: 96 }} />}

      {mobileBar}
    </>
  );
}
