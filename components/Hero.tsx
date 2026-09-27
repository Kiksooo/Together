"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EASE, prefersReducedMotion } from "@/lib/animations";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const productStageRef = useRef<HTMLDivElement>(null);
  const assembledRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const supportingRef = useRef<HTMLParagraphElement>(null);
  const priceRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const assembled = assembledRef.current;
      const left = leftRef.current;
      const right = rightRef.current;
      const productStage = productStageRef.current;
      const stage = stageRef.current;
      const wrapper = wrapperRef.current;

      if (
        !assembled ||
        !left ||
        !right ||
        !productStage ||
        !stage ||
        !wrapper
      ) {
        return;
      }

      /* ── Initial states ── */
      gsap.set([left, right], { transformOrigin: "center bottom" });
      gsap.set(left, { opacity: 0, x: 0, scale: 0.97 });
      gsap.set(right, { opacity: 0, x: 0, scale: 0.97 });
      gsap.set(assembled, { opacity: 0, scale: 1.06, filter: "brightness(0.15)" });
      gsap.set(line1Ref.current, { opacity: 0, x: -60 });
      gsap.set(line2Ref.current, { opacity: 0, x: 60 });
      gsap.set(supportingRef.current, { opacity: 0 });
      gsap.set(priceRef.current, { opacity: 0 });
      gsap.set(scrollRef.current, { opacity: 0 });
      gsap.set(indexRef.current, { opacity: 0 });

      if (reducedMotion) {
        gsap.set(
          [
            assembled,
            left,
            right,
            line1Ref.current,
            line2Ref.current,
            supportingRef.current,
            priceRef.current,
            scrollRef.current,
            indexRef.current,
          ],
          { opacity: 1, x: 0, scale: 1, filter: "brightness(1)" },
        );
        gsap.set(left, { opacity: 1, x: 0, scale: 1 });
        gsap.set(right, { opacity: 1, x: 0, scale: 1 });
        gsap.set(assembled, { opacity: 0 });
        return;
      }

      /* ── Intro: the pair emerges from darkness ── */
      const intro = gsap.timeline({ delay: 0.4 });

      intro
        .to(left, {
          opacity: 1,
          scale: 1,
          duration: 3.2,
          ease: EASE.cinematic,
        })
        .to(
          right,
          {
            opacity: 1,
            scale: 1,
            duration: 3.2,
            ease: EASE.cinematic,
          },
          "<",
        )
        .to(
          line1Ref.current,
          { opacity: 1, x: 0, duration: 2.4, ease: EASE.physical },
          "-=2.0",
        )
        .to(
          line2Ref.current,
          { opacity: 1, x: 0, duration: 2.4, ease: EASE.physical },
          "-=1.8",
        )
        .to(
          indexRef.current,
          { opacity: 1, duration: 2, ease: "power2.out" },
          "-=1.6",
        )
        .to(
          supportingRef.current,
          { opacity: 1, duration: 2, ease: "power2.out" },
          "-=1.2",
        )
        .to(
          priceRef.current,
          { opacity: 1, duration: 1.4, ease: "power2.out" },
          "-=1.0",
        )
        .to(
          scrollRef.current,
          { opacity: 1, duration: 1.4, ease: "power2.out" },
          "-=0.6",
        );

      /* ── Scroll: two forms separating and reuniting ── */
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      scrollTl
        .to(left, { x: "-4%", duration: 0.35, ease: "none" }, 0.12)
        .to(right, { x: "4%", duration: 0.35, ease: "none" }, 0.12)
        .to(line1Ref.current, { x: "-4%", duration: 0.35, ease: "none" }, 0.18)
        .to(line2Ref.current, { x: "5%", duration: 0.35, ease: "none" }, 0.18)
        .to(
          productStage,
          { scale: 0.98, duration: 0.45, ease: "none" },
          0,
        )
        .to(
          left,
          { opacity: 0, x: "0%", scale: 0.98, duration: 0.26, ease: "none" },
          0.62,
        )
        .to(
          right,
          { opacity: 0, x: "0%", scale: 0.98, duration: 0.26, ease: "none" },
          0.62,
        )
        .to(
          assembled,
          {
            opacity: 1,
            scale: 1,
            filter: "brightness(1)",
            duration: 0.3,
            ease: "none",
          },
          0.62,
        )
        .to(line1Ref.current, { x: 0, duration: 0.28, ease: "none" }, 0.62)
        .to(line2Ref.current, { x: 0, duration: 0.28, ease: "none" }, 0.62)
        .to(productStage, { scale: 1, duration: 0.28, ease: "none" }, 0.62)
        .to(supportingRef.current, { opacity: 1, duration: 0.2, ease: "none" }, 0.85);

      /* ── Mouse parallax: physical depth response ── */
      mm.add("(pointer: fine)", () => {
        const parallaxTargets = {
          product: { x: 0, y: 0 },
          line1: { x: 0, y: 0 },
          line2: { x: 0, y: 0 },
        };

        const productTween = gsap.quickTo(productStage, "x", {
          duration: 1.6,
          ease: "power2.out",
        });
        const productYTween = gsap.quickTo(productStage, "y", {
          duration: 1.6,
          ease: "power2.out",
        });
        const line1XTween = gsap.quickTo(line1Ref.current, "x", {
          duration: 2,
          ease: "power2.out",
        });
        const line1YTween = gsap.quickTo(line1Ref.current, "y", {
          duration: 2,
          ease: "power2.out",
        });
        const line2XTween = gsap.quickTo(line2Ref.current, "x", {
          duration: 2,
          ease: "power2.out",
        });
        const line2YTween = gsap.quickTo(line2Ref.current, "y", {
          duration: 2,
          ease: "power2.out",
        });

        const onMove = (e: MouseEvent) => {
          if (ScrollTrigger.isScrolling()) return;

          const nx = (e.clientX / window.innerWidth - 0.5) * 2;
          const ny = (e.clientY / window.innerHeight - 0.5) * 2;

          productTween(nx * 28);
          productYTween(ny * 18);
          line1XTween(nx * -14);
          line1YTween(ny * -8);
          line2XTween(nx * 14);
          line2YTween(ny * 8);
        };

        stage.addEventListener("mousemove", onMove);

        return () => {
          stage.removeEventListener("mousemove", onMove);
        };
      });
    }, wrapperRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section aria-label="Hero">
      <div ref={wrapperRef} className="relative h-[280vh]">
        <div
          ref={stageRef}
          className="sticky top-0 h-[100svh] overflow-hidden bg-charcoal"
        >
          {/* Index marker — gallery notation */}
          <p
            ref={indexRef}
            className="absolute left-6 top-28 font-sans text-[9px] uppercase tracking-[0.4em] text-ivory/55 md:left-10 md:top-32 lg:left-14"
          >
            01 / HUG
          </p>

          {/* Headline — split, overlapping composition */}
          <h1 className="pointer-events-none absolute inset-0 z-20 select-none">
            <span
              ref={line1Ref}
              className="absolute left-[6vw] top-[16vh] font-serif text-[clamp(3.5rem,11vw,10.5rem)] font-light leading-[0.9] tracking-[-0.03em] text-ivory md:top-[12vh] lg:left-[7vw] lg:top-[13vh]"
            >
              Two lives.
            </span>
            <span
              ref={line2Ref}
              className="absolute right-[6vw] top-[28vh] font-serif text-[clamp(3rem,9vw,8.5rem)] font-light leading-[0.92] tracking-[-0.03em] text-ivory/90 md:right-[10vw] md:top-[27vh] lg:right-[12vw] lg:top-[30vh]"
            >
              One connection.
            </span>
          </h1>

          {/* Product stage — LEFT and RIGHT as a facing pair.
              Frame sizes come from the visible vessel bounds, not the file
              canvases: left 448×1024, vessel 357×594 from (56,200);
              right 1024×1536, vessel 518×900 from (256,349). */}
          <div
            ref={productStageRef}
            className="hero-pair absolute inset-0 z-10 will-change-transform"
          >
            <style>{`
              .hero-pair {
                --vessel: 24vh;
                --base: 24vh;
                --inset: 4vw;
              }
              @media (min-width: 768px) {
                .hero-pair {
                  --vessel: 34vh;
                  --base: 16vh;
                  --inset: 9vw;
                }
              }
              @media (min-width: 1024px) {
                .hero-pair {
                  --vessel: 40vh;
                  --base: 13vh;
                  --inset: 11vw;
                }
              }
              .hero-left,
              .hero-right {
                position: absolute;
                transform-origin: center bottom;
              }
              .hero-left {
                height: calc(var(--vessel) / 0.58);
                aspect-ratio: 448 / 1024;
                bottom: calc(var(--base) - 0.2256 * var(--vessel) / 0.58);
                left: calc(var(--inset) - 0.0804 * (var(--vessel) / 0.58) * 448 / 1024);
              }
              .hero-right {
                height: calc(var(--vessel) / 0.586);
                aspect-ratio: 1024 / 1536;
                bottom: calc(var(--base) - 0.1875 * var(--vessel) / 0.586);
                right: calc(var(--inset) - 0.2451 * (var(--vessel) / 0.586) * 1024 / 1536);
              }
            `}</style>

            <div ref={leftRef} className="hero-left will-change-transform">
              <div
                className="relative h-full w-full"
                style={{ transform: "scaleX(-1)" }}
              >
                <Image
                  src="/images/hug-left.png"
                  alt="HUG left memorial vessel"
                  fill
                  priority
                  sizes="(max-width: 768px) 46vw, 28vw"
                  className="object-fill"
                />
              </div>
            </div>

            <div ref={rightRef} className="hero-right will-change-transform">
              <div className="relative h-full w-full">
                <Image
                  src="/images/hug-right.png"
                  alt="HUG right memorial vessel"
                  fill
                  priority
                  sizes="(max-width: 768px) 58vw, 34vw"
                  className="object-fill"
                />
              </div>
            </div>

            <div
              ref={assembledRef}
              className="pointer-events-none absolute inset-0 flex items-center justify-center will-change-transform"
            >
              <div className="relative h-[68vh] w-[min(78vw,640px)]">
                <Image
                  src="/images/hug-assembled.png"
                  alt="HUG — two sculptural memorial vessels forming one composition"
                  fill
                  sizes="(max-width: 768px) 78vw, 640px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Supporting copy — unconventionally placed */}
          <p
            ref={supportingRef}
            className="absolute bottom-[7vh] left-6 z-30 max-w-[168px] font-sans text-[11px] font-light leading-[1.85] tracking-[0.04em] text-ivory [text-shadow:0_1px_1px_rgba(10,9,8,0.55),0_8px_24px_rgba(10,9,8,0.45)] md:bottom-[16vh] md:left-[34vw] md:max-w-[220px] lg:bottom-[15vh] lg:left-[38vw] lg:max-w-[240px] lg:text-[12px]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -inset-x-8 -inset-y-5 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(10,9,8,0.42)_0%,rgba(10,9,8,0.16)_46%,rgba(10,9,8,0)_76%)]"
            />
            Memorial sculptures designed around the relationships we never want
            to lose.
          </p>

          {/* Price */}
          <p
            ref={priceRef}
            className="absolute bottom-[6vh] right-6 z-30 font-sans text-[9px] font-light tracking-[0.12em] text-ivory [text-shadow:0_1px_1px_rgba(10,9,8,0.45)] md:bottom-[1.2vh] lg:bottom-[10vh] lg:right-[calc(11vw+34.4vh+1.25rem)]"
          >
            Expected price: £895 per pair
          </p>

          {/* Scroll cue */}
          <div
            ref={scrollRef}
            className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 md:bottom-10"
          >
            <p className="font-sans text-[8px] uppercase tracking-[0.45em] text-ivory/60">
              Scroll
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
