"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";
import HugVessel from "./HugVessel";
import HugTransition from "./HugTransition";

gsap.registerPlugin(ScrollTrigger);

const FRAME_GAP = 14;

export default function HugExperience() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const assembledRef = useRef<HTMLDivElement>(null);
  const apartLabelRef = useRef<HTMLParagraphElement>(null);
  const apartCopyRef = useRef<HTMLParagraphElement>(null);
  const joinedRef = useRef<HTMLHeadingElement>(null);
  const finalRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      const left = leftRef.current;
      const right = rightRef.current;
      const assembled = assembledRef.current;
      const apartLabel = apartLabelRef.current;
      const apartCopy = apartCopyRef.current;
      const joined = joinedRef.current;
      const finalLine = finalRef.current;

      if (
        !section ||
        !stage ||
        !left ||
        !right ||
        !assembled ||
        !apartLabel ||
        !apartCopy ||
        !joined ||
        !finalLine
      ) {
        return;
      }

      const travel = () => {
        const center = stage.clientWidth / 2;
        const dxLeft = center - FRAME_GAP / 2 - (left.offsetLeft + left.offsetWidth);
        const dxRight = center + FRAME_GAP / 2 - right.offsetLeft;

        return {
          left: Math.max(0, dxLeft),
          right: Math.min(0, dxRight),
        };
      };

      if (reducedMotion) {
        gsap.set([left, right, apartLabel, apartCopy], { autoAlpha: 0 });
        gsap.set(assembled, { opacity: 1 });
        gsap.set([joined, finalLine], { opacity: 1 });
        return;
      }

      gsap.set(left, { x: 0, opacity: 1, force3D: true });
      gsap.set(right, { x: 0, opacity: 1, force3D: true });
      gsap.set(assembled, { opacity: 0 });
      gsap.set([apartLabel, apartCopy], { opacity: 1 });
      gsap.set([joined, finalLine], { opacity: 0 });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: section,
          pin: stage,
          start: "top top",
          end: "+=340%",
          scrub: 0.65,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      /* Phase 1 — apart, held */
      tl.to(left, { x: 0, duration: 0.16 }, 0);
      tl.to(right, { x: 0, duration: 0.16 }, 0);

      /* Phase 2–3 — approach, then rest at contact */
      tl.to(left, { x: () => travel().left, duration: 0.46 }, 0.16);
      tl.to(right, { x: () => travel().right, duration: 0.46 }, 0.16);
      tl.to(left, { x: () => travel().left, duration: 0.1 }, 0.62);
      tl.to(right, { x: () => travel().right, duration: 0.1 }, 0.62);

      tl.to(apartLabel, { opacity: 0, duration: 0.12 }, 0.36);
      tl.to(apartCopy, { opacity: 0, duration: 0.12 }, 0.38);

      /* Phase 4 — two vessels become the assembled HUG */
      tl.to(left, { opacity: 0, duration: 0.14 }, 0.72);
      tl.to(right, { opacity: 0, duration: 0.14 }, 0.72);
      tl.to(assembled, { opacity: 1, duration: 0.16 }, 0.74);
      tl.to(joined, { opacity: 1, duration: 0.12 }, 0.76);

      /* Phase 5 — hold */
      tl.to(finalLine, { opacity: 1, duration: 0.1 }, 0.84);
      tl.to(assembled, { opacity: 1, duration: 0.1 }, 0.9);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hug"
      ref={sectionRef}
      aria-label="The HUG — two vessels forming one connection"
      className="relative overflow-x-hidden bg-charcoal text-ivory"
    >
      <style>{`
        .hug-stage {
          --inset: 16px;
          --frame-w: 34vw;
          --frame-top: 26vh;
        }
        @media (min-width: 768px) {
          .hug-stage {
            --inset: 8vw;
            --frame-w: min(22vw, 240px);
            --frame-top: 20vh;
          }
        }
        @media (min-width: 1024px) {
          .hug-stage {
            --inset: 11vw;
            --frame-w: min(17vw, 280px);
            --frame-top: 17vh;
          }
        }
        /* One shared frame. Both vessels use this exact box. */
        .hug-vessel-left,
        .hug-vessel-right {
          position: absolute;
          top: var(--frame-top);
          width: var(--frame-w);
          aspect-ratio: 0.7542087542 / 1.6541254199;
          overflow: hidden;
        }
        .hug-vessel-left {
          left: var(--inset);
        }
        .hug-vessel-right {
          right: var(--inset);
        }
      `}</style>

      <div
        ref={stageRef}
        className="hug-stage relative h-[100svh] w-full overflow-hidden"
      >
        <div className="pointer-events-none absolute inset-x-0 top-[12vh] z-30 px-6 text-center md:left-1/2 md:top-[18vh] md:w-[240px] md:-translate-x-1/2 md:px-0">
          <p
            ref={apartLabelRef}
            className="font-sans text-[9px] uppercase tracking-[0.48em] text-ivory-faint md:text-[10px]"
          >
            TWO VESSELS
          </p>
          <p
            ref={apartCopyRef}
            className="mt-4 font-sans text-[11px] font-light leading-[1.85] tracking-[0.04em] text-ivory-muted md:mt-5 md:text-[12px]"
          >
            Each complete on its own.
          </p>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex flex-col items-center px-6 pb-[8vh] text-center md:pb-[10vh]">
          <h2 ref={joinedRef} className="opacity-0">
            <span className="block font-serif text-[clamp(1.35rem,2.6vw,2.15rem)] font-light leading-[1.15] tracking-[0.08em] text-ivory">
              TWO LIVES.
            </span>
            <span className="mt-1 block font-serif text-[clamp(1.35rem,2.6vw,2.15rem)] font-light leading-[1.15] tracking-[0.08em] text-ivory/80">
              ONE CONNECTION.
            </span>
          </h2>
          <p
            ref={finalRef}
            className="mt-5 max-w-[280px] font-sans text-[11px] font-light leading-[1.85] tracking-[0.04em] text-ivory-muted opacity-0 md:text-[12px]"
          >
            Together, they become one.
          </p>
        </div>

        <HugVessel ref={leftRef} side="left" />
        <HugVessel ref={rightRef} side="right" />
        <HugTransition ref={assembledRef} />
      </div>
    </section>
  );
}
