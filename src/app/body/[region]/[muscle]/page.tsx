import { notFound } from "next/navigation";
import { RegionSelector } from "@/components/body/RegionSelector";
import { MuscleDataPanel } from "@/components/body/MuscleDataPanel";
import { RouteSelectionSync } from "@/components/body/RouteSelectionSync";
import { MUSCLES } from "@/lib/anatomy/muscleRegistry";

export default async function MusclePage({
  params,
}: {
  params: Promise<{ region: string; muscle: string }>;
}) {
  const { region, muscle } = await params;

  // Server-side route param validation (audit #7): invalid muscle or mismatched
  // region => 404 instead of silently corrupting state.
  if (!MUSCLES[muscle] || MUSCLES[muscle].region !== region) {
    notFound();
  }

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <RouteSelectionSync region={region} muscle={muscle} />
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
