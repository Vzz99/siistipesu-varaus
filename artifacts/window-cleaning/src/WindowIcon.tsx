/* Ikkunatyyppien ikonit — piirretty SVG:nä, ei kuvatiedostoja. */
import type { ReactElement, ReactNode } from "react";

const S = "#475569";        // viiva
const S_LIGHT = "#94a3b8";  // apuviiva
const GLASS = "#dbeafe";    // lasi
const SHINE = "#93c5fd";    // heijastus

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {children}
    </svg>
  );
}

const stroke = { stroke: S, strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const thin = { stroke: S_LIGHT, strokeWidth: 1.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const shine = { stroke: SHINE, strokeWidth: 1.4, strokeLinecap: "round" as const };

/* 1. Avautuva 4-pintainen */
function IconAvautuva4() {
  return (
    <Frame>
      {/* karmi */}
      <rect x="16" y="12" width="20" height="40" rx="1" fill="#f8fafc" {...stroke} />
      {/* avautuva lasilevy kulmassa */}
      <path d="M36 12l14 5v34l-14 5z" fill={GLASS} {...stroke} />
      <path d="M40 20l0 24M45 22l0 20" {...shine} />
      {/* sarana */}
      <path d="M36 12v40" {...stroke} />
      <circle cx="18" cy="20" r="1.1" fill={S} />
      <circle cx="18" cy="44" r="1.1" fill={S} />
    </Frame>
  );
}

/* 2. Avautuva 6-pintainen */
function IconAvautuva6() {
  return (
    <Frame>
      <rect x="14" y="12" width="18" height="40" rx="1" fill="#f8fafc" {...stroke} />
      <path d="M32 12l9 3v42l-9 3z" fill={GLASS} {...stroke} />
      <path d="M41 15l9 3v34l-9 3z" fill={GLASS} {...stroke} />
      <path d="M32 12v46M41 15v40" {...stroke} />
      <path d="M36 22l0 20" {...shine} />
      <path d="M45 24l0 16" {...shine} />
    </Frame>
  );
}

/* 3. Avautuva ruutuikkuna */
function IconRuudukko() {
  return (
    <Frame>
      <rect x="16" y="12" width="20" height="40" rx="1" fill="#f8fafc" {...stroke} />
      <path d="M36 12l14 5v34l-14 5z" fill={GLASS} {...stroke} />
      {/* ruudukko avautuvassa levyssä */}
      <path d="M36 32l14 3" {...stroke} />
      <path d="M43 15v40" {...stroke} />
      <path d="M36 12v40" {...stroke} />
      <path d="M39 20l0 8" {...shine} />
      <circle cx="18" cy="20" r="1.1" fill={S} />
      <circle cx="18" cy="44" r="1.1" fill={S} />
    </Frame>
  );
}

/* 4. Tuuletusikkuna — vaaka, ylhäältä aukeava */
function IconTuuletus() {
  return (
    <Frame>
      {/* karmi */}
      <rect x="12" y="24" width="40" height="20" rx="1.5" fill="#f8fafc" {...stroke} />
      {/* yläreunasta avautuva levy, kulmassa */}
      <path d="M12 24l40 0 -5 -8 -30 0z" fill={GLASS} {...stroke} />
      <path d="M20 22l24 0" {...shine} />
      {/* sarana ylhäällä */}
      <circle cx="16" cy="24" r="1.1" fill={S} />
      <circle cx="48" cy="24" r="1.1" fill={S} />
      <path d="M18 30l0 8M26 30l0 8" {...shine} />
    </Frame>
  );
}

/* 5. Avautumaton ikkuna */
function IconAvautumaton() {
  return (
    <Frame>
      <rect x="18" y="12" width="28" height="40" rx="1.5" fill="#f8fafc" {...stroke} />
      <rect x="22" y="16" width="20" height="32" rx="1" fill={GLASS} {...stroke} />
      <path d="M27 22l0 12M33 20l0 12" {...shine} />
    </Frame>
  );
}

/* 6. Ikkunaryhmä */
function IconRyhma() {
  return (
    <Frame>
      <rect x="6" y="14" width="16" height="36" rx="1.5" fill={GLASS} {...stroke} />
      <rect x="24" y="14" width="16" height="36" rx="1.5" fill={GLASS} {...stroke} />
      <rect x="42" y="14" width="16" height="36" rx="1.5" fill={GLASS} {...stroke} />
      <path d="M10 20l0 10" {...shine} />
      <path d="M28 20l0 10" {...shine} />
      <path d="M46 20l0 10" {...shine} />
    </Frame>
  );
}

/* 7. Ovi (lasillinen) */
function IconOvi() {
  return (
    <Frame>
      <rect x="18" y="8" width="28" height="48" rx="1.5" {...stroke} />
      <rect x="23" y="13" width="18" height="26" rx="1" fill={GLASS} {...stroke} />
      <circle cx="41.5" cy="46" r="1.8" {...stroke} />
      <path d="M27 19l0 10M32 17l0 10" {...shine} />
    </Frame>
  );
}

/* 8. Kiinteä 3–5 m korkeudessa */
function IconKorkea() {
  return (
    <Frame>
      <rect x="22" y="8" width="30" height="18" rx="1.5" fill={GLASS} {...stroke} />
      <path d="M27 13l0 8M33 12l0 8" {...shine} />
      {/* tikkaat */}
      <path d="M34 52V30M44 52V30" {...stroke} />
      <path d="M34 34h10M34 40h10M34 46h10" {...thin} />
      {/* korkeusnuoli */}
      <path d="M14 10v42" {...thin} />
      <path d="M11 13l3-3 3 3M11 49l3 3 3-3" {...thin} />
      <path d="M12 54h40" strokeDasharray="2 3" {...thin} />
    </Frame>
  );
}

/* 9. Lasikaide (metri) */
function IconLasikaide() {
  return (
    <Frame>
      {/* käsijohde ylhäällä */}
      <path d="M8 16h48" strokeWidth="2.4" stroke={S} strokeLinecap="round" />
      {/* lasipaneeli */}
      <rect x="12" y="20" width="40" height="28" rx="1" fill={GLASS} {...stroke} />
      {/* pystytolpat */}
      <path d="M14 16v34M50 16v34" {...stroke} />
      {/* lattia */}
      <path d="M6 50h52" {...stroke} />
      <path d="M22 26l0 16M32 26l0 16" {...shine} />
    </Frame>
  );
}

/* 10. Kylpyhuoneen lasi — suihkuseinä */
function IconKylpyhuone() {
  return (
    <Frame>
      {/* lasiseinä */}
      <rect x="16" y="12" width="32" height="40" rx="1.5" fill={GLASS} {...stroke} />
      {/* kahva */}
      <path d="M43 26v12" strokeWidth="2.4" stroke={S} strokeLinecap="round" />
      {/* suihku ylänurkassa */}
      <circle cx="24" cy="18" r="2.4" {...stroke} />
      <path d="M24 21l0 3M20 22l-1 2M28 22l1 2" {...thin} />
      <path d="M22 34l0 10" {...shine} />
      <path d="M20 50h24" {...stroke} />
    </Frame>
  );
}

/* 11. Peili */
function IconPeili() {
  return (
    <Frame>
      <rect x="18" y="8" width="28" height="44" rx="14" fill={GLASS} {...stroke} />
      <rect x="22" y="12" width="20" height="36" rx="10" {...thin} />
      <path d="M27 20l0 12M33 18l0 12" {...shine} />
      <path d="M22 56h20" {...stroke} />
    </Frame>
  );
}

/* 12. Parvekkeen kääntyvä lasi */
function IconParvekeKaantyva() {
  return (
    <Frame>
      {/* ylä- ja alakisko */}
      <path d="M8 14h48" strokeWidth="2.2" stroke={S} strokeLinecap="round" />
      <path d="M8 46h48" strokeWidth="2.2" stroke={S} strokeLinecap="round" />
      {/* kolme paneelia, viimeinen käännetty auki */}
      <rect x="11" y="16" width="12" height="28" fill={GLASS} {...stroke} />
      <rect x="24" y="16" width="12" height="28" fill={GLASS} {...stroke} />
      <path d="M38 16l10 4v20l-10 4z" fill={GLASS} {...stroke} />
      <path d="M15 22l0 14M28 22l0 14" {...shine} />
      <path d="M42 24l0 12" {...shine} />
    </Frame>
  );
}

/* 13. Parvekkeen alalasi (metri) */
function IconAlalasi() {
  return (
    <Frame>
      {/* käsijohde */}
      <path d="M8 14h48" strokeWidth="2.2" stroke={S} strokeLinecap="round" />
      <path d="M14 14v10M50 14v10" {...stroke} />
      {/* alalasi kaiteen alaosassa */}
      <rect x="10" y="26" width="44" height="20" rx="1" fill={GLASS} {...stroke} />
      <path d="M20 30l0 12M30 30l0 12M40 30l0 12" {...shine} />
      {/* mittanuoli */}
      <path d="M10 52h44" strokeDasharray="2 3" {...thin} />
      <path d="M13 49l-3 3 3 3M51 49l3 3-3 3" {...thin} />
    </Frame>
  );
}

/* 14. Terassilasi */
function IconTerassilasi() {
  return (
    <Frame>
      {/* katos */}
      <path d="M8 18h48" strokeWidth="2.4" stroke={S} strokeLinecap="round" />
      {/* kaksi lasiseinää */}
      <rect x="12" y="20" width="18" height="30" fill={GLASS} {...stroke} />
      <rect x="34" y="20" width="18" height="30" fill={GLASS} {...stroke} />
      {/* lattia */}
      <path d="M8 50h48" {...stroke} />
      <path d="M18 26l0 16M40 26l0 16" {...shine} />
    </Frame>
  );
}

/* Ulkopesun ikonit käyttävät samoja peruskuvia */
const ICONS: Record<string, () => ReactElement> = {
  "avautuva-4": IconAvautuva4,
  "avautuva-6": IconAvautuva6,
  ruudukko: IconRuudukko,
  tuuletus: IconTuuletus,
  avautumaton: IconAvautumaton,
  "ikkuna-ryhma": IconRyhma,
  ovi: IconOvi,
  korkea: IconKorkea,
  lasikaide: IconLasikaide,
  kylpyhuone: IconKylpyhuone,
  peili: IconPeili,
  "parveke-kaantyva": IconParvekeKaantyva,
  "parveke-alalasi": IconAlalasi,
  terassilasi: IconTerassilasi,

  // Ulkopesu
  "ulko-perus": IconAvautumaton,
  "ulko-tuuletus": IconTuuletus,
  "ulko-ryhma": IconRyhma,
  "ulko-korkea": IconKorkea,
};

export function WindowIcon({ id, className }: { id: string; className?: string }) {
  const Icon = ICONS[id];
  if (!Icon) return null;
  return (
    <div className={className}>
      <Icon />
    </div>
  );
}
