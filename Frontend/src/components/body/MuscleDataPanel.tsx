"use client";

import { useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import { useSelection } from "@/store/selectionEngine";
import { MUSCLES, REGIONS } from "@/lib/anatomy/muscleRegistry";
import { ExerciseMedia } from "@/components/body/ExerciseMedia";
import { Brain, Dumbbell, StretchHorizontal, Clock, BarChart3, Activity } from "lucide-react";

type TabId = "overview" | "exercises" | "stretches" | "recovery";

const tabs: { id: TabId; label: string; icon: typeof Brain }[] = [
  { id: "overview", label: "Overview", icon: Brain },
  { id: "exercises", label: "Exercises", icon: Dumbbell },
  { id: "stretches", label: "Stretches", icon: StretchHorizontal },
  { id: "recovery", label: "Recovery", icon: Clock },
];

const fadeUp = (i: number): Variants => ({
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
});

const tabActiveClass = "border-b-2 border-primary text-primary";
const tabInactiveClass = "text-muted-foreground hover:text-foreground transition-colors";

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
          <div className="w-16 h-16 rounded-full bg-card border border-border flex items-center justify-center mx-auto mb-6 relative">
            <div className="absolute inset-0 rounded-full border border-primary/20 animate-ping opacity-20" />
            <Activity className="size-7 text-primary" />
          </div>
          <p className="text-sm text-foreground font-medium mb-2">
            {hasRegion
              ? `Select a muscle in ${REGIONS[region].label} to inspect`
              : "Select a muscle to inspect"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {hasRegion
              ? "Click a muscle from the list to see details"
              : "Hover over the anatomical model or use the search"}
          </p>
        </div>
      </div>
    );
  }

  const reg = REGIONS[entry.region];

  return (
    <div className="flex h-full flex-col" data-region={entry.region}>
      {/* Header */}
      <div className="flex items-center gap-3 px-6 pt-6 pb-0">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
            <span className="cursor-pointer hover:text-foreground transition-colors">{reg.label}</span>
            <span>/</span>
            <span className="text-primary font-semibold">{entry.label.split(" ")[0]}</span>
          </div>
          <h2 className="text-xl font-bold text-foreground" style={{ fontFamily: "var(--font-heading)" }}>
            {entry.label}
          </h2>
        </div>
      </div>

      {/* Stat Pills */}
      <div className="flex items-center gap-2 px-6 pt-4 pb-2">
        <StatPill icon={<Clock className="size-3" />} label="Recovery" value={entry.recoveryTime} />
        <StatPill icon={<BarChart3 className="size-3" />} label="Volume" value={entry.weeklyVolume} />
      </div>

      {/* Tabs */}
      <div className="px-6 pt-3 pb-0">
        <div className="flex gap-6 border-b border-border" role="tablist" aria-label="Muscle detail tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-all ${isActive ? tabActiveClass : tabInactiveClass}`}
              >
                <Icon className="size-3" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6 pt-4">
        <AnimatePresence mode="wait">
          {activeTab === "overview" && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              {(entry.aiContext.primaryFunctions.length > 0 || entry.aiContext.commonIssues.length > 0) && (
                <GlassSection>
                  <SectionHeader icon={<Brain className="size-3.5" />} title="AI Coaching Context" />
                  {entry.aiContext.primaryFunctions.length > 0 && (
                    <div className="mt-3 space-y-1.5">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Primary Functions</p>
                      {entry.aiContext.primaryFunctions.map((f) => (
                        <div key={f} className="flex items-start gap-2">
                          <span className="mt-1 size-1.5 rounded-full shrink-0" style={{ backgroundColor: "var(--region-color)" }} />
                          <span className="text-sm text-foreground/70">{f}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {entry.aiContext.commonIssues.length > 0 && (
                    <div className="mt-4 space-y-1.5">
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">Watch For</p>
                      {entry.aiContext.commonIssues.map((c) => (
                        <div key={c} className="flex items-start gap-2">
                          <span className="mt-1 size-1.5 rounded-full shrink-0 bg-amber-400/60" />
                          <span className="text-sm text-foreground/70">{c}</span>
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
                        <Dumbbell className="size-3.5 text-muted-foreground" />
                        <span className="text-sm font-semibold text-foreground/90">{ex.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }, (_, j) => (
                            <span
                              key={j}
                              className={`text-[10px] ${
                                j < ex.difficulty ? "text-secondary" : "text-white/10"
                              }`}
                            >
                              ◆
                            </span>
                          ))}
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.04] text-muted-foreground uppercase tracking-wider font-medium">
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
                        <span className="flex size-6 items-center justify-center rounded-full bg-white/[0.04] text-[10px] font-bold text-muted-foreground">
                          {i + 1}
                        </span>
                        <span className="text-sm text-foreground/70">{s}</span>
                      </motion.div>
                    ))}
                  </div>
                </GlassSection>
              ) : (
                <div className="text-center py-12">
                  <StretchHorizontal className="mx-auto mb-3 size-8 text-white/[0.06]" />
                  <p className="text-sm text-muted-foreground">No stretches listed for this muscle</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "recovery" && (
            <motion.div
              key="recovery"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-4"
            >
              <GlassSection>
                <SectionHeader icon={<Clock className="size-3.5" />} title="Recovery & Volume" />
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="bg-card/50 rounded-xl p-4 border border-border">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Recommended Recovery</p>
                    <p className="text-2xl font-bold text-primary" style={{ fontFamily: "var(--font-heading)" }}>{entry.recoveryTime}</p>
                  </div>
                  <div className="bg-card/50 rounded-xl p-4 border border-border">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">Weekly Volume</p>
                    <p className="text-2xl font-bold text-secondary" style={{ fontFamily: "var(--font-heading)" }}>{entry.weeklyVolume}</p>
                  </div>
                </div>
              </GlassSection>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function GlassSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-card/40 border border-border p-4 backdrop-blur-sm">
      {children}
    </div>
  );
}

function SectionHeader({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      {icon}
      <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-heading)" }}>
        {title}
      </span>
    </div>
  );
}

function StatPill({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-card/40 border border-border px-3 py-2 flex-1 backdrop-blur-sm">
      <span className="text-muted-foreground shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[9px] uppercase tracking-wider text-muted-foreground font-medium">{label}</p>
        <p className="text-sm font-semibold text-foreground/80">{value}</p>
      </div>
    </div>
  );
}
