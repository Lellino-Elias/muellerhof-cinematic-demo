import Img from "@/components/ui/Img";
import Reveal from "@/components/ui/Reveal";
import { campsite } from "@/content/campsite.config";

export default function BrandStatement() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <h2 className="font-display max-w-[20ch] text-[clamp(1.9rem,3.6vw,3rem)] font-semibold leading-[1.12] tracking-tight text-ink">
            Hier wird Urlaub wieder zu dem, was er sein soll — ruhig, weit und{" "}
            <span className="font-serif italic font-normal text-gold">ganz nah an der Natur</span>.
          </h2>
        </Reveal>

        {/* Photo-led value pillars (data-driven: any campsite swaps title/text/image) */}
        <div className="mt-12 grid gap-5 md:mt-14 md:grid-cols-3">
          {campsite.pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 110}>
              <article className="group relative aspect-[16/10] overflow-hidden rounded-[1.75rem] shadow-[0_18px_40px_-22px_rgba(28,35,30,0.5)] sm:aspect-[16/11] md:aspect-[3/3.7]">
                <Img
                  src={p.image.src}
                  alt={p.image.alt}
                  fill
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.07]"
                />
                <span
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "linear-gradient(180deg, rgba(18,22,19,0) 34%, rgba(18,22,19,0.3) 58%, rgba(15,18,16,0.8) 100%)" }}
                />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <h3
                    className="font-display text-2xl font-bold leading-tight tracking-tight text-white"
                    style={{ textShadow: "0 1px 14px rgba(10,14,11,0.45)" }}
                  >
                    {p.title}
                  </h3>
                  <p
                    className="mt-2 max-w-[30ch] text-sm leading-relaxed text-white/90"
                    style={{ textShadow: "0 1px 10px rgba(10,14,11,0.4)" }}
                  >
                    {p.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
