import { useState, useMemo } from "react";
import { type BookingData, type ServiceType } from "@/pages/BookingPage";
import { CalendarPicker } from "@/components/CalendarPicker";
import { ACCENT_DARK, ACCENT_TINT, BORDER, BORDER_STRONG, DANGER, DISABLED, INK, MUTED, SURFACE, WHITE } from "@/lib/theme";

/* ── Kauden alku ──
   Ikkunan- ja autonpesua ei tehdä talvella. Kaikki päivät ennen tätä
   päivämäärää ovat varattavissa olevan kalenterin ulkopuolella.
   Kun kausi aukeaa, vaihda päivämäärä tai aseta arvoksi "" (tyhjä),
   jolloin rajoitus poistuu kokonaan. */
const SEASON_START = "2027-04-01";
const SEASON_NOTE =
  "Pesukausi alkaa huhtikuussa 2027 — voit varata aikasi jo nyt.";

function todayStr(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/* Kaikki päivät tästä päivästä kauden alkuun asti, estettyinä. */
function datesBeforeSeason(): string[] {
  if (!SEASON_START) return [];
  const out: string[] = [];
  const cur = new Date(todayStr() + "T12:00:00");
  const end = new Date(SEASON_START + "T12:00:00");
  while (cur < end) {
    const m = String(cur.getMonth() + 1).padStart(2, "0");
    const day = String(cur.getDate()).padStart(2, "0");
    out.push(`${cur.getFullYear()}-${m}-${day}`);
    cur.setDate(cur.getDate() + 1);
  }
  return out;
}

interface Props {
  onSubmit: (data: BookingData) => void;
  blockedDates?: Set<string>;
  bookedSlots?: Record<string, string[]>;
  serviceType?: ServiceType;
}

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00",
];

// Arkisin (ma–pe) vain koulun jälkeen; viikonloppuisin koko päivä.
function slotsForDate(dateStr: string): string[] {
  if (!dateStr) return TIME_SLOTS;
  const [y, m, d] = dateStr.split("-").map(Number);
  const day = new Date(y, m - 1, d).getDay(); // 0 = su, 6 = la
  const isWeekend = day === 0 || day === 6;
  if (isWeekend) return TIME_SLOTS;
  return TIME_SLOTS.filter((t) => t >= "16:00");
}

const MONTH_NAMES = [
  "Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu",
  "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu",
];

// Noin 5 km säteellä Kauniaisista — lumityöt
const SNOW_POSTAL_CODES = new Set([
  "02700", "02701", // Kauniainen
  "02710",          // Viherlaakso
  "02720",          // Lähderanta
  "02730",          // Jupperi
  "02740",          // Bemböle-Pakankylä
  "02750",          // Sepänkylä-Kuurinniitty
  "02760",          // Tuomarila-Suvela
  "02770",          // Espoon keskus
  "02600",          // Leppävaara
  "02610",          // Kilo
  "02620",          // Karakallio
  "02630",          // Nihtisilta
  "02650",          // Pohjois-Leppävaara
  "02660",          // Lintuvaara
  "02680",          // Uusmäki
  "02940",          // Lippajärvi-Järvenperä
]);

