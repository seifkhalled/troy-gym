"use client";

import Link from "next/link";
import { User } from "lucide-react";

export function TopNavBar() {
  return (
    <header className="shrink-0 w-full bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="flex items-center justify-between h-16 px-6">
        <div className="md:hidden">
          <Link href="/" className="font-heading text-lg font-bold tracking-tighter text-primary">ACHILLES</Link>
        </div>
        <div className="hidden md:block" />
        <div className="flex items-center gap-4">
          <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all rounded-full">
            <User className="size-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
