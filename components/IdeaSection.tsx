"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function IdeaSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();
    const section = sectionRef.current;
    const label = labelRef.current;
    const headline = headlineRef.current;

    if (!section || !label || !headline) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([label, headline], { opacity: 1, y: 0 });
        return;
      }

      gsap.set([label, headline], { opacity: 0, y: 28 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          end: "top 28%",
          toggleActions: "play none none reverse",
        },
        defaults: { ease: EASE.soft },
      });

      tl.to(label, { opacity: 1, y: 0, duration: 1.1 }, 0).to(
        headline,
        { opacity: 1, y: 0, duration: 1.5 },
        0.14,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="idea"
      ref={sectionRef}
      aria-labelledby="idea-heading"
      data-surface="stone"
      className="idea-section relative overflow-hidden bg-stone text-ink"
    >
      <div className="relative mx-auto flex min-h-[100svh] max-w-[100vw] flex-col justify-center px-6 py-[18vh] md:px-[8vw] md:py-[22vh] lg:py-[24vh]">
        <p
          ref={labelRef}
          className="font-sans text-[9px] uppercase tracking-[0.48em] text-ink-faint md:text-[10px]"
        >
          THE IDEA
        </p>

        <h2
          id="idea-heading"
          ref={headlineRef}
          className="mt-10 max-w-[min(92vw,920px)] font-serif text-[clamp(2.75rem,9.5vw,7.5rem)] font-light leading-[0.92] tracking-[-0.035em] text-ink md:mt-14 lg:max-w-[min(78vw,980px)]"
        >
          Some connections
          <br />
          deserve to remain
          <br />
          together.
        </h2>
      </div>
    </section>
  );
}
