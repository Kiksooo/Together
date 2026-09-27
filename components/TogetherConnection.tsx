"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReducedMotion } from "@/lib/animations";
import SculptureSlot from "./connection/SculptureSlot";
import { SCULPTURE_ASSETS } from "./connection/types";

gsap.registerPlugin(ScrollTrigger);

const COPY = {
  phase1: "TWO VESSELS",
  phase2: "Each complete on its own.",
  phase4Line1: "TWO PIECES.",
  phase4Line2: "ONE CONNECTION.",
  phase5: "A physical expression of a relationship that continues.",
} as const;

const PANEL =
  "connection-panel relative h-[46vh] w-[min(38vw,168px)] shrink-0 sm:h-[50vh] sm:w-[min(36vw,220px)] md:h-[58vh] md:w-[min(30vw,360px)] lg:h-[62vh] lg:w-[min(28vw,400px)]";

const ASSEMBLED =
  "relative h-[50vh] w-[min(78vw,360px)] sm:h-[54vh] sm:w-[min(72vw,420px)] md:h-[64vh] md:w-[min(44vw,480px)] lg:h-[68vh] lg:w-[min(40vw,520px)]";

type CopyRefs = {
  copy1: HTMLParagraphElement | null;
  copy2: HTMLParagraphElement | null;
  copy4: HTMLDivElement | null;
  copy5: HTMLParagraphElement | null;
};

type PanelRefs = {
  panelsRow: HTMLDivElement;
  spacer: HTMLDivElement;
  left: HTMLDivElement;
  right: HTMLDivElement;
  assembledWrap: HTMLDivElement;
};

function measurePanelWidth(el: HTMLDivElement, stageW: number, mode: "desktop" | "mobile") {
  if (el.offsetWidth > 0) return el.offsetWidth;
  if (mode === "mobile") return Math.min(stageW * 0.38, 168);
  return Math.min(stageW * 0.3, 400);
}

function getGaps(
  stage: HTMLDivElement,
  panelW: number,
  mode: "desktop" | "mobile",
) {
  const w = stage.offsetWidth;
  const edge = 20;
  const minGap = mode === "mobile" ? 16 : 28;
  const maxGap = Math.max(minGap, w - panelW * 2 - edge * 2);
  const openGap = Math.min(maxGap, mode === "mobile" ? Math.max(minGap, w * 0.07) : Math.min(w * 0.09, 120));
  const separatedGap = Math.min(maxGap, openGap * 1.12);

  return { minGap, openGap, separatedGap };
}

function applyInitialState(
  panels: PanelRefs,
  copies: CopyRefs,
  stage: HTMLDivElement,
  mode: "desktop" | "mobile",
) {
  const panelW = measurePanelWidth(panels.left, stage.offsetWidth, mode);
  const { openGap } = getGaps(stage, panelW, mode);

  gsap.set(panels.spacer, { width: openGap, display: "block" });
  gsap.set([panels.left, panels.right], { opacity: 1, scale: 1 });
  gsap.set(panels.assembledWrap, { opacity: 0, scale: 0.98 });
  gsap.set(copies.copy1, { opacity: 1 });
  gsap.set(copies.copy2, { opacity: 1 });
  gsap.set(copies.copy4, { opacity: 0 });
  gsap.set(copies.copy5, { opacity: 0 });
}

function buildTimeline(
  section: HTMLElement,
  stage: HTMLDivElement,
  panels: PanelRefs,
  copies: CopyRefs,
  mode: "desktop" | "mobile",
) {
  applyInitialState(panels, copies, stage, mode);

  const gaps = () => {
    const panelW = measurePanelWidth(panels.left, stage.offsetWidth, mode);
    return getGaps(stage, panelW, mode);
  };

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      pin: stage,
      start: "top top",
      end: "+=280%",
      scrub: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
    defaults: { ease: "none" },
  });

  /* 0% → 25% — separate panels */
  tl.fromTo(
    panels.spacer,
    { width: () => gaps().openGap },
    { width: () => gaps().separatedGap, duration: 0.25 },
    0,
  );

  /* 25% → 55% — approach */
  tl.to(
    panels.spacer,
    {
      width: () => {
        const { minGap, separatedGap } = gaps();
        return minGap + (separatedGap - minGap) * 0.42;
      },
      duration: 0.3,
    },
    0.25,
  );

  /* 55% → 75% — close together, stop before overlap */
  tl.to(panels.spacer, { width: () => gaps().minGap, duration: 0.2 }, 0.55);

  tl.to(copies.copy1, { opacity: 0, duration: 0.06 }, 0.52)
    .to(copies.copy2, { opacity: 0, duration: 0.06 }, 0.54);

  /* 75% → 82% — hold minimum gap */
  tl.to(panels.spacer, { width: () => gaps().minGap, duration: 0.07 }, 0.75);

  /* 82% → 92% — crossfade to assembled HUG */
  tl.to(
    [panels.left, panels.right],
    { opacity: 0, scale: 0.98, duration: 0.1 },
    0.82,
  ).to(
    panels.assembledWrap,
    { opacity: 1, scale: 1, duration: 0.1 },
    0.82,
  );

  /* 92% → 100% — hold HUG + caption */
  tl.to(panels.assembledWrap, { opacity: 1, scale: 1, duration: 0.08 }, 0.92)
    .to(copies.copy4, { opacity: 1, duration: 0.08 }, 0.88)
    .to(copies.copy5, { opacity: 0.8, duration: 0.08 }, 0.92);

  return tl;
}

