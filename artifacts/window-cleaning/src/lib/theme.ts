/* ─────────────────────────────────────────────────────────────
   Siisti Pesun väripaletti — yksi lähde koko sivustolle.

   Lähtökohta on lasi. Reunasta katsottuna lasi on vihreää, ja
   siitä tulee sivuston pääväri. Se erottaa meidät siivousalan
   geneerisestä sinisestä ja sopii aiheeseen: valo ja kirkkaus.

   Kaikki tekstivärit on tarkistettu WCAG AA -kontrastia vasten
   valkoista taustaa vasten. Älä lisää uusia värejä suoraan
   komponentteihin — lisää ne tähän.
   ───────────────────────────────────────────────────────────── */

/** Otsikot ja tummat pinnat. 15,3:1 valkoisella. */
export const INK = "#0E2A24";

/** Hieman vaaleampi tumma — hoverit tummilla napeilla. */
export const INK_SOFT = "#17382F";

/** Pääväri: lasin vihreä. 6,4:1 valkoisella. */
export const ACCENT = "#0C6B58";

/** Tummempi pääväri napeille ja linkkiteksteille. 9,6:1. */
export const ACCENT_DARK = "#094E41";

/** Pääväri hyvin vaaleana — valittujen korttien tausta. */
export const ACCENT_TINT = "#E6F0EC";

/** Päävärin vaalea reuna, parina ACCENT_TINTin kanssa. */
export const ACCENT_EDGE = "#B9D4CA";

/** Leipäteksti. 8,3:1 valkoisella. */
export const BODY = "#3F524D";

/** Toissijainen teksti, aputekstit. 5,1:1 valkoisella. */
export const MUTED = "#5E736D";

/** Pois käytöstä olevan elementin teksti. */
export const DISABLED = "#93A6A0";

/** Oletusreuna korteille ja erottimille. */
export const BORDER = "#D9E3DF";

/** Vahvempi reuna — napit, syötekentät. */
export const BORDER_STRONG = "#BFCEC9";

/** Vaalea pinta korttien sisällä. */
export const SURFACE = "#F3F7F5";

/** Hieman tummempi pinta, esim. kuvien taustaväri latauksen ajan. */
export const SURFACE_SUNK = "#EDF2F0";

export const WHITE = "#FFFFFF";

/** Kampanjan korostusväri. Lämmin messinki, ei kirkas oranssi. */
export const AMBER = "#B45309";
export const AMBER_TINT = "#FDF4E7";
export const AMBER_EDGE = "#F0D9B5";

/** Virheet ja varoitukset. */
export const DANGER = "#B42318";
