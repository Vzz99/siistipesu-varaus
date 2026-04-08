import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WindowSelector } from "@/components/WindowSelector";
import { PriceSummary } from "@/components/PriceSummary";
import { ServiceSummaryCard } from "@/components/ServiceSummaryCard";
import { BookingForm } from "@/components/BookingForm";
import { ConfirmationView } from "@/components/ConfirmationView";
import { ServiceSelector } from "@/components/ServiceSelector";
import { AdminPasswordModal } from "@/components/AdminPasswordModal";
import { AdminPanel } from "@/components/AdminPanel";
import { AboutSection } from "@/components/AboutSection";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";
import { Hero } from "@/components/Hero";
import { PriceList } from "@/components/PriceList";
import { ResultsSection } from "@/components/ResultsSection";
import { useBlockedDates } from "@/hooks/useBlockedDates";
import { useBookedSlots } from "@/hooks/useBookedSlots";
import { TRAVEL_FEE, MINIMUM_CHARGE } from "@/data/windows";
import { sendBookingEmail } from "@/lib/emailService";

export type WindowCounts = Record<string, number>;
export type ServiceType = "ikkunanpesu" | "auton_ulkopesu" | "muut_palvelut";

export interface BookingData {
  name: string;
  phone: string;
  email: string;
  address: string;
  date: string;
  time: string;
  additionalInfo: string;
}

export type Step = "service" | "select" | "booking" | "confirmation";

const TAP_WINDOW_MS = 1800;
const TAPS_REQUIRED = 5;

export function BookingPage() {
  const [step, setStep] = useState<Step>("service");
  const [serviceType, setServiceType] = useState<ServiceType | null>(null);
  const [windowCounts, setWindowCounts] = useState<WindowCounts>({});
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

  function handleServiceSelect(service: ServiceType) {
    setServiceType(service);
    if (service === "ikkunanpesu") {
      setStep("select");
    } else {
      setStep("booking");
    }
  }

  function handleCountChange(windowId: string, count: number) {
    setWindowCounts((prev) => {
      const next = { ...prev };
      if (count <= 0) delete next[windowId];
      else next[windowId] = count;
      return next;
    });
  }

  async function handleBookingSubmit(data: BookingData) {
    setBookingData(data);
    blockSlots(data.date, data.time);
    setEmailStatus("sending");
    setStep("confirmation");
    try {
      await sendBookingEmail(data, serviceType!, windowCounts);
      setEmailStatus("sent");
    } catch {
      setEmailStatus("error");
    }
  }

  function handleReset() {
    setStep("service");
    setServiceType(null);
    setWindowCounts({});
    setBookingData(null);
    setEmailStatus("idle");
  }

  function handleBack() {
    if (step === "select") setStep("service");
    else if (step === "booking") {
      if (serviceType === "ikkunanpesu") setStep("select");
      else setStep("service");
    }
  }

  const showBackButton = !isAdminLoggedIn && (step === "select" || step === "booking");

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }

  function scrollToServices() {
    scrollTo("palvelut");
  }

  const navLinks = [
    { label: "Palvelut & hinnat", id: "hinnat" },
    { label: "Tulokset", id: "tulokset" },
    { label: "Usein kysytyt", id: "ukk" },
    { label: "Meistä", id: "meista" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-border shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">

          <button
            onClick={handleLogoTap}
            className="flex items-center gap-2.5 cursor-default select-none focus:outline-none"
            tabIndex={-1}
            aria-label="Logo"
          >
            <div className={`w-9 h-9 rounded-full overflow-hidden flex-shrink-0 ring-2 transition-colors duration-200 ${isAdminLoggedIn ? "ring-amber-400" : "ring-transparent"}`}>
              <img src={`${import.meta.env.BASE_URL}sp-logo.png`} alt="Siisti Pesu logo" className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="font-bold text-foreground text-base leading-tight block">Siisti Pesu</span>
              <span className={`text-xs leading-tight block transition-colors duration-200 ${isAdminLoggedIn ? "text-amber-500 font-medium" : "text-muted-foreground"}`}>
                {isAdminLoggedIn ? "Ylläpitotila" : "Varauspalvelu"}
              </span>
            </div>
          </button>

          {step === "service" && !isAdminLoggedIn && (
            <nav className="hidden sm:flex items-center gap-1 ml-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors duration-150"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          <div className="ml-auto flex items-center gap-2">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                Takaisin
              </button>
            )}
            {step === "service" && !isAdminLoggedIn && (
              <button
                onClick={scrollToServices}
                className="px-4 py-2 bg-primary text-primary-foreground text-sm font-semibold rounded-xl hover:opacity-90 transition-all duration-150 active:scale-95"
              >
                Varaa aika
              </button>
            )}
          </div>
        </div>

        {step === "service" && !isAdminLoggedIn && (
          <div className="sm:hidden flex gap-2 px-4 pb-2 overflow-x-auto">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="flex-shrink-0 px-3 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg border border-border transition-colors duration-150"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
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
              {step === "service" && (
                <motion.div
                  key="service"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <Hero onBookClick={scrollToServices} />

                  <div id="hinnat" className="scroll-mt-20">
                    <PriceList />
                  </div>

                  <div id="tulokset" className="scroll-mt-20">
                    <ResultsSection />
                  </div>

                  <div id="palvelut" className="scroll-mt-20">
                    <ServiceSelector onSelect={handleServiceSelect} />
                  </div>

                  <div id="ukk" className="scroll-mt-20">
                    <FAQ />
                  </div>

                  <div id="meista" className="scroll-mt-20">
                    <AboutSection />
                  </div>
                </motion.div>
              )}

              {step === "select" && serviceType === "ikkunanpesu" && (
                <motion.div
                  key="select"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  {/* Työtekijäkuva */}
                  <div className="relative rounded-2xl overflow-hidden h-48 mb-8">
                    <img
                      src="/worker.jpg"
                      alt="Ikkunanpesu työssä"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <div>
                        <h1 className="text-3xl font-bold text-white mb-1">Ikkunanpesu</h1>
                        <p className="text-white/80 text-base">Valitse ikkunatyypit ja kappalemäärät. Hinta lasketaan automaattisesti.</p>
                      </div>
                    </div>
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

              {step === "booking" && serviceType && (
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
                      <BookingForm
                        onSubmit={handleBookingSubmit}
                        blockedDates={blockedDates}
                        bookedSlots={bookedSlots}
                        serviceType={serviceType}
                      />
                    </div>
                    <div className="lg:col-span-1">
                      <div className="sticky top-24">
                        {serviceType === "ikkunanpesu" ? (
                          <PriceSummary
                            windowCounts={windowCounts}
                            travelFee={TRAVEL_FEE}
                            minimumCharge={MINIMUM_CHARGE}
                            compact
                          />
                        ) : (
                          <ServiceSummaryCard serviceType={serviceType} />
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === "confirmation" && bookingData && serviceType && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <ConfirmationView
                    bookingData={bookingData}
                    serviceType={serviceType}
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

      <Footer />

      <AdminPasswordModal
        open={showPasswordModal}
        onSuccess={handleAdminLogin}
        onCancel={() => setShowPasswordModal(false)}
      />
    </div>
  );
}

