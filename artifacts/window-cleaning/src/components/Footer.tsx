import { useState } from "react";
import { PrivacyPolicy } from "@/components/PrivacyPolicy";
import { INK, INK_SOFT } from "@/lib/theme";

const INSTAGRAM = "https://www.instagram.com/siisti_pesu";
const FACEBOOK = "https://www.facebook.com/share/1cs89fxLAC/";

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

          <div className="flex gap-2">
            <SocialLink href={INSTAGRAM} label="Siisti Pesu Instagramissa">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
            </SocialLink>
            <SocialLink href={FACEBOOK} label="Siisti Pesu Facebookissa">
              <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5.5v4H8v8h4v-8h3l.5-4H12V7.5A1.5 1.5 0 0 1 13.5 6H15V3Z" />
            </SocialLink>
          </div>
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

/* Somelinkki. Ikoni piirretaan SVG:na, jotta se seuraa
   teeman varia eika ole erillinen kuvatiedosto. */
function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-xl flex items-center justify-center text-white/70 transition-colors duration-150 hover:text-white"
      style={{ background: INK_SOFT }}
    >
      <svg
        width="19"
        height="19"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {children}
      </svg>
    </a>
  );
}
