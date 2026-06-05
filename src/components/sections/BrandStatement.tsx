import Reveal from "@/components/ui/Reveal";
import { campsite } from "@/content/campsite.config";

export default function BrandStatement() {
  return (
    <section className="relative py-20 md:py-40">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <p className="font-display max-w-5xl text-[clamp(1.7rem,4vw,3.3rem)] font-semibold leading-[1.18] md:leading-[1.12] tracking-tight text-ink">
            <span className="emph">Freiheitsliebe</span>, Naturschönheit und echtes{" "}
            <span className="emph">Wohlfühlcamping</span> — hier wird Urlaub wieder zu dem, was er
            sein soll: ruhig, weit und ganz nah an der Natur.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:mt-20 md:grid-cols-3">
          {campsite.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div className="h-full bg-bg2 p-8 md:p-10">
                <span className="font-display text-sm font-bold text-gold">0{i + 1}</span>
                <h3 className="font-display mt-4 text-2xl font-bold text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
