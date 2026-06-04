"use client";

import dynamic from "next/dynamic";
import Reveal from "@/components/ui/Reveal";
import { campsite } from "@/content/campsite.config";

const MapClient = dynamic(() => import("@/components/ui/MapClient"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse bg-bg2" />,
});

export default function LageAnreise() {
  const { heading, modes } = campsite.anreise;
  const { coords, adresse } = campsite.kontakt;
  const name = campsite.name;

  return (
    <section id="anreise" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto grid max-w-[1320px] items-stretch gap-8 px-5 md:px-8 lg:grid-cols-2 lg:gap-12">
        {/* Map */}
        <Reveal>
          <div className="relative h-[360px] overflow-hidden rounded-[2rem] border border-line lg:h-full lg:min-h-[460px]">
            <MapClient lat={coords.lat} lng={coords.lng} label={name} />
            <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-line bg-bg/80 px-4 py-2 text-xs text-ink backdrop-blur-md">
              {adresse}
            </div>
          </div>
        </Reveal>

        {/* Anreise modes */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <p className="eyebrow mb-4">Anreise</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
              {heading}
            </h2>
          </Reveal>
          <div className="mt-8 space-y-px overflow-hidden rounded-3xl border border-line bg-line">
            {modes.map((m, i) => (
              <Reveal key={m.title} delay={i * 90}>
                <div className="flex items-start gap-4 bg-bg p-6">
                  <span className="font-display mt-0.5 text-sm font-bold text-gold">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">{m.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{m.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
