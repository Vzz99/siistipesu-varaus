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

  const { blockedDates, toggleDate }
