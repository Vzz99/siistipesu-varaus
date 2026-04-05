import { useState } from "react";
import { type BookingData } from "@/pages/BookingPage";
import { CalendarPicker } from "@/components/CalendarPicker";

interface Props {
  onSubmit: (data: BookingData) => void;
  blockedDates?: Set<string>;
}

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00"
];

const MONTH_NAMES = [
  "Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu",
  "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
];

function formatDateFi(dateStr: string): string {
  if (!dateStr) return "";
  const [y, m, d] = dateStr.split("-").map(Number);
  return `${d}. ${MONTH_NAMES[m - 1]} ${y}`;
}

export function BookingForm({ onSubmit, blockedDates = new Set() }: Props) {
  const [form, setForm] = useState<BookingData>({
    name: "",
    phone: "",
    email: "",
    address: "",
    date: "",
    time: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({});
  const [showCalendar, setShowCalendar] = useState(false);

  function handleChange(field: keyof BookingData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleDateSelect(dateStr: string) {
    handleChange("date", dateStr);
    setShowCalendar(false);
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof BookingData, string>> = {};
    if (!form.name.trim()) newErrors.name = "Nimi on pakollinen";
    if (!form.phone.trim()) newErrors.phone = "Puhelinnumero on pakollinen";
    if (!form.email.trim()) newErrors.email = "Sahköposti on pakollinen";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Tarkista sahköpostiosoite";
    if (!form.address.trim()) newErrors.address = "Osoite on pakollinen";
    if (!form.date) newErrors.date = "Valitse päivämäärä";
    else if (blockedDates.has(form.date)) newErrors.date = "Tama paiva ei ole saatavilla";
    if (!form.time) newErrors.time = "Valitse aika";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-card-border rounded-2xl shadow-xs overflow-hidden">
      <div className="px-5 py-4 border-b border-border bg-muted/30">
        <h2 className="font-semibold text-foreground">Yhteystiedot</h2>
      </div>

      <div className="px-5 py-5 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
              placeholder="+358 40 123 4567"
              className={inputClass(!!errors.phone)}
            />
          </Field>
        </div>

        <Field label="Sahköposti *" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="nimi@esimerkki.fi"
            className={inputClass(!!errors.email)}
          />
        </Field>

        <Field label="Katuosoite *" error={errors.address}>
          <input
            type="text"
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
            placeholder="Esimerkkikatu 1, 00100 Helsinki"
            className={inputClass(!!errors.address)}
          />
        </Field>
      </div>

      <div className="px-5 pt-1 pb-1 border-t border-border">
        <div className="py-4 border-b border-border">
          <h2 className="font-semibold text-foreground mb-4">Aika</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Päivämäärä *" error={errors.date}>
              <button
                type="button"
                onClick={() => setShowCalendar((v) => !v)}
                className={`${inputClass(!!errors.date)} text-left flex items-center justify-between gap-2`}
              >
                <span className={form.date ? "text-foreground" : "text-muted-foreground"}>
                  {form.date ? formatDateFi(form.date) : "Valitse paiva..."}
                </span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground flex-shrink-0">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                  <line x1="16" y1="2" x2="16" y2="6"/>
                  <line x1="8" y1="2" x2="8" y2="6"/>
                  <line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </button>
            </Field>

            <Field label="Kellonaika *" error={errors.time}>
              <select
                value={form.time}
                onChange={(e) => handleChange("time", e.target.value)}
                className={inputClass(!!errors.time)}
              >
                <option value="">Valitse aika...</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </Field>
          </div>

          {showCalendar && (
            <div className="mt-3 p-4 border border-border rounded-xl bg-background shadow-md">
              <CalendarPicker
                selectedDate={form.date}
                onSelectDate={handleDateSelect}
                blockedDates={blockedDates}
                allowPast={false}
                mode="booking"
              />
              {blockedDates.size > 0 && (
                <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  Yliviivatut paivat eivat ole saatavilla
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="px-5 py-4">
        <Field label="Lisätiedot (valinnainen)">
          <textarea
            value={form.additionalInfo}
            onChange={(e) => handleChange("additionalInfo", e.target.value)}
            placeholder="Esim. kulkuohjeet, erityistoiveet, avainten sijainti..."
            rows={3}
            className={`${inputClass(false)} resize-none`}
          />
        </Field>

        <button
          type="submit"
          className="mt-4 w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-sm"
        >
          Vahvista varaus
        </button>
      </div>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full px-3.5 py-2.5 rounded-xl border text-sm transition-colors duration-150 bg-background outline-none focus:ring-2 focus:ring-primary/30 ${
    hasError
      ? "border-destructive focus:border-destructive"
      : "border-input focus:border-primary"
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
      <label className="text-sm font-medium text-foreground block">{label}</label>
      {children}
      {error && (
        <p className="text-xs text-destructive flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}
