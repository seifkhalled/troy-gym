"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { REGIONS, type RegionId, type BodyView } from "@/lib/anatomy/muscleRegistry";
import { getMusclePathsForRegion, computeRegionViewBox } from "@/lib/anatomy/muscleIllustrations";
import { selectionEngine, useSelection } from "@/store/selectionEngine";
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

  const unique = Array.from(new Map(muscles.map((m) => [m.id, m])).values());

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center p-6" data-region={region}>
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute left-6 top-6 z-10 flex items-center gap-2 rounded-full bg-[var(--glass-bg)] px-4 py-2 text-sm text-muted-foreground backdrop-blur-xl transition hover:text-[var(--ink)]"
        style={{ boxShadow: "var(--glass-shadow), 0 0 0 1px var(--glass-border)" }}
        onClick={() => { selectionEngine.clear(); router.push("/body"); }}
      >
        <ArrowLeft className="size-4" />
        All Regions
      </motion.button>

      {/* View toggle */}
      {views.length > 1 && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute right-6 top-6 z-10"
        >
          <div
            className="relative flex rounded-full bg-[var(--glass-bg)] p-1 backdrop-blur-xl"
            style={{ boxShadow: "var(--glass-shadow), 0 0 0 1px var(--glass-border)" }}
            role="tablist"
            aria-label="Body view"
          >
            {views.map((v, i) => (
              <button
                key={v}
                role="tab"
                aria-selected={viewIndex === i}
                onClick={() => setViewIndex(i)}
                className={`relative rounded-full px-5 py-1.5 text-sm font-medium capitalize transition-colors ${
                  viewIndex === i ? "text-[var(--brand-foreground)]" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {viewIndex === i && (
                  <motion.span
                    layoutId="region-view-pill"
                    className="absolute inset-0 rounded-full bg-[var(--brand)]"
                    style={{ boxShadow: "var(--brand-glow)" }}
                    transition={{ type: "spring", stiffness: 500, damping: 34 }}
                  />
                )}
                <span className="relative z-10">{v}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="flex w-full max-w-4xl flex-col items-center gap-8 lg:flex-row lg:items-start">
        {/* SVG */}
        <div className="flex flex-1 flex-col items-center">
          <motion.h2
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold text-[var(--ink)] drop-shadow-[0_0_12px_var(--region-color)_at_50%_0]"
          >
            {REGIONS[region].label}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
            className="mb-4 text-sm text-muted-foreground/60"
          >
            {REGIONS[region].hint}
          </motion.p>

          <motion.div
            layout
            className="relative flex w-full items-center justify-center overflow-hidden rounded-3xl bg-[var(--glass-bg)] p-6 backdrop-blur-xl"
            style={{ boxShadow: "var(--glass-shadow), 0 0 0 1px var(--glass-border), inset 0 0 60px var(--region-soft)" }}
          >
            <AnimatePresence mode="wait">
              <motion.svg
                key={currentView}
                viewBox={viewBox}
                className="h-[45vh] w-full max-w-sm drop-shadow-[0_0_20px_var(--region-color)_at_50%_50%]"
                role="group"
                aria-label={`${REGIONS[region].label} muscles, ${currentView} view`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
                        fillOpacity={isActive ? 0.6 : 0.3}
                        stroke="var(--region-color)"
                        strokeWidth={isActive ? 0.6 : 0.3}
                        strokeOpacity={isActive ? 0.9 : 0.4}
                        style={{
                          transition:
                            "fill 250ms cubic-bezier(0.22,1,0.36,1), fill-opacity 250ms ease, stroke-width 250ms ease",
                        }}
                      />
                    </g>
                  );
                })}
              </motion.svg>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Muscle buttons */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="flex w-full flex-col gap-2 lg:w-auto lg:min-w-[200px]"
        >
          <h3 className="px-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground/50">
            Muscles in this region
          </h3>
          {unique.map((muscle, i) => {
            const isActive = selectedMuscle === muscle.id;
            return (
              <motion.button
                key={muscle.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.04 }}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                data-region={region}
                className={`group relative overflow-hidden rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition-all ${
                  isActive
                    ? "border-[var(--region-color)] bg-[var(--region-soft)] text-[var(--ink)]"
                    : "border-[var(--glass-border)] bg-[var(--glass-bg)] text-muted-foreground backdrop-blur-xl hover:border-[var(--region-color)]/50 hover:text-[var(--ink)]"
                }`}
                style={isActive ? { boxShadow: "var(--region-glow, 0 0 12px oklch(0.72 0.18 55 / 0.2))" } : {}}
                onClick={() => {
                  selectionEngine.selectMuscle(muscle.id, "click");
                  router.push(`/body/${region}/${muscle.id}`);
                }}
              >
                {muscle.label}
                {isActive && (
                  <motion.div
                    layoutId="muscle-dot"
                    className="absolute right-3 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-[var(--region-color)]"
                    style={{ boxShadow: "0 0 6px var(--region-color)" }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
