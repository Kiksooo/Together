"use client";

import { forwardRef, type CSSProperties } from "react";
import Image from "next/image";
import { SCULPTURE_ASSETS } from "@/components/connection/types";

type Side = "left" | "right";

interface HugVesselProps {
  side: Side;
}

/**
 * Both sides share one frame size (set on .hug-vessel-* ).
 * Each photograph keeps its own aspect ratio and is only shifted inside that frame
 * so the vessels share a height, a baseline, and an inner inset.
 * The left mirror stays on the inner wrapper; GSAP moves the outer frame.
 * A later GLB can replace the photo layer without resizing the frame.
 */
const PHOTO_FRAME: Record<Side, { width: number; height: number; style: CSSProperties }> = {
  left: {
    width: 448,
    height: 1024,
    style: {
      width: "100%",
      height: "104.21856185%",
      left: "0%",
      top: "0%",
    },
  },
  right: {
    width: 1024,
    height: 1536,
    style: {
      width: "150.68970985%",
      height: "103.06186305%",
      left: "-25.39564175%",
      top: "-3.06186305%",
    },
  },
};

const HugVessel = forwardRef<HTMLDivElement, HugVesselProps>(function HugVessel(
  { side },
  ref,
) {
  const asset = side === "left" ? SCULPTURE_ASSETS.left : SCULPTURE_ASSETS.right;
  const photo = PHOTO_FRAME[side];

  return (
    <div
      ref={ref}
      className={`hug-vessel hug-vessel-${side} absolute will-change-transform`}
      data-sculpture-id={asset.id}
      data-sculpture-kind={asset.kind}
    >
      <div
        className="relative h-full w-full"
        style={side === "left" ? { transform: "scaleX(-1)" } : undefined}
      >
        <Image
          src={asset.src}
          alt={asset.alt}
          width={photo.width}
          height={photo.height}
          className="absolute max-w-none"
          style={photo.style}
        />
      </div>
    </div>
  );
});

export default HugVessel;
