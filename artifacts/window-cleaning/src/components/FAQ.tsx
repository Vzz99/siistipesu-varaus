import { useState } from "react";

const QUESTIONS = [
  {
    q: "Pitääkö minun olla kotona palvelun aikana?",
    a: "Suosittelemme, että käytät ajan esimerkiksi rentoutumiseen tai harrastuksiin — olet täysin vapaa! Voit olla kotona tai poissa, valinta on sinun.",
  },
  {
    q: "Pitääkö minun siirtää tavaroita ennen pesua?",
    a: "Ei tarvitse! Tavaroiden siirtäminen kuuluu palveluumme. Jos haluat itse siirtää jonkin ison esineen etukäteen, sekin onnistuu — mutta se ei ole pakollista.",
  },
  {
    q: "Miten maksu tapahtuu?",
    a: "Maksu hoidetaan työn jälkeen. Hyväksymme MobilePayn, käteisen sekä laskutuksen. Sovitaan maksutavasta etukäteen!",
  },
  {
    q: "Tuotteko omat välineet?",
    a: "Kyllä! Ikkunanpesussa tuomme mukanamme kaikki tarvittavat välineet — ämpäristä pesulastoihin ja pyyhkeisiin. Sinun ei tarvitse huolehtia mistään.",
  },
  {
    q: "Onko palvelullanne takuu?",
    a: "Seisomme täysin tarjoamamme palvelun takana. Jos et ole tyytyväinen lopputulokseen, hoidamme asian kuntoon ilman lisäkuluja.",
  },
  {
    q: "Millä alueella toimitte?",
    a: "Palvelemme koko Uudenmaan alueella. Voit tarkistaa postinumerosi varauslomakkeesta.",
  },
  {
    q: "Miten perun varaukseni?",
    a: "Varauksen voi perua ottamalla meihin yhteyttä puhelimitse tai sähköpostitse. Pyydämme peruuttamaan viimeistään 24 tuntia ennen sovittua aikaa. Ota yhteyttä: siisti.pesu@gmail.com",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="mt-12 mb-8">
      <h2 className="text-3xl font-bold text-foreground text-center mb-8">
        Usein kysytyt kysymykset
      </h2>
      <div className="max-w-2xl mx-auto flex flex-col gap-3">
        {QUESTIONS.map((item, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-2xl overflow-hidden shadow-xs"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full px-5 py-4 flex items-center justify-between text-left gap-4"
            >
              <span className="font-semibold text-foreground text-sm sm:text-base">
                {item.q}
              </span>
              <span className="text-xl text-muted-foreground flex-shrink-0">
                {open === i ? "−" : "+"}
              </span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
