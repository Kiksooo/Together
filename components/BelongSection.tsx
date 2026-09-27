"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function BelongSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const ruleRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const markRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();
    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const headline = headlineRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const rule = ruleRef.current;
    const body = bodyRef.current;
    const mark = markRef.current;

    if (
      !section ||
      !eyebrow ||
      !headline ||
      !line1 ||
      !line2 ||
      !rule ||
      !body ||
      !mark
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([eyebrow, body, mark], { opacity: 1 });
        gsap.set([line1, line2], { yPercent: 0 });
        gsap.set(rule, { scaleX: 1 });
        return;
      }

      gsap.set(eyebrow, { opacity: 0 });
      gsap.set([line1, line2], { yPercent: 110 });
      gsap.set(rule, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(body, { opacity: 0 });
      gsap.set(mark, { opacity: 0 });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        })
        .to(eyebrow, { opacity: 1, duration: 2.4, ease: "power1.out" }, 0)
        .to(line1, { yPercent: 0, duration: 1.85, ease: "power3.out" }, 0.55)
        .to(line2, { yPercent: 0, duration: 1.85, ease: "power3.out" }, 0.98)
        .to(rule, { scaleX: 1, duration: 1.7, ease: "power2.out" }, 1.6)
        .to(body, { opacity: 1, duration: 2.1, ease: "power1.out" }, 1.75)
        .to(mark, { opacity: 1, duration: 1.9, ease: "power1.out" }, 2.25);

      gsap.fromTo(
        headline,
        { y: 14 },
        {
          y: -10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.6,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="belong"
      ref={sectionRef}
      aria-labelledby="belong-heading"
      className="relative bg-charcoal text-ivory"
    >
      <div className="relative mx-auto flex min-h-[100svh] max-w-[100vw] flex-col px-6 pb-[14vh] pt-[18vh] md:px-[7vw] md:pb-[12vh] md:pt-[15vh]">
        <p
          ref={eyebrowRef}
          className="font-sans text-[9px] uppercase tracking-[0.54em] text-ivory-faint md:text-[10px]"
        >
          DESIGNED TO BELONG
        </p>

        <h2
          id="belong-heading"
          ref={headlineRef}
          className="mt-[15vh] font-serif text-[clamp(2.4rem,11vw,7.6rem)] font-light leading-[0.9] tracking-[-0.045em] text-ivory will-change-transform md:mt-[16vh] md:pl-[4vw] lg:pl-[5vw]"
        >
          <span className="block overflow-hidden pb-[0.08em]">
            <span ref={line1Ref} className="block">
              Made for the places
            </span>
          </span>
          <span className="-mt-[0.06em] block overflow-hidden pb-[0.1em]">
            <span ref={line2Ref} className="block">
              where life continues.
            </span>
          </span>
        </h2>

        <div className="mt-auto w-full max-w-[32ch] pt-[16vh] md:ml-auto md:mr-[4vw] md:pt-[14vh] lg:mr-[8vw]">
          <span
            ref={ruleRef}
            aria-hidden="true"
            className="mb-8 block h-px w-12 origin-left bg-ivory/30 md:mb-10"
          />
          <p
            ref={bodyRef}
            className="font-sans text-[11px] font-light leading-[1.95] tracking-[0.03em] text-ivory-muted md:text-[12px]"
          >
            A sculptural object designed to live naturally within the home —
            alongside the objects, photographs and memories that already
            matter.
          </p>
          <p
            ref={markRef}
            className="mt-12 font-sans text-[9px] uppercase tracking-[0.46em] text-ivory-faint md:mt-16 md:text-[10px]"
          >
            TOGETHER — HUG
          </p>
        </div>
      </div>
    </section>
  );
}
