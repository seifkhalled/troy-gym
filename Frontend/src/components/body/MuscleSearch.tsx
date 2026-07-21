"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { selectionEngine } from "@/store/selectionEngine";
import { MUSCLES, REGIONS } from "@/lib/anatomy/muscleRegistry";

/**
 * Search-driven navigation (req #7). Resolution is delegated to the Selection
 * Engine facade (req #5) — the view does NOT reimplement search logic. The
 * engine returns a matched muscle + region; we then deep-link to its route.
 */
export function MuscleSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const match = q.trim().length > 0 ? selectionEngine.resolveSearch(q) : null;

  const results = match
    ? [MUSCLES[match.muscleId]]
    : // No exact match yet: show live suggestions as the user types.
      q.trim().length > 0
      ? Object.values(MUSCLES)
          .filter(
            (m) =>
              m.label.toLowerCase().includes(q.toLowerCase()) ||
              REGIONS[m.region].label.toLowerCase().includes(q.toLowerCase())
          )
          .slice(0, 6)
      : [];

  const choose = (muscleId: string, region: string) => {
    selectionEngine.selectMuscle(muscleId, "search");
    setOpen(false);
    setQ("");
    router.push(`/body/${region}/${muscleId}`);
  };

  return (
    <div className="relative" onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}>
      <input
        type="search"
        value={q}
        onChange={(e) => {
          setQ(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Search muscle or region (e.g. Rear Delt)"
        aria-label="Search muscles"
        className="w-full rounded-full border border-border bg-card px-4 py-2 text-sm text-[var(--ink)] outline-none placeholder:text-muted-foreground focus-visible:border-[var(--brand)]"
      />
      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute z-30 mt-1 w-full overflow-hidden rounded-xl border border-border bg-card shadow-lg"
          >
            {results.map((m) => (
              <li key={m.id}>
                <button
                  onClick={() => choose(m.id, m.region)}
                  className="flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-[var(--brand-soft)]"
                >
                  <span className="font-medium text-[var(--ink)]">{m.label}</span>
                  <span className="text-xs text-muted-foreground">{REGIONS[m.region].label}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
