import { NavLink } from "@/components/ui/Placeholder";
import Img from "@/components/ui/Img";
import Reveal from "@/components/ui/Reveal";
import { campsite } from "@/content/campsite.config";

const tile = "group relative overflow-hidden rounded-3xl shadow-[0_18px_40px_-24px_rgba(28,35,30,0.35)]";
const photo = "h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.045]";

export default function Galerie() {
  if (!campsite.galerie?.length) return null;
  const g = campsite.galerie;

  return (
    <section id="galerie" className="scroll-mt-24 bg-bg2 py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[34ch]">
              <h2 className="font-display text-[clamp(2.4rem,4vw,3.5rem)] font-extrabold leading-[1.0] tracking-tight text-ink">
                Ein Platz wie <span className="font-serif italic font-normal text-gold">gemalt</span>
              </h2>
              <p className="mt-4 max-w-[42ch] text-base leading-relaxed text-muted md:text-lg">
                Morgenlicht über dem türkisen See, lange Sommerabende auf der Terrasse, ein eigener Platz im Grünen — ein paar Eindrücke vom Müllerhof.
              </p>
            </div>
            <div className="flex items-center gap-2.5 whitespace-normal md:whitespace-nowrap pb-1.5 text-sm text-muted">
              <span className="inline-block h-[5px] w-[5px] rounded-full bg-gold" />
              Ausgewählte Aufnahmen · <b className="font-medium text-ink">Frühjahr bis Herbst</b>
            </div>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4 md:[grid-template-rows:260px_260px]">
            {/* Feature aerial */}
            <figure className={`${tile} col-span-2 aspect-[16/10] md:row-span-2 md:aspect-auto md:h-full`}>
              <Img src={g[0].src} alt={g[0].alt} fill sizes="(max-width:768px) 100vw, 50vw" className={photo} />
              <span className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,30,26,0.32) 0%, rgba(15,30,26,0) 38%)" }} />
              <figcaption className="absolute bottom-5 left-5 inline-flex items-center gap-2.5 rounded-full bg-bg/90 px-4 py-2.5 text-xs font-semibold text-ink shadow-lg backdrop-blur-sm">
                <span className="inline-block h-[7px] w-[7px] rounded-full bg-lake shadow-[0_0_0_4px_rgba(44,123,114,0.18)]" />
                Direkt am Keutschacher See
              </figcaption>
            </figure>

            {/* Three supporting tiles */}
            <figure className={`${tile} aspect-[4/3] md:aspect-auto md:h-full`}>
              <Img src={g[2].src} alt={g[2].alt} fill sizes="(max-width:768px) 50vw, 25vw" className={photo} />
            </figure>
            <figure className={`${tile} aspect-[4/3] md:aspect-auto md:h-full`}>
              <Img src={g[6].src} alt={g[6].alt} fill sizes="(max-width:768px) 50vw, 25vw" className={photo} />
            </figure>
            <figure className={`${tile} aspect-[4/3] md:aspect-auto md:h-full`}>
              <Img src={g[4].src} alt={g[4].alt} fill sizes="(max-width:768px) 50vw, 25vw" className={photo} />
            </figure>

            {/* CTA / entry tile → full gallery page */}
            <NavLink
              href="#"
              className="group relative flex aspect-[4/5] md:aspect-auto flex-col justify-between overflow-hidden rounded-3xl border border-white/10 p-5 md:p-6 text-white transition-transform duration-500 ease-out hover:-translate-y-1 md:h-full"
              style={{ background: "radial-gradient(120% 90% at 18% 0%, color-mix(in oklab, var(--lake) 32%, var(--lake-deep)) 0%, transparent 60%), var(--lake-deep)" }}
            >
              <span aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-[130px] w-[130px] rounded-full border border-gold/50 opacity-50" />
              <span className="font-display text-[2.1rem] md:text-[2.85rem] font-extrabold leading-[0.92] tracking-tight">
                +24
                <span className="mt-2 block font-serif text-base italic font-normal leading-snug text-[#e7d9c4]">Fotos in der vollen Galerie</span>
              </span>
              <span className="relative z-10 mt-3 flex items-center justify-between gap-2 border-t border-white/15 pt-3.5 text-[0.98rem] font-semibold">
                Zur Galerie
                <span className="inline-flex h-11 w-11 md:h-[34px] md:w-[34px] shrink-0 items-center justify-center rounded-full bg-gold text-white transition-transform duration-500 group-hover:translate-x-1">
                  <svg width="15" height="15" viewBox="0 0 14 14"><path d="M3 7h8M7.5 3.5 11 7l-3.5 3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
              </span>
            </NavLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
