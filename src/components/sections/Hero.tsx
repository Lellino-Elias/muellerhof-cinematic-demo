"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { campsite } from "@/content/campsite.config";
import { NavLink } from "@/components/ui/Placeholder";
import Magnetic from "@/components/ui/Magnetic";

type HeroVariant = "aerial" | "sunset";

export default function Hero() {
  const [variant, setVariant] = useState<HeroVariant>("aerial");
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const { claim, claimEmphasis } = campsite;
  const [before, after] = claim.split(claimEmphasis);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        yPercent: 16,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={sectionRef} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      {/* Parallax media */}
      <div ref={mediaRef} className="absolute inset-0 -z-10 will-change-transform">
        {(["aerial", "sunset"] as HeroVariant[]).map((v) => (
          <Image
            key={v}
            src={campsite.hero[v].src}
            alt={campsite.hero[v].alt}
            fill
            priority={v === "aerial"}
            sizes="100vw"
            className={`object-cover transition-opacity duration-[1200ms] ease-out ${
              variant === v ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-bg/55 via-bg/25 to-bg" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/70 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="mx-auto flex h-full max-w-[1320px] flex-col justify-end px-5 pb-24 md:px-8 md:pb-28">
        <p className="eyebrow reveal is-in mb-5 flex items-center gap-3">
          <span className="inline-block h-px w-8 bg-gold" />
          {campsite.region} · {campsite.see}
        </p>

        <h1 className="font-display max-w-4xl text-[clamp(2.6rem,6.5vw,5.5rem)] font-extrabold leading-[0.98] tracking-tight text-ink">
          {before}
          <span className="emph">{claimEmphasis}</span>
          {after}
        </h1>

        <p className="mt-6 max-w-xl text-base text-ink/80 md:text-lg">{campsite.intro}</p>

        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Magnetic>
            <NavLink
              href="#booking"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-[#14100a] transition-colors hover:bg-gold-soft"
            >
              Jetzt anfragen
              <svg width="15" height="15" viewBox="0 0 14 14"><path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </NavLink>
          </Magnetic>
          <a
            href={campsite.kontakt.telHref}
            className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-4 text-sm font-semibold text-ink backdrop-blur-sm transition-colors hover:border-ink/40 hover:bg-white/5"
          >
            <svg width="15" height="15" viewBox="0 0 16 16"><path d="M3 3.5c0 5 4.5 9.5 9.5 9.5l1.5-2.5-3-1.5-1.5 1.5C8 9.5 6.5 8 5.5 6.5L7 5 5.5 2 3 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
            {campsite.kontakt.tel}
          </a>
        </div>
      </div>

      {/* Hero image toggle (build both, choose in overview) */}
      <div className="absolute bottom-8 right-5 z-10 flex items-center gap-1 rounded-full border border-line bg-bg/50 p-1 backdrop-blur-md md:right-8">
        {(
          [
            ["aerial", "Luftaufnahme"],
            ["sunset", "Sonnenuntergang"],
          ] as [HeroVariant, string][]
        ).map(([v, label]) => (
          <button
            key={v}
            onClick={() => setVariant(v)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              variant === v ? "bg-gold text-[#14100a]" : "text-ink/70 hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted md:flex">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
