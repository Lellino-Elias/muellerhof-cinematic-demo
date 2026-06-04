import Image from "next/image";
import { campsite } from "@/content/campsite.config";
import { NavLink } from "@/components/ui/Placeholder";

export default function Footer() {
  const legal = [
    { label: "Impressum", href: "#" },
    { label: "Datenschutz", href: "#" },
    { label: "AGB", href: "#" },
    { label: "Offene Stellen", href: "#" },
  ];

  return (
    <footer className="border-t border-line bg-bg2">
      <div className="mx-auto max-w-[1320px] px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Brand + contact */}
          <div>
            <div className="font-display text-2xl font-extrabold tracking-tight text-ink">
              {campsite.shortName.toUpperCase()}
            </div>
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">
              FKK-Camping · {campsite.see}
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted">{campsite.kontakt.adresse}</p>
            <div className="mt-5 flex flex-col gap-1.5 text-sm">
              <a href={campsite.kontakt.telHref} className="text-ink/85 transition-colors hover:text-gold">{campsite.kontakt.tel}</a>
              <a href={`mailto:${campsite.kontakt.mail}`} className="text-ink/85 transition-colors hover:text-gold">{campsite.kontakt.mail}</a>
              <a href={campsite.kontakt.facebook} target="_blank" rel="noreferrer" className="text-ink/85 transition-colors hover:text-gold">Facebook</a>
            </div>
          </div>

          {/* Entdecken */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gold">Entdecken</h4>
            <ul className="space-y-2.5 text-sm">
              {campsite.nav.map((n) => (
                <li key={n.label}>
                  <NavLink href={n.href} className="text-muted transition-colors hover:text-ink">{n.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Service / legal */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gold">Service</h4>
            <ul className="space-y-2.5 text-sm">
              {legal.map((l) => (
                <li key={l.label}>
                  <NavLink href={l.href} className="text-muted transition-colors hover:text-ink">{l.label}</NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Sprachen + Logo */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-gold">Sprache</h4>
            <div className="flex gap-2">
              {campsite.languages.map((l, i) => (
                <span
                  key={l}
                  className={`rounded-md px-2 py-1 text-xs font-semibold ${i === 0 ? "bg-gold/15 text-gold" : "text-muted"}`}
                >
                  {l}
                </span>
              ))}
            </div>
            <div className="mt-6 inline-flex items-center rounded-xl bg-white/95 p-3">
              <Image src={`/campsites/${campsite.slug}/Logo-Muellerhof4c-07.png`} alt={`${campsite.name} Logo`} width={120} height={78} className="h-12 w-auto object-contain" />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>© {campsite.name}. Alle Rechte vorbehalten.</p>
          <p className="text-muted/70">Design-Demo · finale Unterseiten werden nach Auftragserteilung gestaltet.</p>
        </div>
      </div>
    </footer>
  );
}
