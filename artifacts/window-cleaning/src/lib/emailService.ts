import emailjs from "@emailjs/browser";
import { WINDOW_TYPES, TRAVEL_FEE, MINIMUM_CHARGE } from "@/data/windows";
import { type BookingData, type WindowCounts, type ServiceType } from "@/pages/BookingPage";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const TEMPLATE_ID_CUSTOMER = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CUSTOMER as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

const SERVICE_LABELS: Record<ServiceType, string> = {
  ikkunanpesu: "Ikkunanpesu",
  auton_ulkopesu: "Auton ulkopesu",
  muut_palvelut: "Muut palvelut",
};

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

function calcTotal(serviceType: ServiceType, windowCounts: WindowCounts): string {
  if (serviceType === "auton_ulkopesu") return "25,00 €";
  if (serviceType === "muut_palvelut") return "Sovitaan erikseen";
  const windowsSubtotal = WINDOW_TYPES
    .filter((w) => (windowCounts[w.id] ?? 0) > 0)
    .reduce((s, w) => s + w.price * windowCounts[w.id], 0);
  return `${Math.max(windowsSubtotal + TRAVEL_FEE, MINIMUM_CHARGE).toFixed(2)} €`;
}

const CANCELLATION_INFO = `Jos haluat perua tai siirtää varauksesi, ota meihin yhteyttä mahdollisimman pian — mieluiten vähintään 24 tuntia ennen sovittua aikaa.

Sähköposti: siisti.pesu@gmail.com
Puhelin: +358 44 243 1103`;

export async function sendBookingEmail(
  bookingData: BookingData,
  serviceType: ServiceType,
  windowCounts: WindowCounts
): Promise<void> {
  const isIkkunanpesu = serviceType === "ikkunanpesu";

  const templateParams = {
    customer_name: bookingData.name,
    customer_phone: bookingData.phone,
    customer_email: bookingData.email,
    customer_address: bookingData.address,
    booking_date: formatDateFi(bookingData.date),
    booking_time: bookingData.time,
    service_type: SERVICE_LABELS[serviceType],
    windows_list: isIkkunanpesu ? buildWindowsList(windowCounts) : "-",
    travel_fee: isIkkunanpesu ? `${TRAVEL_FEE} €` : "-",
    total_price: calcTotal(serviceType, windowCounts),
    additional_info: bookingData.additionalInfo || "Ei lisätietoja",
    cancellation_info: CANCELLATION_INFO,
  };

  // Lähetä teille (yritykselle)
  await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);

  // Lähetä asiakkaalle vahvistus jos asiakastemplate on määritetty
  if (TEMPLATE_ID_CUSTOMER) {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID_CUSTOMER, {
      ...templateParams,
      to_email: bookingData.email,
      to_name: bookingData.name,
    }, PUBLIC_KEY);
  }
}
