export type WindowCategory = "AVAUTUVAT" | "AVAUTUMATTOMAT" | "MUUT";

export interface WindowType {
  id: string;
  category: WindowCategory;
  name: string;
  price: number;
  description?: string;
}

export const WINDOW_TYPES: WindowType[] = [
  { id: "avautuva-4", category: "AVAUTUVAT", name: "4-pintainen ikkuna", price: 16, description: "Tavallinen avautuva ikkuna, 4 pintaa" },
  { id: "avautuva-6", category: "AVAUTUVAT", name: "6-pintainen ikkuna", price: 20, description: "Avautuva ikkuna, 6 pintaa" },
  { id: "ruudukko", category: "AVAUTUVAT", name: "Ruudukkoikkuna", price: 23, description: "Ruudukollinen avautuva ikkuna" },
  { id: "tuuletus", category: "AVAUTUVAT", name: "Tuuletusikkuna", price: 10, description: "Pieni tuuletusikkuna" },
  { id: "ikkuna-ryhma", category: "AVAUTUVAT", name: "Ikkunaryhmä", price: 25, description: "Useamman ikkunan ryhmä" },
  { id: "avautumaton", category: "AVAUTUMATTOMAT", name: "Ikkuna", price: 11, description: "Kiinteä, avautumaton ikkuna" },
  { id: "ovi", category: "MUUT", name: "Ovi (lasillinen)", price: 11, description: "Lasillinen ovi" },
  { id: "korkea", category: "MUUT", name: "Korkeat ikkunat", price: 26, description: "Vaikeasti saavutettavat korkeat ikkunat" },
];

export const CATEGORY_LABELS: Record<WindowCategory, string> = {
  AVAUTUVAT: "Avautuvat ikkunat",
  AVAUTUMATTOMAT: "Avautumattomat ikkunat",
  MUUT: "Muut",
};

export const CATEGORY_ORDER: WindowCategory[] = ["AVAUTUVAT", "AVAUTUMATTOMAT", "MUUT"];

export const TRAVEL_FEE = 25;
export const MINIMUM_CHARGE = 40;
export const DISCOUNT_OPTIONS = [0, 5, 10, 15, 20] as const;
export type DiscountPercent = (typeof DISCOUNT_OPTIONS)[number];
