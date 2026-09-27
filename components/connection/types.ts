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
    alt: "HUG left memorial vessel — complete on its own",
  },
  right: {
    id: "right",
    kind: "image",
    src: "/images/hug-right.png",
    alt: "HUG right memorial vessel — complete on its own",
  },
  assembled: {
    id: "assembled",
    kind: "image",
    src: "/images/hug-assembled.png",
    alt: "HUG assembled — two vessels forming one sculptural composition",
  },
} as const satisfies Record<string, SculptureAsset>;
