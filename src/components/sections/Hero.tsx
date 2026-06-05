"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Img from "@/components/ui/Img";
import { campsite } from "@/content/campsite.config";
import { NavLink } from "@/components/ui/Placeholder";
import Magnetic from "@/components/ui/Magnetic";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  const { claim, claimEmphasis } = campsite;
  const [before, after] = claim.split(claimEmphasis);
  const hero = campsite.hero.aerial;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(mediaRef.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="top" ref={sectionRef} className="relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-bg2">
      {/* Media */}
      <div ref={mediaRef} className="absolute inset-0 z-0 will-change-transform">
        <Img src={hero.src} alt={hero.alt} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-black/20" />
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 72% 62% at 50% 48%, rgba(0,0,0,0.52), transparent 75%)" }}
        />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/45 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-[1320px] flex-col items-center justify-center px-5 text-center md:px-8">
        <h1
          className="font-display mx-auto max-w-4xl text-[clamp(2rem,9vw,5.5rem)] font-extrabold leading-[1.04] md:leading-[0.98] tracking-tight text-white [text-wrap:balance]"
          style={{ textShadow: "0 2px 30px rgba(0,0,0,0.4)" }}
        >
          {before}
          <span className="font-serif italic font-normal text-[#e6b667]">{claimEmphasis}</span>
          {after}
        </h1>

        <p
          className="mx-auto mt-6 max-w-xl text-base text-white md:text-lg"
          style={{ textShadow: "0 1px 18px rgba(0,0,0,0.6)" }}
        >
          {campsite.intro}
        </p>

        <div className="mt-7 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
          <Magnetic className="w-full justify-center sm:w-auto">
            <NavLink
              href="#booking"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-gold-soft w-full justify-center sm:w-auto"
            >
              Jetzt anfragen
              <svg width="15" height="15" viewBox="0 0 14 14"><path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </NavLink>
          </Magnetic>
          <a
            href={campsite.kontakt.telHref}
            className="inline-flex items-center gap-2 rounded-full border border-white/40 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 w-full justify-center sm:w-auto whitespace-nowrap"
          >
            <svg width="15" height="15" viewBox="0 0 16 16"><path d="M3 3.5c0 5 4.5 9.5 9.5 9.5l1.5-2.5-3-1.5-1.5 1.5C8 9.5 6.5 8 5.5 6.5L7 5 5.5 2 3 3.5Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" /></svg>
            {campsite.kontakt.tel}
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute bottom-6 md:bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2.5 text-white/85">
        <span className="text-[11px] uppercase tracking-[0.28em]">Scroll</span>
        <svg className="scroll-bob h-6 w-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M5 9.5 12 16l7-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}
