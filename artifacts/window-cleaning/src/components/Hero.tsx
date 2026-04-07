export function Hero({ onBookClick }: { onBookClick: () => void }) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl mb-8">
      {/* Taustakuvio */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-400 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-400 rounded-full blur-3xl" />
      </div>

      <div className="relative px-6 sm:px-12 py-14 flex flex-col sm:flex-row items-center gap-10">
        {/* Tekstiosio */}
        <div className="flex-1 text-center sm:text-left">
          {/* Logo */}
          <div className="flex justify-center sm:justify-start mb-6">
            <img
              src="/sp-logo.png"
              alt="Siisti Pesu"
              className="w-20 h-20 rounded-full object-cover ring-4 ring-white/20 shadow-xl"
            />
          </div>

          {/* Iskulause */}
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4 tracking-tight">
            Me hoidamme pintasi
            <span className="text-cyan-400"> kiiltoon.</span>
          </h1>

          {/* Kuvaus */}
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 max-w-lg">
            Olemme kaksi 15-vuotiasta nuorta yrittäjää Uudeltamaalta, joilla on
            kova halu kehittyä ja antaa asiakkailleen huippukokemuksia.
            Teemme ikkunanpesua, auton ulkopesua ja pihatöitä —
            vastuullisesti ja laadukkaasti.
          </p>

          {/* Palvelualue */}
          <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-8">
            {["🪟 Ikkunanpesu", "🚗 Auton ulkopesu", "🌿 Pihatyöt", "📍 Uusimaa"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-sm text-slate-200"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA-nappi */}
          <button
            onClick={onBookClick}
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-2xl text-base shadow-lg transition-all duration-200 active:scale-95"
          >
            Varaa aika nyt →
          </button>
        </div>

        {/* Statsit */}
        <div className="flex sm:flex-col gap-4 sm:gap-6">
          {[
            { number: "100%", label: "Tyytyväisyystakuu" },
            { number: "4H", label: "Yritys" },
            { number: "2026", label: "Perustettu" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-center"
            >
              <div className="text-2xl font-extrabold text-cyan-400">{stat.number}</div>
              <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
