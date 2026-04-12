export function AboutSection() {
  return (
    <div className="mt-8 rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}>
      {/* Taustakuvio */}
      <div className="absolute inset-0 pointer-events-none opacity-10"
        style={{ backgroundImage: "radial-gradient(circle at 90% 10%, #818cf8 0%, transparent 50%)" }} />

      <div className="relative px-6 sm:px-10 py-10">
        {/* Otsikko */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-8 rounded-full" style={{ background: "#38bdf8" }} />
          <h2 className="text-2xl font-bold text-white">Meistä</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 items-start">
          {/* Avatar */}
          <div className="flex-shrink-0 flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl"
              style={{ background: "rgba(56,189,248,0.15)", border: "2px solid rgba(56,189,248,0.3)" }}>
              🪟
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)" }}>
              4H-yritys
            </div>
          </div>

          {/* Teksti */}
          <div className="flex-1">
            <h3 className="font-bold text-xl text-white mb-1">Valtteri Jutila & Lauri Huopainen</h3>
            <p className="text-sm font-medium mb-4" style={{ color: "#38bdf8" }}>Nuoret yrittäjät — Siisti Pesu</p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "#94a3b8" }}>
              Olemme kaksi 15-vuotiasta yrittäjää Uudeltamaalta. Perustimme Siisti Pesun vuonna 2026
              vähäisen kesätyötarjonnan takia — yrittäjyys on aina kiehtonut meitä molempia.
              Olemme 4H-yritys joka tarjoaa ikkunanpesua, auton ulkopesua, nurmikon leikkuuta
              ja muita kodin palveluja. Vaikka olemme nuoria, hoidamme jokaisen työn ammattimaisesti
              ja innokkaasti. Asiakkaamme voivat luottaa laadukkaaseen työnjälkeen! ✨
            </p>

            {/* Statsit */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "2026", label: "Perustettu" },
                { value: "4H", label: "Yritys" },
                { value: "Uusimaa", label: "Palvelualue" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl px-4 py-3 text-center"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <div className="font-bold text-white text-base">{s.value}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#64748b" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Yhteystiedot */}
            <div className="flex flex-wrap gap-3 mt-5">
              <a href="tel:+358401234567"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)" }}>
                📞 Soita meille
              </a>
              <a href="mailto:siisti.pesu@gmail.com"
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all"
                style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "1px solid rgba(255,255,255,0.15)" }}>
                ✉️ siisti.pesu@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
