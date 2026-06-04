type LenisLike = { scrollTo: (target: Element | number, opts?: Record<string, unknown>) => void };

export function getLenis(): LenisLike | undefined {
  if (typeof window === "undefined") return undefined;
  return (window as unknown as { lenis?: LenisLike }).lenis;
}

export function scrollToHash(hash: string) {
  if (!hash || hash === "#") return;
  const el = document.querySelector(hash);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) lenis.scrollTo(el, { offset: -84 });
  else (el as HTMLElement).scrollIntoView({ behavior: "smooth", block: "start" });
}