export default function TogetherConnection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const panelsRowRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const assembledWrapRef = useRef<HTMLDivElement>(null);
  const copy1Ref = useRef<HTMLParagraphElement>(null);
  const copy2Ref = useRef<HTMLParagraphElement>(null);
  const copy4Ref = useRef<HTMLDivElement>(null);
  const copy5Ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const reducedMotion = prefersReducedMotion();
    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      const panelsRow = panelsRowRef.current;
      const spacer = spacerRef.current;
      const left = leftRef.current;
      const right = rightRef.current;
      const assembledWrap = assembledWrapRef.current;

      if (
        !section ||
        !stage ||
        !panelsRow ||
        !spacer ||
        !left ||
        !right ||
        !assembledWrap
      ) {
        return;
      }

      const copies: CopyRefs = {
        copy1: copy1Ref.current,
        copy2: copy2Ref.current,
        copy4: copy4Ref.current,
        copy5: copy5Ref.current,
      };

      const panels: PanelRefs = {
        panelsRow,
        spacer,
        left,
        right,
        assembledWrap,
      };

      if (reducedMotion) {
        gsap.set(panelsRow, { display: "none" });
        gsap.set(assembledWrap, { opacity: 1, scale: 1 });
        gsap.set(copies.copy1, { opacity: 0 });
        gsap.set(copies.copy2, { opacity: 0 });
        gsap.set(copies.copy4, { opacity: 1 });
        gsap.set(copies.copy5, { opacity: 1 });
        return;
      }

      const setup = () => {
        if (stage.offsetWidth < 100 || left.offsetWidth < 40) {
          requestAnimationFrame(setup);
          return;
        }

        mm.add("(min-width: 769px)", () =>
          buildTimeline(section, stage, panels, copies, "desktop"),
        );
        mm.add("(max-width: 768px)", () =>
          buildTimeline(section, stage, panels, copies, "mobile"),
        );

        ScrollTrigger.refresh();
      };

      setup();
    }, sectionRef);

    return () => {
      mm.revert();
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="hug"
      ref={sectionRef}
      aria-label="The HUG — two vessels forming one connection"
      className="connection-section relative bg-[#050505]"
    >
      <div
        ref={stageRef}
        className="connection-stage relative h-[100svh] w-full overflow-hidden"
      >
        {/* Phase 1 copy */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-30 select-none px-6 pt-[14vh] md:px-[8vw] md:pt-[16vh]">
          <p className="font-sans text-[9px] uppercase tracking-[0.48em] text-ivory-faint md:text-[10px]">
            THE HUG
          </p>
          <p
            ref={copy1Ref}
            className="mt-6 font-sans text-[9px] uppercase tracking-[0.45em] text-ivory/50 md:mt-8 md:text-[10px]"
          >
            {COPY.phase1}
          </p>
          <p
            ref={copy2Ref}
            className="mt-3 max-w-[240px] font-sans text-[11px] font-light leading-[1.8] tracking-[0.04em] text-ivory-muted md:text-[12px]"
          >
            {COPY.phase2}
          </p>
        </div>

        {/* Phase 4 copy — restrained */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 flex select-none flex-col items-center px-6 pb-[10vh] text-center md:pb-[12vh]">
          <div ref={copy4Ref} className="opacity-0">
            <p className="font-serif text-[1.125rem] font-light tracking-[0.12em] text-ivory md:text-[1.35rem]">
              {COPY.phase4Line1}
            </p>
            <p className="mt-1 font-serif text-[1.125rem] font-light tracking-[0.12em] text-ivory/75 md:text-[1.35rem]">
              {COPY.phase4Line2}
            </p>
          </div>
          <p
            ref={copy5Ref}
            className="mt-4 max-w-[300px] font-sans text-[10px] font-light leading-[1.85] tracking-[0.04em] text-ivory-faint opacity-0 md:max-w-[340px] md:text-[11px]"
          >
            {COPY.phase5}
          </p>
        </div>

        {/* Product field */}
        <div className="absolute inset-0 z-10 flex items-center justify-center px-4 md:px-6">
          <div className="relative flex w-full max-w-[100vw] items-center justify-center">
            <div
              ref={panelsRowRef}
              className="flex items-center justify-center will-change-transform"
            >
              <div ref={leftRef} className={PANEL}>
                <div
                  className="relative h-full w-full"
                  style={{ transform: "scaleX(-1)" }}
                >
                  <SculptureSlot
                    asset={SCULPTURE_ASSETS.left}
                    hideSculptureId
                    className="relative h-full w-full"
                  />
                </div>
              </div>
              <div
                ref={spacerRef}
                className="connection-spacer shrink-0"
                aria-hidden="true"
              />
              <div ref={rightRef} className={PANEL}>
                <SculptureSlot
                  asset={SCULPTURE_ASSETS.right}
                  hideSculptureId
                  className="relative h-full w-full"
                />
              </div>
            </div>

            <div
              ref={assembledWrapRef}
              className="connection-assembled-wrap pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 will-change-transform"
            >
              <SculptureSlot
                asset={SCULPTURE_ASSETS.assembled}
                className={ASSEMBLED}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
