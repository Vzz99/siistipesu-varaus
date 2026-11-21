import { INK_SOFT } from "@/lib/theme";

/* Somelinkit yhtenä komponenttina, jotta osoitteet ja ikonit
   ovat yhdessä paikassa — niitä käytetään sekä footerissa että
   Tulokset-osiossa videoiden alla. */

export const INSTAGRAM = "https://www.instagram.com/siisti_pesu";
export const FACEBOOK = "https://www.facebook.com/share/1cs89fxLAC/";

interface Props {
  /** "solid" = tumma nappi (footer), "ghost" = läpikuultava (tumma osio). */
  variant?: "solid" | "ghost";
  size?: "sm" | "md";
  className?: string;
}

export function SocialLinks({
  variant = "solid",
  size = "md",
  className = "",
}: Props) {
  const box = size === "sm" ? "w-9 h-9" : "w-10 h-10";
  const icon = size === "sm" ? 17 : 19;
  const bg =
    variant === "solid" ? INK_SOFT : "rgba(255,255,255,0.10)";

  return (
    <div className={`flex gap-2 ${className}`}>
      <SocialLink
        href={INSTAGRAM}
        label="Siisti Pesu Instagramissa"
        box={box}
        icon={icon}
        bg={bg}
      >
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </SocialLink>
      <SocialLink
        href={FACEBOOK}
        label="Siisti Pesu Facebookissa"
        box={box}
        icon={icon}
        bg={bg}
      >
        <path d="M15 3h-2.5A4.5 4.5 0 0 0 8 7.5V10H5.5v4H8v8h4v-8h3l.5-4H12V7.5A1.5 1.5 0 0 1 13.5 6H15V3Z" />
      </SocialLink>
    </div>
  );
}

function SocialLink({
  href,
  label,
  box,
  icon,
  bg,
  children,
}: {
  href: string;
  label: string;
  box: string;
  icon: number;
  bg: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={`${box} rounded-xl flex items-center justify-center flex-shrink-0 text-white/70 transition-colors duration-150 hover:text-white`}
      style={{ background: bg }}
    >
      <svg
        width={icon}
        height={icon}
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
