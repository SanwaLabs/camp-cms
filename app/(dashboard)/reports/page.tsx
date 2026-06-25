import Link from "next/link";
import { ReportsAiTab } from "@/components/reports/reports-ai-tab";
import {
  ReportsTabNav,
  type ReportsTab,
} from "@/components/reports/reports-tab-nav";
import { ReportsTablesTab } from "@/components/reports/reports-tables-tab";
import { PageShell } from "@/components/page-shell";

export default async function ReportsPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const params = await searchParams;
  const activeTab: ReportsTab = params.tab === "ai" ? "ai" : "tables";

  return (
    <PageShell
      title="Reports and exports"
      description=""
    >
      <ReportsTabNav activeTab={activeTab} />
      {activeTab === "ai" ? <ReportsAiTab /> : <ReportsTablesTab />}
    </PageShell>
  );
}
