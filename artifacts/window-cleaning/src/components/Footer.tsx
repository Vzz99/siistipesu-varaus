export function Footer() {
  return (
    <footer className="bg-slate-800 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
        
        {/* Logo ja kuvaus */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <img src="/sp-logo.png" alt="Siisti Pesu" className="w-12 h-12 rounded-full object-cover" />
            <div>
              <div className="font-bold text-lg">Siisti Pesu</div>
              <div className="text-xs text-slate-400">4H-yritys</div>
            </div>
          </div>
          <p className="text-sm text-slate-400">
            Nuorten yrittäjien kotitalouspalvelut Uudellamaalla.
          </p>
        </div>

        {/* Palvelut */}
        <div>
          <h3 className="font-semibold mb-3 text-slate-200">Palvelut</h3>
          <ul className="space-y-1 text-sm text-slate-400">
            <li>🪟 Ikkunanpesu</li>
            <li>🚗 Auton ulkopesu</li>
            <li>🌿 Nurmikon leikkuu</li>
            <li>✨ Muut kotitalouspalvelut</li>
          </ul>
        </div>

        {/* Yhteystiedot */}
        <div>
          <h3 className="font-semibold mb-3 text-slate-200">Yhteystiedot</h3>
          <ul className="space-y-2 text-sm text-slate-400">
            <li>📍 Uusimaa</li>
            <li>📞 <a href="tel:0442431103" className="hover:text-white transition-colors">044 243 1103</a></li>
            <li>✉️ <a href="mailto:siisti.pesu@gmail.com" className="hover:text-white transition-colors">siisti.pesu@gmail.com</a></li>
            <li>🏢 Y-tunnus: 3609363-2</li>
          </ul>
        </div>

      </div>

      {/* Alatunniste */}
      <div className="border-t border-slate-700 py-4 text-center text-xs text-slate-500">
        © 2026 Siisti Pesu | Kaikki oikeudet pidätetään.
      </div>
    </footer>
  );
}
