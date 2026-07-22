"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import type { Variants } from "motion/react";
import { BodyIllustration } from "@/components/body/BodyIllustration";
import {
  REGIONS,
  REGION_ORDER,
  REGION_MUSCLES,
  MUSCLES,
  musclesForRegion,
  type BodyView,
  type RegionId,
} from "@/lib/anatomy/muscleRegistry";
import { selectionEngine, useSelection } from "@/store/selectionEngine";
import { MuscleSearch } from "@/components/body/MuscleSearch";
import { ChevronRight, ArrowLeft } from "lucide-react";

const container: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, x: -8 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 200, damping: 26 } as const },
};

export function RegionSelector() {
  const router = useRouter();
  const [view, setView] = useState<BodyView>("front");
  const [activeRegion, setActiveRegion] = useState<RegionId | null>(null);
  const selectedRegion = useSelection((s) => s.region);
  const selectedMuscle = useSelection((s) => s.muscle);

  const showingMuscles = selectedRegion !== null;

  const regions = useMemo(
    () => REGION_ORDER.filter((r) => REGIONS[r].views.includes(view)),
    [view]
  );

  const regionEntry = selectedRegion ? REGIONS[selectedRegion] : null;

  const muscleEntries = useMemo(
    () => (selectedRegion ? musclesForRegion(selectedRegion) : []),
    [selectedRegion]
  );

  const visibleMuscles = useMemo(
    () =>
      muscleEntries.filter((m) => {
        if (!regionEntry) return true;
        return regionEntry.views.includes(view) ? m.view === view : true;
      }),
    [muscleEntries, regionEntry, view]
  );

  const goToRegion = (id: RegionId) => {
    selectionEngine.selectRegion(id, "click");
    router.push(`/body/${id}`);
  };

  const goToMuscle = (muscleId: string) => {
    selectionEngine.selectMuscle(muscleId, "click");
    const region = MUSCLES[muscleId]?.region ?? selectedRegion;
    router.push(`/body/${region}/${muscleId}`);
  };

  const goBackToRegions = () => {
    selectionEngine.clear();
    router.push("/body");
  };

  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pt-5 pb-2">
        <h1 className="text-xl font-bold tracking-tighter text-primary" style={{ fontFamily: "var(--font-heading)" }}>
          ACHILLES
        </h1>
        <p className="text-xs text-muted-foreground/60 mt-0.5">Interactive Anatomy & AI Coaching</p>
      </div>

      <div className="px-5 pb-3">
        <MuscleSearch />
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 min-h-0 relative flex items-center justify-center px-4 py-1">
          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={view + (selectedRegion ?? "all")}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex h-full w-full items-center justify-center"
              >
                <BodyIllustration
                  view={view}
                  activeRegion={selectedRegion && REGIONS[selectedRegion].views.includes(view) ? selectedRegion : activeRegion}
                  onHover={setActiveRegion}
                  onSelect={goToRegion}
                />
              </motion.div>
            </AnimatePresence>

            <div
              className="absolute bottom-3 left-1/2 -translate-x-1/2 flex rounded-full bg-black/60 p-0.5 backdrop-blur-xl border border-white/5 shadow-lg"
              role="tablist"
              aria-label="Body view"
            >
              {(["front", "back"] as BodyView[]).map((v) => (
                <button
                  key={v}
                  role="tab"
                  aria-selected={view === v}
                  onClick={() => { setView(v); setActiveRegion(null); }}
                  className={`relative rounded-full px-4 py-1 text-xs font-medium capitalize transition-colors ${
                    view === v ? "text-black" : "text-white/50 hover:text-white/80"
                  }`}
                >
                      {view === v && (
                      <motion.span
                        layoutId="view-pill"
                        className="absolute inset-0 rounded-full bg-primary"
                        style={{ boxShadow: "0 0 10px oklch(0.78 0.12 286 / 0.3)" }}
                        transition={{ type: "spring", stiffness: 500, damping: 34 }}
                      />
                    )}
                  <span className="relative z-10">{v}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-y-auto flex-shrink-0 px-4 pb-4 pt-2 max-h-[40%]">
          {showingMuscles ? (
            <>
              <div className="flex items-center gap-2 px-1 pb-2">
                <button
                  type="button"
                  onClick={goBackToRegions}
                  className="flex items-center gap-1 text-[10px] text-white/40 hover:text-white/70 transition-colors"
                >
                  <ArrowLeft className="size-3" />
                  All Regions
                </button>
                <span className="text-[10px] text-white/20 mx-1">/</span>
                <span
                  className="text-[10px] font-semibold uppercase tracking-wider"
                  style={{ color: "var(--region-color)" }}
                >
                  {regionEntry?.label}
                </span>
              </div>
              <motion.div
                className="flex flex-col gap-1"
                variants={container}
                initial="hidden"
                animate="show"
              >
                {visibleMuscles.map((m) => {
                  const isActive = selectedMuscle === m.id;
                  return (
                    <motion.button
                      key={m.id}
                      variants={item}
                      data-region={selectedRegion}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => goToMuscle(m.id)}
                      aria-label={`Select ${m.label}`}
                      className={`group relative overflow-hidden rounded-xl px-4 py-2.5 text-left transition-all duration-300 ${
                        isActive
                          ? "bg-[var(--region-soft)]"
                          : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="min-w-0 flex items-center gap-2.5">
                          <span
                            className={`block text-sm font-semibold ${
                              isActive
                                ? "text-[var(--region-color)]"
                                : "text-white/70 group-hover:text-white/90"
                            }`}
                          >
                            {m.label}
                          </span>
                          <span className="text-[10px] text-white/30">{m.exercises.length} exercises</span>
                        </div>
                        <ChevronRight
                          className={`size-3.5 shrink-0 transition-all duration-300 ${
                            isActive
                              ? "text-[var(--region-color)] opacity-100"
                              : "text-white/20 opacity-0 group-hover:opacity-60"
                          }`}
                        />
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            </>
          ) : (
            <motion.div
              className="flex flex-col gap-1"
              variants={container}
              initial="hidden"
              animate="show"
            >
              {regions.map((id) => {
                const r = REGIONS[id];
                const isActive = activeRegion === id || selectedRegion === id;
                return (
                  <motion.button
                    key={id}
                    variants={item}
                    data-region={id}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => goToRegion(id)}
                    onMouseEnter={() => setActiveRegion(id)}
                    onMouseLeave={() => setActiveRegion(null)}
                    aria-label={`Open ${r.label} region`}
                    className={`group relative overflow-hidden rounded-xl px-4 py-2.5 text-left transition-all duration-300 ${
                      isActive
                        ? "bg-[var(--region-soft)]"
                        : "hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0 flex items-center gap-2.5">
                        <span className={`block text-sm font-semibold ${
                          isActive ? "text-[var(--region-color)]" : "text-white/70 group-hover:text-white/90"
                        }`}>
                          {r.label}
                        </span>
                        <span className="text-[10px] text-white/30">{REGION_MUSCLES[id].length} muscles</span>
                      </div>
                      <ChevronRight className={`size-3.5 shrink-0 transition-all duration-300 ${
                        isActive ? "text-[var(--region-color)] opacity-100" : "text-white/20 opacity-0 group-hover:opacity-60"
                      }`} />
                    </div>
                  </motion.button>
                );
              })}
              {regions.length === 0 && (
                <p className="px-1 text-xs text-white/30">No regions for this view.</p>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
