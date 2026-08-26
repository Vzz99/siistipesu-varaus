import { motion } from "framer-motion";

const BLUE = "#2563eb";
const DARK = "#0f172a";
const GRAY = "#64748b";
const BORDER = "#e2e8f0";

const PAIRS = [
  {
    label: "Ikkunanpesu",
    before: { src: "/before-window.jpg", alt: "Ikkuna ennen pesua" },
    after: { src: "/after-window.jpg", alt: "Ikkuna pesun jälkeen" },
  },
  {
    label: "Karmit ja kiskot",
    before: { src: "/window-track-1.jpg", alt: "Kisko ennen pesua" },
    after: { src: "/window-track-2.jpg", alt: "Kisko pesun jälkeen" },
  },
  {
    label: "Auton ulkopesu",
    before: { src: "/car-dirty.jpg", alt: "Auto ennen pesua" },
    after: { src: "/car-clean.jpg", alt: "Auto pesun jälkeen" },
  },
];

export function ResultsSection() {
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
          Tulokset
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          style={{ color: DARK }}
        >
          Ero näkyy heti
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-lg leading-relaxed"
          style={{ color: "#475569" }}
        >
          Kuvat ovat omista töistämme — ei kuvapankista.
        </motion.p>
      </div>

      {/* Ennen / jälkeen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {PAIRS.map((pair, i) => (
          <motion.div
            key={pair.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            whileHover={{ y: -6 }}
            className="rounded-2xl p-4 bg-white transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(15,23,42,0.09)]"
            style={{ border: `1px solid ${BORDER}` }}
          >
            <div className="grid grid-cols-2 gap-2.5 mb-3.5">
              <div className="relative rounded-xl overflow-hidden aspect-square" style={{ background: "#f1f5f9" }}>
                <img src={pair.before.src} alt={pair.before.alt} className="w-full h-full object-cover" />
                <span
                  className="absolute top-2 left-2 text-[11px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.92)", color: GRAY }}
                >
                  Ennen
                </span>
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-square" style={{ background: "#f1f5f9" }}>
                <img src={pair.after.src} alt={pair.after.alt} className="w-full h-full object-cover" />
                <span
                  className="absolute top-2 left-2 text-[11px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ background: BLUE }}
                >
                  Jälkeen
                </span>
              </div>
            </div>
            <p className="text-sm font-bold px-1" style={{ color: DARK }}>
              {pair.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
