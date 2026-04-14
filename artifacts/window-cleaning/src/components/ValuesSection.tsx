const VALUES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
      </svg>
    ),
    title: "Innokkuus",
    description: "Teemme jokaisen työn täydellä innolla. Meille ei ole tylsää tai turhaa keikkaa — jokainen asiakas ansaitsee parhaan panostuksemme.",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "Luotettavuus",
    description: "Tulemme sovittuna aikana, teemme mitä lupaamme ja pidämme sinut ajan tasalla. Sanomme mitä teemme — ja teemme mitä sanomme.",
    color: "#38bdf8",
    bg: "rgba(56,189,248,0.08)",
    border: "rgba(56,189,248,0.2)",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
    title: "Laatu",
    description: "Emme tyydy hyvään — tavoittelemme erinomaista. Käymme läpi jokaisen kohdan huolellisesti ja varmistamme, ettei mitään jää kesken.",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.08)",
    border: "rgba(167,139,250,0.2)",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
      </svg>
    ),
    title: "Ammattimaisuus",
    description: "Vaikka olemme nuoria, suhtaudumme työhön kuin ammattilaiset. Siistit varusteet, täsmällinen viestintä ja laadukas lopputulos joka kerta.",
    color: "#34d399",
    bg: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
  },
];

export function ValuesSection() {
  return (
    <div className="mt-12 mb-8">
      <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12 mb-10">
        <div className="md:w-64 flex-shrink-0">
          <div className="w-1 h-8 rounded-full mb-4" style={{ background: "#38bdf8" }} />
          <h2 className="text-3xl font-bold text-foreground leading-tight">
            Meidän<br />perusarvomme
          </h2>
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
            Nämä neljä arvoa ohjaavat kaikkea mitä teemme — jokaisessa työssä, jokaiselle asiakkaalle.
          </p>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-2xl p-5 flex flex-col gap-3"
              style={{ background: v.bg, border: `1px solid ${v.border}` }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ color: v.color, background: `${v.bg}`, border: `1px solid ${v.border}` }}
              >
                {v.icon}
              </div>
              <div>
                <h3 className="font-bold text-foreground text-base mb-1">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
