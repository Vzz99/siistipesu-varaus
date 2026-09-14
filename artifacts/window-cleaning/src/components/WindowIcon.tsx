/* Ikkunatyyppien ikonit — PNG-kuvat public-kansiossa.
   Tiedostonimi vastaa windows.ts:n id-kenttää, esim.
   id "avautuva-4" → public/avautuva-4.png */

/* Ulkopesun tyypeille ei ole omia kuvia — ne käyttävät
   vastaavaa sisäpesun ikonia. */
const ICON_FILE: Record<string, string> = {
  "ulko-perus": "avautumaton",
  "ulko-tuuletus": "tuuletus",
  "ulko-korkea": "korkea",
};

export function WindowIcon({ id, className }: { id: string; className?: string }) {
  const file = ICON_FILE[id] ?? id;
  const src = `${import.meta.env.BASE_URL}${file}.png`;

  return (
    <div className={className}>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="w-full h-full object-contain select-none pointer-events-none"
        onError={(e) => {
          e.currentTarget.style.visibility = "hidden";
        }}
      />
    </div>
  );
}