function formatDateFi(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d}. ${MONTH_NAMES[m - 1]} ${y}`;
}

function isValidUusimaanPostalCode(code: string): boolean {
  const num = parseInt(code, 10);
  return code.length === 5 && num >= 100 && num <= 9999;
}

export function BookingForm({
  onSubmit,
  blockedDates = new Set(),
  bookedSlots = {},
  serviceType,
}: Props) {
  const isSnow = serviceType === "lumityot";

  // Ylläpidon estot + kauden ulkopuoliset päivät samassa joukossa
  const allBlockedDates = useMemo(() => {
    const s = new Set(blockedDates);
    datesBeforeSeason().forEach((d) => s.add(d));
    return s;
  }, [blockedDates]);

  const [form, setForm] = useState<BookingData & { postalCode: string }>({
    name: "",
    phone: "",
    email: "",
    address: "",
    postalCode: "",
    date: "",
    time: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});
  const [showCalendar, setShowCalendar] = useState(false);

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleDateSelect(dateStr: string) {
    setForm((prev) => {
      const allowed = slotsForDate(dateStr);
      const keepTime = allowed.includes(prev.time) ? prev.time : "";
      return { ...prev, date: dateStr, time: keepTime };
    });
    if (errors.date) setErrors((prev) => ({ ...prev, date: undefined }));
    setShowCalendar(false);
  }

  function validate(): boolean {
    const e: Partial<Record<string, string>> = {};
    if (!form.name.trim()) e.name = "Nimi on pakollinen";
    if (!form.phone.trim()) e.phone = "Puhelinnumero on pakollinen";
    if (!form.email.trim()) e.email = "Sähköposti on pakollinen";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Tarkista sähköpostiosoite";
    if (!form.address.trim()) e.address = "Osoite on pakollinen";

    if (!form.postalCode.trim()) {
      e.postalCode = "Postinumero on pakollinen";
    } else if (isSnow) {
      if (!SNOW_POSTAL_CODES.has(form.postalCode)) {
        e.postalCode =
          "Lumityöt vain 5 km säteellä Kauniaisista. Ota yhteyttä, jos asut lähialueella.";
      }
    } else if (!isValidUusimaanPostalCode(form.postalCode)) {
      e.postalCode = "Palvelemme vain Uudenmaan alueella (00100–09999)";
    }

    if (!form.date) e.date = "Valitse päivämäärä";
    else if (SEASON_START && form.date < SEASON_START)
      e.date = SEASON_NOTE;
    else if (allBlockedDates.has(form.date)) e.date = "Tämä päivä ei ole saatavilla";
    if (!form.time) e.time = "Valitse aika";
    else if (form.date && !slotsForDate(form.date).includes(form.time))
      e.time = "Valitse sallittu aika";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (validate()) {
      onSubmit({
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: `${form.address}, ${form.postalCode}`,
        date: form.date,
        time: form.time,
        additionalInfo: form.additionalInfo,
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl bg-white overflow-hidden"
      style={{ border: `1px solid ${BORDER}` }}
    >
      <div className="px-5 sm:px-6 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <h2 className="font-bold text-base" style={{ color: INK }}>
          Yhteystiedot
        </h2>
      </div>

      <div className="px-5 sm:px-6 py-6 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field label="Nimi *" error={errors.name}>
            <input
              type="text"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Etunimi Sukunimi"
              className={inputClass(!!errors.name)}
            />
          </Field>

          <Field label="Puhelinnumero *" error={errors.phone}>
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="040 123 4567"
              className={inputClass(!!errors.phone)}
            />
          </Field>
        </div>

        <Field label="Sähköposti *" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="nimi@esimerkki.fi"
            className={inputClass(!!errors.email)}
          />
        </Field>

        <div className="grid grid-cols-1 sm:grid-cols-[1.6fr_1fr] gap-5">
          <Field label="Katuosoite *" error={errors.address}>
            <input
              type="text"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="Esimerkkikatu 1, Espoo"
              className={inputClass(!!errors.address)}
            />
          </Field>

          <Field label="Postinumero *" error={errors.postalCode}>
            <input
              type="text"
              inputMode="numeric"
              value={form.postalCode}
              onChange={(e) =>
                handleChange("postalCode", e.target.value.replace(/\D/g, "").slice(0, 5))
              }
              placeholder="02700"
              maxLength={5}
              className={inputClass(!!errors.postalCode)}
            />
          </Field>
        </div>

        {isSnow && (
          <div
            className="text-xs leading-relaxed px-3.5 py-3 rounded-xl"
            style={{ background: ACCENT_TINT, color: ACCENT_DARK }}
          >
            Lumityöt tehdään 5 km säteellä Kauniaisista — Kauniainen, Viherlaakso,
            Leppävaara, Kilo, Karakallio, Espoon keskus ja lähialueet.
          </div>
        )}
      </div>

      <div className="px-5 sm:px-6 py-6" style={{ borderTop: `1px solid ${BORDER}` }}>
        <h2 className="font-bold text-base mb-1.5" style={{ color: INK }}>
          Aika
        </h2>
        <p className="text-xs mb-4 leading-relaxed" style={{ color: MUTED }}>
          Arkisin palvelemme klo 16–19 (koulun jälkeen), viikonloppuisin klo 8–19.
        </p>

        {SEASON_START && !isSnow && (
          <div
            className="text-xs leading-relaxed px-3.5 py-3 rounded-xl mb-5"
            style={{ background: ACCENT_TINT, color: ACCENT_DARK }}
          >
            {SEASON_NOTE}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <Field label="Päivämäärä *" error={errors.date}>
            <button
              type="button"
              onClick={() => setShowCalendar((v) => !v)}
              className={`${inputClass(!!errors.date)} text-left flex items-center justify-between gap-2`}
            >
              <span style={{ color: form.date ? INK : DISABLED }}>
                {form.date ? formatDateFi(form.date) : "Valitse päivä..."}
              </span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </button>
          </Field>

          <Field label="Kellonaika *" error={errors.time}>
            <div
              className="grid grid-cols-3 gap-1.5 p-1.5 rounded-xl"
              style={{ border: `1px solid ${errors.time ? DANGER : BORDER}` }}
            >
              {!form.date && (
                <p className="col-span-3 text-xs text-center py-2" style={{ color: MUTED }}>
                  Valitse ensin päivämäärä
                </p>
              )}
              {form.date && slotsForDate(form.date).map((slot) => {
                const blocked = (bookedSlots[form.date] ?? []).includes(slot);
                const selected = form.time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={blocked}
                    onClick={() => !blocked && handleChange("time", slot)}
                    title={blocked ? "Aika varattu" : slot}
                    className="py-2 rounded-lg text-sm font-semibold transition-all duration-150 select-none"
                    style={
                      blocked
                        ? { background: SURFACE, color: BORDER_STRONG, textDecoration: "line-through", cursor: "not-allowed" }
                        : selected
                        ? { background: INK, color: WHITE }
                        : { color: INK, cursor: "pointer" }
                    }
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </Field>
        </div>

        {showCalendar && (
          <div
            className="mt-4 p-4 rounded-2xl bg-white"
            style={{ border: `1px solid ${BORDER}`, boxShadow: "0 8px 24px rgba(15,23,42,0.07)" }}
          >
            <CalendarPicker
              selectedDate={form.date}
              onSelectDate={handleDateSelect}
              blockedDates={allBlockedDates}
              allowPast={false}
              mode="booking"
            />
            <p className="text-xs mt-3" style={{ color: MUTED }}>
              Yliviivatut päivät eivät ole saatavilla.
            </p>
          </div>
        )}
      </div>

      <div className="px-5 sm:px-6 py-6" style={{ borderTop: `1px solid ${BORDER}` }}>
        <Field label="Lisätiedot (valinnainen)">
          <textarea
            value={form.additionalInfo}
            onChange={(e) => handleChange("additionalInfo", e.target.value)}
            placeholder={
              isSnow
                ? "Esim. pihan koko, kulkuohjeet — mainitse tässä myös jos haluat kausikortin."
                : "Esim. kulkuohjeet, erityistoiveet, avainten sijainti..."
            }
            rows={3}
            className={`${inputClass(false)} resize-none`}
          />
        </Field>

        <button
          type="submit"
          className="mt-5 w-full py-3.5 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          style={{ background: INK }}
        >
          Vahvista varaus
        </button>
      </div>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-colors duration-150 bg-white border ${
    hasError
      ? "border-red-500 focus:border-red-500"
      : "border-slate-200 focus:border-blue-600"
  }`;
}

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
}

function Field({ label, error, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-semibold block" style={{ color: INK }}>
        {label}
      </label>
      {children}
      {error && (
        <p className="text-xs flex items-start gap-1.5 leading-snug" style={{ color: DANGER }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
