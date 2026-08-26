import { motion } from "framer-motion";
import { CAMPAIGN, isCampaignActive, campaignDaysLeft } from "@/data/windows";

const AMBER = "#f59e0b";
const DARK = "#0f172a";

export function CampaignBanner({ onClick }: { onClick?: () => void }) {
  if (!isCampaignActive()) return null;

  const daysLeft = campaignDaysLeft();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="relative rounded-2xl px-6 sm:px-8 py-5 sm:py-6 mb-8 sm:mb-10 overflow-hidden"
      style={{
        background: "linear-gradient(120deg, #0b1220 0%, #172033 45%, #0f172a 100%)",
      }}
    >
      {/* Hienovarainen lämmin hehku oikeaan reunaan */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 88% 30%, rgba(245,158,11,0.16) 0%, transparent 55%)",
        }}
      />

      <div className="relative flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
        {/* Teksti */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-2 flex-wrap">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
              style={{ background: AMBER, color: "#3d2c05" }}
            >
              {CAMPAIGN.label}
            </span>
            {daysLeft <= 30 && (
              <span className="text-xs font-semibold" style={{ color: AMBER }}>
                {daysLeft} päivää jäljellä
              </span>
            )}
          </div>

          <p className="text-white font-extrabold text-xl sm:text-2xl tracking-tight leading-tight mb-1">
            {CAMPAIGN.headline}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
            Kausi päättyy 31.10. — varaa ikkunanpesu ennen pakkasia. Alennus
            lasketaan automaattisesti hinta-arvioon.
          </p>
        </div>

        {/* Nappi */}
        {onClick && (
          <button
            onClick={onClick}
            className="flex-shrink-0 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.98] self-start sm:self-auto"
            style={{ background: "#ffffff", color: DARK }}
          >
            Laske hinta →
          </button>
        )}
      </div>
    </motion.div>
  );
}
