import { motion } from "framer-motion";

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
              background: "#eff6ff",
              border: "1px solid #bfdbfe",
              color: "#1d4ed8",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: "#2563eb" }} />
            Otamme vastaan varauksia — Uusimaa
          </motion.div>

          {/* Otsikko */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.08] tracking-tight mb-5"
            style={{ color: "#0f172a" }}
          >
            Kirkkaat ikkunat.
            <br />
            <span style={{ color: "#2563eb" }}>Selkeä hinta.</span>
          </motion.h1>

          {/* Kuvaus */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0"
            style={{ color: "#475569" }}
          >
            Olemme kaksi nuorta yrittäjää Uudeltamaalta. Näet hinnan heti
            laskurista, valitset sopivan ajan — ja me hoidamme loput.
            Ei yllätyksiä, ei piilokuluja.
          </motion.p>

          {/* Napit */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="flex flex-wrap justify-center lg:justify-start gap-3 mb-9"
          >
            <button
              onClick={onBookClick}
              className="px-7 py-3.5 font-semibold rounded-xl text-base text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#0f172a" }}
            >
              Laske hinta ja varaa →
            </button>
            <a
              href="tel:+358442431103"
              className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold rounded-xl text-base transition-all duration-200 hover:bg-slate-50 active:scale-[0.98]"
              style={{ border: "1px solid #cbd5e1", color: "#0f172a" }}
            >
              Soita meille
            </a>
          </motion.div>

          {/* Luottamusrivi */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex flex-wrap justify-center lg:justify-start gap-x-7 gap-y-3"
          >
            {[
              "Kotitalousvähennys −35 %",
              "Tyytyväisyystakuu",
              "Välineet mukanamme",
            ].map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-2 text-sm font-medium"
                style={{ color: "#334155" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
            style={{ aspectRatio: "4 / 5", background: "#f1f5f9" }}
          >
            <img
              src="/IMG_8822.jpeg"
              alt="Siisti Pesu — ikkunanpesua"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Kelluva hintakortti */}
          <div
            className="absolute -bottom-5 left-4 sm:left-auto sm:-right-5 rounded-2xl px-5 py-4 bg-white"
            style={{ border: "1px solid #e2e8f0", boxShadow: "0 8px 24px rgba(15,23,42,0.08)" }}
          >
            <p className="text-xs font-medium mb-0.5" style={{ color: "#64748b" }}>
              Ikkunat alkaen
            </p>
            <p className="text-2xl font-extrabold" style={{ color: "#0f172a" }}>
              10 € <span className="text-sm font-medium" style={{ color: "#64748b" }}>/ ikkuna</span>
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
