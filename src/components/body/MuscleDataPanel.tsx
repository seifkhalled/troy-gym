"use client";

import { motion, type Variants } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useSelection } from "@/store/selectionEngine";
import { MUSCLES, REGIONS } from "@/lib/anatomy/muscleRegistry";
import { MuscleSearch } from "@/components/body/MuscleSearch";

const fade: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function MuscleDataPanel() {
  const muscleId = useSelection((s) => s.muscle);
  const region = useSelection((s) => s.region);
  const source = useSelection((s) => s.source);
  const entry = muscleId ? MUSCLES[muscleId] : null;

  return (
    <div className="flex h-full flex-col gap-3 overflow-y-auto p-4">
      <MuscleSearch />

      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-base text-[var(--ink)]">
            {entry ? entry.label : "No muscle selected"}
          </CardTitle>
          {entry && (
            <div className="mt-1 flex items-center gap-2">
              <Badge className="w-fit bg-[var(--brand)] text-[var(--brand-foreground)] hover:bg-[var(--brand)]">
                {REGIONS[entry.region].label}
              </Badge>
              <span className="text-[11px] capitalize text-muted-foreground">
                via {source}
              </span>
            </div>
          )}
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          {entry
            ? `Recovery ${entry.recoveryTime} · ${entry.weeklyVolume}`
            : "Select a body region, then a muscle, to inspect it here."}
        </CardContent>
      </Card>

      {entry && (
        <>
          <Section title="Exercises" items={entry.exercises.map((e) => `${e.name} · ${e.equipment}`)} index={1} />
          <Section title="Stretches" items={entry.stretches} index={2} />
          <Section
            title="AI coaching context"
            items={[
              ...entry.aiContext.primaryFunctions.map((f) => `Function: ${f}`),
              ...entry.aiContext.commonIssues.map((c) => `Watch: ${c}`),
            ]}
            index={3}
          />
        </>
      )}
    </div>
  );
}

function Section({ title, items, index }: { title: string; items: string[]; index: number }) {
  return (
    <motion.div custom={index} variants={fade} initial="hidden" animate="show">
      <Card className="border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-1.5">
          {items.map((it) => (
            <span key={it} className="text-sm text-[var(--ink)]/80">
              {it}
            </span>
          ))}
        </CardContent>
      </Card>
    </motion.div>
  );
}
