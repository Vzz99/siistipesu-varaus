import emailjs from "@emailjs/browser";
import { WINDOW_TYPES, TRAVEL_FEE, MINIMUM_CHARGE } from "@/data/windows";
import { type BookingData, type WindowCounts } from "@/pages/BookingPage";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

const MONTH_NAMES = [
  "tammikuuta", "helmikuuta", "maaliskuuta", "huhtikuuta", "toukokuuta", "kesäkuuta",
  "heinäkuuta", "elokuuta", "syyskuuta", "lokakuuta", "marraskuuta", "joulukuuta",
];

function formatDateFi(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d}. ${MONTH_NAMES[m - 1]} ${y}`;
}

function buildWindowsList(windowCounts: WindowCounts): string {
  return WINDOW_TYPES
    .filter((w) => (windowCounts[w.id] ?? 0) > 0)
    .map((w) => `${w.name} × ${windowCounts[w.id]} = ${w.price * windowCounts[w.id]} €`)
    .join("\n");
}

function calcTotal(windowCounts: WindowCounts): number {
  const windowsSubtotal = WINDOW_TYPES
    .filter((w) => (windowCounts[w.id] ?? 0) > 0)
    .reduce((s, w) => s + w.price * windowCounts[w.id], 0);
  return Math.max(windowsSubtotal + TRAVEL_FEE, MINIMUM_CHARGE);
}

export async function sendBookingEmail(
  bookingData: BookingData,
  windowCounts: WindowCounts
): Promise<void> {
  const total = calcTotal(windowCounts);
  const windowsList = buildWindowsList(windowCounts);

  const templateParams = {
    customer_name: bookingData.name,
    customer_phone: bookingData.phone,
    customer_email: bookingData.email,
    customer_address: bookingData.address,
    booking_date: formatDateFi(bookingData.date),
    booking_time: bookingData.time,
    windows_list: windowsList,
    travel_fee: `${TRAVEL_FEE} €`,
    total_price: `${total.toFixed(2)} €`,
    additional_info: bookingData.additionalInfo || "Ei lisätietoja",
  };

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
}
