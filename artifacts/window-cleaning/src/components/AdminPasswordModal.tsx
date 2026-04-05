import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ADMIN_PASSWORD = "admin123";

interface Props {
  open: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

export function AdminPasswordModal({ open, onSuccess, onCancel }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setPassword("");
      setError(false);
      setTimeout(() => inputRef.current?.focus(), 120);
    }
  }, [open]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError(false);
      onSuccess();
    } else {
      setError(true);
      setShake(true);
      setPassword("");
      setTimeout(() => setShake(false), 500);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Escape") onCancel();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
        >
          <motion.div
            key="modal"
            initial={{ scale: 0.92, opacity: 0, y: 16 }}
            animate={shake ? { x: [-8, 8, -6, 6, -4, 4, 0] } : { scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.92, opacity: 0, y: 16 }}
            transition={shake ? { duration: 0.4 } : { type: "spring", stiffness: 280, damping: 22 }}
            className="bg-card border border-card-border rounded-2xl shadow-xl w-full max-w-sm mx-4 overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            <div className="px-6 pt-6 pb-2 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h2 className="font-bold text-foreground text-lg">Yllapito</h2>
              <p className="text-sm text-muted-foreground mt-1">Syota yllapitosalasana</p>
            </div>

            <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-3">
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="Salasana..."
                className={`w-full px-4 py-3 rounded-xl border text-sm bg-background outline-none transition-all duration-150 focus:ring-2 focus:ring-primary/30 ${
                  error ? "border-destructive focus:border-destructive" : "border-input focus:border-primary"
                }`}
                autoComplete="current-password"
              />
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xs text-destructive flex items-center gap-1.5"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                  Vaarä salasana
                </motion.p>
              )}
              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 py-2.5 rounded-xl border border-border text-sm font-medium text-muted-foreground hover:bg-muted transition-colors"
                >
                  Peruuta
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-sm"
                >
                  Kirjaudu
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
