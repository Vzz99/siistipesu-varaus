import { motion } from "framer-motion";

export function Hero({ onBookClick }: { onBookClick: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-3xl mb-8" style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0f2040 40%, #0a1628 100%)" }}>
      {/* Hienovarainen taustakuvio */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(ellipse at 15% 60%, rgba(56,189,248,0.12) 0%, transparent 55%), radial-gradient(ellipse at 85% 15%, rgba(99,102,241,0.1) 0%, transparent 50%)",
        }} />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      <div className="relative px-7 sm:px-14 py-14 sm:py-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">

          {/* Vasen osio */}
          <div className="flex-1 text-center lg:text-left">

            {/* Logo + badge rivi */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-8">
              <div className="relative flex-shrink-0">
                <div className="absolute -inset-1 rounded-full opacity-30" style={{ background: "radial-gradient(circle, #38bdf8, transparent)" }} />
                <img
                  src="/sp-logo.png"
                  alt="Siisti Pesu"
                  className="relative w-16 h-16 rounded-full object-cover"
                  style={{ border: "2px solid rgba(56,189,248,0.4)" }}
                />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-white font-bold text-lg leading-tight">Siisti Pesu</p>
                <div className="inline-flex items-center gap-1.5 mt-1 px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ background: "rgba(56,189,248,0.12)", border: "1px solid rgba(56,189,248,0.25)", color: "#7dd3fc" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse inline-block" />
                  Avoinna varauksia
                </div>
              </div>
            </div>

            {/* Otsikko */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight text-white mb-5"
            >
              Puhtaat pinnat —{" "}
              <span style={{ color: "#38bdf8" }}>ammattimaisesti.</span>
            </motion.h1>

            {/* Kuvaus */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base sm:text-lg leading-relaxed mb-7 max-w-xl mx-auto lg:mx-0"
              style={{ color: "#94a3b8" }}
            >
              Olemme kaksi nuorta yrittäjää Uudeltamaalta. Teemme ikkunanpesua,
              auton ulkopesua ja pihatöitä — huolellisesti, täsmällisesti ja
              laadukkaasti. Asiakkaamme voivat luottaa laadukkaaseen lopputulokseen.
            </motion.p>

            {/* Palvelutägit */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center lg:justify-start gap-2 mb-8"
            >
              {[
                { icon: "🪟", label: "Ikkunanpesu" },
                { icon: "🚗", label: "Auton ulkopesu" },
                { icon: "🌿", label: "Pihatyöt" },
                { icon: "📍", label: "Uusimaa" },
              ].map((tag) => (
                <span key={tag.label}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", color: "#cbd5e1" }}>
                  <span>{tag.icon}</span>
                  {tag.label}
                </span>
              ))}
            </motion.div>

            {/* CTA-napit */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="flex flex-wrap justify-center lg:justify-start gap-3"
            >
              <button
                onClick={onBookClick}
                className="px-7 py-3.5 font-bold rounded-xl text-base transition-all duration-200 hover:scale-[1.02] active:scale-95"
                style={{ background: "#38bdf8", color: "#0a0f1e" }}
              >
                Varaa aika nyt →
              </button>
              <a href="tel:+358442431103"
                className="inline-flex items-center gap-2 px-6 py-3.5 font-semibold rounded-xl text-base transition-all duration-200 hover:bg-white/10 active:scale-95"
                style={{ border: "1px solid rgba(255,255,255,0.18)", color: "white" }}>
                📞 Soita meille
              </a>
            </motion.div>
          </div>

          {/* Oikea osio — statsikortit */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex lg:flex-col gap-3 flex-wrap justify-center"
          >
            {[
              { number: "100%", label: "Tyytyväisyystakuu", icon: "⭐" },
              { number: "4H", label: "Yritys", icon: "🏢" },
              { number: "2026", label: "Perustettu", icon: "📅" },
              { number: "0 €", label: "Ylimääräisiä kuluja", icon: "✅" },
            ].map((stat) => (
              <div key={stat.label}
                className="rounded-2xl px-6 py-4 text-center min-w-[110px]"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                }}>
                <div className="text-lg mb-1">{stat.icon}</div>
                <div className="text-2xl font-extrabold" style={{ color: "#38bdf8" }}>{stat.number}</div>
                <div className="text-xs mt-0.5 leading-tight" style={{ color: "#64748b" }}>{stat.label}</div>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
}
