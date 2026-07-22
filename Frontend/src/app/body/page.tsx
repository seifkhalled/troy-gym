import { RegionSelector } from "@/components/body/RegionSelector";
import { MuscleDataPanel } from "@/components/body/MuscleDataPanel";
import { SidebarNav } from "@/components/body/SidebarNav";
import { TopNavBar } from "@/components/body/TopNavBar";

export default function BodyPage() {
  return (
    <main className="flex h-screen w-screen overflow-hidden bg-background text-foreground">
      <SidebarNav />
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavBar />
        <div className="flex flex-1 min-h-0">
          <section className="w-[40%] min-w-0 shrink-0 border-r border-border h-full overflow-hidden">
            <RegionSelector />
          </section>
          <section className="flex-1 min-w-0 h-full overflow-hidden">
            <MuscleDataPanel />
          </section>
        </div>
      </div>
    </main>
  );
}
