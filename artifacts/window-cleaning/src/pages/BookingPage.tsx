import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WindowSelector } from "@/components/WindowSelector";
import { PriceSummary } from "@/components/PriceSummary";
import { BookingForm } from "@/components/BookingForm";
import { ConfirmationView } from "@/components/ConfirmationView";
import { type WindowType, type DiscountPercent, TRAVEL_FEE, MINIMUM_CHARGE, DISCOUNT_OPTIONS } from "@/data/windows";

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

export function BookingPage() {
  const [windowCounts, setWindowCounts] = useState<WindowCounts>({});
  const [discount, setDiscount] = useState<DiscountPercent>(0);
  const [step, setStep] = useState<Step>("select");
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

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

  function handleBookingSubmit(data: BookingData) {
    setBookingData(data);
    setStep("confirmation");
  }

  function handleReset() {
    setWindowCounts({});
    setDiscount(0);
    setStep("select");
    setBookingData(null);
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-sm border-b border-border shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-sm">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="18" rx="2"/>
                <line x1="8" y1="3" x2="8" y2="21"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
              </svg>
            </div>
            <div>
              <span className="font-bold text-foreground text-lg leading-tight block">Ikkunanpesu</span>
              <span className="text-xs text-muted-foreground leading-tight block">Varausjärjestelmä</span>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            {step !== "select" && step !== "confirmation" && (
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
                  <WindowSelector
                    windowCounts={windowCounts}
                    onCountChange={handleCountChange}
                  />
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <PriceSummary
                      windowCounts={windowCounts}
                      discount={discount}
                      onDiscountChange={setDiscount}
                      travelFee={TRAVEL_FEE}
                      minimumCharge={MINIMUM_CHARGE}
                      discountOptions={DISCOUNT_OPTIONS}
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
                  <BookingForm onSubmit={handleBookingSubmit} />
                </div>
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <PriceSummary
                      windowCounts={windowCounts}
                      discount={discount}
                      onDiscountChange={setDiscount}
                      travelFee={TRAVEL_FEE}
                      minimumCharge={MINIMUM_CHARGE}
                      discountOptions={DISCOUNT_OPTIONS}
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
                discount={discount}
                travelFee={TRAVEL_FEE}
                minimumCharge={MINIMUM_CHARGE}
                onReset={handleReset}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
