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

  if (!MUSCLES[muscle] || MUSCLES[muscle].region !== region) {
    notFound();
  }

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <RouteSelectionSync region={region} muscle={muscle} />
      <div className="flex h-full w-full">
        <section className="w-[40%] min-w-0 shrink-0 border-r border-white/[0.04] h-full overflow-hidden">
          <RegionSelector />
        </section>
        <section className="flex-1 min-w-0 h-full overflow-hidden">
          <MuscleDataPanel />
        </section>
      </div>
    </main>
  );
}
