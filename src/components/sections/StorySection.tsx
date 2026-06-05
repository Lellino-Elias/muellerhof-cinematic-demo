"use client";

import { useEffect, useRef, useState } from "react";
import { campsite } from "@/content/campsite.config";
import Reveal from "@/components/ui/Reveal";

const MEDIA = [1, 2, 3, 4].map((n) => ({ src: `/story/clip${n}.mp4`, poster: `/story/clip${n}.jpg` }));

function MobileVideo({ src, poster, reduce }: { src: string; poster: string; reduce: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (reduce) return;
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play?.().catch(() => {});
        else v.pause?.();
      },
      { threshold: 0.4 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [reduce]);
  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

export default function StorySection() {
  const story = campsite.story;
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);
  const vids = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (!story) return;
    const els = blockRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.idx));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [story]);

  useEffect(() => {
    if (reduce) return;
    vids.current.forEach((v, i) => {
      if (!v) return;
      if (i === active) v.play?.().catch(() => {});
      else v.pause?.();
    });
  }, [active, reduce]);

  if (!story) return null;
  const chapters = story.chapters;

  return (
    <section id="story" className="relative scroll-mt-24 py-16 md:py-32">
      {/* Intro */}
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <div className="mb-10 max-w-2xl md:mb-20">
            <h2 className="font-display text-[clamp(1.75rem,4.5vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
              {story.heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">{story.intro}</p>
          </div>
        </Reveal>
      </div>

      {/* DESKTOP — left text scrolls, right media is pinned & cross-fades */}
      <div className="mx-auto hidden max-w-[1320px] grid-cols-2 gap-16 px-8 lg:grid">
        <div>
          {chapters.map((c, i) => (
            <div
              key={c.no}
              data-idx={i}
              ref={(el) => {
                blockRefs.current[i] = el;
              }}
              className="flex min-h-screen flex-col justify-center"
            >
              <div
                className={`max-w-md transition-all duration-500 ${
                  active === i ? "opacity-100" : "opacity-30"
                }`}
              >
                <span className="font-display block text-5xl font-extrabold text-gold/30">{c.no}</span>
                <h3 className="font-display mt-4 text-4xl font-bold leading-tight tracking-tight text-ink">
                  {c.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">{c.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="sticky top-0 flex h-screen items-center">
            <div className="relative aspect-square w-full overflow-hidden rounded-[2.2rem] bg-bg2 shadow-2xl ring-1 ring-black/5">
              {MEDIA.map((m, i) => (
                <video
                  key={m.src}
                  ref={(el) => {
                    vids.current[i] = el;
                  }}
                  src={m.src}
                  poster={m.poster}
                  muted
                  loop
                  playsInline
                  preload={i === 0 ? "metadata" : "none"}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out ${
                    active === i ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute bottom-5 left-6 flex items-center gap-2">
                {chapters.map((c, i) => (
                  <span
                    key={c.no}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      active === i ? "w-8 bg-white" : "w-1.5 bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE — stacked cards */}
      <div className="mx-auto max-w-xl space-y-12 px-5 md:space-y-16 lg:hidden">
        {chapters.map((c, i) => (
          <Reveal key={c.no}>
            <div>
              <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-bg2 shadow-xl ring-1 ring-black/5">
                {reduce ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={MEDIA[i].poster} alt={c.title} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <MobileVideo src={MEDIA[i].src} poster={MEDIA[i].poster} reduce={reduce} />
                )}
              </div>
              <div className="mt-5">
                <span className="font-display text-3xl font-extrabold text-gold/40">{c.no}</span>
                <h3 className="font-display mt-3 text-2xl font-bold tracking-tight text-ink">{c.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-muted">{c.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
