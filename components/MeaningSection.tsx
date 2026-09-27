"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function MeaningSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();
    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const body = bodyRef.current;

    if (!section || !eyebrow || !line1 || !line2 || !body) return;

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([eyebrow, line1, line2, body], { opacity: 1, y: 0 });
        return;
      }

      gsap.set(eyebrow, { opacity: 0 });
      gsap.set([line1, line2], { opacity: 0, y: 12 });
      gsap.set(body, { opacity: 0, y: 8 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        })
        .to(eyebrow, { opacity: 1, duration: 2.2, ease: "power1.out" }, 0)
        .to(line1, { opacity: 1, y: 0, duration: 1.7, ease: "power2.out" }, 0.45)
        .to(line2, { opacity: 1, y: 0, duration: 1.7, ease: "power2.out" }, 1.05)
        .to(body, { opacity: 1, y: 0, duration: 1.9, ease: "power1.out" }, 1.85);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="meaning"
      ref={sectionRef}
      aria-labelledby="meaning-heading"
      className="relative overflow-x-hidden bg-charcoal text-ivory"
    >
      <div className="relative mx-auto flex min-h-[100svh] max-w-[100vw] flex-col px-6 pb-[16vh] pt-[18vh] md:px-[6vw] md:pb-[14vh] md:pt-[14vh]">
        <p
          ref={eyebrowRef}
          className="font-sans text-[9px] uppercase tracking-[0.42em] text-ivory-faint md:text-[10px] md:tracking-[0.46em]"
        >
          04 / THE MEANING
        </p>

        <h2
          id="meaning-heading"
          className="mt-[10vh] max-w-[100%] font-serif text-[clamp(2.15rem,9vw,2.85rem)] font-light leading-[0.9] tracking-[-0.035em] text-ivory md:mt-[11vh] md:text-[clamp(4.1rem,8.8vw,8.75rem)]"
        >
          <span className="block overflow-hidden pb-[0.08em]">
            <span ref={line1Ref} className="block will-change-transform">
              For the relationships
            </span>
          </span>
          <span className="ml-[8vw] -mt-[0.02em] block overflow-hidden pb-[0.14em] md:ml-[7vw]">
            <span ref={line2Ref} className="block will-change-transform">
              we never want to lose.
            </span>
          </span>
        </h2>

        <p
          ref={bodyRef}
          className="mt-[18vh] max-w-[24ch] self-start font-sans text-[12px] font-light leading-[1.9] tracking-[0.03em] text-ivory-muted md:mb-[4vh] md:ml-auto md:mr-[7vw] md:mt-auto md:max-w-[28ch] md:self-end md:text-[13px]"
        >
          A physical expression of a relationship that continues to matter.
        </p>
      </div>
    </section>
  );
}
