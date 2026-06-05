import Img from "@/components/ui/Img";
import Reveal from "@/components/ui/Reveal";
import { campsite } from "@/content/campsite.config";

export default function CampingFeatures() {
  const { heading, intro, features } = campsite.camping;
  const [lead, ...rest] = features;

  return (
    <section id="camping" className="scroll-mt-24 py-16 md:py-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <div className="mb-12 max-w-2xl md:mb-16">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
              {heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">{intro}</p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {/* Lead feature — large image with white text */}
          <Reveal className="md:col-span-2 md:row-span-2">
            <article className="group relative h-full min-h-[300px] md:min-h-[360px] overflow-hidden rounded-[2rem]">
              <Img src={lead.image.src} alt={lead.image.alt} fill sizes="(max-width:768px) 100vw, 66vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-10">
                <h3 className="font-display text-3xl font-bold text-white md:text-4xl">{lead.title}</h3>
                <p className="mt-2 max-w-md text-sm text-white/85">{lead.text}</p>
              </div>
            </article>
          </Reveal>

          {/* Remaining — light surface cards: image on top, text below */}
          {rest.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[2rem] bg-surface shadow-[0_14px_40px_-24px_rgba(28,35,30,0.22)]">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Img src={f.image.src} alt={f.image.alt} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-ink">{f.title}</h3>
                  <p className="mt-1.5 text-sm md:text-xs leading-relaxed text-muted">{f.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
