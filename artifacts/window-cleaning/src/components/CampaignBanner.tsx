import { motion } from "framer-motion";
import { CAMPAIGN, isCampaignActive, campaignDaysLeft } from "@/data/windows";

const BLUE = "#2563eb";
const DARK = "#0f172a";

export function CampaignBanner({ onClick }: { onClick?: () => void }) {
  if (!isCampaignActive()) return null;

  const daysLeft = campaignDaysLeft();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-2xl px-6 sm:px-8 py-5 sm:py-6 mb-8 sm:mb-10"
      style={{ background: DARK }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">

        {/* Vasen — teksti */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5 mb-2 flex-wrap">
            <span
              className="text-[11px] font-bold uppercase tracking-[0.14em] px-2.5 py-1 rounded-full"
              style={{ background: BLUE, color: "#ffffff" }}
            >
              {CAMPAIGN.label}
            </span>
            {daysLeft <= 30 && (
              <span
                className="text-xs font-semibold"
                style={{ color: "#94a3b8" }}
              >
                {daysLeft} päivää jäljellä
              </span>
            )}
          </div>

          <p className="text-white font-extrabold text-xl sm:text-2xl tracking-tight leading-tight mb-1">
            {CAMPAIGN.headline}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>
            {CAMPAIGN.description} Alennus lasketaan automaattisesti hinta-arvioon.
          </p>
        </div>

        {/* Oikea — nappi */}
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
