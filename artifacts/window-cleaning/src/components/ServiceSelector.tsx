import { motion } from "framer-motion";
import { type ServiceType } from "@/pages/BookingPage";

interface ServiceOption {
  id: ServiceType;
  title: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
}

const services: ServiceOption[] = [
  {
    id: "ikkunanpesu",
    title: "Ikkunanpesu",
    subtitle: "Kaikki ikkunatyypit, ammattilaistulos",
    price: "Hinta ikkunatyypin mukaan",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="18" rx="2"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <line x1="12" y1="3" x2="12" y2="21"/>
      </svg>
    ),
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    id: "auton_ulkopesu",
    title: "Auton ulkopesu",
    subtitle: "Pesu ulkoa, kiinteä hinta",
    price: "25 €",
    priceNote: "kiinteä hinta",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1"/>
        <path d="M17 17h2a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-1"/>
        <path d="M5 9V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2"/>
        <rect x="5" y="9" width="14" height="8" rx="2"/>
        <circle cx="7.5" cy="17" r="2"/>
        <circle cx="16.5" cy="17" r="2"/>
      </svg>
    ),
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    id: "muut_palvelut",
    title: "Muut palvelut",
    subtitle: "Nurmikon leikkuu, siivous yms.",
    price: "Hinta sovitaan erikseen",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
      </svg>
    ),
    color: "text-violet-600",
    bgColor: "bg-violet-50",
  },
];

interface Props {
  onSelect: (service: ServiceType) => void;
}

export function ServiceSelector({ onSelect }: Props) {
  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className="mb-10"
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Valitse palvelu</h1>
        <p className="text-muted-foreground text-base">Mitä haluaisit tilata? Valitse alla olevista palveluista.</p>
      </motion.div>

      <div className="space-y-3">
        {services.map((service, i) => (
          <motion.button
            key={service.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, delay: i * 0.07 }}
            onClick={() => onSelect(service.id)}
            className="w-full text-left bg-card border border-card-border rounded-2xl p-5 hover:border-primary/40 hover:shadow-md active:scale-[0.99] transition-all duration-200 group flex items-center gap-5"
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${service.bgColor} ${service.color} transition-transform duration-200 group-hover:scale-105`}>
              {service.icon}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground text-lg leading-tight">{service.title}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{service.subtitle}</p>
            </div>

            <div className="flex-shrink-0 text-right">
              <p className={`font-semibold text-sm ${service.priceNote ? "text-foreground" : "text-muted-foreground"}`}>
                {service.price}
              </p>
              {service.priceNote && (
                <p className="text-xs text-muted-foreground mt-0.5">{service.priceNote}</p>
              )}
            </div>

            <div className="flex-shrink-0 ml-1">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/50 group-hover:text-primary transition-colors duration-200">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
