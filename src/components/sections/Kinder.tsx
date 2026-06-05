import Img from "@/components/ui/Img";
import Reveal from "@/components/ui/Reveal";
import { campsite } from "@/content/campsite.config";

export default function Kinder() {
  if (!campsite.kinder) return null;
  const { heading, intro, features } = campsite.kinder;
  const lead = features[0];

  return (
    <section id="kinder" className="scroll-mt-24 py-16 md:py-32">
      <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        {/* Lead image */}
        <Reveal>
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem]">
            <Img
              src={lead.image.src}
              alt={lead.image.alt}
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        {/* Text + feature list */}
        <div>
          <Reveal>
            <h2 className="font-display text-[clamp(1.75rem,6vw,3.6rem)] font-extrabold leading-[1.08] md:leading-[1.02] tracking-tight text-ink">
              {heading}
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted">{intro}</p>
          </Reveal>

          <div className="mt-8 md:mt-10 space-y-px overflow-hidden rounded-3xl border border-line bg-line">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={i * 90}>
                <div className="flex items-start gap-3 md:gap-4 bg-bg p-5 md:p-6">
                  <span className="font-display mt-0.5 text-sm font-bold text-gold">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-ink">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{f.text}</p>
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
