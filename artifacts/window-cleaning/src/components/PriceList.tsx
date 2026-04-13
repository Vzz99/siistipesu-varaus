const SERVICES = [
  {
    image: "/window-thumbs.jpg",
    title: "Ikkunanpesu",
    description: "Pesemme ikkunat huolellisesti sisältä ja ulkoa. Kaikki pinnat kiiltävät — ei jälkiä, ei tahroja.",
    includes: [
      "Kaikkien pintojen puhdistus kiiltäväksi",
      "Ikkunoiden välit ja karmit puhdistetaan",
      "Ikkunalauta pyyhitään",
      "Kaikki välineet mukanamme",
      "Matkakulut 25 €",
      "Minimiveloitus 40 €",
    ],
    prices: [
      { label: "4-pintainen ikkuna", price: "16 €" },
      { label: "6-pintainen ikkuna", price: "20 €" },
      { label: "Ruudukkoikkuna", price: "23 €" },
      { label: "Tuuletusikkuna", price: "10 €" },
      { label: "Ikkunaryhmä", price: "25 €" },
      { label: "Avautumaton ikkuna", price: "11 €" },
      { label: "Ovi (lasillinen)", price: "11 €" },
      { label: "Korkeat ikkunat", price: "26 €" },
    ],
  },
  {
    image: "/car-wash.jpg",
    title: "Auton ulkopesu",
    description: "Laadukas auton ulkopesu käsin. Auto kiiltää kuin uusi — huolellinen ja tarkka työ taattu.",
    includes: [
      "Laadukas ulkopesu käsin",
      "Kori, pyörät ja vanteet puhdistetaan",
      "Lasit puhdistetaan",
      "Kaikki välineet mukanamme",
    ],
    prices: [
      { label: "Auton ulkopesu", price: "30 €" },
    ],
  },
  {
    image: "/mowing.jpg",
    title: "Pihatyöt & muut palvelut",
    description: "Nurmikon leikkuu, pihatyöt ja muut kotitalouspalvelut. Hinta määräytyy työmäärän suuruuden ja haastavuuden mukaan.",
    includes: [
      "Nurmikon leikkuu",
      "Muut pihatyöt",
      "Kotitalouspalvelut",
      "Hinta sovitaan erikseen",
    ],
    prices: [
      { label: "Hinta", price: "Sovitaan" },
    ],
  },
];

export function PriceList() {
  return (
    <div className="mt-10 mb-8">
      <h2 className="text-3xl font-bold text-foreground text-center mb-2">
        Palvelut ja hinnat
      </h2>
      <p className="text-muted-foreground text-center mb-8 text-sm">
        Selkeät hinnat ilman yllätyksiä — tiedät aina mitä maksat.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SERVICES.map((service) => (
          <div
            key={service.title}
            className="bg-card border border-border rounded-2xl shadow-xs overflow-hidden flex flex-col"
          >
            <div className="px-5 py-5 border-b border-border">
              <div className="w-12 h-12 rounded-2xl overflow-hidden mb-3 flex-shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-bold text-foreground text-lg">{service.title}</h3>
              <p className="text-muted-foreground text-sm mt-1 leading-relaxed">{service.description}</p>
            </div>

            <div className="px-5 py-4 border-b border-border flex-1">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Sisältyy palveluun</p>
              <ul className="space-y-2">
                {service.includes.map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-foreground">
                    <span className="text-green-500">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-5 py-4">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Hinnat</p>
              <ul className="space-y-1">
                {service.prices.map((p) => (
                  <li key={p.label} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{p.label}</span>
                    <span className="font-semibold text-foreground">{p.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
