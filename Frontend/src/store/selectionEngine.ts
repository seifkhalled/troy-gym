"use client";

import { create } from "zustand";
import {
  MUSCLES,
  REGIONS,
  REGION_MUSCLES,
  type RegionId,
} from "@/lib/anatomy/muscleRegistry";

/**
 * Rendering-agnostic Selection Engine (req #5).
 *
 * Flow:  SVG View -> Selection Engine -> App State -> Exercise Engine -> AI Coaching
 *
 * The view layer (SVG, search box, list) NEVER writes to app state directly.
 * It calls `selectionEngine.selectMuscle(id)` / `selectRegion(id)`. This keeps
 * the exercise/AI logic untouched if we ever swap the renderer (e.g. back to 3D).
 */

export type SelectionSource = "click" | "search" | "route" | "keyboard" | "none";

interface SelectionState {
  region: RegionId | null;
  muscle: string | null;
  source: SelectionSource;
  selectRegion: (region: RegionId | null, source?: SelectionSource) => void;
  selectMuscle: (muscleId: string | null, source?: SelectionSource) => void;
  clear: () => void;
}

export const useSelection = create<SelectionState>((set) => ({
  region: null,
  muscle: null,
  source: "none",
  selectRegion: (region, source = "click") => set({ region, muscle: null, source }),
  selectMuscle: (muscle, source = "click") =>
    set((prev) => {
      if (!muscle) return { region: prev.region, muscle: null, source };
      const entry = MUSCLES[muscle];
      // Selecting a muscle also anchors its region (req #4 hierarchy).
      return { region: entry?.region ?? prev.region, muscle, source };
    }),
  clear: () => set({ region: null, muscle: null, source: "none" }),
}));

/**
 * Selection Engine facade. Views import this, not the raw store, so the
 * boundary in req #5 is explicit and enforceable.
 */
export const selectionEngine = {
  selectMuscle: (id: string | null, source: SelectionSource = "click") =>
    useSelection.getState().selectMuscle(id, source),
  selectRegion: (id: RegionId | null, source: SelectionSource = "click") =>
    useSelection.getState().selectRegion(id, source),
  clear: () => useSelection.getState().clear(),

  /** Resolve a free-text query (e.g. "Rear Delt") to a muscle + region (req #7). */
  resolveSearch: (query: string): { muscleId: string; region: RegionId } | null => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    const match = Object.values(MUSCLES).find(
      (m) =>
        m.label.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        m.region.toLowerCase().includes(q)
    );
    if (match) return { muscleId: match.id, region: match.region };

    const region = Object.values(REGIONS).find((r) =>
      r.label.toLowerCase().includes(q)
    );
    if (region) {
      const first = REGION_MUSCLES[region.id][0];
      return first ? { muscleId: first, region: region.id } : null;
    }
    return null;
  },
};
