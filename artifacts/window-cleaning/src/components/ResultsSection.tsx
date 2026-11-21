import { motion } from "framer-motion";
import { WorkVideo } from "@/components/WorkVideo";
import { ACCENT, BODY, BORDER, INK, MUTED, SURFACE_SUNK } from "@/lib/theme";

/* Videot omista töistä. Lisää uusi laittamalla tiedostot
   public-kansioon ja rivi tähän — asettelu venyy itse. */
const VIDEOS = [
  { src: "/hero.mp4", poster: "/hero-poster.webp", alt: "Siisti Pesu pesee ikkunaa" },
  { src: "/car.mp4", poster: "/car-poster.webp", alt: "Auton sisäpesun jälki" },
];

const PAIRS = [
  {
    label: "Ikkunanpesu",
    before: { src: "/before-window.webp", alt: "Ikkuna ennen pesua" },
    after: { src: "/after-window.webp", alt: "Ikkuna pesun jälkeen" },
  },
  {
    label: "Karmit ja kiskot",
    before: { src: "/window-track-1.webp", alt: "Kisko ennen pesua" },
    after: { src: "/window-track-2.webp", alt: "Kisko pesun jälkeen" },
  },
  {
    label: "Auton ulkopesu",
    before: { src: "/car-dirty.webp", alt: "Auto ennen pesua" },
    after: { src: "/car-clean.webp", alt: "Auto pesun jälkeen" },
  },
];

export function ResultsSection() {
  return (
    <div className="mb-20 sm:mb-24">
      {/* Otsikko */}
      <div className="mb-8 sm:mb-10 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-bold uppercase tracking-[0.14em] mb-3"
          style={{ color: ACCENT }}
        >
          Tulokset
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          style={{ color: INK }}
        >
          Ero näkyy heti
        </motion.h2>
      </div>

      {/* Videot omista töistä */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="flex justify-center gap-4 sm:gap-5 mb-10 sm:mb-12"
      >
        {VIDEOS.map((v) => (
          <WorkVideo
            key={v.src}
            src={v.src}
            poster={v.poster}
            alt={v.alt}
            className="w-full max-w-[240px] sm:max-w-[280px]"
          />
        ))}
      </motion.div>

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
              <div className="relative rounded-xl overflow-hidden aspect-square" style={{ background: SURFACE_SUNK }}>
                <img src={pair.before.src} alt={pair.before.alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                <span
                  className="absolute top-2 left-2 text-[11px] font-bold px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.92)", color: MUTED }}
                >
                  Ennen
                </span>
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-square" style={{ background: SURFACE_SUNK }}>
                <img src={pair.after.src} alt={pair.after.alt} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                <span
                  className="absolute top-2 left-2 text-[11px] font-bold px-2 py-0.5 rounded-full text-white"
                  style={{ background: ACCENT }}
                >
                  Jälkeen
                </span>
              </div>
            </div>
            <p className="text-sm font-bold px-1" style={{ color: INK }}>
              {pair.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
