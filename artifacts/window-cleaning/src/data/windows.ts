export type WindowCategory =
  | "PESTAVAT"
  | "PARVEKE"
  | "TERASSI"
  | "ULKOPESU";

export interface WindowType {
  id: string;
  category: WindowCategory;
  name: string;
  price: number;
  description?: string;
}

export const WINDOW_TYPES: WindowType[] = [
  // Pestävät ikkunat
  { id: "avautuva-4", category: "PESTAVAT", name: "Avautuva 4-pintainen", price: 16, description: "Tavallinen avautuva ikkuna, 4 pintaa" },
  { id: "avautuva-6", category: "PESTAVAT", name: "Avautuva 6-pintainen", price: 20, description: "Avautuva ikkuna, 6 pintaa" },
  { id: "ruudukko", category: "PESTAVAT", name: "Avautuva ruutuikkuna", price: 23, description: "Ruudukollinen avautuva ikkuna" },
  { id: "tuuletus", category: "PESTAVAT", name: "Tuuletusikkuna", price: 10, description: "Pieni tuuletusikkuna" },
  { id: "avautumaton", category: "PESTAVAT", name: "Avautumaton ikkuna", price: 11, description: "Kiinteä ikkuna" },
  { id: "ikkuna-ryhma", category: "PESTAVAT", name: "Ikkunaryhmä", price: 25, description: "Useamman ikkunan ryhmä" },
  { id: "ovi", category: "PESTAVAT", name: "Ovi (lasillinen)", price: 11, description: "Lasillinen ovi" },
  { id: "korkea", category: "PESTAVAT", name: "Kiinteä 3–5 m korkeudessa", price: 18, description: "Vaikeasti saavutettava korkea ikkuna" },
  { id: "lasikaide", category: "PESTAVAT", name: "Lasikaide (metri)", price: 8, description: "Hinta metriä kohti" },
  { id: "kylpyhuone", category: "PESTAVAT", name: "Kylpyhuoneen lasi", price: 8, description: "Suihkuseinä tai kylpyhuoneen lasi" },
  { id: "peili", category: "PESTAVAT", name: "Peili", price: 5, description: "Peilipinnan puhdistus" },

  // Parvekelasit
  { id: "parveke-kaantyva", category: "PARVEKE", name: "Parvekkeen kääntyvä lasi", price: 7, description: "Hinta lasia kohti" },
  { id: "parveke-alalasi", category: "PARVEKE", name: "Parvekkeen alalasi (metri)", price: 8, description: "Hinta metriä kohti" },

  // Terassilasit
  { id: "terassilasi", category: "TERASSI", name: "Terassilasi", price: 11, description: "Hinta lasia kohti" },
];

export const OUTDOOR_WINDOW_TYPES: WindowType[] = [
  { id: "ulko-perus", category: "ULKOPESU", name: "Perusikkuna", price: 5, description: "Tavallinen ikkuna, ulkopinta" },
  { id: "ulko-tuuletus", category: "ULKOPESU", name: "Tuuletusikkuna", price: 5, description: "Pieni tuuletusikkuna, ulkopinta" },
  { id: "ulko-ryhma", category: "ULKOPESU", name: "Ikkunaryhmä", price: 8, description: "Useamman ikkunan ryhmä, ulkopinta" },
  { id: "ulko-korkea", category: "ULKOPESU", name: "Korkea ikkuna", price: 7, description: "Vaikeasti saavutettava korkea ikkuna, ulkopinta" },
];

export const CATEGORY_LABELS: Record<WindowCategory, string> = {
  PESTAVAT: "Pestävät ikkunat",
  PARVEKE: "Parvekelasit",
  TERASSI: "Terassilasit",
  ULKOPESU: "Ulkopesun ikkunat",
};

export const CATEGORY_ORDER: WindowCategory[] = ["PESTAVAT", "PARVEKE", "TERASSI"];

export const TRAVEL_FEE = 25;
export const MINIMUM_CHARGE = 40;

/* ── Kampanja ──
   Voimassa 1.9.–31.12.2026, koskee vain ikkunanpesua.
   Kytke pois päältä vaihtamalla CAMPAIGN.enabled arvoon false. */
export const CAMPAIGN = {
  enabled: true,
  percent: 10,
  label: "Syyskampanja",
  headline: "Ikkunanpesusta −10 %",
  description: "Kampanja voimassa vuoden loppuun asti.",
  startsAt: "2026-09-01",
  endsAt: "2026-12-31",
};

export function isCampaignActive(): boolean {
  if (!CAMPAIGN.enabled) return false;
  const today = new Date().toISOString().slice(0, 10);
  return today >= CAMPAIGN.startsAt && today <= CAMPAIGN.endsAt;
}

export const DISCOUNT_OPTIONS = [0, 5, 10, 15, 20] as const;
export type DiscountPercent = (typeof DISCOUNT_OPTIONS)[number];
