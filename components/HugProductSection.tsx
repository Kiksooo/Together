"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

function revealOnEnter(
  trigger: Element,
  targets: gsap.TweenTarget,
  reducedMotion: boolean,
  start = "top 78%",
) {
  if (reducedMotion) {
    gsap.set(targets, { opacity: 1, y: 0, scale: 1 });
    return;
  }

  gsap.set(targets, { opacity: 0, y: 32, scale: 1.02 });

  gsap.to(targets, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 1.5,
    ease: EASE.soft,
    stagger: 0.14,
    scrollTrigger: {
      trigger,
      start,
      toggleActions: "play none none reverse",
    },
  });
}

export default function HugProductSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const beat1Ref = useRef<HTMLDivElement>(null);
  const beat2Ref = useRef<HTMLDivElement>(null);
  const beat3Ref = useRef<HTMLDivElement>(null);
  const beat4Ref = useRef<HTMLDivElement>(null);

  const labelRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const assembledRef = useRef<HTMLDivElement>(null);

  const statementRef = useRef<HTMLParagraphElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  const leftLabelRef = useRef<HTMLParagraphElement>(null);
  const rightLabelRef = useRef<HTMLParagraphElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);

  const closingRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();
    const section = sectionRef.current;
    const beat1 = beat1Ref.current;
    const beat2 = beat2Ref.current;
    const beat3 = beat3Ref.current;
    const beat4 = beat4Ref.current;

    if (!section || !beat1 || !beat2 || !beat3 || !beat4) return;

    const ctx = gsap.context(() => {
      revealOnEnter(
        beat1,
        [labelRef.current, titleRef.current, assembledRef.current],
        reducedMotion,
        "top 75%",
      );

      revealOnEnter(
        beat2,
        [statementRef.current, paragraphRef.current],
        reducedMotion,
      );

      revealOnEnter(
        beat3,
        [
          leftLabelRef.current,
          leftImageRef.current,
          rightLabelRef.current,
          rightImageRef.current,
        ],
        reducedMotion,
        "top 80%",
      );

      revealOnEnter(beat4, [closingRef.current], reducedMotion);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hug"
      ref={sectionRef}
      aria-labelledby="hug-heading"
      className="relative overflow-hidden bg-charcoal text-ivory"
    >
      {/* Beat 1 — object introduction */}
      <div
        ref={beat1Ref}
        className="relative mx-auto min-h-[100svh] max-w-[100vw] px-6 py-[16vh] md:px-[8vw] md:py-[18vh] lg:py-[20vh]"
      >
        <div className="relative z-10 max-w-[min(88vw,520px)] md:max-w-[min(42vw,480px)]">
          <p
            ref={labelRef}
            className="font-sans text-[9px] uppercase tracking-[0.48em] text-ivory-faint md:text-[10px]"
          >
            01 / HUG
          </p>

          <h2
            id="hug-heading"
            ref={titleRef}
            className="mt-8 font-serif text-[clamp(2.25rem,7vw,5.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-ivory md:mt-10 lg:mt-12"
          >
            TOGETHER — HUG
          </h2>
        </div>

        <div
          ref={assembledRef}
          className="pointer-events-none relative z-0 mt-10 h-[52vh] w-full md:absolute md:bottom-[-4vh] md:right-[-6vw] md:mt-0 md:h-[78vh] md:w-[min(58vw,720px)] lg:right-[-4vw] lg:h-[82vh] lg:w-[min(52vw,780px)]"
        >
          <Image
            src="/images/hug-assembled.png"
            alt="HUG — two sculptural memorial vessels forming one composition"
            fill
            sizes="(max-width: 768px) 100vw, 58vw"
            className="object-contain object-center md:object-[center_88%]"
          />
        </div>
      </div>

      {/* Beat 2 — meaning */}
      <div
        ref={beat2Ref}
        className="relative mx-auto max-w-[100vw] px-6 pb-[14vh] pt-[6vh] md:px-[8vw] md:pb-[18vh] md:pt-[8vh]"
      >
        <div className="md:ml-[8vw] lg:ml-[12vw]">
          <p
            ref={statementRef}
            className="max-w-[min(88vw,480px)] font-serif text-[clamp(1.75rem,4.5vw,3.25rem)] font-light leading-[1.05] tracking-[-0.025em] text-ivory/95"
          >
            Two vessels.
            <br />
            One connection.
          </p>

          <p
            ref={paragraphRef}
            className="mt-8 max-w-[320px] font-sans text-[11px] font-light leading-[1.9] tracking-[0.05em] text-ivory-muted md:mt-10 md:max-w-[360px] md:text-[12px] lg:mt-12"
          >
            HUG is composed of two individual memorial vessels, each complete on
            its own. Together, they form a single sculptural composition.
          </p>
        </div>
      </div>

      {/* Beat 3 — individual vessels */}
      <div
        ref={beat3Ref}
        className="relative mx-auto max-w-[100vw] px-6 pb-[10vh] md:px-[8vw] md:pb-[14vh]"
      >
        <div className="flex flex-col gap-16 md:flex-row md:items-end md:justify-between md:gap-[6vw] lg:gap-[8vw]">
          <div className="md:flex-1">
            <p
              ref={leftLabelRef}
              className="mb-6 font-sans text-[9px] uppercase tracking-[0.48em] text-ivory-faint md:mb-8"
            >
              LEFT
            </p>
            <div
              ref={leftImageRef}
              className="relative h-[44vh] w-full max-w-[min(88vw,360px)] md:h-[52vh] md:max-w-none lg:h-[58vh]"
            >
              <Image
                src="/images/hug-left.png"
                alt="HUG left memorial vessel"
                fill
                sizes="(max-width: 768px) 88vw, 42vw"
                className="object-contain object-left-bottom"
                style={{ transform: "scaleX(-1)" }}
              />
            </div>
          </div>

          <div className="md:flex-1 md:text-right">
            <p
              ref={rightLabelRef}
              className="mb-6 font-sans text-[9px] uppercase tracking-[0.48em] text-ivory-faint md:mb-8"
            >
              RIGHT
            </p>
            <div
              ref={rightImageRef}
              className="relative ml-auto h-[44vh] w-full max-w-[min(88vw,360px)] md:h-[52vh] md:max-w-none lg:h-[58vh]"
            >
              <Image
                src="/images/hug-right.png"
                alt="HUG right memorial vessel"
                fill
                sizes="(max-width: 768px) 88vw, 42vw"
                className="object-contain object-right-bottom"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Beat 4 — quiet close */}
      <div
        ref={beat4Ref}
        className="relative mx-auto max-w-[100vw] px-6 pb-[28vh] pt-[4vh] md:px-[8vw] md:pb-[32vh] md:pt-[6vh]"
      >
        <p
          ref={closingRef}
          className="font-serif text-[clamp(1.25rem,3vw,2rem)] font-light leading-[1.2] tracking-[-0.02em] text-ivory/80 md:ml-[8vw] lg:ml-[12vw]"
        >
          Each complete on its own.
        </p>
      </div>
    </section>
  );
}
