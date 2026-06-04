"use client";

import { useEffect, useRef, useState } from "react";
import { campsite } from "@/content/campsite.config";
import { usePlaceholderToast, NavLink } from "@/components/ui/Placeholder";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";

/** Tween a number toward `target` whenever it changes. */
function useTween(target: number, duration = 650) {
  const [val, setVal] = useState(target);
  const prev = useRef(target);
  const raf = useRef(0);
  useEffect(() => {
    const from = prev.current;
    const start = performance.now();
    cancelAnimationFrame(raf.current);
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(from + (target - from) * e));
      if (p < 1) raf.current = requestAnimationFrame(step);
      else prev.current = target;
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);
  return val;
}

function nightsBetween(a: string, b: string) {
  const d1 = new Date(a).getTime();
  const d2 = new Date(b).getTime();
  if (!d1 || !d2 || d2 <= d1) return 1;
  return Math.max(1, Math.round((d2 - d1) / 86400000));
}

export default function Booking() {
  const { heading, intro, categories, pricesArePlaceholder } = campsite.booking;
  const notify = usePlaceholderToast();
  const bandVid = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const v = bandVid.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play?.().catch(() => {});
        else v.pause?.();
      },
      { threshold: 0.2 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const [arrival, setArrival] = useState("2026-07-12");
  const [departure, setDeparture] = useState("2026-07-19");
  const [guests, setGuests] = useState(2);
  const [catId, setCatId] = useState(categories[0].id);

  const cat = categories.find((c) => c.id === catId) ?? categories[0];
  const nights = nightsBetween(arrival, departure);
  const extra = Math.max(0, guests - 2) * (cat.perExtraGuest ?? 0);
  const total = (cat.perNight + extra) * nights;
  const animatedTotal = useTween(total);

  const field = "w-full rounded-xl border border-line bg-bg2 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold/60";

  return (
    <section id="booking" className="scroll-mt-24 bg-bg">
      {/* Cinematic transition from the story into booking */}
      <div className="relative flex h-[82vh] min-h-[540px] w-full items-center justify-center overflow-hidden">
        <video ref={bandVid} src="/story/clip4.mp4" poster="/story/clip4.jpg" muted loop playsInline preload="none" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-bg to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg via-bg/70 to-transparent" />
        <div className="relative z-10 mx-auto max-w-2xl px-5 text-center">
          <Reveal>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#e6b667]">Dein Platz wartet</p>
            <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.4rem)] font-extrabold leading-[1.0] tracking-tight text-white">
              Bereit für deinen <span className="font-serif italic font-normal text-[#e6b667]">eigenen</span> Urlaub?
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base text-white/85 md:text-lg">
              Frag unverbindlich an oder buche direkt — mit Platzgarantie und ohne Reservierungsgebühr.
            </p>
            <div className="mt-8 flex justify-center">
              <Magnetic>
                <NavLink href="#booking-widget" className="inline-flex items-center gap-2 rounded-full bg-gold px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-gold-soft">
                  Verfügbarkeit prüfen
                  <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 2.5v9M3.5 8 7 11.5 10.5 8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </NavLink>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Widget */}
      <div id="booking-widget" className="mx-auto max-w-[1320px] scroll-mt-24 px-5 pb-24 pt-16 md:px-8 md:pb-32">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-4">Verfügbarkeit & Preis</p>
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
              {heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">{intro}</p>
          </div>
        </Reveal>

        <div className="grid gap-6 lg:grid-cols-[1.55fr_1fr]">
          {/* Widget */}
          <Reveal>
            <div className="rounded-[2rem] border border-line bg-surface/60 p-6 backdrop-blur-sm md:p-9">
              {/* Inputs */}
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Anreise</span>
                  <input type="date" value={arrival} onChange={(e) => setArrival(e.target.value)} className={field} />
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Abreise</span>
                  <input type="date" value={departure} onChange={(e) => setDeparture(e.target.value)} className={field} />
                </label>
              </div>

              {/* Guests */}
              <div className="mt-4">
                <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Personen</span>
                <div className="flex items-center gap-4 rounded-xl border border-line bg-bg2 px-4 py-2.5">
                  <button
                    aria-label="weniger"
                    onClick={() => setGuests((g) => Math.max(1, g - 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-lg text-ink transition-colors hover:border-gold/60 hover:text-gold"
                  >
                    −
                  </button>
                  <span className="font-display min-w-6 text-center text-lg font-bold text-ink">{guests}</span>
                  <button
                    aria-label="mehr"
                    onClick={() => setGuests((g) => Math.min(8, g + 1))}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-line text-lg text-ink transition-colors hover:border-gold/60 hover:text-gold"
                  >
                    +
                  </button>
                  <span className="ml-auto text-xs text-muted">{nights} {nights === 1 ? "Nacht" : "Nächte"}</span>
                </div>
              </div>

              {/* Category selector — animated price cards */}
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {categories.map((c) => {
                  const active = c.id === catId;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setCatId(c.id)}
                      className={`rounded-2xl border p-4 text-left transition-all ${
                        active ? "border-gold bg-gold/10" : "border-line bg-bg2 hover:border-ink/30"
                      }`}
                    >
                      <span className="block text-sm font-semibold text-ink">{c.label}</span>
                      <span className="mt-1 block text-xs text-muted">
                        ab <span className="font-display text-base font-bold text-gold">€{c.perNight}</span> / Nacht
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Price + CTAs */}
              <div className="mt-7 flex flex-col gap-5 border-t border-line pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="text-xs uppercase tracking-wider text-muted">
                    Gesamt · {cat.label} · {guests} Pers. · {nights} {nights === 1 ? "Nacht" : "Nächte"}
                  </span>
                  <div className="font-display mt-1 text-5xl font-extrabold tracking-tight text-ink">
                    €{animatedTotal}
                  </div>
                  {pricesArePlaceholder && (
                    <span className="mt-1 block text-[11px] text-muted">Richtpreis · unverbindlich · ohne Reservierungsgebühr</span>
                  )}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Magnetic>
                    <button
                      onClick={() => notify("Buchungsanfrage wird per E-Mail gesendet (Demo).")}
                      className="rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gold-soft"
                    >
                      Jetzt buchen
                    </button>
                  </Magnetic>
                  <button
                    onClick={() => notify("Anfrage wird per E-Mail gesendet (Demo).")}
                    className="rounded-full border border-line px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink/40 hover:bg-white/5"
                  >
                    Anfrage senden
                  </button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Sidebar */}
          <Reveal delay={120}>
            <div className="flex h-full flex-col gap-5 rounded-[2rem] border border-line bg-bg2 p-6 md:p-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Saison</span>
                <p className="font-display mt-1 text-xl font-bold text-ink">
                  {campsite.saison.von} – {campsite.saison.bis}
                </p>
              </div>
              <div className="h-px bg-line" />
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted">Inklusive</span>
                <ul className="mt-3 space-y-2">
                  {campsite.usps.slice(0, 4).map((u) => (
                    <li key={u} className="flex items-center gap-2.5 text-sm text-ink/85">
                      <svg width="15" height="15" viewBox="0 0 16 16" className="shrink-0 text-gold">
                        <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-auto rounded-2xl bg-gold/10 p-4">
                <p className="text-sm font-semibold text-gold">Ohne Reservierungsgebühr</p>
                <p className="mt-1 text-xs text-muted">Spontane Buchungen mit Platzgarantie — ohne Preisaufschlag.</p>
              </div>
              <a href={campsite.kontakt.telHref} className="text-sm text-ink/85 transition-colors hover:text-gold">
                ☎ {campsite.kontakt.tel}
              </a>
              <a href={`mailto:${campsite.kontakt.mail}`} className="-mt-3 text-sm text-ink/85 transition-colors hover:text-gold">
                ✉ {campsite.kontakt.mail}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
