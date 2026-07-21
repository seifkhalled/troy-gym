"use client";

import { useEffect } from "react";
import { selectionEngine } from "@/store/selectionEngine";
import { type RegionId } from "@/lib/anatomy/muscleRegistry";

/**
 * Syncs route params into the Selection Engine (req #8 deep linking). Used by
 * /body/[region] and /body/[region]/[muscle] so a shared URL selects the right
 * node without the user clicking. Any manual interaction overrides it.
 *
 * NOTE: route param validation lives in the server page components (they call
 * notFound() before rendering). This client effect only performs the selection
 * sync, so it can trust the params are valid.
 */
export function RouteSelectionSync({
  region,
  muscle,
}: {
  region?: string;
  muscle?: string;
}) {
  useEffect(() => {
    if (muscle) {
      selectionEngine.selectMuscle(muscle, "route");
    } else if (region) {
      selectionEngine.selectRegion(region as RegionId, "route");
    }
  }, [region, muscle]);
  return null;
}
