import { motion } from "framer-motion";

const BLUE = "#2563eb";
const DARK = "#0f172a";
const GRAY = "#64748b";
const BORDER = "#e2e8f0";

const VALUES = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: "Innokkuus",
    description: "Teemme jokaisen työn täydellä innolla — oli kyse yhdestä ikkunasta tai koko talosta.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Luotettavuus",
    description: "Tulemme sovittuna aikana ja teemme mitä lupaamme. Sanomme mitä teemme, ja teemme mitä sanomme.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    title: "Laatu",
    description: "Emme tyydy hyvään. Käymme jokaisen kohdan läpi huolellisesti emmekä jätä mitään kesken.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Ammattimaisuus",
    description: "Vaikka olemme nuoria, suhtaudumme työhön kuin ammattilaiset — siistit varusteet ja täsmällinen viestintä.",
  },
];

export function ValuesSection() {
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
          Arvomme
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          style={{ color: DARK }}
        >
          Mihin voit meillä luottaa
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-lg leading-relaxed"
          style={{ color: "#475569" }}
        >
          Nämä neljä asiaa ohjaavat kaikkea mitä teemme, jokaisessa työssä.
        </motion.p>
      </div>

      {/* Kortit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: i * 0.07 }}
            whileHover={{ y: -6 }}
            className="rounded-2xl p-6 bg-white transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(15,23,42,0.09)]"
            style={{ border: `1px solid ${BORDER}` }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
              style={{ background: "#eff6ff", color: BLUE }}
            >
              {v.icon}
            </div>
            <h3 className="font-bold text-base mb-2" style={{ color: DARK }}>
              {v.title}
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: GRAY }}>
              {v.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
