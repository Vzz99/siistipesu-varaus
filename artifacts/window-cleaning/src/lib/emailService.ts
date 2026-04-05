import emailjs from "@emailjs/browser";
import { WINDOW_TYPES, TRAVEL_FEE, MINIMUM_CHARGE } from "@/data/windows";
import { type BookingData, type WindowCounts } from "@/pages/BookingPage";
import { type DiscountPercent } from "@/data/windows";

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

function calcTotal(windowCounts: WindowCounts, discount: DiscountPercent): {
  windowsSubtotal: number;
  chargeBase: number;
  discountAmount: number;
  total: number;
} {
  const selectedItems = WINDOW_TYPES
    .filter((w) => (windowCounts[w.id] ?? 0) > 0)
    .map((w) => w.price * windowCounts[w.id]);
  const windowsSubtotal = selectedItems.reduce((s, v) => s + v, 0);
  const subtotalWithTravel = windowsSubtotal + TRAVEL_FEE;
  const chargeBase = Math.max(subtotalWithTravel, MINIMUM_CHARGE);
  const discountAmount = Math.round(chargeBase * (discount / 100) * 100) / 100;
  const total = Math.round((chargeBase - discountAmount) * 100) / 100;
  return { windowsSubtotal, chargeBase, discountAmount, total };
}

export async function sendBookingEmail(
  bookingData: BookingData,
  windowCounts: WindowCounts,
  discount: DiscountPercent
): Promise<void> {
  const { windowsSubtotal, discountAmount, total } = calcTotal(windowCounts, discount);
  const windowsList = buildWindowsList(windowCounts);

  const discountLine = discount > 0
    ? `Alennus ${discount}%: -${discountAmount.toFixed(2)} €`
    : "Ei alennusta";

  const templateParams = {
    customer_name: bookingData.name,
    customer_phone: bookingData.phone,
    customer_email: bookingData.email,
    customer_address: bookingData.address,
    booking_date: formatDateFi(bookingData.date),
    booking_time: bookingData.time,
    windows_list: windowsList,
    windows_subtotal: `${windowsSubtotal} €`,
    travel_fee: `${TRAVEL_FEE} €`,
    minimum_charge: `${MINIMUM_CHARGE} €`,
    discount_info: discountLine,
    total_price: `${total.toFixed(2)} €`,
    additional_info: bookingData.additionalInfo || "Ei lisätietoja",
  };

  await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
}
