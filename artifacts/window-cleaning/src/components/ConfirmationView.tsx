import { motion } from "framer-motion";
import { WINDOW_TYPES, type DiscountPercent } from "@/data/windows";
import { type BookingData, type WindowCounts } from "@/pages/BookingPage";

interface Props {
  bookingData: BookingData;
  windowCounts: WindowCounts;
  discount: DiscountPercent;
  travelFee: number;
  minimumCharge: number;
  onReset: () => void;
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("fi-FI", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function ConfirmationView({ bookingData, windowCounts, discount, travelFee, minimumCharge, onReset }: Props) {
  const selectedItems = WINDOW_TYPES.filter((w) => (windowCounts[w.id] ?? 0) > 0).map((w) => ({
    window: w,
    count: windowCounts[w.id],
    subtotal: w.price * windowCounts[w.id],
  }));

  const windowsSubtotal = selectedItems.reduce((sum, i) => sum + i.subtotal, 0);
  const subtotalWithTravel = windowsSubtotal + travelFee;
  const chargeBase = Math.max(subtotalWithTravel, minimumCharge);
  const discountAmount = Math.round(chargeBase * (discount / 100) * 100) / 100;
  const total = Math.round((chargeBase - discountAmount) * 100) / 100;

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="text-center mb-8"
      >
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-600 dark:text-green-400">
            <path d="M20 6 9 17l-5-5"/>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Varaus vastaanotettu!</h1>
        <p className="text-muted-foreground">Otamme sinuun yhteyttä vahvistusviestillä pian.</p>
      </motion.div>

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
            <InfoRow label="Paiva" value={formatDate(bookingData.date)} />
            <InfoRow label="Kellonaika" value={bookingData.time} />
            {bookingData.additionalInfo && (
              <div className="sm:col-span-2">
                <InfoRow label="Lisatiedot" value={bookingData.additionalInfo} />
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
              {discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 dark:text-green-400">Alennus {discount}%</span>
                  <span className="text-green-600 dark:text-green-400 font-medium tabular-nums">-{discountAmount.toFixed(2)} €</span>
                </div>
              )}
              <div className="flex justify-between font-semibold border-t border-border pt-2 mt-1">
                <span>Yhteensa</span>
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
