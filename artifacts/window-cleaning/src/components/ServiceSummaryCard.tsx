import { type ServiceType } from "@/pages/BookingPage";

interface Props {
  serviceType: ServiceType;
  onProceed?: () => void;
}

const SERVICE_LABELS: Record<ServiceType, string> = {
  ikkunanpesu: "Ikkunanpesu",
  auton_ulkopesu: "Auton ulkopesu",
  muut_palvelut: "Muut palvelut",
};

export function ServiceSummaryCard({ serviceType, onProceed }: Props) {
  const isCarWash = serviceType === "auton_ulkopesu";
  const isMuut = serviceType === "muut_palvelut";

  return (
    <div className="bg-card border border-card-border rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-border bg-primary/5">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="M9 14 4 9l5-5"/>
            <path d="M20 20v-7a4 4 0 0 0-4-4H4"/>
          </svg>
          Yhteenveto
        </h3>
      </div>
      <div className="px-5 py-4 space-y-3">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Palvelu</p>
          <p className="font-semibold text-foreground">{SERVICE_LABELS[serviceType]}</p>
        </div>
        <div className="border-t border-border pt-3">
          <p className="text-xs text-muted-foreground mb-0.5">Hinta</p>
          {isCarWash && (
            <p className="text-2xl font-bold text-foreground tabular-nums">30,00 €</p>
          )}
          {isMuut && (
            <p className="font-semibold text-muted-foreground text-sm leading-snug">
              Hinta sovitaan erikseen
            </p>
          )}
        </div>
        {onProceed && (
          <button
            onClick={onProceed}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 shadow-sm mt-1"
          >
            Jatka varaukseen
          </button>
        )}
      </div>
    </div>
  );
}
