import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { PageShell } from "@/components/page-shell";
import { evaluations, incidents, staffProfiles } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default async function StaffDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const staff = staffProfiles.find((profile) => profile.id === id);

  if (!staff) {
    notFound();
  }

  const staffEvaluations = evaluations.filter(
    (evaluation) => evaluation.staffId === staff.id,
  );
  const staffIncidents = incidents.filter((incident) =>
    incident.involvedStaff.includes(staff.fullName),
  );

  return (
    <PageShell
      title={staff.fullName}
      description={`${staff.role} at ${staff.site}. Combined view of certifications, evaluations, incidents, sick leave, notes, and documents.`}
      actions={
        <Link
          href="/staff"
          className="inline-flex rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold"
        >
          Back to staff
        </Link>
      }
    >
      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader title="Profile" description="Current staff record." />
            <dl className="space-y-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Status</dt>
                <dd className="mt-1">
                  <Badge variant={staff.status === "active" ? "success" : "neutral"}>
                    {staff.status}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Background check</dt>
                <dd className="mt-1">
                  <Badge
                    variant={
                      staff.backgroundCheck === "clear" ? "success" : "warning"
                    }
                  >
                    {staff.backgroundCheck}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Contact</dt>
                <dd className="mt-1">
                  {staff.email}
                  <br />
                  {staff.phone}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Sick leave</dt>
                <dd className="mt-1">{staff.sickLeaveDays} days used</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Internal notes</dt>
                <dd className="mt-1 leading-6">{staff.notes}</dd>
              </div>
            </dl>
          </Card>

          <Card>
            <CardHeader
              title="Documents"
              description="Storage-backed files will appear here after Supabase policies are applied."
            />
            <div className="rounded-xl border border-dashed border-border p-4 text-sm text-muted-foreground">
              No files in demo data. Expected categories: certifications,
              training records, background screening, and incident attachments.
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader title="Certifications" />
            <div className="grid gap-3 md:grid-cols-2">
              {staff.certifications.map((cert) => (
                <div key={cert.id} className="rounded-xl bg-slate-50 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-medium">{cert.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Expires {formatDate(cert.expiresAt)}
                      </p>
                    </div>
                    <Badge
                      variant={
                        cert.status === "current" ? "success" : "warning"
                      }
                    >
                      {cert.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader
              title="Evaluation trend"
              description="Rubric scores over time for staff development conversations."
            />
            <div className="flex items-end gap-3">
              {staff.evaluationTrend.map((score, index) => (
                <div key={`${score}-${index}`} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-xl bg-primary"
                    style={{ height: `${score * 28}px` }}
                    title={`${score.toFixed(1)} / 5`}
                  />
                  <span className="text-xs text-muted-foreground">
                    {score.toFixed(1)}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <CardHeader title="Evaluations" />
            <div className="space-y-3">
              {staffEvaluations.length ? (
                staffEvaluations.map((evaluation) => (
                  <div key={evaluation.id} className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">
                          {formatDate(evaluation.submittedAt)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Evaluator: {evaluation.evaluator}
                        </p>
                      </div>
                      <Badge variant="success">
                        {evaluation.score.toFixed(1)}
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {evaluation.summary}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No evaluations recorded in demo data.
                </p>
              )}
            </div>
          </Card>

          <Card>
            <CardHeader title="Related incidents" />
            <div className="space-y-3">
              {staffIncidents.length ? (
                staffIncidents.map((incident) => (
                  <div key={incident.id} className="rounded-xl bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-medium">{incident.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(incident.occurredAt)} · {incident.site}
                        </p>
                      </div>
                      <Badge variant="warning">{incident.status}</Badge>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No related incidents recorded in demo data.
                </p>
              )}
            </div>
          </Card>
        </div>
      </section>
    </PageShell>
  );
}
