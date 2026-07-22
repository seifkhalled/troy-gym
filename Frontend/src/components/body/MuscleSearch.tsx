"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { selectionEngine } from "@/store/selectionEngine";
import { MUSCLES, REGIONS } from "@/lib/anatomy/muscleRegistry";
import { Search, X } from "lucide-react";

export function MuscleSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);

  const match = q.trim().length > 0 ? selectionEngine.resolveSearch(q) : null;

  const results = match
    ? [MUSCLES[match.muscleId]]
    : q.trim().length > 0
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
    <div
      className="relative"
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false); }}
    >
      <div className="relative">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/40" />
        <input
          type="search"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search muscle or region..."
          aria-label="Search muscles"
          className="w-full rounded-2xl border border-border bg-card/40 py-2.5 pl-10 pr-9 text-sm text-foreground outline-none backdrop-blur-xl placeholder:text-muted-foreground/40 transition focus:border-primary/50"
          style={{ boxShadow: "var(--glass-shadow)" }}
        />
        {q && (
          <button
            onClick={() => { setQ(""); setOpen(false); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-muted-foreground"
          >
            <X className="size-4" />
          </button>
        )}
      </div>
      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-2xl"
            style={{ boxShadow: "var(--glass-shadow)" }}
          >
            {results.map((m, i) => (
              <motion.li
                key={m.id}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <button
                  onClick={() => choose(m.id, m.region)}
                  className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition hover:bg-primary/10"
                >
                  <span className="font-medium text-[var(--ink)]">{m.label}</span>
                  <span className="text-xs text-muted-foreground/60" data-region={m.region}>
                    {REGIONS[m.region].label}
                  </span>
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
