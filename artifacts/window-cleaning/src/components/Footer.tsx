import { useState } from "react";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { INK } from "@/lib/theme";
import { SocialLinks } from "@/components/SocialLinks";

const SERVICES = [
  "Ikkunanpesu",
  "Auton ulkopesu",
  "Nurmikon leikkuu",
  "Muut kotitalouspalvelut",
];

export function Footer() {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <footer className="mt-16 text-white" style={{ background: INK }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-8">

        {/* Logo, kuvaus ja some */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/sp-logo.png"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="w-11 h-11 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <div className="font-bold text-lg leading-tight">Siisti Pesu</div>
              <div className="text-xs text-white/55 leading-tight">4H-yritys</div>
            </div>
          </div>

          <p className="text-sm text-white/65 leading-relaxed max-w-xs">
            Nuorten yrittäjien kotitalouspalvelut Uudellamaalla.
          </p>

          <SocialLinks />
        </div>

        {/* Palvelut */}
        <div>
          <h3 className="font-semibold text-sm mb-4 text-white">Palvelut</h3>
          <ul className="space-y-2 text-sm text-white/65">
            {SERVICES.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>

        {/* Yhteystiedot */}
        <div>
          <h3 className="font-semibold text-sm mb-4 text-white">Yhteystiedot</h3>
          <ul className="space-y-2 text-sm text-white/65">
            <li>Uusimaa</li>
            <li>
              <a
                href="tel:+358442431103"
                className="hover:text-white transition-colors duration-150"
              >
                044 243 1103
              </a>
            </li>
            <li>
              <a
                href="mailto:siisti.pesu@gmail.com"
                className="hover:text-white transition-colors duration-150 break-all"
              >
                siisti.pesu@gmail.com
              </a>
            </li>
            <li>Y-tunnus 3609363-2</li>
          </ul>
        </div>

      </div>

      {/* Alatunniste */}
      <div
        className="px-4 py-5 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs text-white/45"
        style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}
      >
        <span>© 2026 Siisti Pesu</span>
        <span aria-hidden="true" className="hidden sm:inline">·</span>
        <button
          onClick={() => setPrivacyOpen(true)}
          className="underline underline-offset-2 hover:text-white transition-colors duration-150"
        >
          Tietosuojaseloste
        </button>
      </div>

      <PrivacyPolicy open={privacyOpen} onClose={() => setPrivacyOpen(false)} />
    </footer>
  );
}
