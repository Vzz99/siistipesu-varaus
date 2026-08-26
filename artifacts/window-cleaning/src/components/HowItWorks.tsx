import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const STEPS = [
  {
    title: "Valitse palvelu",
    text: "Ikkunanpesu, auton ulkopesu tai pihatyöt. Valitse se mitä tarvitset.",
  },
  {
    title: "Laske hinta",
    text: "Lisää ikkunat laskuriin ja näet hinnan heti. Ei arvailua, ei piilokuluja.",
  },
  {
    title: "Lisää yhteystiedot",
    text: "Valitse sopiva aika ja täytä tietosi. Saat vahvistuksen sähköpostiin.",
  },
  {
    title: "Me teemme loput",
    text: "Tulemme sovittuna aikana välineiden kanssa. Maksat vasta työn jälkeen.",
  },
];

const BLUE = "#2563eb";
const DARK = "#0f172a";
const GRAY = "#64748b";
const LINE = "#e2e8f0";

export function HowItWorks({ onStartClick }: { onStartClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.75", "end 0.55"],
  });

  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(STEPS.length, Math.floor(v * STEPS.length) + 1);
    setActive(next);
  });

  return (
    <div ref={ref} className="mb-20 sm:mb-24">
      {/* Otsikko */}
      <div className="mb-12 sm:mb-14 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.4 }}
          className="text-xs font-bold uppercase tracking-[0.14em] mb-3"
          style={{ color: BLUE }}
        >
          Näin se toimii
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          style={{ color: DARK }}
        >
          Varaus onnistuu neljässä vaiheessa
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-lg leading-relaxed"
          style={{ color: "#475569" }}
        >
          Koko varaus hoituu verkossa muutamassa minuutissa — ilman
          soittoja, tarjouspyyntöjä tai odottelua.
        </motion.p>
      </div>

      {/* ── Tietokone: vaakarivi ── */}
      <div className="hidden md:block relative">
        {/* Taustaviiva */}
        <div
          className="absolute h-[2px] rounded-full"
          style={{ background: LINE, top: "27px", left: "12.5%", right: "12.5%" }}
        />
        {/* Täyttyvä viiva */}
        <motion.div
          className="absolute h-[2px] rounded-full origin-left"
          style={{ background: BLUE, top: "27px", left: "12.5%", width: fill, maxWidth: "75%" }}
        />

        <div className="relative grid grid-cols-4 gap-6">
          {STEPS.map((step, i) => {
            const isOn = active > i;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="text-center px-2"
              >
                <div className="flex justify-center mb-6">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-lg font-extrabold transition-all duration-500"
                    style={{
                      background: isOn ? BLUE : "#ffffff",
                      color: isOn ? "#ffffff" : GRAY,
                      border: `2px solid ${isOn ? BLUE : LINE}`,
                      boxShadow: isOn ? "0 6px 18px rgba(37,99,235,0.25)" : "none",
                      transform: isOn ? "scale(1.06)" : "scale(1)",
                    }}
                  >
                    {i + 1}
                  </div>
                </div>
                <h3
                  className="font-bold text-lg mb-2 transition-colors duration-500"
                  style={{ color: isOn ? DARK : "#94a3b8" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: GRAY }}>
                  {step.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ── Mobiili: pystyrivi ── */}
      <div className="md:hidden relative pl-2">
        <div
          className="absolute w-[2px] rounded-full"
          style={{ background: LINE, left: "25px", top: "24px", bottom: "24px" }}
        />
        <motion.div
          className="absolute w-[2px] rounded-full"
          style={{ background: BLUE, left: "25px", top: "24px", height: fill, maxHeight: "calc(100% - 48px)" }}
        />

        <div className="relative flex flex-col gap-7">
          {STEPS.map((step, i) => {
            const isOn = active > i;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: 14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex items-start gap-4"
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-base font-extrabold flex-shrink-0 transition-all duration-500"
                  style={{
                    background: isOn ? BLUE : "#ffffff",
                    color: isOn ? "#ffffff" : GRAY,
                    border: `2px solid ${isOn ? BLUE : LINE}`,
                    boxShadow: isOn ? "0 4px 14px rgba(37,99,235,0.22)" : "none",
                  }}
                >
                  {i + 1}
                </div>
                <div className="pt-1">
                  <h3
                    className="font-bold text-base mb-1 transition-colors duration-500"
                    style={{ color: isOn ? DARK : "#94a3b8" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: GRAY }}>
                    {step.text}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Nappi */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.5 }}
        className="mt-12 sm:mt-14 flex justify-center"
      >
        <button
          onClick={onStartClick}
          className="px-7 py-3.5 font-semibold rounded-xl text-base text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          style={{ background: DARK }}
        >
          Aloita varaus →
        </button>
      </motion.div>
    </div>
  );
}
