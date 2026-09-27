import gsap from "gsap";

export const EASE = {
  reveal: "power3.out",
  soft: "power2.out",
  cinematic: "power4.inOut",
  physical: "power4.out",
} as const;

export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

export const createTimeline = (reducedMotion: boolean) => {
  return gsap.timeline({
    defaults: {
      ease: EASE.reveal,
      duration: reducedMotion ? 0.01 : undefined,
    },
  });
};

export const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;
