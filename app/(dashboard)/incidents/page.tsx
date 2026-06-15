import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { PageShell } from "@/components/page-shell";
import { incidents } from "@/lib/mock-data";
import { formatDate, formatRelativeDueDate } from "@/lib/utils";

export default function IncidentsPage() {
  return (
    <PageShell
      title="Incident reporting"
      description="Track safety and operational incidents, internal notes, attachments, resolution state, and follow-up accountability."
      actions={
        <Link
          href="/incidents/new"
          className="inline-flex rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:bg-slate-50"
        >
          Add Incident
        </Link>
      }
    >
      <Card>
        <CardHeader
          title="Incident queue"
          description="Open versus closed state powers dashboard counters and follow-up reminders."
        />
        <div className="space-y-4">
          {incidents.map((incident) => (
            <article
              key={incident.id}
              className="rounded-2xl border border-border p-5"
            >
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{incident.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {incident.site} · {formatDate(incident.occurredAt)}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={
                      incident.severity === "high" ||
                      incident.severity === "critical"
                        ? "danger"
                        : "warning"
                    }
                  >
                    {incident.severity}
                  </Badge>
                  <Badge>{incident.status.replace("_", " ")}</Badge>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                {incident.description}
              </p>
              <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-muted-foreground">Involved staff</p>
                  <p className="mt-1 font-medium">
                    {incident.involvedStaff.join(", ")}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-muted-foreground">Follow-up owner</p>
                  <p className="mt-1 font-medium">{incident.followUpOwner}</p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-muted-foreground">Due</p>
                  <p className="mt-1 font-medium">
                    {formatRelativeDueDate(incident.followUpDue)}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Card>
    </PageShell>
  );
}
