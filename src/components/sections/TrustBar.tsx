import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { campsite } from "@/content/campsite.config";

export default function TrustBar() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-bg2 px-5 py-24 md:px-8 md:py-28">
      {/* faint warm/lake wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 50% -10%, color-mix(in oklab, var(--gold) 8%, transparent) 0%, transparent 55%), radial-gradient(80% 70% at 50% 120%, color-mix(in oklab, var(--lake) 6%, transparent) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1080px] text-center">
        <Reveal>
          <h2 className="font-display mx-auto max-w-[20ch] text-[clamp(2.1rem,4vw,3.05rem)] font-extrabold leading-[1.03] tracking-tight text-ink">
            Worauf du dich <span className="font-serif italic font-normal text-gold">verlassen</span> kannst
          </h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
            Keine versteckten Gebühren, geprüfte Qualität und mehrfach ausgezeichnet — vom ersten Klick bis zur Abreise am See.
          </p>
          <div className="mx-auto mt-8 h-0.5 w-12 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent" />
        </Reveal>

        <Reveal delay={120}>
          <ul className="mx-auto mt-11 flex max-w-[880px] flex-wrap justify-center gap-3.5">
            {campsite.usps.map((u) => (
              <li
                key={u}
                className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/60 py-3 pl-4 pr-5 text-sm font-medium text-ink shadow-[0_1px_0_rgba(255,255,255,0.7)_inset]"
              >
                <span className="grid h-[22px] w-[22px] shrink-0 place-items-center rounded-full bg-gold/10">
                  <svg width="13" height="13" viewBox="0 0 16 16" className="text-gold">
                    <path d="M3 8.5l3.2 3.3L13 4.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {u}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-14 flex flex-wrap items-stretch justify-center gap-7">
            {campsite.awards.map((a) =>
              a.image ? (
                <figure key={a.label} className="flex w-[248px] flex-col items-center gap-4">
                  <div className="grid aspect-[1.42/1] w-full place-items-center rounded-3xl border border-line bg-surface px-7 py-6 shadow-[0_18px_40px_-22px_rgba(28,35,30,0.3)]">
                    <Image
                      src={a.image.src}
                      alt={a.image.alt}
                      width={180}
                      height={120}
                      className="max-h-[118px] w-auto object-contain"
                    />
                  </div>
                  <figcaption className="max-w-[20ch] text-center text-sm font-semibold leading-snug text-muted">
                    {a.label}
                  </figcaption>
                </figure>
              ) : null,
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
