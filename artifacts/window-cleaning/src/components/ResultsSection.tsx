export function ResultsSection() {
  return (
    <div className="mt-12 mb-8">
      <h2 className="text-3xl font-bold text-foreground text-center mb-2">
        Tulokset puhuvat puolestaan
      </h2>
      <p className="text-muted-foreground text-center mb-8 text-sm">
        Katso mitä saat — ennen ja jälkeen.
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
    </div>
  );
}
