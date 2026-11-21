/* Kotitalousvähennyksen luvut yhdessä paikassa.

   Lähde: Verohallinto, "Kotitalousvähennyksen määrä".
   https://www.vero.fi/henkiloasiakkaat/vahennykset/kotitalousvahennys/kotitalousvahennyksen-maara/
   Tarkistettu 21.11.2026. Luvut koskevat vuosia 2026 ja 2027.

   Korotus 2026 tuli takautuvasti koko vuodelle: aiempi 35 % oli
   sivulla jäljellä vanhentuneena ja aliarvioi asiakkaan edun.

   TARKISTA NÄMÄ KERRAN VUODESSA. Jos prosentti tai omavastuu
   muuttuu, muuta vain tämä tiedosto. */

/** Osuus työn hinnasta, jonka asiakas saa vähentää. */
export const KV_OSUUS = 0.40;

/** Omavastuu euroa / henkilö / vuosi. Vähennetään vuoden
    ensimmäisestä työstä, joten pienessä keikassa vähennys voi
    jäädä kokonaan saamatta. */
export const KV_OMAVASTUU = 150;

/** Enimmäismäärä euroa / henkilö / vuosi. */
export const KV_ENIMMAIS = 2100;

/** Mihin asti nämä luvut on vahvistettu. */
export const KV_VUOSI = "2026–2027";

/**
 * Paljonko asiakas saa vähentää yhdestä työstä.
 *
 * Omavastuu on VUOSIKOHTAINEN, ei keikkakohtainen: se vähennetään
 * kerran vuodessa, vaikka asiakas ostaisi useita eri palveluita.
 * Siksi tämä olettaa omavastuun jo käytetyksi — niin on asian laita
 * jokaisella, joka on teettänyt saman vuoden aikana remonttia,
 * siivousta, hoivatyötä tai mitä tahansa muuta vähennyskelpoista.
 *
 * Vain sille asiakkaalle, jolle tämä keikka on vuoden ensimmäinen
 * ja ainoa vähennyskelpoinen ostos, vähennys jää 150 euroa
 * pienemmäksi. Siitä kerrotaan laskurissa rivin alla.
 */
export function vahennysTyosta(tyonOsuus: number): number {
  return Math.min(tyonOsuus * KV_OSUUS, KV_ENIMMAIS);
}

/** Hinta vähennyksen jälkeen. Matkakulu ei ole vähennyskelpoinen. */
export function hintaVahennyksenJalkeen(
  tyonOsuus: number,
  matkakulu: number,
): number {
  return Math.round(tyonOsuus - vahennysTyosta(tyonOsuus)) + matkakulu;
}
