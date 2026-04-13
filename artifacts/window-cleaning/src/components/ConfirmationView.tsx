import { motion, AnimatePresence } from "framer-motion";
import { WINDOW_TYPES } from "@/data/windows";
import { type BookingData, type WindowCounts, type ServiceType } from "@/pages/BookingPage";

interface Props {
  bookingData: BookingData;
  serviceType: ServiceType;
  windowCounts: WindowCounts;
  travelFee: number;
  minimumCharge: number;
  emailStatus: "idle" | "sending" | "sent" | "error";
  onReset: () => void;
}

const SERVICE_LABELS: Record<ServiceType, string> = {
  ikkunanpesu: "Ikkunanpesu",
  auton_ulkopesu: "Auton ulkopesu",
  muut_palvelut: "Muut palvelut",
};

const MONTH_NAMES = [
  "tammikuuta", "helmikuuta", "maaliskuuta", "huhtikuuta", "toukokuuta", "kesäkuuta",
  "heinäkuuta", "elokuuta", "syyskuuta", "lokakuuta", "marraskuuta", "joulukuuta",
];

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d}. ${MONTH_NAMES[m - 1]} ${y}`;
}

export function ConfirmationView({ bookingData, serviceType, windowCounts, travelFee, minimumCharge, emailStatus, onReset }: Props) {
  const isIkkunanpesu = serviceType === "ikkunanpesu";
  const isCarWash = serviceType === "auton_ulkopesu";
  const isMuut = serviceType === "muut_palvelut";

  const selectedItems = isIkkunanpesu
    ? WINDOW_TYPES.filter((w) => (windowCounts[w.id] ?? 0) > 0).map((w) => ({
        window: w,
        count: windowCounts[w.id],
        subtotal: w.price * windowCounts[w.id],
      }))
    : [];

  const windowsSubtotal = selectedItems.reduce((sum, i) => sum + i.subtotal, 0);
  const total = isIkkunanpesu ? Math.max(windowsSubtotal + travelFee, minimumCharge) : 25;

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
          <motion.div key="sending" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 text-sm">
            <svg className="animate-spin flex-shrink-0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
            </svg>
            Lähetetään sähköposti-ilmoitus...
          </motion.div>
        )}
        {emailStatus === "sent" && (
          <motion.div key="sent" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-green-50 border border-green-200 text-green-700 text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <path d="M22 2 11 13"/><path d="M22 2 15 22 11 13 2 9l20-7z"/>
            </svg>
            Sähköposti-ilmoitus lähetetty onnistuneesti.
          </motion.div>
        )}
        {emailStatus === "error" && (
          <motion.div key="error" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Sähköpostin lähetys epäonnistui. Tarkista EmailJS-asetukset.
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-card border border-card-border rounded-2xl shadow-xs overflow-hidden">
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

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}
          className="bg-card border border-card-border rounded-2xl shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-muted/30">
            <h2 className="font-semibold text-foreground">Ajankohta</h2>
          </div>
          <div className="px-5 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <InfoRow label="Päivä" value={formatDate(bookingData.date)} />
            <InfoRow label="Kellonaika" value={bookingData.time} />
            {bookingData.additionalInfo && (
              <div className="sm:col-span-2">
                <InfoRow label={isMuut ? "Palvelun kuvaus" : "Lisätiedot"} value={bookingData.additionalInfo} />
              </div>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="bg-card border border-card-border rounded-2xl shadow-xs overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-muted/30">
            <h2 className="font-semibold text-foreground">Palvelu ja hinta</h2>
          </div>
          <div className="px-5 py-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Palvelu</span>
              <span className="font-medium">{SERVICE_LABELS[serviceType]}</span>
            </div>

            {isIkkunanpesu && selectedItems.map(({ window, count, subtotal }) => (
              <div key={window.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{window.name} × {count}</span>
                <span className="font-medium tabular-nums">{subtotal} €</span>
              </div>
            ))}

            {isIkkunanpesu && (
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
            )}

            {isCarWash && (
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Yhteensä</span>
                  <span className="text-xl tabular-nums">30,00 €</span>
                </div>
              </div>
            )}

            {isMuut && (
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Hinta</span>
                  <span className="text-sm text-muted-foreground font-normal">Sovitaan erikseen</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Peruutusohjeet */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.36 }}
          className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
          <h2 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Varauksen peruutus
          </h2>
          <p className="text-sm text-amber-700 mb-3">
            Jos haluat perua varauksesi, ota yhteyttä meihiin mahdollisimman pian — mieluiten vähintään 24 tuntia ennen sovittua aikaa.
          </p>
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href="tel:+358442431103"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-300 rounded-xl text-sm font-medium text-amber-800 hover:bg-amber-50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              Soita meille
            </a>
            <a
              href="mailto:siisti.pesu@gmail.com"
              className="flex items-center gap-2 px-4 py-2 bg-white border border-amber-300 rounded-xl text-sm font-medium text-amber-800 hover:bg-amber-50 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
              </svg>
              Lähetä sähköpostia
            </a>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}>
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
