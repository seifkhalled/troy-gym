import { RegionSelector } from "@/components/body/RegionSelector";
import { MuscleDataPanel } from "@/components/body/MuscleDataPanel";

export default function BodyPage() {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <div className="flex h-full w-full flex-col lg:flex-row">
        <section className="flex-1 overflow-hidden">
          <RegionSelector />
        </section>
        <aside className="w-full max-w-sm border-t border-border lg:border-l lg:border-t-0">
          <MuscleDataPanel />
        </aside>
      </div>
    </main>
  );
}
