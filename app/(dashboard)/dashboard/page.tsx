import Link from "next/link";
import { AlertTriangle, ArrowRight, ClipboardCheck, Users } from "lucide-react";
import { CampDawnBackground } from "@/components/backgrounds/camp-dawn-background";
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

const glassCard = "border-white/60 bg-white/75 shadow-soft backdrop-blur-md";
const glassPanel = "bg-white/60 backdrop-blur-sm";

export default function DashboardPage() {
  const expiringCerts = staffProfiles.flatMap((staff) =>
    staff.certifications
      .filter((cert) => cert.status !== "current")
      .map((cert) => ({ staff, cert })),
  );

  return (
    <div className="relative min-h-screen w-full min-w-0 flex-1">
      <CampDawnBackground />
      <div className="relative">
        <PageShell
          title="Manager dashboard"
          description="Near-real-time operating view for staff status, expiring certifications, unresolved incidents, and pending evaluation work."
          actions={
            <Link
              href="/incidents/new"
              className="inline-flex items-center justify-center rounded-xl border border-white/60 bg-white/75 px-4 py-2 text-sm font-semibold text-foreground shadow-sm backdrop-blur-md transition hover:bg-white/90"
            >
              Log incident
            </Link>
          }
        >
          <section className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {dashboardMetrics.map((metric) => (
              <Card key={metric.label} className={glassCard}>
                <Badge variant={toneToBadge[metric.tone]}>{metric.label}</Badge>
                <p className="mt-5 text-4xl font-bold">{metric.value}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {metric.helper}
                </p>
              </Card>
            ))}
          </section>

          <section className="mt-6 flex flex-col gap-6 xl:grid xl:min-w-0 xl:grid-cols-[1.2fr_0.8fr]">
            <Card className={glassCard}>
              <CardHeader
                title="Open incident queue"
                description="Follow-up work that needs manager or site lead attention."
                action={
                  <Link
                    href="/incidents"
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-foreground"
                  >
                    View all <ArrowRight className="h-4 w-4" />
                  </Link>
                }
              />
              <div className="space-y-4">
                {incidents.map((incident) => (
                  <div
                    key={incident.id}
                    className={`min-w-0 overflow-hidden rounded-2xl border border-border p-4 ${glassPanel}`}
                  >
                    <div className="flex min-w-0 flex-col gap-3 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0">
                        <div className="flex min-w-0 items-start gap-2">
                          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                          <h3 className="min-w-0 font-semibold break-words">
                            {incident.title}
                          </h3>
                        </div>
                        <p className="mt-1 text-sm break-words text-muted-foreground">
                          {incident.site} · {formatDate(incident.occurredAt)}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-wrap gap-2">
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
                    <p className="mt-3 text-sm leading-6 break-words text-muted-foreground">
                      {incident.description}
                    </p>
                    <p className="mt-3 text-sm font-medium break-words">
                      Follow-up: {incident.followUpOwner} ·{" "}
                      {formatRelativeDueDate(incident.followUpDue)}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <div className="flex w-full min-w-0 flex-col gap-6">
              <Card className={glassCard}>
                <CardHeader
                  title="Certification risk"
                  description="Credentials requiring renewal attention."
                />
                <div className="space-y-3">
                  {expiringCerts.map(({ staff, cert }) => (
                    <div
                      key={`${staff.id}-${cert.id}`}
                      className={`flex min-w-0 items-start justify-between gap-4 rounded-xl p-3 ${glassPanel}`}
                    >
                      <div className="min-w-0">
                        <p className="font-medium break-words">{staff.fullName}</p>
                        <p className="text-sm break-words text-muted-foreground">
                          {cert.name} · expires {formatDate(cert.expiresAt)}
                        </p>
                      </div>
                      <Badge className="shrink-0" variant="warning">
                        {cert.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className={glassCard}>
                <CardHeader
                  title="Recent evaluations"
                  description="Latest rubric scores and narrative feedback."
                />
                <div className="space-y-3">
                  {evaluations.map((evaluation) => (
                    <Link
                      href={`/staff/${evaluation.staffId}`}
                      key={evaluation.id}
                      className={`flex min-w-0 items-center gap-3 rounded-xl p-3 transition hover:bg-white/80 ${glassPanel}`}
                    >
                      <div className="shrink-0 rounded-xl bg-white/80 p-2 text-primary backdrop-blur-sm">
                        <ClipboardCheck className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium break-words">{evaluation.staffName}</p>
                        <p className="truncate text-sm text-muted-foreground">
                          {evaluation.summary}
                        </p>
                      </div>
                      <Badge className="shrink-0" variant="success">
                        {evaluation.score.toFixed(1)}
                      </Badge>
                    </Link>
                  ))}
                </div>
              </Card>

              <Card className={glassCard}>
                <CardHeader
                  title="Staff status"
                  description="Quick segmentation for active operations."
                />
                <div className="grid min-w-0 grid-cols-2 gap-3">
                  {["active", "seasonal", "inactive", "alumni"].map(
                    (status) => (
                      <div
                        key={status}
                        className={`min-w-0 rounded-xl p-3 ${glassPanel}`}
                      >
                        <div className="flex min-w-0 items-center gap-2">
                          <Users className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <p className="min-w-0 truncate text-sm capitalize text-muted-foreground">
                            {status}
                          </p>
                        </div>
                        <p className="mt-2 text-2xl font-bold">
                          {
                            staffProfiles.filter(
                              (staff) => staff.status === status,
                            ).length
                          }
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </Card>
            </div>
          </section>
        </PageShell>
      </div>
    </div>
  );
}
