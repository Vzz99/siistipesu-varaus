import { motion } from "framer-motion";

const BLUE = "#2563eb";
const DARK = "#0f172a";
const GRAY = "#64748b";
const BORDER = "#e2e8f0";

const SERVICES = [
  {
    image: "/IMG_5565.jpeg",
    title: "Lumityöt",
    badge: "Nyt ajankohtainen",
    description: "Pihojen auraus koneella ja tarkka viimeistely käsin.",
    price: "alkaen 15 €",
    priceUnit: "/ kerta",
    includes: [
      "Auraus koneella, viimeistely käsin",
      "Aurataan kun lunta on satanut yli 5 cm",
      "Toimialue 5 km säteellä Kauniaisista",
    ],
    note: "Kausikortti 39 € — sisältää ensimmäisen aurauksen ja −20 % kaikista seuraavista.",
  },
  {
    image: "/window-thumbs.jpg",
    title: "Ikkunanpesu",
    badge: null,
    description: "Sisä- ja ulkopinnat kiiltäviksi — ei jälkiä, ei tahroja.",
    price: "alkaen 10 €",
    priceUnit: "/ ikkuna",
    includes: [
      "Kaikki pinnat, karmit ja ikkunoiden välit",
      "Kaikki välineet mukanamme",
      "Matkakulut 25 €, minimiveloitus 40 €",
    ],
    note: null,
  },
  {
    image: "/car-wash.jpg",
    title: "Auton ulkopesu",
    badge: null,
    description: "Laadukas käsinpesu. Auto kiiltää kuin uusi.",
    price: "30 €",
    priceUnit: "kiinteä hinta",
    includes: [
      "Kori, pyörät, vanteet ja lasit",
      "Kaikki välineet mukanamme",
      "Tarvitsemme pääsyn vesipisteeseen",
    ],
    note: null,
  },
  {
    image: "/mowing.jpg",
    title: "Pihatyöt & muut",
    badge: null,
    description: "Nurmikon leikkuu, pihatyöt ja muut kotitalouspalvelut.",
    price: "Sovitaan",
    priceUnit: "erikseen",
    includes: [
      "Nurmikon leikkuu ja pihan siistiminen",
      "Muut kodin ulkotyöt",
      "Hinta työmäärän ja haastavuuden mukaan",
    ],
    note: null,
  },
];

export function PriceList() {
  return (
    <div className="mb-20 sm:mb-24">
      {/* Otsikko */}
      <div className="mb-10 sm:mb-12 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-bold uppercase tracking-[0.14em] mb-3"
          style={{ color: BLUE }}
        >
          Palvelut
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          style={{ color: DARK }}
        >
          Selkeät hinnat, ei yllätyksiä
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-lg leading-relaxed"
          style={{ color: "#475569" }}
        >
          Näet tarkan hinnan laskurista ennen varausta. Tiedät aina mitä maksat.
        </motion.p>
      </div>

      {/* Kortit */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {SERVICES.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: (i % 2) * 0.07 }}
            className="rounded-2xl p-6 flex flex-col bg-white"
            style={{ border: `1px solid ${BORDER}` }}
          >
            {/* Ylärivi */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0" style={{ background: "#f1f5f9" }}>
                <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h3 className="font-bold text-lg leading-tight" style={{ color: DARK }}>
                    {service.title}
                  </h3>
                  {service.badge && (
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "#eff6ff", color: BLUE }}
                    >
                      {service.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm leading-snug" style={{ color: GRAY }}>
                  {service.description}
                </p>
              </div>
            </div>

            {/* Sisältyy */}
            <ul className="space-y-2 mb-5">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm" style={{ color: "#334155" }}>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={BLUE}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="flex-shrink-0 mt-0.5"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            {/* Lisähuomio */}
            {service.note && (
              <div
                className="text-xs leading-relaxed px-3.5 py-3 rounded-xl mb-5"
                style={{ background: "#eff6ff", color: "#1e40af" }}
              >
                {service.note}
              </div>
            )}

            {/* Hinta alareunassa */}
            <div
              className="mt-auto pt-4 flex items-baseline gap-1.5"
              style={{ borderTop: `1px solid ${BORDER}` }}
            >
              <span className="text-2xl font-extrabold" style={{ color: DARK }}>
                {service.price}
              </span>
              <span className="text-sm font-medium" style={{ color: GRAY }}>
                {service.priceUnit}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Kotitalousvähennys */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.45 }}
        className="mt-5 flex items-center gap-4 px-6 py-5 rounded-2xl"
        style={{ background: "#f8fafc", border: `1px solid ${BORDER}` }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ background: "#ffffff", border: `1px solid ${BORDER}` }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-sm mb-0.5" style={{ color: DARK }}>
            Kotitalousvähennyskelpoinen yritys
          </p>
          <p className="text-sm leading-relaxed" style={{ color: GRAY }}>
            Saat työn osuudesta jopa 35 % takaisin verotuksessa. Annamme tarvittavan kuitin.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
