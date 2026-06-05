import Img from "@/components/ui/Img";
import Reveal from "@/components/ui/Reveal";
import { NavLink } from "@/components/ui/Placeholder";
import { campsite } from "@/content/campsite.config";

export default function Mobilheime() {
  if (!campsite.mobilheime) return null;
  const { heading, intro, items } = campsite.mobilheime;

  return (
    <section id="mobilheime" className="scroll-mt-24 bg-bg2 py-16 md:py-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 md:mb-16">
            <div className="max-w-2xl">
              <h2 className="font-display text-[clamp(1.75rem,4.5vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
                {heading}
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">{intro}</p>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((m, i) => (
            <Reveal key={m.name} delay={i * 110}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-surface shadow-[0_14px_40px_-24px_rgba(28,35,30,0.22)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Img
                    src={m.image.src}
                    alt={m.image.alt}
                    fill
                    sizes="(max-width:768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-black/45 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                    {m.kind}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl font-bold text-ink">{m.name}</h3>
                    {m.priceFrom && (
                      <span className="text-sm text-muted">
                        ab <span className="font-display text-lg font-bold text-gold">€{m.priceFrom}</span>
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
                  {m.features && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {m.features.map((f) => (
                        <li key={f} className="rounded-full border border-line px-2.5 py-1 text-xs text-ink/80">
                          {f}
                        </li>
                      ))}
                    </ul>
                  )}
                  <NavLink
                    href="#booking"
                    className="mt-6 -mx-1 inline-flex min-h-[44px] items-center gap-2 self-start px-1 py-2 text-sm font-semibold text-gold transition-colors hover:text-gold-soft"
                  >
                    Verfügbarkeit anfragen
                    <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </NavLink>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
