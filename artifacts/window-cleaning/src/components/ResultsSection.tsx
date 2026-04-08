export function ResultsSection() {
  return (
    <div className="mt-12 mb-8">
      <h2 className="text-3xl font-bold text-foreground text-center mb-2">
        Tulokset puhuvat puolestaan
      </h2>
      <p className="text-muted-foreground text-center mb-8 text-sm">
        Katso mitä saat — ennen ja jälkeen.
      </p>

      {/* Ennen/jälkeen — ikkunat */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          🪟 Ikkunanpesu
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
            <img
              src="/before-window.jpg"
              alt="Ikkuna ennen pesua"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs font-semibold text-center py-2">
              Ennen
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
            <img
              src="/after-window.jpg"
              alt="Ikkuna pesun jälkeen"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-primary/70 text-white text-xs font-semibold text-center py-2">
              Jälkeen
            </div>
          </div>
        </div>
      </div>

      {/* Karmit/kiskot */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          🧹 Karmit ja kiskot
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
            <img
              src="/window-track-1.jpg"
              alt="Kisko ennen pesua"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs font-semibold text-center py-2">
              Ennen
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
            <img
              src="/window-track-2.jpg"
              alt="Kisko pesun jälkeen"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-primary/70 text-white text-xs font-semibold text-center py-2">
              Jälkeen
            </div>
          </div>
        </div>
      </div>

      {/* Auto */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          🚗 Auton ulkopesu
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
            <img
              src="/car-dirty.jpg"
              alt="Auto ennen pesua"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs font-semibold text-center py-2">
              Ennen
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
            <img
              src="/car-clean.jpg"
              alt="Auto pesun jälkeen"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-primary/70 text-white text-xs font-semibold text-center py-2">
              Jälkeen
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
