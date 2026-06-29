import { GuidedReportsDemo } from "@/components/ai/guided-reports-demo";
import { PageShell } from "@/components/page-shell";

export default function AiPage() {
  return (
    <PageShell
      title="Guided reports"
      description="One-click AI summaries for programs, incidents, staff compliance, and evaluation trends — drafted from live organization data with age and risk guardrails."
    >
      <GuidedReportsDemo />
    </PageShell>
  );
}
