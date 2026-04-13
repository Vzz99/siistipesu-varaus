export function ResultsSection() {
  return (
    <div className="mt-12 mb-8">
      <h2 className="text-3xl font-bold text-foreground text-center mb-2">
        Tulokset puhuvat puolestaan
      </h2>
      <p className="text-muted-foreground text-center mb-8 text-sm">
        Katso mitä saat — ennen ja jälkeen sekä työmme arjessa.
      </p>

      {/* Ennen/jälkeen */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {[
          {
            label: "🪟 Ikkunanpesu",
            before: { src: "/before-window.jpg", alt: "Ikkuna ennen pesua" },
            after: { src: "/after-window.jpg", alt: "Ikkuna pesun jälkeen" },
          },
          {
            label: "🧹 Karmit ja kiskot",
            before: { src: "/window-track-1.jpg", alt: "Kisko ennen pesua" },
            after: { src: "/window-track-2.jpg", alt: "Kisko pesun jälkeen" },
          },
          {
            label: "🚗 Auton ulkopesu",
            before: { src: "/car-dirty.jpg", alt: "Auto ennen pesua" },
            after: { src: "/car-clean.jpg", alt: "Auto pesun jälkeen" },
          },
        ].map((pair) => (
          <div key={pair.label}>
            <h3 className="text-sm font-semibold text-foreground mb-2">{pair.label}</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="relative rounded-xl overflow-hidden aspect-square">
                <img src={pair.before.src} alt={pair.before.alt} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs font-semibold text-center py-1">Ennen</div>
              </div>
              <div className="relative rounded-xl overflow-hidden aspect-square">
                <img src={pair.after.src} alt={pair.after.alt} className="w-full h-full object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-primary/70 text-white text-xs font-semibold text-center py-1">Jälkeen</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Toimintakuvat */}
      <h3 className="text-xl font-bold text-foreground mb-4">Työmme arjessa</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { src: "/window-work.jpg", alt: "Ikkunanpesu sisältä", label: "Ikkunanpesu" },
          { src: "/window-thumbs.jpg", alt: "Ammattimainen työ", label: "Laatu taattu" },
          { src: "/garden.jpg", alt: "Pihatyöt", label: "Pihatyöt" },
          { src: "/mowing.jpg", alt: "Nurmikon leikkuu", label: "Nurmikon leikkuu" },
        ].map((img) => (
          <div key={img.src} className="relative rounded-2xl overflow-hidden aspect-square group">
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
              <p className="text-white text-xs font-semibold">{img.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tiimikuva */}
      <div className="mt-6 relative rounded-2xl overflow-hidden">
        <img
          src="/team.jpg"
          alt="Siisti Pesu tiimi"
          className="w-full h-64 object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
          <div>
            <p className="text-white font-bold text-lg">Valtteri & Lauri</p>
            <p className="text-white/80 text-sm">Valmiina palvelemaan sinua Uudellamaalla</p>
          </div>
        </div>
      </div>
    </div>
  );
}
