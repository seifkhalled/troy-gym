"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accessibility, Dumbbell, Brain, Settings, HelpCircle, User, ChevronRight } from "lucide-react";

const navItems = [
  { href: "/body", label: "Body", icon: Accessibility },
  { href: "#", label: "Training", icon: Dumbbell },
  { href: "#", label: "AI Coach", icon: Brain },
  { href: "#", label: "Settings", icon: Settings },
] as const;

const footerItems = [
  { href: "#", label: "Support", icon: HelpCircle },
  { href: "#", label: "Account", icon: User },
] as const;

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex flex-col h-full bg-card/90 backdrop-blur-md border-r border-border py-8" style={{ minWidth: "16rem", width: "16rem" }}>
      {/* Logo */}
      <div className="px-6 mb-8">
        <Link href="/" className="font-heading text-xl font-bold tracking-tighter text-primary">ACHILLES</Link>
        <p className="text-[10px] text-muted-foreground mt-0.5">Select a muscle group to begin</p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-4 flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/body" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? "bg-primary/10 text-primary border-r-2 border-primary"
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground hover:translate-x-0.5"
              }`}
            >
              <Icon className="size-5" />
              <span className="text-sm font-medium">{item.label}</span>
              {isActive && <ChevronRight className="size-3.5 ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* CTA */}
      <div className="px-6 mb-6">
        <button className="w-full py-3 px-4 bg-primary text-primary-foreground text-xs font-semibold uppercase tracking-widest rounded-lg hover:opacity-90 transition-all active:scale-95" style={{ boxShadow: "0 0 15px oklch(0.78 0.12 286 / 0.2)" }}>
          Start Workout
        </button>
      </div>

      {/* Footer */}
      <div className="px-4 border-t border-border pt-4 flex flex-col gap-2">
        {footerItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-3 px-4 py-2 rounded-lg text-muted-foreground hover:bg-white/5 hover:text-foreground transition-all"
            >
              <Icon className="size-4" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}
