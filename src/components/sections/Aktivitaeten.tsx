"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { campsite } from "@/content/campsite.config";

export default function Aktivitaeten() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!campsite.aktivitaeten) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < 1024) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;
      const distance = track.scrollWidth - window.innerWidth + 96;
      if (distance <= 0) return;
      gsap.to(track, {
        x: -distance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!campsite.aktivitaeten) return null;
  const { heading, intro, items } = campsite.aktivitaeten;

  return (
    <section id="aktivitaeten" ref={sectionRef} className="scroll-mt-24 overflow-hidden py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-4">Erlebnisregion Kärnten</p>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
            {heading}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">{intro}</p>
        </div>
      </div>

      {/* Horizontal track: GSAP-pinned on desktop, native scroll on mobile */}
      <div
        ref={trackRef}
        className="no-scrollbar flex gap-5 overflow-x-auto px-5 pb-2 md:px-8 lg:overflow-visible"
      >
        {items.map((a) => (
          <article
            key={a.title}
            className="group relative h-[420px] w-[78vw] shrink-0 overflow-hidden rounded-[2rem] border border-line sm:w-[420px]"
          >
            <Image
              src={a.image.src}
              alt={a.image.alt}
              fill
              sizes="420px"
              className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/25 to-transparent" />
            <div className="absolute bottom-0 left-0 p-7">
              <h3 className="font-display text-2xl font-bold text-ink">{a.title}</h3>
              <p className="mt-2 max-w-xs text-sm text-ink/80">{a.text}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
