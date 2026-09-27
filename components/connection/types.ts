export type SculptureKind = "image" | "glb";

export interface SculptureAsset {
  id: "left" | "right" | "assembled";
  kind: SculptureKind;
  src: string;
  alt: string;
}

export const SCULPTURE_ASSETS = {
  left: {
    id: "left",
    kind: "image",
    src: "/images/hug-left.png",
    alt: "The left HUG vessel, a pale sculptural form on its own.",
  },
  right: {
    id: "right",
    kind: "image",
    src: "/images/hug-right.png",
    alt: "The right HUG vessel, a pale sculptural form on its own.",
  },
  assembled: {
    id: "assembled",
    kind: "image",
    src: "/images/hug-assembled.png",
    alt: "The two HUG vessels together, forming one composition.",
  },
} as const satisfies Record<string, SculptureAsset>;
