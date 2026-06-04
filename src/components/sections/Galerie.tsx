import Img from "@/components/ui/Img";
import Reveal from "@/components/ui/Reveal";
import { campsite } from "@/content/campsite.config";

export default function Galerie() {
  if (!campsite.galerie?.length) return null;

  return (
    <section id="galerie" className="scroll-mt-24 bg-bg2 py-24 md:py-32">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8">
        <Reveal>
          <div className="mb-12 max-w-2xl">
            <p className="eyebrow mb-4">Eindrücke</p>
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.6rem)] font-extrabold leading-[1.02] tracking-tight text-ink">
              Ein Platz wie gemalt
            </h2>
          </div>
        </Reveal>

        <div className="columns-2 gap-4 [column-fill:_balance] md:columns-3 lg:columns-4">
          {campsite.galerie.map((img, i) => (
            <Reveal key={img.src} delay={(i % 4) * 70}>
              <div className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl border border-line">
                <Img
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={i % 3 === 0 ? 1000 : 600}
                  sizes="(max-width:768px) 50vw, 25vw"
                  className="h-auto w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-bg/0 transition-colors duration-500 group-hover:bg-bg/10" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
