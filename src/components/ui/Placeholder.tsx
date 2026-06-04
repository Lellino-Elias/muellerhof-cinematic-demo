"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";
import { scrollToHash } from "@/lib/scroll";

const ToastCtx = createContext<(msg?: string) => void>(() => {});
export const usePlaceholderToast = () => useContext(ToastCtx);

export function PlaceholderProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const notify = useCallback((m?: string) => {
    setMsg(m ?? "Diese Seite wird nach Auftragserteilung gestaltet.");
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMsg(null), 3400);
  }, []);

  return (
    <ToastCtx.Provider value={notify}>
      {children}
      <div
        aria-live="polite"
        className={`fixed inset-x-0 bottom-6 z-[80] flex justify-center px-4 transition-all duration-500 ${
          msg ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 rounded-full border border-line bg-surface/90 px-5 py-3 text-sm text-ink shadow-2xl backdrop-blur-xl">
          <span className="inline-block h-2 w-2 rounded-full bg-gold" />
          {msg}
        </div>
      </div>
    </ToastCtx.Provider>
  );
}

/** Link that smooth-scrolls in-page anchors and shows a toast for dead links ("#"). */
export function NavLink({
  href,
  className = "",
  style,
  children,
  onNavigate,
}: {
  href: string;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onNavigate?: () => void;
}) {
  const notify = usePlaceholderToast();
  const handle = (e: React.MouseEvent) => {
    if (href === "#") {
      e.preventDefault();
      notify();
      return;
    }
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollToHash(href);
      onNavigate?.();
    }
  };
  return (
    <a href={href} onClick={handle} className={className} style={style}>
      {children}
    </a>
  );
}
