"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { useSelection } from "@/store/selectionEngine";
import { MUSCLES, REGIONS } from "@/lib/anatomy/muscleRegistry";
import { ExerciseMedia } from "@/components/body/ExerciseMedia";
import { Brain, Dumbbell, StretchHorizontal, Clock, BarChart3, Activity } from "lucide-react";

type TabId = "overview" | "exercises" | "stretches";

const tabs: { id: TabId; label: string; icon: typeof Brain }[] = [
  { id: "overview", label: "Overview & Coaching", icon: Brain },
  { id: "exercises", label: "Exercises", icon: Dumbbell },
  { id: "stretches", label: "Stretches", icon: StretchHorizontal },
];

const fadeUp = (i: number): Variants => ({
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
});

export function MuscleDataPanel() {
  const muscleId = useSelection((s) => s.muscle);
  const region = useSelection((s) => s.region);
  const source = useSelection((s) => s.source);
  const entry = muscleId ? MUSCLES[muscleId] : null;
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  if (!entry) {
    const hasRegion = region && REGIONS[region];
    return (
      <div className="flex h-full flex-col items-center justify-center p-8">
        <div className="text-center max-w-xs">
          <Activity className="mx-auto mb-4 size-10 text-white/[0.06]" />
          <p className="text-sm text-white/30 font-medium">
            {hasRegion
              ? `Select a muscle in ${REGIONS[region].label} to inspect`
              : "Select a muscle to inspect"}
          </p>
          <p className="text-xs text-white/20 mt-1">Click a region on the body, then pick a muscle</p>
        </div>
      </div>
    );
  }

  const reg = REGIONS[entry.region];

  return (
    <div className="flex h-full flex-col" data-region={entry.region}>
      <div className="flex items-center gap-3 px-6 pt-5 pb-0">
        <div className="flex-1 min-w-0">
          <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-heading)" }}>
            {entry.label}
          </h2>
          <div className="flex items-center gap-2 mt-0.5">
            <span
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: "var(--region-color)" }}
            >
              {reg.label}
            </span>
            <span className="text-[10px] text-white/20">via {source}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 px-6 pt-3 pb-2">
        <StatPill icon={<Clock className="size-3" />} label="Recovery" value={entry.recoveryTime} />
        <StatPill icon={<BarChart3 className="size-3" />} label="Volume" value={entry.weeklyVolume} />
      </div>

      <div className="px-6 pt-1 pb-3">
        <div
          className="relative flex rounded-xl bg-white/[0.03] p-0.5 gap-0.5"
          role="tablist"
          aria-label="Muscle detail tabs"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className="relative flex-1 rounded-[10px] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors"
              >
                {isActive && (
                  <motion.span
                    layoutId="muscle-tab-pill"
                    className="absolute inset-0 rounded-[10px] bg-white/[0.06]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center justify-center gap-1.5">
                  <Icon className="size-3" />
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {(entry.aiContext.primaryFunctions.length > 0 || entry.aiContext.commonIssues.length > 0) && (
                <GlassSection>
                  <SectionHeader icon={<Brain className="size-3.5" />} title="AI Coaching Context" />
                  {entry.aiContext.primaryFunctions.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Primary Functions</p>
                      {entry.aiContext.primaryFunctions.map((f) => (
                        <div key={f} className="flex items-start gap-2">
                          <span className="mt-1 size-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--region-color)" }} />
                          <span className="text-sm text-white/70">{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {entry.aiContext.commonIssues.length > 0 && (
                    <div className="mt-4 space-y-1.5">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">Watch For</p>
                      {entry.aiContext.commonIssues.map((c) => (
                        <div key={c} className="flex items-start gap-2">
                          <span className="mt-1 size-1.5 rounded-full shrink-0 bg-amber-400/60" />
                          <span className="text-sm text-white/70">{c}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </GlassSection>
              )}
            </motion.div>
          )}

          {activeTab === "exercises" && (
            <motion.div
              key="exercises"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              {entry.exercises.map((ex, i) => (
                <motion.div
                  key={ex.name}
                  custom={i}
                  variants={fadeUp(i)}
                  initial="hidden"
                  animate="show"
                >
                  <GlassSection>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Dumbbell className="size-3.5 text-white/40" />
                        <span className="text-sm font-semibold text-white/90">{ex.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }, (_, j) => (
                            <span
                              key={j}
                              className={`text-[10px] ${
                                j < ex.difficulty ? "text-[var(--lime)]" : "text-white/10"
                              }`}
                            >
                              ◆
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-white/40 uppercase tracking-wider font-medium">
                          {ex.equipment}
                        </span>
                      </div>
                    </div>
                    <ExerciseMedia exercise={ex.name} />
                  </GlassSection>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "stretches" && (
            <motion.div
              key="stretches"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {entry.stretches.length > 0 ? (
                <GlassSection>
                  <SectionHeader icon={<StretchHorizontal className="size-3.5" />} title="Stretches" />
                  <div className="mt-3 space-y-2">
                    {entry.stretches.map((s, i) => (
                      <motion.div
                        key={s}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex items-center gap-3 rounded-xl bg-white/[0.02] px-4 py-3"
                      >
                        <span className="flex size-6 items-center justify-center rounded-full bg-white/[0.04] text-[10px] font-bold text-white/30">
                          {i + 1}
                        </span>
                        <span className="text-sm text-white/70">{s}</span>
                      </motion.div>
                    ))}
                  </div>
                </GlassSection>
              ) : (
                <div className="text-center py-12">
                  <StretchHorizontal className="mx-auto mb-3 size-8 text-white/[0.06]" />
                  <p className="text-sm text-white/30">No stretches listed for this muscle</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function GlassSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/[0.02] border border-white/[0.04] p-4">
      {children}
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-white/40">
      {icon}
      <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
        {title}
      </span>
    </div>
  );
}

function StatPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white/[0.03] border border-white/[0.04] px-3 py-2 flex-1">
      <span className="text-white/30 shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[9px] uppercase tracking-wider text-white/30 font-medium">{label}</p>
        <p className="text-sm font-semibold text-white/80">{value}</p>
      </div>
    </div>
  );
}
