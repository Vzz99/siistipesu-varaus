import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WindowSelector } from "@/components/WindowSelector";
import { PriceSummary } from "@/components/PriceSummary";
import { BookingForm } from "@/components/BookingForm";
import { ConfirmationView } from "@/components/ConfirmationView";
import { AdminPasswordModal } from "@/components/AdminPasswordModal";
import { AdminPanel } from "@/components/AdminPanel";
import { useBlockedDates } from "@/hooks/useBlockedDates";
import { useBookedSlots } from "@/hooks/useBookedSlots";
import { TRAVEL_FEE, MINIMUM_CHARGE } from "@/data/windows";
import { sendBookingEmail } from "@/lib/emailService";

export type WindowCounts = Record<string, number>;

export interface BookingData {
  name: string;
  phone: string;
  email: string;
  address: string;
  date: string;
  time: string;
  additionalInfo: string;
}

export type Step = "select" | "booking" | "confirmation";

const TAP_WINDOW_MS = 1800;
const TAPS_REQUIRED = 5;

export function BookingPage() {
  const [windowCounts, setWindowCounts] = useState<WindowCounts>({});
  const [step, setStep] = useState<Step>("select");
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [emailStatus, setEmailStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const { blockedDates, toggleDate } = useBlockedDates();
  const { bookedSlots, blockSlots } = useBookedSlots();

  const tapTimestamps = useRef<number[]>([]);

  const handleLogoTap = useCallback(() => {
    if (isAdminLoggedIn) return;
    const now = Date.now();
    tapTimestamps.current = [...tapTimestamps.current, now].filter(
      (t) => now - t < TAP_WINDOW_MS
    );
    if (tapTimestamps.current.length >= TAPS_REQUIRED) {
      tapTimestamps.current = [];
      setShowPasswordModal(true);
    }
  }, [isAdminLoggedIn]);

  function handleAdminLogin() {
    setShowPasswordModal(false);
    setIsAdminLoggedIn(true);
  }

  function handleAdminLogout() {
    setIsAdminLoggedIn(false);
  }

  function handleCountChange(windowId: string, count: number) {
    setWindowCounts((prev) => {
      const next = { ...prev };
      if (count <= 0) {
        delete next[windowId];
      } else {
        next[windowId] = count;
      }
      return next;
    });
  }

  async function handleBookingSubmit(data: BookingData) {
    setBookingData(data);
    blockSlots(data.date, data.time);
    setEmailStatus("sending");
    setStep("confirmation");
    try {
      await sendBookingEmail(data, windowCounts);
      setEmailStatus("sent");
    } catch {
      setEmailStatus("error");
    }
  }

  function handleReset() {
    setWindowCounts({});
    setStep("select");
    setBookingData(null);
    setEmailStatus("idle");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-border shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <button
            onClick={handleLogoTap}
            className="flex items-center gap-2.5 cursor-default select-none focus:outline-none"
            tabIndex={-1}
            aria-label="Logo"
          >
            <div className={`w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 transition-colors duration-200 ${isAdminLoggedIn ? "ring-amber-400" : "ring-transparent"}`}>
              <img src={`${import.meta.env.BASE_URL}sp-logo.png`} alt="Siisti Pesu logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-bold text-foreground text-lg leading-tight block">Siisti Pesu</span>
              <span className={`text-xs leading-tight block transition-colors duration-200 ${isAdminLoggedIn ? "text-amber-500 font-medium" : "text-muted-foreground"}`}>
                {isAdminLoggedIn ? "Ylläpitotila" : "Ikkunanpesupalvelu"}
              </span>
            </div>
          </button>

          <div className="ml-auto flex items-center gap-2">
            {!isAdminLoggedIn && step !== "select" && step !== "confirmation" && (
              <button
                onClick={() => setStep("select")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                Takaisin
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          {isAdminLoggedIn ? (
            <AdminPanel
              key="admin"
              blockedDates={blockedDates}
              onToggleDate={toggleDate}
              onLogout={handleAdminLogout}
            />
          ) : (
            <>
              {step === "select" && (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Tilaa ikkunanpesu</h1>
                    <p className="text-muted-foreground text-base">Valitse ikkunatyypit ja kappalemäärät. Hinta lasketaan automaattisesti.</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <WindowSelector windowCounts={windowCounts} onCountChange={handleCountChange} />
                    </div>
                    <div className="lg:col-span-1">
                      <div className="sticky top-24">
                        <PriceSummary
                          windowCounts={windowCounts}
                          travelFee={TRAVEL_FEE}
                          minimumCharge={MINIMUM_CHARGE}
                          onProceed={() => setStep("booking")}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "booking" && (
                <motion.div
                  key="booking"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-2">Varauksen tiedot</h1>
                    <p className="text-muted-foreground text-base">Täytä yhteystietosi ja valitse sopiva aika.</p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <BookingForm onSubmit={handleBookingSubmit} blockedDates={blockedDates} bookedSlots={bookedSlots} />
                    </div>
                    <div className="lg:col-span-1">
                      <div className="sticky top-24">
                        <PriceSummary
                          windowCounts={windowCounts}
                          travelFee={TRAVEL_FEE}
                          minimumCharge={MINIMUM_CHARGE}
                          compact
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "confirmation" && bookingData && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <ConfirmationView
                    bookingData={bookingData}
                    windowCounts={windowCounts}
                    travelFee={TRAVEL_FEE}
                    minimumCharge={MINIMUM_CHARGE}
                    emailStatus={emailStatus}
                    onReset={handleReset}
                  />
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </main>

      <AdminPasswordModal
        open={showPasswordModal}
        onSuccess={handleAdminLogin}
        onCancel={() => setShowPasswordModal(false)}
      />
    </div>
  );
}
