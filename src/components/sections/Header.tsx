"use client";

import { useEffect, useState } from "react";
import { campsite } from "@/content/campsite.config";
import { NavLink, usePlaceholderToast } from "@/components/ui/Placeholder";
import Magnetic from "@/components/ui/Magnetic";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const notify = usePlaceholderToast();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Over the hero image (top) → light text; once scrolled onto the light bg → ink text.
  const light = !scrolled;
  const primary = light ? "text-white" : "text-ink";
  const secondary = light ? "text-white/85" : "text-ink/80";
  const subtle = light ? "text-white/70" : "text-muted";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[70] transition-all duration-500 ${
        scrolled ? "border-b border-line bg-bg/85 py-3 backdrop-blur-xl" : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-5 md:px-8">
        {/* Wordmark */}
        <NavLink href="#top" className="flex flex-col leading-none">
          <span className={`font-display text-xl font-extrabold tracking-tight ${primary}`}>
            {campsite.shortName.toUpperCase()}
          </span>
          <span className={`mt-0.5 text-[10px] font-semibold uppercase tracking-[0.22em] ${subtle}`}>
            FKK-Camping · {campsite.see}
          </span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {campsite.nav.map((item) => (
            <div key={item.label} className="group relative">
              <NavLink
                href={item.href}
                className={`flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${secondary} hover:${primary}`}
              >
                {item.label}
                {item.children && (
                  <svg width="10" height="10" viewBox="0 0 10 10" className="mt-0.5 opacity-60 transition-transform duration-300 group-hover:rotate-180">
                    <path d="M2 3.5 5 6.5 8 3.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                )}
              </NavLink>
              {item.children && (
                <div className="invisible absolute left-1/2 top-full w-60 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="overflow-hidden rounded-2xl bg-surface p-2 shadow-2xl">
                    {item.children.map((c) => (
                      <NavLink
                        key={c.label}
                        href={c.href}
                        className="block rounded-xl px-3 py-2 text-sm text-ink/75 transition-colors hover:bg-bg2 hover:text-gold"
                      >
                        {c.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Right cluster */}
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-1 md:flex">
            {campsite.languages.map((lang, i) => (
              <button
                key={lang}
                onClick={() => i !== 0 && notify("Mehrsprachigkeit (EN/NL) folgt nach Auftragserteilung.")}
                className={`rounded-md px-1.5 py-0.5 text-xs font-semibold tracking-wide transition-colors ${
                  i === 0 ? "text-gold" : `${subtle} hover:${primary}`
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <Magnetic className="hidden sm:inline-block">
            <NavLink
              href="#booking"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gold-soft"
            >
              Direkt buchen
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </NavLink>
          </Magnetic>

          {/* Mobile toggle */}
          <button
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`flex h-11 w-11 items-center justify-center rounded-full border lg:hidden ${
              light ? "border-white/40 text-white" : "border-line text-ink"
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 18 18">
              {open ? (
                <path d="M4 4l10 10M14 4 4 14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              ) : (
                <path d="M2 5h14M2 9h14M2 13h14" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 top-0 z-[-1] bg-bg/98 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mx-auto flex h-full max-w-[1320px] flex-col gap-1 overflow-y-auto px-6 pb-10 pt-28">
          {campsite.nav.map((item) => (
            <div key={item.label} className="border-b border-line/60 py-3">
              <NavLink href={item.href} onNavigate={() => setOpen(false)} className="block py-1 font-display text-2xl font-bold text-ink">
                {item.label}
              </NavLink>
              {item.children && (
                <div className="mt-2 flex flex-wrap gap-x-2 gap-y-1">
                  {item.children.map((c) => (
                    <NavLink key={c.label} href={c.href} onNavigate={() => setOpen(false)} className="inline-flex min-h-[40px] items-center rounded-lg px-2 py-1.5 text-sm text-muted hover:text-gold">
                      {c.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
          <NavLink
            href="#booking"
            onNavigate={() => setOpen(false)}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-4 text-base font-semibold text-white"
          >
            Direkt buchen
          </NavLink>
        </div>
      </div>
    </header>
  );
}
