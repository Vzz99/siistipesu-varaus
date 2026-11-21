import { type ServiceType } from "@/pages/BookingPage";
import { ACCENT_DARK, ACCENT_TINT, BORDER, INK, MUTED } from "@/lib/theme";
import { SERVICE_LABELS, getService, formatServicePrice } from "@/data/services";

interface Props {
  serviceType: ServiceType;
  onProceed?: () => void;
}

export function ServiceSummaryCard({ serviceType, onProceed }: Props) {
  const service = getService(serviceType);
  const isSnow = serviceType === "lumityot";
  /* Kiinteähintaiset palvelut nayttavat summan, muut selitteen. */
  const hasFixedPrice = service.price !== null;

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

          {hasFixedPrice ? (
            <p className="text-2xl font-extrabold tabular-nums" style={{ color: INK }}>
              {formatServicePrice(serviceType)}
            </p>
          ) : (
            <p className="font-semibold text-sm leading-snug" style={{ color: MUTED }}>
              {formatServicePrice(serviceType)}
            </p>
          )}

          {service.priceNote && !hasFixedPrice && (
            <p className="text-xs leading-relaxed mt-1.5" style={{ color: MUTED }}>
              {service.priceNote}
            </p>
          )}
        </div>

        {/* Mita palveluun sisaltyy */}
        {service.includes.length > 0 && (
          <div className="pt-4" style={{ borderTop: `1px solid ${BORDER}` }}>
            <p className="text-xs font-medium mb-2" style={{ color: MUTED }}>
              Sisältyy
            </p>
            <ul className="space-y-1.5">
              {service.includes.map((item) => (
                <li key={item} className="text-sm leading-snug" style={{ color: MUTED }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

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
