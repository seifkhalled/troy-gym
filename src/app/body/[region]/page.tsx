import { notFound } from "next/navigation";
import { RegionDetail } from "@/components/body/RegionDetail";
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
      <div className="flex h-full w-full flex-col lg:flex-row">
        <section className="flex-1 overflow-hidden">
          <RegionDetail region={region as RegionId} />
        </section>
        <aside className="w-full max-w-sm border-t border-border lg:border-l lg:border-t-0">
          <MuscleDataPanel />
        </aside>
      </div>
    </main>
  );
}
