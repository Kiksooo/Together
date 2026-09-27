"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";
import { SCULPTURE_ASSETS } from "@/components/connection/types";

gsap.registerPlugin(ScrollTrigger);

/**
 * Window into hug-assembled.png only.
 * The frame shows the meeting of the two forms. Scale is uniform, so the stone is not stretched.
 */
const STUDY = {
  width: "170.2703%",
  height: "222.6087%",
  left: "-37.8378%",
  top: "-63.0435%",
} as const;

export default function ObjectSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const detailRef = useRef<HTMLDivElement>(null);
  const studyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();
    const section = sectionRef.current;
    const eyebrow = eyebrowRef.current;
    const line1 = line1Ref.current;
    const line2 = line2Ref.current;
    const body = bodyRef.current;
    const detail = detailRef.current;
    const study = studyRef.current;

    if (!section || !eyebrow || !line1 || !line2 || !body || !detail || !study) {
      return;
    }

    const ctx = gsap.context(() => {
      if (reducedMotion) {
        gsap.set([eyebrow, line1, line2, body, detail], { opacity: 1, y: 0 });
        gsap.set(study, { y: 0, scale: 1 });
        return;
      }

      gsap.set(eyebrow, { opacity: 0 });
      gsap.set([line1, line2], { opacity: 0, y: 10 });
      gsap.set(body, { opacity: 0, y: 6 });
      gsap.set(detail, { opacity: 0 });
      gsap.set(study, { y: 12, scale: 1.028, transformOrigin: "50% 46%" });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 68%",
            toggleActions: "play none none reverse",
          },
        })
        .to(eyebrow, { opacity: 1, duration: 2.1, ease: "power1.out" }, 0)
        .to(line1, { opacity: 1, y: 0, duration: 1.8, ease: "power2.out" }, 0.4)
        .to(line2, { opacity: 1, y: 0, duration: 1.8, ease: "power2.out" }, 0.95)
        .to(study, { y: 0, scale: 1, duration: 2.6, ease: "power1.out" }, 0.7)
        .to(body, { opacity: 1, y: 0, duration: 1.8, ease: "power1.out" }, 1.55)
        .to(detail, { opacity: 1, duration: 1.7, ease: "power1.out" }, 2.05);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const asset = SCULPTURE_ASSETS.assembled;

  return (
    <section
      id="object"
      ref={sectionRef}
      aria-labelledby="object-heading"
      className="relative overflow-x-hidden bg-charcoal text-ivory"
    >
      <div className="relative mx-auto flex min-h-[100svh] max-w-[100vw] flex-col px-6 pb-[14vh] pt-[16vh] md:px-[6vw] md:pb-[12vh] md:pt-[13vh]">
        <p
          ref={eyebrowRef}
          className="font-sans text-[9px] uppercase tracking-[0.42em] text-ivory-faint md:text-[10px] md:tracking-[0.46em]"
        >
          05 / THE OBJECT
        </p>

        <h2
          id="object-heading"
          className="mt-[8vh] max-w-[100%] font-serif text-[clamp(2.05rem,8.4vw,2.65rem)] font-light leading-[0.92] tracking-[-0.035em] text-ivory md:mt-[9vh] md:text-[clamp(3.5rem,6.4vw,6.6rem)]"
        >
          <span className="block overflow-hidden pb-[0.08em]">
            <span ref={line1Ref} className="block will-change-transform">
              Designed as a memorial.
            </span>
          </span>
          <span className="ml-[6vw] -mt-[0.02em] block overflow-hidden pb-[0.12em] md:ml-[10vw]">
            <span ref={line2Ref} className="block will-change-transform">
              Considered as an object.
            </span>
          </span>
        </h2>

        <div className="mt-[8vh] flex flex-col md:mt-[10vh] md:grid md:grid-cols-[minmax(0,38ch)_minmax(180px,22vw)] md:items-end md:justify-between md:gap-x-[8vw] md:gap-y-12">
          <p
            ref={bodyRef}
            className="order-1 max-w-[36ch] font-sans text-[12px] font-light leading-[1.9] tracking-[0.02em] text-ivory-muted md:col-start-1 md:row-start-1 md:max-w-none md:text-[13px]"
          >
            Two individual vessels, each complete on its own. Together, they
            form HUG — a single sculptural composition shaped around
            connection.
          </p>

          <figure className="order-2 mt-[7vh] w-[78%] self-end md:col-start-2 md:row-span-2 md:row-start-1 md:mt-0 md:w-full md:self-end">
            <div className="relative aspect-[370/460] w-full overflow-hidden">
              <div ref={studyRef} className="absolute inset-0 will-change-transform">
                <Image
                  src={asset.src}
                  alt="Close study of the HUG vessels where the two forms meet."
                  width={630}
                  height={1024}
                  className="absolute max-w-none"
                  style={STUDY}
                />
              </div>
            </div>
          </figure>

          <div
            ref={detailRef}
            className="order-3 mt-8 md:col-start-1 md:row-start-2 md:mt-0"
          >
            <p className="font-serif text-[1.2rem] font-light leading-none tracking-[-0.02em] text-ivory md:text-[1.45rem]">
              Two vessels.
            </p>
            <span
              aria-hidden="true"
              className="my-4 block h-px w-8 bg-ivory/30 md:my-5"
            />
            <p className="font-serif text-[1.2rem] font-light leading-none tracking-[-0.02em] text-ivory/80 md:text-[1.45rem]">
              One shared form.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
