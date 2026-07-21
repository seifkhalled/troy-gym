import { notFound } from "next/navigation";
import { RegionSelector } from "@/components/body/RegionSelector";
import { MuscleDataPanel } from "@/components/body/MuscleDataPanel";
import { RouteSelectionSync } from "@/components/body/RouteSelectionSync";
import { REGIONS, RegionId } from "@/lib/anatomy/muscleRegistry";

export default async function RegionPage({
  params,
}: {
  params: Promise<{ region: string }>;
}) {
  const { region } = await params;
  if (!REGIONS[region as RegionId]) notFound();

  return (
    <main className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <RouteSelectionSync region={region} />
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
