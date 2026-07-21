"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { REGIONS, type RegionId, type BodyView } from "@/lib/anatomy/muscleRegistry";
import { getMusclePathsForRegion, computeRegionViewBox } from "@/lib/anatomy/muscleIllustrations";
import { selectionEngine, useSelection } from "@/store/selectionEngine";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function RegionDetail({ region }: { region: RegionId }) {
  const router = useRouter();
  const entry = REGIONS[region];
  const views: BodyView[] = entry.views;
  const [viewIndex, setViewIndex] = useState(0);
  const currentView = views[viewIndex];
  const muscles = useMemo(() => getMusclePathsForRegion(region, currentView), [region, currentView]);
  const selectedMuscle = useSelection((s) => s.muscle);
  const viewBox = useMemo(() => computeRegionViewBox(muscles.map((m) => m.path), currentView), [muscles, currentView]);

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center p-8" data-region={region}>
      <div className="absolute left-4 top-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            selectionEngine.clear();
            router.push("/body");
          }}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          All Regions
        </Button>
      </div>

      {views.length > 1 && (
        <div className="absolute right-4 top-4 z-10">
          <div
            className="flex rounded-full border border-[var(--brand)]/30 bg-[var(--brand-soft)] p-1"
            role="tablist"
            aria-label="Body view"
          >
            {views.map((v, i) => (
              <button
                key={v}
                role="tab"
                aria-selected={viewIndex === i}
                onClick={() => setViewIndex(i)}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                  viewIndex === i ? "text-[var(--brand-foreground)]" : "text-[var(--ink)]/60"
                }`}
              >
                {viewIndex === i && (
                  <motion.span
                    layoutId="region-view-pill"
                    className="absolute inset-0 rounded-full bg-[var(--brand)]"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{v}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="w-full max-w-lg text-center">
        <h2 className="mb-1 text-2xl font-semibold text-[var(--ink)]">
          {REGIONS[region].label}
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">{REGIONS[region].hint}</p>

        <div className="relative mx-auto flex items-center justify-center rounded-2xl border border-border bg-gradient-to-b from-white to-[var(--brand-soft)]/40 p-6">
          <AnimatePresence mode="wait">
            <motion.svg
              key={currentView}
              viewBox={viewBox}
              className="h-[50vh] w-full max-w-md"
              role="group"
              aria-label={`${REGIONS[region].label} muscles, ${currentView} view`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {muscles.map((muscle) => {
                const isActive = selectedMuscle === muscle.id;
                return (
                  <g
                    key={`${muscle.id}-${muscle.path.slice(0, 20)}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`${muscle.label} — click to select`}
                    aria-pressed={isActive}
                    className="cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand)]"
                    onClick={() => {
                      selectionEngine.selectMuscle(muscle.id, "click");
                      router.push(`/body/${region}/${muscle.id}`);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        selectionEngine.selectMuscle(muscle.id, "keyboard");
                        router.push(`/body/${region}/${muscle.id}`);
                      }
                    }}
                  >
                    <path
                      d={muscle.path}
                      fill={isActive ? "var(--region-color)" : "var(--region-soft)"}
                      fillOpacity={isActive ? 0.85 : 0.5}
                      stroke="var(--region-color)"
                      strokeWidth={isActive ? 0.5 : 0.3}
                      strokeOpacity={isActive ? 1 : 0.6}
                      style={{
                        transition:
                          "fill 200ms ease, fill-opacity 200ms ease, stroke-width 200ms ease",
                      }}
                    />
                  </g>
                );
              })}
            </motion.svg>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {Array.from(
            new Map(muscles.map((m) => [m.id, m])).values()
          ).map((muscle) => {
            const isActive = selectedMuscle === muscle.id;
            return (
              <Button
                key={muscle.id}
                variant="outline"
                size="sm"
                className={`gap-2 transition-colors ${
                  isActive
                    ? "border-[var(--region-color)] bg-[var(--region-color)] text-white"
                    : "border-[var(--region-color)]/30 hover:bg-[var(--region-soft)] hover:text-[var(--ink)]"
                }`}
                onClick={() => {
                  selectionEngine.selectMuscle(muscle.id, "click");
                  router.push(`/body/${region}/${muscle.id}`);
                }}
              >
                {muscle.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
