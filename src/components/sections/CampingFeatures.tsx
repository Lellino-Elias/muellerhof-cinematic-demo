import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { campsite } from "@/content/campsite.config";

export default function CampingFeatures() {
  const { heading, intro, features } = campsite.camping;
  const [lead, ...rest] = features;

  return (
    <section id="camping" className="scroll-mt-24 py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <div className="mb-12 max-w-2xl md:mb-16">
            <p className="eyebrow mb-4">Das Herzstück</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
              {heading}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">{intro}</p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {/* Lead feature — large */}
          <Reveal className="md:col-span-2 md:row-span-2">
            <article className="group relative h-full min-h-[340px] overflow-hidden rounded-[2rem] border border-line">
              <Image
                src={lead.image.src}
                alt={lead.image.alt}
                fill
                sizes="(max-width:768px) 100vw, 66vw"
                className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 md:p-10">
                <h3 className="font-display text-3xl font-bold text-ink md:text-4xl">{lead.title}</h3>
                <p className="mt-2 max-w-md text-sm text-ink/80">{lead.text}</p>
              </div>
            </article>
          </Reveal>

          {/* Remaining features */}
          {rest.map((f, i) => (
            <Reveal key={f.title} delay={i * 90}>
              <article className="group relative h-full min-h-[200px] overflow-hidden rounded-[2rem] border border-line bg-bg2">
                <Image
                  src={f.image.src}
                  alt={f.image.alt}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover opacity-70 transition-all duration-[1.2s] ease-out group-hover:scale-105 group-hover:opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/55 to-bg/10" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-display text-xl font-bold text-ink">{f.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink/75">{f.text}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
