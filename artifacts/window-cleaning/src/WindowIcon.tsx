/* Ikkunatyyppien ikonit — piirretty SVG:nä, ei kuvatiedostoja. */

const S = "#475569";        // viiva
const S_LIGHT = "#94a3b8";  // apuviiva
const GLASS = "#dbeafe";    // lasi
const SHINE = "#93c5fd";    // heijastus

interface IconProps {
  className?: string;
}

function Frame({ children }: { children: React.ReactNode }) {
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
      <rect x="14" y="10" width="24" height="44" rx="1.5" fill={GLASS} {...stroke} />
      <path d="M38 12l10 4v36l-10 4" fill={GLASS} {...stroke} />
      <path d="M38 12v44" {...stroke} />
      <path d="M20 20l0 14M25 18l0 14" {...shine} />
      <path d="M42 22l0 12" {...shine} />
    </Frame>
  );
}

/* 2. Avautuva 6-pintainen */
function IconAvautuva6() {
  return (
    <Frame>
      <rect x="12" y="10" width="22" height="44" rx="1.5" fill={GLASS} {...stroke} />
      <path d="M34 12l7 3v34l-7 3" fill={GLASS} {...stroke} />
      <path d="M41 14l7 3v30l-7 3" fill={GLASS} {...stroke} />
      <path d="M34 12v44M41 14v40" {...stroke} />
      <path d="M18 20l0 14M23 18l0 14" {...shine} />
      <path d="M37 24l0 10M45 26l0 8" {...shine} />
    </Frame>
  );
}

/* 3. Avautuva ruutuikkuna */
function IconRuudukko() {
  return (
    <Frame>
      <rect x="14" y="10" width="24" height="44" rx="1.5" fill={GLASS} {...stroke} />
      <path d="M14 32h24M26 10v44" {...stroke} />
      <path d="M38 12l10 4v36l-10 4" fill={GLASS} {...stroke} />
      <path d="M38 12v44" {...stroke} />
      <path d="M43 34h5" {...thin} />
      <path d="M18 16l0 8" {...shine} />
      <path d="M30 38l0 8" {...shine} />
    </Frame>
  );
}

/* 4. Tuuletusikkuna */
function IconTuuletus() {
  return (
    <Frame>
      <rect x="20" y="16" width="16" height="32" rx="1.5" fill={GLASS} {...stroke} />
      <path d="M36 18l8 3v26l-8 3" fill={GLASS} {...stroke} />
      <path d="M36 18v34" {...stroke} />
      <path d="M24 24l0 10" {...shine} />
      <path d="M40 28l0 8" {...shine} />
    </Frame>
  );
}

/* 5. Avautumaton ikkuna */
function IconAvautumaton() {
  return (
    <Frame>
      <rect x="16" y="10" width="32" height="44" rx="1.5" fill={GLASS} {...stroke} />
      <rect x="20" y="14" width="24" height="36" rx="1" {...thin} />
      <path d="M25 20l0 12M31 18l0 12" {...shine} />
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
      {/* portaat */}
      <path d="M8 54h14v-9h14v-9h14v-9h6" {...stroke} />
      {/* lasi */}
      <path d="M12 46l40-24v14L12 58z" fill={GLASS} {...stroke} />
      <path d="M20 44l0 8M28 39l0 8" {...shine} />
    </Frame>
  );
}

/* 10. Kylpyhuoneen lasi */
function IconKylpyhuone() {
  return (
    <Frame>
      <rect x="8" y="14" width="22" height="36" rx="1.5" fill={GLASS} {...stroke} />
      <rect x="34" y="14" width="22" height="36" rx="1.5" fill={GLASS} {...stroke} />
      <path d="M30 28h4M30 36h4" {...stroke} />
      <path d="M13 22l0 10M19 20l0 10" {...shine} />
      <path d="M45 22l0 10M51 20l0 10" {...shine} />
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
      <path d="M8 12h48" {...stroke} />
      <rect x="10" y="14" width="14" height="24" fill={GLASS} {...stroke} />
      <rect x="25" y="14" width="14" height="24" fill={GLASS} {...stroke} />
      <path d="M40 15l10 4v20l-10 4" fill={GLASS} {...stroke} />
      <path d="M40 14v28" {...stroke} />
      <path d="M8 42h48M8 52h48" {...stroke} />
      <path d="M14 42v10M24 42v10M34 42v10M44 42v10" {...thin} />
      <path d="M14 20l0 8M29 20l0 8" {...shine} />
    </Frame>
  );
}

/* 13. Parvekkeen alalasi (metri) */
function IconAlalasi() {
  return (
    <Frame>
      <path d="M8 18h48" {...stroke} />
      <path d="M8 22h48" {...thin} />
      <rect x="10" y="34" width="44" height="18" rx="1" fill={GLASS} {...stroke} />
      <path d="M18 38l0 10M26 38l0 10" {...shine} />
      <path d="M10 58h44" strokeDasharray="2 3" {...thin} />
      <path d="M13 55l-3 3 3 3M51 55l3 3-3 3" {...thin} />
    </Frame>
  );
}

/* 14. Terassilasi */
function IconTerassilasi() {
  return (
    <Frame>
      <path d="M10 20l22-8 22 8v6H10z" fill="#f1f5f9" {...stroke} />
      <rect x="12" y="26" width="40" height="26" fill={GLASS} {...stroke} />
      <path d="M25 26v26M39 26v26" {...stroke} />
      <path d="M10 52h44" {...stroke} />
      <path d="M17 32l0 12M31 32l0 12M45 32l0 12" {...shine} />
    </Frame>
  );
}

/* Ulkopesun ikonit käyttävät samoja peruskuvia */
const ICONS: Record<string, () => JSX.Element> = {
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
