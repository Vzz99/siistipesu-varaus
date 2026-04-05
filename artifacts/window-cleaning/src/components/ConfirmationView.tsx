import { motion, AnimatePresence } from "framer-motion";
import { WINDOW_TYPES } from "@/data/windows";
import { type BookingData, type WindowCounts } from "@/pages/BookingPage";

interface Props {
  bookingData: BookingData;
  windowCounts: WindowCounts;
  travelFee: number;
  minimumCharge: number;
  emailStatus: "idle" | "sending" | "sent" | "error";
  onReset: () => void;
}

const MONTH_NAMES = [
  "tammikuuta", "helmikuuta", "maaliskuuta", "huhtikuuta", "toukokuuta", "kesäkuuta",
  "heinäkuuta", "elokuuta", "syyskuuta", "lokakuuta", "marraskuuta", "joulukuuta",
];

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d}. ${MONTH_NAMES[m - 1]} ${y}`;
}

export function ConfirmationView({ bookingData, windowCounts, travelFee, minimumCharge, emailStatus, onReset }: Props) {
  const selectedItems = WINDOW_TYPES.filter((w) => (windowCounts[w.id] ?? 0) > 0).map((w) => ({
    window: w,
    count: windowCounts[w.id],
    subtotal: w.price * windowCounts[w.id],
  }));

  const windowsSubtotal = selectedItems.reduce((sum, i) => sum + i.subtotal, 0);
  const total = Math.max(windowsSubtotal + travelFee, minimumCharge);

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-center mb-6"
      >
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Varaus vastaanotettu!</h1>
        <p className="text-muted-foreground">Olemme kirjanneet varauksesi. Näet tiedot alla.</p>
      </motion.div>

      <AnimatePresence mode="wait">
        {emailStatus === "sending" && (
          <motion.div
            key="sending"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-sm"
          >
            <svg className="animate-spin flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            Lähetetään sähköposti-ilmoitus...
          </motion.div>
        )}
        {emailStatus === "sent" && (
          <motion.div
            key="sent"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-300 text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <path d="M22 2 11 13"/>
              <path d="M22 2 15 22 11 13 2 9l20-7z"/>
            </svg>
            Sähköposti-ilmoitus lähetetty onnistuneesti.
          </motion.div>
        )}
        {emailStatus === "error" && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Sähköpostin lähetys epäonnistui. Tarkista EmailJS-asetukset.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card border border-card-border rounded-2xl shadow-xs overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border bg-muted/30">
            <h2 className="font-semibold text-foreground">Yhteystiedot</h2>
          </div>
          <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoRow label="Nimi" value={bookingData.name} />
            <InfoRow label="Puhelinnumero" value={bookingData.phone} />
            <InfoRow label="Sähköposti" value={bookingData.email} />
            <InfoRow label="Osoite" value={bookingData.address} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="bg-card border border-card-border rounded-2xl shadow-xs overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border bg-muted/30">
            <h2 className="font-semibold text-foreground">Ajankohta</h2>
          </div>
          <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoRow label="Päivä" value={formatDate(bookingData.date)} />
            <InfoRow label="Kellonaika" value={bookingData.time} />
            {bookingData.additionalInfo && (
              <div className="sm:col-span-2">
                <InfoRow label="Lisätiedot" value={bookingData.additionalInfo} />
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-card-border rounded-2xl shadow-xs overflow-hidden"
        >
          <div className="px-5 py-4 border-b border-border bg-muted/30">
            <h2 className="font-semibold text-foreground">Tilatut palvelut</h2>
          </div>
          <div className="px-5 py-4 space-y-2">
            {selectedItems.map(({ window, count, subtotal }) => (
              <div key={window.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{window.name} × {count}</span>
                <span className="font-medium tabular-nums">{subtotal} €</span>
              </div>
            ))}
            <div className="border-t border-border pt-2 mt-2 space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Matkamaksu</span>
                <span className="font-medium tabular-nums">{travelFee} €</span>
              </div>
              <div className="flex justify-between font-semibold border-t border-border pt-2 mt-1">
                <span>Yhteensä</span>
                <span className="text-xl tabular-nums">{total.toFixed(2)} €</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38 }}
        >
          <button
            onClick={onReset}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            Tee uusi varaus
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className="text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}
