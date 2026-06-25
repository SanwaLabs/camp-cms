import { ProgramsList } from "@/components/programs/programs-list";
import { ProgramsTabNav } from "@/components/programs/programs-tab-nav";
import { PageShell } from "@/components/page-shell";
import { getProgramsForTab } from "@/lib/programs";
import { programs, programSessions } from "@/lib/mock-data";
import type { ProgramTimeTab } from "@/lib/types";

function parseTab(tab: string | undefined): ProgramTimeTab {
  if (tab === "past" || tab === "future") {
    return tab;
  }

  return "present";
}

export default async function ProgramsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const activeTab = parseTab(params.tab);
  const programsForTab = getProgramsForTab(
    activeTab,
    programs,
    programSessions,
  );

  return (
    <PageShell
      title="Programs"
      description="Browse camp programs by session timing — past, present, and upcoming."
    >
      <ProgramsTabNav activeTab={activeTab} />
      <ProgramsList programs={programsForTab} activeTab={activeTab} />
    </PageShell>
  );
}
