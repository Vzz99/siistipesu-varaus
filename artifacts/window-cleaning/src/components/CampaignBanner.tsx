import { motion } from "framer-motion";
import { CAMPAIGN, isCampaignActive } from "@/data/windows";

const BLUE = "#2563eb";

export function CampaignBanner({ onClick }: { onClick?: () => void }) {
  if (!isCampaignActive()) return null;

  return (
    <motion.button
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="w-full rounded-2xl px-5 py-4 mb-6 sm:mb-8 flex items-center justify-center gap-3 flex-wrap text-center transition-opacity duration-200 hover:opacity-95"
      style={{ background: BLUE }}
    >
      <span
        className="text-[11px] font-bold uppercase tracking-[0.12em] px-2.5 py-1 rounded-full"
        style={{ background: "rgba(255,255,255,0.18)", color: "#ffffff" }}
      >
        {CAMPAIGN.label}
      </span>
      <span className="text-white font-bold text-base sm:text-lg">
        {CAMPAIGN.headline}
      </span>
      <span className="text-sm" style={{ color: "rgba(255,255,255,0.85)" }}>
        {CAMPAIGN.description}
      </span>
    </motion.button>
  );
}
