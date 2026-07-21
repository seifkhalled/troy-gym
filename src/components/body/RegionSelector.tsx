"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { BodyIllustration } from "@/components/body/BodyIllustration";
import { REGIONS, REGION_ORDER, REGION_MUSCLES, MUSCLES, type BodyView, type RegionId } from "@/lib/anatomy/muscleRegistry";
import { selectionEngine, useSelection } from "@/store/selectionEngine";

export function RegionSelector() {
  const router = useRouter();
  const [view, setView] = useState<BodyView>("front");
  const [activeRegion, setActiveRegion] = useState<RegionId | null>(null);
  // Subscribe to app state so external selections (search, route) reflect here.
  const selectedRegion = useSelection((s) => s.region);

  const regions = REGION_ORDER.filter((r) => REGIONS[r].views.includes(view));

  const goToRegion = (id: RegionId) => {
    selectionEngine.selectRegion(id, "click");
    router.push(`/body/${id}`);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between px-6 pt-6">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-[var(--ink)]">TROY GYM</h1>
          <p className="text-sm text-muted-foreground">Select a region to explore muscles</p>
        </div>

        <div
          className="flex rounded-full border border-[var(--brand)]/30 bg-[var(--brand-soft)] p-1"
          role="tablist"
          aria-label="Body view"
        >
          {(["front", "back"] as BodyView[]).map((v) => (
            <button
              key={v}
              role="tab"
              aria-selected={view === v}
              onClick={() => {
                setView(v);
                setActiveRegion(null);
              }}
              className={`relative rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors ${
                view === v ? "text-[var(--brand-foreground)]" : "text-[var(--ink)]/60"
              }`}
            >
              {view === v && (
                <motion.span
                  layoutId="view-pill"
                  className="absolute inset-0 rounded-full bg-[var(--brand)]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative z-10">{v}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid flex-1 grid-cols-1 gap-6 px-6 py-4 md:grid-cols-[1fr_320px]">
        <div className="relative flex items-center justify-center rounded-2xl border border-border bg-gradient-to-b from-white to-[var(--brand-soft)]/40">
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0, rotateY: 12, scale: 0.98 }}
              animate={{ opacity: 1, rotateY: 0, scale: 1 }}
              exit={{ opacity: 0, rotateY: -12, scale: 0.98 }}
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
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {view} regions
          </h2>
          {regions.map((id) => {
            const r = REGIONS[id];
            const isActive = activeRegion === id || selectedRegion === id;
            return (
              <motion.button
                key={id}
                data-region={id}
                whileHover={{ x: 4 }}
                onClick={() => goToRegion(id)}
                onMouseEnter={() => setActiveRegion(id)}
                onMouseLeave={() => setActiveRegion(null)}
                aria-label={`Open ${r.label} region`}
                className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--region-color)] ${
                  isActive
                    ? "border-[var(--region-color)] bg-[var(--region-soft)]"
                    : "border-border bg-card hover:border-[var(--region-color)]/50"
                }`}
              >
                <span>
                  <span className="block text-sm font-medium text-[var(--ink)]">{r.label}</span>
                  <span className="block text-xs text-muted-foreground">{r.hint}</span>
                </span>
                <span className="text-right text-xs text-muted-foreground">
                  {REGION_MUSCLES[id]
                    .map((m) => MUSCLES[m].label)
                    .slice(0, 2)
                    .join(", ")}
                  {REGION_MUSCLES[id].length > 2 ? "…" : ""}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
