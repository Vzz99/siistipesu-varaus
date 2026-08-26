import { motion } from "framer-motion";
import { type ServiceType } from "@/pages/BookingPage";

const BLUE = "#2563eb";
const DARK = "#0f172a";
const GRAY = "#64748b";
const BORDER = "#e2e8f0";

interface ServiceOption {
  id: ServiceType;
  title: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  image: string;
  badge?: string;
}

const services: ServiceOption[] = [
  {
    id: "lumityot",
    title: "Lumityöt",
    subtitle: "Pihojen auraus koneella ja käsin",
    price: "alkaen 15 €",
    priceNote: "hinta pihan koon mukaan",
    image: "/IMG_5565.jpeg",
    badge: "Nyt ajankohtainen",
  },
  {
    id: "ikkunanpesu",
    title: "Ikkunanpesu",
    subtitle: "Kaikki ikkunatyypit, ammattilaistulos",
    price: "Laske hinta laskurista",
    image: "/window-thumbs.jpg",
  },
  {
    id: "auton_ulkopesu",
    title: "Auton ulkopesu",
    subtitle: "Käsinpesu ulkoa, kiinteä hinta",
    price: "30 €",
    priceNote: "kiinteä hinta",
    image: "/car-wash.jpg",
  },
  {
    id: "muut_palvelut",
    title: "Muut palvelut",
    subtitle: "Nurmikon leikkuu, pihatyöt yms.",
    price: "Hinta sovitaan erikseen",
    image: "/mowing.jpg",
  },
];

interface Props {
  onSelect: (service: ServiceType) => void;
}

export function ServiceSelector({ onSelect }: Props) {
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
          Varaus
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4"
          style={{ color: DARK }}
        >
          Valitse palvelu
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-base sm:text-lg leading-relaxed"
          style={{ color: "#475569" }}
        >
          Mitä haluaisit tilata? Valitse alta, niin päästään eteenpäin.
        </motion.p>
      </div>

      {/* Palvelut */}
      <div className="flex flex-col gap-3.5 max-w-3xl">
        {services.map((service, i) => (
          <motion.button
            key={service.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.42, delay: i * 0.06 }}
            whileHover={{ y: -4 }}
            onClick={() => onSelect(service.id)}
            className="group w-full text-left rounded-2xl bg-white transition-shadow duration-300 hover:shadow-[0_12px_32px_rgba(15,23,42,0.09)]"
            style={{ border: `1px solid ${BORDER}` }}
          >
            <div className="flex items-center gap-4 sm:gap-5 p-4 sm:p-5">
              {/* Kuva */}
              <div
                className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl overflow-hidden flex-shrink-0"
                style={{ background: "#f1f5f9" }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Teksti */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="font-bold text-lg leading-tight" style={{ color: DARK }}>
                    {service.title}
                  </span>
                  {service.badge && (
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded-full"
                      style={{ background: "#eff6ff", color: BLUE }}
                    >
                      {service.badge}
                    </span>
                  )}
                </div>
                <p className="text-sm mb-1.5 leading-snug" style={{ color: GRAY }}>
                  {service.subtitle}
                </p>
                <p className="text-sm font-semibold" style={{ color: DARK }}>
                  {service.price}
                  {service.priceNote && (
                    <span className="font-normal ml-1.5" style={{ color: GRAY }}>
                      ({service.priceNote})
                    </span>
                  )}
                </p>
              </div>

              {/* Nuoli */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-slate-900"
                style={{ border: `1px solid ${BORDER}` }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-colors duration-300 group-hover:text-white"
                  style={{ color: GRAY }}
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
