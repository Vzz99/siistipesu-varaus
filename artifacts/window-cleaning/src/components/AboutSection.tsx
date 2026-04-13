export function AboutSection() {
  return (
    <div className="mt-8 space-y-6">
      {/* Pääosio */}
      <div className="rounded-3xl overflow-hidden" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)" }}>
        <div className="relative px-6 sm:px-10 py-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-1 h-8 rounded-full" style={{ background: "#38bdf8" }} />
            <h2 className="text-2xl font-bold text-white">Meistä</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Tiimikuva */}
            <div className="lg:w-80 flex-shrink-0">
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <img
                  src="/team.jpg"
                  alt="Siisti Pesu tiimi"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: "center 20%" }}
                />
              </div>
              <div className="mt-3 px-3 py-2 rounded-xl text-center text-xs"
                style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8", border: "1px solid rgba(56,189,248,0.3)" }}>
                Valtteri Jutila & Lauri Huopainen
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
              <div className="grid grid-cols-3 gap-3 mb-5">
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
              <div className="flex flex-wrap gap-3">
                <a href="tel:+358442431103"
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
    </div>
  );
}
