import { INK, WHITE } from "@/lib/theme";

/* Osion kehys, joka antaa sivulle rytmin.

   Ennen kaikki osiot olivat samalla valkoisella pohjalla samassa
   laatikossa, jolloin silmä ei huomannut osion vaihtumista ja sivu
   tuntui tasapaksulta. Vuorottelemalla pintoja — valkoinen, vaalea,
   yksi tumma — sivu saa rytmin ilman yhtään koristetta.

   Tausta ulottuu reunasta reunaan, sisältö pysyy keskitetyssä
   palstassa. */

const TINT = "#EDF3F0";

export type SectionTone = "white" | "tint" | "dark";

const BACKGROUNDS: Record<SectionTone, string> = {
  white: WHITE,
  tint: TINT,
  dark: INK,
};

interface Props {
  tone?: SectionTone;
  id?: string;
  /** Reunasta reunaan ilman sisäpalstaa — esim. leveä kuva. */
  bleed?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Section({
  tone = "white",
  id,
  bleed = false,
  className = "",
  children,
}: Props) {
  return (
    <section
      id={id}
      className={`w-full scroll-mt-28 sm:scroll-mt-20 ${className}`}
      /* flow-root pitaa sisaltokomponenttien alamarginaalit osion
         sisalla. Ilman sita ne karkaavat ulos ja osioiden valiin
         jaa rako, jossa nakyy sivun oma taustavari. */
      style={{ background: BACKGROUNDS[tone], display: "flow-root" }}
    >
      {bleed ? (
        children
      ) : (
        <div className="max-w-6xl mx-auto px-4 sm:px-6">{children}</div>
      )}
    </section>
  );
}
