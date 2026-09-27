"use client";

import { forwardRef } from "react";
import Image from "next/image";
import type { SculptureAsset } from "./types";

interface SculptureSlotProps {
  asset: SculptureAsset;
  className?: string;
  priority?: boolean;
  /** When true, omit data-sculpture-* (parent motion wrapper owns identity). */
  hideSculptureId?: boolean;
}

/**
 * Renders a sculpture asset slot.
 * Currently supports 2D images; replace the inner renderer when GLB assets arrive
 * without changing scroll choreography in TogetherConnection.
 */
const SculptureSlot = forwardRef<HTMLDivElement, SculptureSlotProps>(
  function SculptureSlot(
    { asset, className = "", priority = false, hideSculptureId = false },
    ref,
  ) {
    if (asset.kind === "glb") {
      // Future: mount HUG_LEFT.glb / HUG_RIGHT.glb viewer here
      return (
        <div
          ref={ref}
          className={className}
          data-sculpture-id={asset.id}
          data-sculpture-kind="glb"
          aria-hidden="true"
        />
      );
    }

    return (
      <div
        ref={ref}
        className={className}
        {...(!hideSculptureId && {
          "data-sculpture-id": asset.id,
          "data-sculpture-kind": "image",
        })}
      >
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 72vw, 42vw"
          className="object-contain"
        />
      </div>
    );
  },
);

export default SculptureSlot;
