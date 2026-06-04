import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { campsite } from "@/content/campsite.config";

export default function TrustBar() {
  return (
    <section className="border-y border-line bg-bg2">
      <div className="mx-auto max-w-[1320px] px-5 py-12 md:px-8 md:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* USPs */}
          <Reveal>
            <ul className="flex flex-wrap gap-x-8 gap-y-4">
              {campsite.usps.map((u) => (
                <li key={u} className="flex items-center gap-2.5 text-sm font-medium text-ink/85">
                  <svg width="16" height="16" viewBox="0 0 16 16" className="shrink-0 text-gold">
                    <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {u}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* Awards */}
          <Reveal delay={120}>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              {campsite.awards.map((a) =>
                a.image ? (
                  <div
                    key={a.label}
                    title={a.label}
                    className="flex h-16 items-center justify-center rounded-2xl bg-white/95 px-4 shadow-lg"
                  >
                    <Image
                      src={a.image.src}
                      alt={a.image.alt}
                      width={120}
                      height={64}
                      className="h-12 w-auto object-contain"
                    />
                  </div>
                ) : null,
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
