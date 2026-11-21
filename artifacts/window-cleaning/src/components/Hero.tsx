import { motion } from "framer-motion";
import { ACCENT, ACCENT_DARK, ACCENT_EDGE, ACCENT_TINT, BODY, BORDER, BORDER_STRONG, INK, MUTED, SURFACE_SUNK } from "@/lib/theme";

export function Hero({ onBookClick }: { onBookClick: () => void }) {
  return (
    <div className="relative mb-16 pt-6 sm:pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-center">

        {/* Vasen — teksti */}
        <div className="text-center lg:text-left">

          {/* Yläbadge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6"
            style={{
              background: ACCENT_TINT,
              border: `1px solid ${ACCENT_EDGE}`,
              color: ACCENT_DARK,
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: ACCENT }} />
            Otamme vastaan varauksia — Uusimaa
          </motion.div>

          {/* Otsikko */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight mb-5"
            style={{ color: INK }}
          >
            Puhdasta jälkeä.
            <br />
            <span style={{ color: ACCENT }}>Joka kerta.</span>
          </motion.h1>

          {/* Kuvaus */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            style={{ color: BODY }}
          >
            Kaksi nuorta yrittäjää Uudeltamaalta. Näet hinnan heti
            laskurista ja valitset sopivan ajan — ei yllätyksiä,
            ei piilokuluja.
          </motion.p>

          {/* Napit */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            /* Puhelimella napit vierekkain. Pinottuina ne veivat
               yli 120 px pystysuunnassa ja tyonsivat kuvan pois
               ensinakymasta. */
            className="flex flex-nowrap justify-center lg:justify-start gap-3 mb-7 sm:mb-9"
          >
            <button
              onClick={onBookClick}
              className="px-5 sm:px-7 py-3.5 font-semibold rounded-xl text-[15px] sm:text-base text-white whitespace-nowrap transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: INK }}
            >
              <span className="sm:hidden">Laske hinta →</span>
              <span className="hidden sm:inline">Laske hinta ja varaa →</span>
            </button>
            <a
              href="tel:+358442431103"
              className="inline-flex items-center gap-2 px-5 sm:px-6 py-3.5 font-semibold rounded-xl text-[15px] sm:text-base whitespace-nowrap transition-all duration-200 hover:bg-slate-50 active:scale-[0.98]"
              style={{ border: `1px solid ${BORDER_STRONG}`, color: INK }}
            >
              Soita meille
            </a>
          </motion.div>

          {/* Luottamusrivi */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap justify-center lg:justify-start gap-x-5 sm:gap-x-7 gap-y-2 sm:gap-y-3"
          >
            {[
              "Kotitalousvähennys jopa 40 %",
              "Tyytyväisyystakuu",
              "Välineet mukanamme",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 sm:gap-2 text-[13px] sm:text-sm font-medium"
                style={{ color: BODY }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Oikea — kuva */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative"
        >
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{ aspectRatio: "4 / 5", background: SURFACE_SUNK }}
          >
            <img
              src="/window-thumbs.webp"
              alt="Siisti Pesun tekijä lasta kädessä pestyn ikkunan edessä"
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover"
              style={{ objectPosition: "50% 35%" }}
            />
          </div>

          {/* Kelluva hintakortti */}
          <div
            className="absolute -bottom-5 left-4 sm:left-auto sm:-right-5 rounded-2xl px-5 py-4 bg-white"
            style={{ border: `1px solid ${BORDER}`, boxShadow: "0 8px 24px rgba(15,23,42,0.08)" }}
          >
            <p className="text-xs font-medium mb-0.5" style={{ color: MUTED }}>
              Ikkunat alkaen
            </p>
            <p className="text-2xl font-extrabold" style={{ color: INK }}>
              10 € <span className="text-sm font-medium" style={{ color: MUTED }}>/ ikkuna</span>
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
