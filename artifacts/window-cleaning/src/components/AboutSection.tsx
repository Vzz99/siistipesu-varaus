import { motion } from "framer-motion";

const BLUE = "#2563eb";
const DARK = "#0f172a";
const GRAY = "#64748b";
const BORDER = "#e2e8f0";

const STATS = [
  { value: "2026", label: "Perustettu" },
  { value: "4H", label: "Yritysmuoto" },
  { value: "Uusimaa", label: "Palvelualue" },
];

export function AboutSection() {
  return (
    <div className="mb-20 sm:mb-24">
      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-14 items-center">

        {/* Kuva */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="order-1"
        >
          <div
            className="rounded-3xl overflow-hidden"
            style={{ aspectRatio: "4 / 5", background: "#f1f5f9" }}
          >
            <img
              src="/team.jpg"
              alt="Valtteri Jutila ja Lauri Huopainen"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center 20%" }}
            />
          </div>
        </motion.div>

        {/* Teksti */}
        <div className="order-2">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.4 }}
            className="text-xs font-bold uppercase tracking-[0.14em] mb-3"
            style={{ color: BLUE }}
          >
            Meistä
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2"
            style={{ color: DARK }}
          >
            Valtteri &amp; Lauri
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-base font-semibold mb-5"
            style={{ color: BLUE }}
          >
            Nuoret yrittäjät Uudeltamaalta
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="text-base leading-relaxed mb-8"
            style={{ color: "#475569" }}
          >
            Perustimme Siisti Pesun vuonna 2026, koska kesätöitä oli vaikea löytää
            ja yrittäjyys on aina kiehtonut meitä molempia. Teemme ikkunanpesua,
            auton ulkopesua, pihatöitä ja lumitöitä Uudellamaalla. Vaikka olemme
            nuoria, hoidamme jokaisen työn huolellisesti ja ajallaan — siitä ei
            tingitä.
          </motion.p>

          {/* Statsit */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="grid grid-cols-3 gap-4 mb-8 py-6"
            style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div className="text-xl sm:text-2xl font-extrabold mb-0.5" style={{ color: DARK }}>
                  {s.value}
                </div>
                <div className="text-xs font-medium" style={{ color: GRAY }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Yhteystiedot */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="tel:+358442431103"
              className="px-6 py-3 font-semibold rounded-xl text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              style={{ background: DARK }}
            >
              044 243 1103
            </a>
            <a
              href="mailto:siisti.pesu@gmail.com"
              className="px-6 py-3 font-semibold rounded-xl text-sm transition-all duration-200 hover:bg-slate-50 active:scale-[0.98]"
              style={{ border: `1px solid #cbd5e1`, color: DARK }}
            >
              siisti.pesu@gmail.com
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
