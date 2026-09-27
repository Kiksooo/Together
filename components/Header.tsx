"use client";

import { useEffect, useRef } from "react";
import { createTimeline, prefersReducedMotion } from "@/lib/animations";

const navLinks = [
  { label: "HUG", href: "#hug" },
  { label: "THE IDEA", href: "#idea" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();
    const tl = createTimeline(reducedMotion);

    tl.fromTo(
      headerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: reducedMotion ? 0.01 : 2, delay: 1.8 },
    );

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateTone = () => {
      const stack = document.elementsFromPoint(
        Math.min(32, window.innerWidth / 2),
        16,
      );
      const under = stack.find((node) => !header.contains(node));
      const surface = under
        ?.closest("[data-surface]")
        ?.getAttribute("data-surface");
      header.dataset.tone = surface === "stone" ? "ink" : "ivory";
    };

    updateTone();
    window.addEventListener("scroll", updateTone, { passive: true });
    window.addEventListener("resize", updateTone);
    return () => {
      window.removeEventListener("scroll", updateTone);
      window.removeEventListener("resize", updateTone);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed inset-x-0 top-0 z-50 text-ivory opacity-0 data-[tone=ink]:text-ink"
      aria-label="Site header"
    >
      <div className="mx-auto flex items-center justify-between px-6 py-7 md:px-10 md:py-8 lg:px-14">
        <a
          href="#"
          className="font-sans text-[10px] font-normal uppercase tracking-[0.32em] text-current transition-opacity duration-700 hover:opacity-50"
          aria-label="TOGETHER home"
        >
          TOGETHER
        </a>

        <nav aria-label="Primary navigation">
          <ul className="flex items-center gap-5 sm:gap-8 md:gap-12">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="group relative font-sans text-[9px] font-normal uppercase tracking-[0.22em] text-current/60 transition-opacity duration-700 hover:opacity-50 sm:text-[10px] md:tracking-[0.28em]"
                >
                  {link.label}
                  <span
                    className="absolute -bottom-1.5 left-0 h-px w-0 bg-current transition-all duration-700 ease-out group-hover:w-full"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
