import { useState, useRef, useCallback, useEffect } from "react";
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
import { HowItWorks } from "@/components/HowItWorks";
import { PriceList } from "@/components/PriceList";
import { ResultsSection } from "@/components/ResultsSection";
import { ValuesSection } from "@/components/ValuesSection";
import { useBlockedDates } from "@/hooks/useBlockedDates";
import { useBookedSlots } from "@/hooks/useBookedSlots";
import { TRAVEL_FEE, MINIMUM_CHARGE } from "@/data/windows";
import { sendBookingEmail } from "@/lib/emailService";

export type WindowCounts = Record<string, number>;
export type ServiceType = "ikkunanpesu" | "auton_ulkopesu" | "muut_palvelut" | "lumityot";

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
  const { bookedSlots, blockSlots, blockSpecificSlots, unblockSpecificSlots, refreshSlots } = useBookedSlots();

  const tapTimestamps = useRef<number[]>([]);

  // Varmistetaan ettei tumma teema jää päälle vanhoista asetuksista
  useEffect(() => {
    document.documentElement.classList.remove("dark");
    localStorage.removeItem("theme");
  }, []);

  // Hae tuore aikatieto kun siirrytään varaukseen
  useEffect(() => {
    if (step === "booking" || step === "select") {
      refreshSlots?.();
    }
  }, [step, refreshSlots]);

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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    { label: "Näin se toimii", id: "miten" },
    { label: "Palvelut & hinnat", id: "hinnat" },
    { label: "Tulokset", id: "tulokset" },
    { label: "Usein kysytyt", id: "ukk" },
    { label: "Meistä", id: "meista" },
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#ffffff" }}>
      <header
        className="sticky top-0 z-40"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center gap-3">
          <button
            onClick={handleLogoTap}
            className="flex items-center gap-2.5 cursor-default select-none focus:outline-none"
            tabIndex={-1}
            aria-label="Logo"
          >
            <div
              className="w-9 h-9 rounded-full overflow-hidden flex-shrink-0 transition-all duration-200"
              style={{
                boxShadow: isAdminLoggedIn ? "0 0 0 2px #f59e0b" : "none",
              }}
            >
              <img
                src={`${import.meta.env.BASE_URL}sp-logo.png`}
                alt="Siisti Pesu logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="font-bold text-base leading-tight block" style={{ color: "#0f172a" }}>
                Siisti Pesu
              </span>
              <span
                className="text-xs leading-tight block"
                style={{ color: isAdminLoggedIn ? "#d97706" : "#64748b" }}
              >
                {isAdminLoggedIn ? "Ylläpitotila" : "Varauspalvelu"}
              </span>
            </div>
          </button>

          {step === "service" && !isAdminLoggedIn && (
            <nav className="hidden md:flex items-center gap-1 ml-6">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg transition-colors duration-150 hover:bg-slate-100"
                  style={{ color: "#475569" }}
                >
                  {link.label}
                </button>
              ))}
            </nav>
          )}

          <div className="ml-auto flex items-center gap-3">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="text-sm font-medium transition-colors flex items-center gap-1.5 hover:opacity-70"
                style={{ color: "#475569" }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Takaisin
              </button>
            )}
            {step === "service" && !isAdminLoggedIn && (
              <button
                onClick={scrollToServices}
                className="px-4 py-2 text-sm font-semibold rounded-xl text-white transition-all duration-150 hover:opacity-90 active:scale-95"
                style={{ background: "#0f172a" }}
              >
                Varaa aika
              </button>
            )}
          </div>
        </div>

        {step === "service" && !isAdminLoggedIn && (
          <div className="md:hidden flex gap-2 px-4 pb-2.5 overflow-x-auto">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-lg transition-colors duration-150"
                style={{ color: "#475569", border: "1px solid #e2e8f0" }}
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
              bookedSlots={bookedSlots}
              onBlockSlots={blockSpecificSlots}
              onUnblockSlots={unblockSpecificSlots}
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

                  <div id="miten" className="scroll-mt-24">
                    <HowItWorks onStartClick={scrollToServices} />
                  </div>

                  <div id="hinnat" className="scroll-mt-24">
                    <PriceList />
                  </div>

                  <div id="tulokset" className="scroll-mt-24">
                    <ResultsSection />
                  </div>

                  <div id="arvot" className="scroll-mt-24">
                    <ValuesSection />
                  </div>

                  <div id="palvelut" className="scroll-mt-24">
                    <ServiceSelector onSelect={handleServiceSelect} />
                  </div>

                  <div id="ukk" className="scroll-mt-24">
                    <FAQ />
                  </div>

                  <div id="meista" className="scroll-mt-24">
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
                  <div className="mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight mb-2" style={{ color: "#0f172a" }}>
                      Ikkunanpesu
                    </h1>
                    <p className="text-base" style={{ color: "#475569" }}>
                      Valitse ikkunatyypit ja kappalemäärät. Hinta lasketaan automaattisesti.
                    </p>
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
                          onProceed={() => {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            setStep("booking");
                          }}
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
                    <h1 className="text-3xl font-extrabold tracking-tight mb-2" style={{ color: "#0f172a" }}>
                      Varauksen tiedot
                    </h1>
                    <p className="text-base" style={{ color: "#475569" }}>
                      Täytä yhteystietosi ja valitse sopiva aika.
                    </p>
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
