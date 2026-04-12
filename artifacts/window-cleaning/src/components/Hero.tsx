export function Hero({ onBookClick }: { onBookClick: () => void }) {
  return (
    <div className="relative overflow-hidden rounded-3xl mb-8" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)" }}>
      {/* Taustakuviot */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-20"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #38bdf8 0%, transparent 50%), radial-gradient(circle at 80% 20%, #818cf8 0%, transparent 40%)" }} />
        {/* Ristikko */}
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative px-6 sm:px-12 py-16 flex flex-col sm:flex-row items-center gap-10">
        {/* Tekstiosio */}
        <div className="flex-1 text-center sm:text-left text-white">
          {/* Logo */}
          <div className="flex justify-center sm:justify-start mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full blur-xl opacity-40" style={{ background: "#38bdf8" }} />
              <img
                src="/sp-logo.png"
                alt="Siisti Pesu"
                className="relative w-20 h-20 rounded-full object-cover"
                style={{ border: "3px solid rgba(56,189,248,0.5)", boxShadow: "0 0 30px rgba(56,189,248,0.3)" }}
              />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 text-xs font-medium"
            style={{ background: "rgba(56,189,248,0.15)", border: "1px solid rgba(56,189,248,0.3)", color: "#38bdf8" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse inline-block" />
            Avoinna varauksia
          </div>

          {/* Iskulause */}
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
            Me hoidamme pintasi
            <span className="block" style={{ color: "#38bdf8" }}>kiiltoon.</span>
          </h1>

          {/* Kuvaus */}
          <p className="text-base sm:text-lg leading-relaxed mb-6 max-w-lg" style={{ color: "#94a3b8" }}>
            Olemme kaksi 15-vuotiasta nuorta yrittäjää Uudeltamaalta, joilla on
            kova halu kehittyä ja antaa asiakkailleen huippukokemuksia.
            Teemme ikkunanpesua, auton ulkopesua ja pihatöitä —
            vastuullisesti ja laadukkaasti.
          </p>

          {/* Tagit */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-8">
            {["🪟 Ikkunanpesu", "🚗 Auton ulkopesu", "🌿 Pihatyöt", "📍 Uusimaa"].map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-sm"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#cbd5e1" }}>
                {tag}
              </span>
            ))}
          </div>

          {/* CTA-napit */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-3">
            <button
              onClick={onBookClick}
              className="px-8 py-4 font-bold rounded-2xl text-base transition-all duration-200 active:scale-95"
              style={{ background: "#38bdf8", color: "#0f172a", boxShadow: "0 0 20px rgba(56,189,248,0.4)" }}
            >
              Varaa aika nyt →
            </button>
            <a href="mailto:siisti.pesu@gmail.com"
              className="px-6 py-4 font-semibold rounded-2xl text-base transition-all duration-200 active:scale-95"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.2)", color: "white" }}>
              Ota yhteyttä
            </a>
          </div>
        </div>

        {/* Statsit */}
        <div className="flex sm:flex-col gap-4 sm:gap-4">
          {[
            { number: "100%", label: "Tyytyväisyystakuu", icon: "⭐" },
            { number: "4H", label: "Yritys", icon: "🏢" },
            { number: "2026", label: "Perustettu", icon: "📅" },
          ].map((stat) => (
            <div key={stat.label}
              className="rounded-2xl px-5 py-4 text-center min-w-[90px]"
              style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", backdropFilter: "blur(10px)" }}>
              <div className="text-xl mb-1">{stat.icon}</div>
              <div className="text-2xl font-extrabold" style={{ color: "#38bdf8" }}>{stat.number}</div>
              <div className="text-xs mt-1" style={{ color: "#64748b" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
