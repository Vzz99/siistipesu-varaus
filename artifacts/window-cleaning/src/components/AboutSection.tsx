export function AboutSection() {
  return (
    <div className="bg-card border border-card-border rounded-2xl shadow-xs overflow-hidden mt-8">
      <div className="px-6 py-5 border-b border-border bg-muted/30">
        <h2 className="font-semibold text-foreground text-xl">Meistä</h2>
      </div>
      <div className="px-6 py-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start">
          <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
            <span className="text-4xl">🪟</span>
          </div>
          <div>
            <h3 className="font-bold text-lg text-foreground mb-1">Valtteri Jutila & Lauri Huopainen</h3>
            <p className="text-sm text-primary font-medium mb-3">Nuoret yrittäjät — Siisti Pesu</p>
            <p className="text-muted-foreground text-sm leading-relaxed">
          Olemme kaksi 15-vuotiasta yrittäjää Uudeltamaalta. Perustimme Siisti Pesun vuonna 2026 
vähäisen kesätyötarjonnan takia — yrittäjyys on aina kiehtonut meitä molempia. 
Olemme 4H-yritys joka tarjoaa ikkunanpesua, auton ulkopesua, nurmikon leikkuuta 
ja muita kodin palveluja. Vaikka olemme nuoria, hoidamme jokaisen työn ammattimaisesti 
ja innokkaasti. Asiakkaamme voivat luottaa laadukkaaseen työnjälkeen! ✨
            </p>
            <div className="flex gap-4 mt-4">
              <div className="text-center">
                <div className="font-bold text-foreground">2026</div>
                <div className="text-xs text-muted-foreground">Perustettu</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-foreground">4H</div>
                <div className="text-xs text-muted-foreground">Yritys</div>
              </div>
              <div className="text-center">
                <div className="font-bold text-foreground">Uusimaa</div>
                <div className="text-xs text-muted-foreground">Palvelualue</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
