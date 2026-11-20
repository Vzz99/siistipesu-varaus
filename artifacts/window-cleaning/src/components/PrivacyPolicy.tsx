import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

/* ─────────────────────────────────────────────
   Valtteri Jutila rekisterinpitäjänä.
   ───────────────────────────────────────────── */
const OPERATOR_NAME = "Etunimi Sukunimi";

const BUSINESS_ID = "3609363-2";
const CONTACT_EMAIL = "siisti.pesu@gmail.com";
const CONTACT_PHONE = "044 243 1103";
const UPDATED = "20.11.2026";

const DARK = "#0f172a";
const GRAY = "#475569";
const MUTED = "#64748b";
const BORDER = "#e2e8f0";
const BLUE = "#2563eb";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function PrivacyPolicy({ open, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center"
          style={{ background: "rgba(15,23,42,0.5)" }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.22 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full sm:max-w-2xl sm:rounded-2xl rounded-t-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "92vh" }}
          >
            <div
              className="px-5 sm:px-7 py-4 flex items-center gap-3 flex-shrink-0"
              style={{ borderBottom: `1px solid ${BORDER}` }}
            >
              <h2 className="font-bold text-lg" style={{ color: DARK }}>
                Tietosuojaseloste
              </h2>
              <button
                onClick={onClose}
                aria-label="Sulje"
                className="ml-auto w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-slate-100"
                style={{ color: MUTED }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div
              className="px-5 sm:px-7 py-6 overflow-y-auto text-sm leading-relaxed"
              style={{
                color: GRAY,
                paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
              }}
            >
              <p className="text-xs mb-6" style={{ color: MUTED }}>
                Päivitetty {UPDATED}
              </p>

              <Section title="1. Rekisterinpitäjä">
                <p>
                  {OPERATOR_NAME} (Siisti Pesu), Y-tunnus {BUSINESS_ID}
                </p>
                <p className="mt-2">
                  Sähköposti:{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: BLUE }} className="font-medium">
                    {CONTACT_EMAIL}
                  </a>
                  <br />
                  Puhelin: {CONTACT_PHONE}
                </p>
                <p className="mt-2">
                  Rekisterinpitäjä vastaa tällä sivustolla kerättyjen henkilötietojen
                  käsittelystä. Kaikissa tietosuojaa koskevissa asioissa voit ottaa
                  yhteyttä yllä oleviin yhteystietoihin.
                </p>
              </Section>

              <Section title="2. Mitä tietoja kerätään">
                <p>Varausta tehdessäsi kerätään seuraavat tiedot:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>nimi</li>
                  <li>puhelinnumero</li>
                  <li>sähköpostiosoite</li>
                  <li>osoite, jossa työ tehdään</li>
                  <li>varauksen päivämäärä ja kellonaika</li>
                  <li>tilattu palvelu ja sen sisältö, esimerkiksi ikkunoiden määrä ja tyypit</li>
                  <li>vapaaehtoiset lisätiedot, jotka kirjoitat itse varauslomakkeelle</li>
                </ul>
                <p className="mt-2">
                  Tiedot saadaan sinulta itseltäsi. Niitä ei kerätä muista lähteistä.
                </p>
              </Section>

              <Section title="3. Mihin tietoja käytetään ja millä perusteella">
                <p>
                  Tietoja käytetään varauksen vastaanottamiseen, työn sopimiseen ja
                  toteuttamiseen, yhteydenpitoon kanssasi sekä laskutukseen ja
                  kirjanpitoon.
                </p>
                <p className="mt-2">
                  Käsittelyn oikeusperuste on sopimuksen täytäntöönpano
                  (tietosuoja-asetuksen 6 artiklan 1 kohdan b alakohta) sekä
                  kirjanpitoa koskevan lakisääteisen velvoitteen noudattaminen
                  (6 artiklan 1 kohdan c alakohta).
                </p>
                <p className="mt-2">
                  Tietoja <strong>ei käytetä markkinointiin</strong> eikä niiden perusteella
                  tehdä automaattisia päätöksiä tai profilointia.
                </p>
              </Section>

              <Section title="4. Kenelle tietoja luovutetaan">
                <p>
                  Tietoja ei myydä eikä luovuteta ulkopuolisille markkinointitarkoituksiin.
                  Varausten käsittelyssä käytetään seuraavia palveluntarjoajia, jotka
                  toimivat henkilötietojen käsittelijöinä:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>
                    <strong>Google LLC</strong> — varaustiedot tallentuvat Google Sheets
                    -taulukkoon
                  </li>
                  <li>
                    <strong>EmailJS</strong> — varausvahvistusten lähettäminen sähköpostitse
                  </li>
                </ul>
                <p className="mt-2">
                  Molemmat ovat yhdysvaltalaisia palveluntarjoajia, joten tietoja
                  siirtyy Euroopan talousalueen ulkopuolelle. Siirto perustuu Euroopan
                  komission Yhdysvaltoja koskevaan riittävyyspäätökseen
                  (EU–Yhdysvallat-tietosuojakehys).
                </p>
                <p className="mt-2">
                  Tietoja voidaan lisäksi luovuttaa viranomaisille, jos laki sitä
                  edellyttää.
                </p>
              </Section>

              <Section title="5. Kuinka kauan tietoja säilytetään">
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>Varaustiedot</strong> säilytetään 12 kuukautta työn
                    toteuttamisesta. Tänä aikana tiedot ovat käytettävissä esimerkiksi
                    takuu- ja reklamaatioasioissa.
                  </li>
                  <li>
                    <strong>Laskutukseen ja kirjanpitoon liittyvät tiedot</strong>{" "}
                    säilytetään kuusi vuotta sen kalenterivuoden lopusta, jonka aikana
                    tilikausi on päättynyt, kuten kirjanpitolaki edellyttää.
                  </li>
                </ul>
                <p className="mt-2">Säilytysajan päätyttyä tiedot poistetaan.</p>
              </Section>

              <Section title="6. Sinun oikeutesi">
                <p>Sinulla on oikeus:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>saada tietää, mitä tietoja sinusta on tallennettu</li>
                  <li>pyytää virheellisen tiedon oikaisemista</li>
                  <li>pyytää tietojesi poistamista, kun laki ei edellytä niiden säilyttämistä</li>
                  <li>pyytää käsittelyn rajoittamista tai vastustaa käsittelyä</li>
                  <li>saada tietosi siirrettyä toiseen järjestelmään</li>
                  <li>
                    tehdä valitus tietosuojavaltuutetun toimistolle, jos katsot tietojasi
                    käsitellyn lainvastaisesti
                  </li>
                </ul>
                <p className="mt-2">
                  Pyynnön voit tehdä lähettämällä sähköpostia osoitteeseen{" "}
                  <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: BLUE }} className="font-medium">
                    {CONTACT_EMAIL}
                  </a>
                  . Vastaamme pyyntöön kuukauden kuluessa.
                </p>
                <p className="mt-2">
                  Tietosuojavaltuutetun toimiston yhteystiedot löytyvät osoitteesta{" "}
                  <a
                    href="https://tietosuoja.fi"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: BLUE }}
                    className="font-medium"
                  >
                    tietosuoja.fi
                  </a>
                  .
                </p>
              </Section>

              <Section title="7. Tietojen suojaaminen">
                <p>
                  Varaustiedot säilytetään salasanalla suojatuissa palveluissa, joihin on
                  pääsy vain rekisterinpitäjällä. Tietoja käsitellään vain työn
                  toteuttamiseksi tarvittavassa laajuudessa. Sivuston liikenne on
                  salattua (HTTPS).
                </p>
              </Section>

              <Section title="8. Evästeet">
                <p>
                  Sivustolla ei käytetä seuranta- tai mainosevästeitä. Kävijämäärien
                  seurannassa käytetään Vercel Analytics -palvelua, joka ei aseta
                  evästeitä eikä kerää yksittäistä kävijää tunnistavia tietoja.
                </p>
              </Section>

              <Section title="9. Muutokset tähän selosteeseen" last>
                <p>
                  Selostetta voidaan päivittää, jos palvelut tai käsittelytavat muuttuvat.
                  Viimeisin päivityspäivä näkyy tämän sivun alussa.
                </p>
              </Section>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Section({
  title,
  children,
  last,
}: {
  title: string;
  children: React.ReactNode;
  last?: boolean;
}) {
  return (
    <section className={last ? "" : "mb-6"}>
      <h3 className="font-bold text-base mb-2" style={{ color: DARK }}>
        {title}
      </h3>
      {children}
    </section>
  );
}
