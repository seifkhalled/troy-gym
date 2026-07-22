import { notFound } from "next/navigation";
import { RegionSelector } from "@/components/body/RegionSelector";
import { MuscleDataPanel } from "@/components/body/MuscleDataPanel";
import { AICoachSidebar } from "@/components/body/AICoachSidebar";
import { SidebarNav } from "@/components/body/SidebarNav";
import { TopNavBar } from "@/components/body/TopNavBar";
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
      <SidebarNav />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavBar />
        <div className="flex flex-1 min-h-0">
          <section className="w-[35%] min-w-0 shrink-0 border-r border-border h-full overflow-hidden">
            <RegionSelector />
          </section>
          <section className="flex-1 min-w-0 h-full overflow-hidden">
            <MuscleDataPanel />
          </section>
          <section className="w-[30%] min-w-0 shrink-0 h-full overflow-hidden p-3 hidden xl:block">
            <AICoachSidebar />
          </section>
        </div>
      </div>
    </main>
  );
}
