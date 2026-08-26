import { type ServiceType } from "@/pages/BookingPage";

const BLUE = "#2563eb";
const DARK = "#0f172a";
const GRAY = "#64748b";
const BORDER = "#e2e8f0";

const SERVICE_LABELS: Record<ServiceType, string> = {
  ikkunanpesu: "Ikkunanpesu",
  auton_ulkopesu: "Auton ulkopesu",
  muut_palvelut: "Muut palvelut",
  lumityot: "Lumityöt",
};

interface Props {
  serviceType: ServiceType;
  onProceed?: () => void;
}

export function ServiceSummaryCard({ serviceType, onProceed }: Props) {
  const isCarWash = serviceType === "auton_ulkopesu";
  const isSnow = serviceType === "lumityot";
  const isMuut = serviceType === "muut_palvelut";

  return (
    <div className="rounded-2xl bg-white overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
      <div className="px-5 py-4" style={{ borderBottom: `1px solid ${BORDER}` }}>
        <h3 className="font-bold text-sm" style={{ color: DARK }}>
          Yhteenveto
        </h3>
      </div>

      <div className="px-5 py-5 space-y-4">
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: GRAY }}>
            Palvelu
          </p>
          <p className="font-bold text-base" style={{ color: DARK }}>
            {SERVICE_LABELS[serviceType]}
          </p>
        </div>

        <div className="pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
          <p className="text-xs font-medium mb-1" style={{ color: GRAY }}>
            Hinta
          </p>

          {isCarWash && (
            <p className="text-2xl font-extrabold tabular-nums" style={{ color: DARK }}>
              30,00 €
            </p>
          )}

          {isSnow && (
            <>
              <p className="text-2xl font-extrabold tabular-nums" style={{ color: DARK }}>
                alkaen 15 €
              </p>
              <p className="text-xs leading-relaxed mt-1.5" style={{ color: GRAY }}>
                Lopullinen hinta sovitaan pihan koon mukaan.
              </p>
            </>
          )}

          {isMuut && (
            <p className="font-semibold text-sm leading-snug" style={{ color: GRAY }}>
              Hinta sovitaan erikseen
            </p>
          )}
        </div>

        {isSnow && (
          <div
            className="text-xs leading-relaxed px-3.5 py-3 rounded-xl"
            style={{ background: "#eff6ff", color: "#1e40af" }}
          >
            Haluatko kausikortin? Mainitse siitä lisätiedoissa — 39 € sisältää
            ensimmäisen aurauksen ja −20 % kaikista seuraavista.
          </div>
        )}

        {onProceed && (
          <button
            onClick={onProceed}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: DARK }}
          >
            Jatka varaukseen
          </button>
        )}
      </div>
    </div>
  );
}
