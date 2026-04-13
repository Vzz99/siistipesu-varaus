import { motion } from "framer-motion";
import { type ServiceType } from "@/pages/BookingPage";

interface ServiceOption {
  id: ServiceType;
  title: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  image: string;
  color: string;
}

const services: ServiceOption[] = [
  {
    id: "ikkunanpesu",
    title: "Ikkunanpesu",
    subtitle: "Kaikki ikkunatyypit, ammattilaistulos",
    price: "Hinta ikkunatyypin mukaan",
    image: "/window-thumbs.jpg",
    color: "text-primary",
  },
  {
    id: "auton_ulkopesu",
    title: "Auton ulkopesu",
    subtitle: "Pesu ulkoa, kiinteä hinta",
    price: "30 €",
    priceNote: "kiinteä hinta",
    image: "/car-dirty.jpg",
    color: "text-emerald-600",
  },
  {
    id: "muut_palvelut",
    title: "Muut palvelut",
    subtitle: "Nurmikon leikkuu, siivous yms.",
    price: "Hinta sovitaan erikseen",
    image: "/mowing.jpg",
    color: "text-violet-600",
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
            className="w-full text-left bg-card border border-card-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-md active:scale-[0.99] transition-all duration-200 group"
          >
            <div className="flex items-center gap-4 p-4">
              {/* Kuva */}
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Tekstit */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-foreground text-lg leading-tight">{service.title}</p>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/50 group-hover:text-primary transition-colors duration-200 flex-shrink-0 mt-1">
                    <path d="m9 18 6-6-6-6"/>
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{service.subtitle}</p>
                <p className={`text-sm font-medium mt-1.5 ${service.priceNote ? "text-foreground" : "text-muted-foreground"}`}>
                  {service.price}
                  {service.priceNote && (
                    <span className="text-xs text-muted-foreground font-normal ml-1">({service.priceNote})</span>
                  )}
                </p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
