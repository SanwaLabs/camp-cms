import Link from "next/link";
import { AlertTriangle, ArrowRight, ClipboardCheck, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { PageShell } from "@/components/page-shell";
import {
  dashboardMetrics,
  evaluations,
  incidents,
  staffProfiles,
} from "@/lib/mock-data";
import { formatDate, formatRelativeDueDate } from "@/lib/utils";

const toneToBadge = {
  neutral: "neutral",
  success: "success",
  warning: "warning",
  danger: "danger",
} as const;

export default function DashboardPage() {
  const expiringCerts = staffProfiles.flatMap((staff) =>
    staff.certifications
      .filter((cert) => cert.status !== "current")
      .map((cert) => ({ staff, cert })),
  );

  return (
    <PageShell
      title="Manager dashboard"
      description="Near-real-time operating view for staff status, expiring certifications, unresolved incidents, and pending evaluation work."
      actions={
        <Link
          href="/incidents/new"
          className="inline-flex items-center justify-center rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-foreground shadow-sm transition hover:bg-slate-50"
        >
          Log incident
        </Link>
      }
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <Card key={metric.label}>
            <Badge variant={toneToBadge[metric.tone]}>{metric.label}</Badge>
            <p className="mt-5 text-4xl font-bold">{metric.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {metric.helper}
            </p>
          </Card>
        ))}
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader
            title="Open incident queue"
            description="Follow-up work that needs manager or site lead attention."
            action={
              <Link
                href="/incidents"
                className="inline-flex items-center gap-1 text-sm font-semibold text-foreground"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            }
          />
          <div className="space-y-4">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="rounded-2xl border border-border p-4"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      <h3 className="font-semibold">{incident.title}</h3>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {incident.site} · {formatDate(incident.occurredAt)}
                    </p>
                  </div>
                  <div className="flex gap-2">
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
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {incident.description}
                </p>
                <p className="mt-3 text-sm font-medium">
                  Follow-up: {incident.followUpOwner} ·{" "}
                  {formatRelativeDueDate(incident.followUpDue)}
                </p>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Certification risk"
              description="Credentials requiring renewal attention."
            />
            <div className="space-y-3">
              {expiringCerts.map(({ staff, cert }) => (
                <div
                  key={`${staff.id}-${cert.id}`}
                  className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-3"
                >
                  <div>
                    <p className="font-medium">{staff.fullName}</p>
                    <p className="text-sm text-muted-foreground">
                      {cert.name} · expires {formatDate(cert.expiresAt)}
                    </p>
                  </div>
                  <Badge variant="warning">{cert.status}</Badge>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Recent evaluations"
              description="Latest rubric scores and narrative feedback."
            />
            <div className="space-y-3">
              {evaluations.map((evaluation) => (
                <Link
                  href={`/staff/${evaluation.staffId}`}
                  key={evaluation.id}
                  className="flex items-center gap-3 rounded-xl bg-slate-50 p-3 transition hover:bg-slate-100"
                >
                  <div className="rounded-xl bg-white p-2 text-primary">
                    <ClipboardCheck className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{evaluation.staffName}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {evaluation.summary}
                    </p>
                  </div>
                  <Badge variant="success">{evaluation.score.toFixed(1)}</Badge>
                </Link>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Staff status"
              description="Quick segmentation for active operations."
            />
            <div className="grid grid-cols-2 gap-3">
              {["active", "seasonal", "inactive", "alumni"].map((status) => (
                <div key={status} className="rounded-xl bg-slate-50 p-3">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <p className="text-sm capitalize text-muted-foreground">
                      {status}
                    </p>
                  </div>
                  <p className="mt-2 text-2xl font-bold">
                    {
                      staffProfiles.filter((staff) => staff.status === status)
                        .length
                    }
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
