import Link from "next/link";
import { Card, CardHeader } from "@/components/ui/card";
import { PageShell } from "@/components/page-shell";

export default function ReportsPage() {
  return (
    <PageShell
      title="Reports and exports"
      description="Leadership-ready exports with audit expectations for sensitive records."
      actions={
        <Link
          href="/api/reports/export"
          className="inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Export CSV
        </Link>
      }
    >
      <div className="grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Leadership review",
            text: "Staff status, certification risk, incident queue, and evaluation completion.",
          },
          {
            title: "Compliance review",
            text: "Background check visibility, document access, audit events, and retention controls.",
          },
          {
            title: "Program quality",
            text: "Evaluation trends, survey reuse, response history, and manager dashboard usage.",
          },
        ].map((report) => (
          <Card key={report.title}>
            <CardHeader title={report.title} description={report.text} />
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
