import { type ServiceType } from "@/pages/BookingPage";
import { ACCENT_DARK, ACCENT_TINT, BORDER, INK, MUTED } from "@/lib/theme";

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
        <h3 className="font-bold text-sm" style={{ color: INK }}>
          Yhteenveto
        </h3>
      </div>

      <div className="px-5 py-5 space-y-4">
        <div>
          <p className="text-xs font-medium mb-1" style={{ color: MUTED }}>
            Palvelu
          </p>
          <p className="font-bold text-base" style={{ color: INK }}>
            {SERVICE_LABELS[serviceType]}
          </p>
        </div>

        <div className="pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
          <p className="text-xs font-medium mb-1" style={{ color: MUTED }}>
            Hinta
          </p>

          {isCarWash && (
            <p className="text-2xl font-extrabold tabular-nums" style={{ color: INK }}>
              30,00 €
            </p>
          )}

          {isSnow && (
            <>
              <p className="text-2xl font-extrabold tabular-nums" style={{ color: INK }}>
                alkaen 15 €
              </p>
              <p className="text-xs leading-relaxed mt-1.5" style={{ color: MUTED }}>
                Lopullinen hinta sovitaan pihan koon mukaan.
              </p>
            </>
          )}

          {isMuut && (
            <p className="font-semibold text-sm leading-snug" style={{ color: MUTED }}>
              Hinta sovitaan erikseen
            </p>
          )}
        </div>

        {isSnow && (
          <div
            className="text-xs leading-relaxed px-3.5 py-3 rounded-xl"
            style={{ background: ACCENT_TINT, color: ACCENT_DARK }}
          >
            Haluatko kausikortin? Mainitse siitä lisätiedoissa — 39 € sisältää
            ensimmäisen aurauksen ja −20 % kaikista seuraavista.
          </div>
        )}

        {onProceed && (
          <button
            onClick={onProceed}
            className="w-full py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ background: INK }}
          >
            Jatka varaukseen
          </button>
        )}
      </div>
    </div>
  );
}
