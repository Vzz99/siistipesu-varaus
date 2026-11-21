/* ─────────────────────────────────────────────────────────────
   Palvelut ja hinnat — yksi lähde koko sivustolle.

   Hinnat olivat aiemmin kovakoodattuina neljään eri tiedostoon
   (palveluvalinta, hinnasto, yhteenveto, vahvistussähköposti),
   joten yhden hinnan muuttaminen vaati neljä muokkausta ja
   unohtui helposti jostain. Muuta hinta täällä, niin se muuttuu
   kaikkialla.
   ───────────────────────────────────────────────────────────── */

export type ServiceType =
  | "ikkunanpesu"
  | "auton_ulkopesu"
  | "auton_sisapesu"
  | "auton_sisa_ja_ulko"
  | "muut_palvelut"
  | "lumityot";

export interface Service {
  id: ServiceType;
  /** Nimi, joka näkyy asiakkaalle kaikkialla. */
  label: string;
  /** Lyhyt kuvaus palveluvalinnassa. */
  subtitle: string;
  /** Pidempi kuvaus hinnastossa. */
  description: string;
  /** Kiinteä hinta euroina, tai null jos hinta lasketaan tai sovitaan. */
  price: number | null;
  /** Hinnan selite kun kiinteää hintaa ei ole. */
  priceLabel?: string;
  /** Hinnan alla näkyvä tarkenne. */
  priceNote?: string;
  image: string;
  includes: string[];
  /** Näkyykö palvelu sivustolla. Lumityöt ovat pois kaudeksi. */
  listed: boolean;
  /** Ryhmittely palveluvalinnassa. */
  group?: "auto";
}

export const SERVICES: Service[] = [
  {
    id: "ikkunanpesu",
    label: "Ikkunanpesu",
    subtitle: "Kaikki ikkunatyypit, ammattilaistulos",
    description: "Sisä- ja ulkopinnat kiiltäviksi — ei jälkiä, ei tahroja.",
    price: null,
    priceLabel: "alkaen 10 €",
    priceNote: "/ ikkuna",
    image: "/after-window.webp",
    includes: [
      "Kaikki pinnat, karmit ja ikkunoiden välit",
      "Kaikki välineet mukanamme",
      "Ei erillisiä matkakuluja, minimiveloitus 40 €",
    ],
    listed: true,
  },
  {
    id: "auton_ulkopesu",
    label: "Auton ulkopesu",
    subtitle: "Käsinpesu ulkoa — tulemme pihaasi",
    description: "Laadukas käsinpesu. Auto kiiltää kuin uusi.",
    price: 35,
    priceNote: "kiinteä hinta",
    image: "/car-wash.webp",
    includes: [
      "Kori, pyörät, vanteet ja lasit",
      "Teemme työn sinun pihassasi",
      "Tarvitsemme pääsyn vesipisteeseen",
    ],
    listed: true,
    group: "auto",
  },
  {
    id: "auton_sisapesu",
    label: "Auton sisäpesu",
    subtitle: "Imurointi ja pinnat — tulemme pihaasi",
    description: "Sisätilat puhtaiksi imuroinnista pintoihin ja ikkunoihin.",
    price: 50,
    priceNote: "kiinteä hinta",
    image: "/car-poster.webp",
    includes: [
      "Imurointi: lattiat, matot, penkkien alustat ja tavaratila",
      "Pinnat: kojelauta, ovipaneelit, kynnykset ja säilytystilat",
      "Ikkunat ja peilit sisäpuolelta",
      "Ei sisällä penkkien märkäpesua",
    ],
    listed: true,
    group: "auto",
  },
  {
    id: "auton_sisa_ja_ulko",
    label: "Auton sisä- ja ulkopesu",
    subtitle: "Molemmat samalla käynnillä",
    description: "Koko auto kerralla kuntoon, sisältä ja ulkoa.",
    price: 85,
    priceNote: "kiinteä hinta",
    image: "/car-wash.webp",
    includes: [
      "Kaikki ulkopesun sisältö",
      "Kaikki sisäpesun sisältö",
      "Yhdellä käynnillä, yhdellä varauksella",
    ],
    listed: true,
    group: "auto",
  },
  {
    id: "muut_palvelut",
    label: "Muut palvelut",
    subtitle: "Nurmikon leikkuu, pihatyöt yms.",
    description: "Nurmikon leikkuu, pihatyöt ja muut kotitalouspalvelut.",
    price: null,
    priceLabel: "Sovitaan erikseen",
    image: "/mowing.webp",
    includes: [
      "Nurmikon leikkuu ja pihan siistiminen",
      "Muut kodin ulkotyöt",
      "Hinta työmäärän ja haastavuuden mukaan",
    ],
    listed: true,
  },
  {
    id: "lumityot",
    label: "Lumityöt",
    subtitle: "Auraus ja hiekoitus",
    description: "Pihan auraus ja hiekoitus talvikaudella.",
    price: null,
    priceLabel: "alkaen 15 €",
    priceNote: "sovitaan pihan koon mukaan",
    image: "/mowing.webp",
    includes: ["Auraus ja hiekoitus", "Hinta pihan koon mukaan"],
    listed: false,
  },
];

const BY_ID = Object.fromEntries(SERVICES.map((s) => [s.id, s])) as Record<
  ServiceType,
  Service
>;

export function getService(id: ServiceType): Service {
  return BY_ID[id];
}

/** Palvelut jotka näkyvät sivustolla, määritellyssä järjestyksessä. */
export const LISTED_SERVICES = SERVICES.filter((s) => s.listed);

export const SERVICE_LABELS = Object.fromEntries(
  SERVICES.map((s) => [s.id, s.label])
) as Record<ServiceType, string>;

/** Hinta tekstinä, esim. "35,00 €" tai "Sovitaan erikseen". */
export function formatServicePrice(id: ServiceType): string {
  const s = BY_ID[id];
  if (s.price === null) return s.priceLabel ?? "Sovitaan erikseen";
  return `${s.price.toLocaleString("fi-FI", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })} €`;
}

/** Lyhyt hinta korttiin, esim. "35 €". */
export function shortServicePrice(id: ServiceType): string {
  const s = BY_ID[id];
  if (s.price === null) return s.priceLabel ?? "Sovitaan erikseen";
  return `${s.price.toLocaleString("fi-FI")} €`;
}
