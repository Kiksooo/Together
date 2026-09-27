"use client";

import { forwardRef } from "react";
import SculptureSlot from "@/components/connection/SculptureSlot";
import { SCULPTURE_ASSETS } from "@/components/connection/types";

/**
 * Final assembled HUG. Opacity is driven by the section timeline.
 * The frame is ready to swap the PNG for a GLB later without moving the scroll sequence.
 */
const HugTransition = forwardRef<HTMLDivElement>(function HugTransition(_, ref) {
  const asset = SCULPTURE_ASSETS.assembled;

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center opacity-0 will-change-transform"
      data-sculpture-id={asset.id}
      data-sculpture-kind={asset.kind}
    >
      <SculptureSlot
        asset={asset}
        hideSculptureId
        className="relative h-[56vh] w-[min(84vw,520px)] md:h-[62vh] md:w-[min(40vw,500px)]"
      />
    </div>
  );
});

export default HugTransition;
