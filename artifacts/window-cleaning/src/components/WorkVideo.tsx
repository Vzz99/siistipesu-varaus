import { useEffect, useRef, useState } from "react";

const DARK = "#0f172a";
const BORDER = "#e2e8f0";

/* Pystyvideo omasta työstä.
   Latautuu vasta kun se tulee lähelle näkymää, jotta
   etusivun ensilataus pysyy kevyenä. Julistekuva näkyy
   siihen asti, joten paikka ei ole koskaan tyhjä. */
export function WorkVideo({ className = "" }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);
  const [muted, setMuted] = useState(true);

  // Lataa video vasta kun se on tulossa näkyviin
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || load) return;

    if (!("IntersectionObserver" in window)) {
      setLoad(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  // Toista kun näkyvissä, pysäytä kun ei — säästää akkua
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !load) return;

    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) v.play().catch(() => {});
          else v.pause();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [load]);

  function toggleSound() {
    const v = videoRef.current;
    if (!v) return;
    const next = !muted;
    v.muted = next;
    setMuted(next);
    if (!next) v.play().catch(() => {});
  }

  return (
    <div
      ref={wrapRef}
      className={`relative rounded-2xl overflow-hidden bg-slate-100 ${className}`}
      style={{ aspectRatio: "9 / 16", border: `1px solid ${BORDER}` }}
    >
      {load ? (
        <video
          ref={videoRef}
          src="/hero.mp4"
          poster="/hero-poster.webp"
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Siisti Pesu pesee ikkunaa"
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src="/hero-poster.webp"
          alt="Siisti Pesu pesee ikkunaa"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
      )}

      {load && (
        <button
          type="button"
          onClick={toggleSound}
          aria-label={muted ? "Laita ääni päälle" : "Mykistä"}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-150 hover:bg-white"
          style={{ background: "rgba(255,255,255,0.9)", color: DARK }}
        >
          {muted ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5 6 9H2v6h4l5 4V5Z" />
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
              <path d="M19 5a9 9 0 0 1 0 14" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
}
