import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ReportTableSection } from "@/components/reports/report-table-section";
import {
  dashboardMetrics,
  evaluations,
  incidents,
  staffProfiles,
  surveyTemplates,
} from "@/lib/mock-data";
import { formatDate, formatRelativeDueDate } from "@/lib/utils";

const toneToBadge = {
  neutral: "neutral",
  success: "success",
  warning: "warning",
  danger: "danger",
} as const;

const tableHead =
  "bg-slate-50 text-xs uppercase tracking-wide text-muted-foreground";
const thClass = "px-4 py-3";
const tdClass = "px-4 py-4";

export function ReportsTablesTab() {
  const certificationRows = staffProfiles
    .flatMap((staff) =>
      staff.certifications.map((cert) => ({
        staff,
        cert,
      })),
    )
    .sort(
      (a, b) =>
        new Date(a.cert.expiresAt).getTime() -
        new Date(b.cert.expiresAt).getTime(),
    );

  const incidentRows = [...incidents].sort(
    (a, b) =>
      new Date(a.followUpDue).getTime() - new Date(b.followUpDue).getTime(),
  );

  const evaluationRows = [...evaluations].sort((a, b) => b.score - a.score);

  const surveyRows = [...surveyTemplates].sort(
    (a, b) => b.reuseCount - a.reuseCount,
  );

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <Card key={metric.label}>
            <Badge variant={toneToBadge[metric.tone]}>{metric.label}</Badge>
            <p className="mt-5 text-4xl font-bold">{metric.value}</p>
            <p className="mt-2 text-sm text-muted-foreground">{metric.helper}</p>
          </Card>
        ))}
      </section>

      <ReportTableSection
        title="Staff readiness"
        description="Active roster with background check and certification risk visibility."
        rowCount={staffProfiles.length}
      >
        <thead className={tableHead}>
          <tr>
            <th className={thClass}>Name</th>
            <th className={thClass}>Role</th>
            <th className={thClass}>Site</th>
            <th className={thClass}>Status</th>
            <th className={thClass}>Background</th>
            <th className={thClass}>Certification risk</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {staffProfiles.map((staff) => {
            const atRiskCerts = staff.certifications.filter(
              (cert) => cert.status !== "current",
            );

            return (
              <tr key={staff.id} className="hover:bg-slate-50">
                <td className={tdClass}>
                  <Link
                    href={`/staff/${staff.id}`}
                    className="font-semibold text-foreground hover:underline"
                  >
                    {staff.fullName}
                  </Link>
                </td>
                <td className={tdClass}>{staff.role}</td>
                <td className={tdClass}>{staff.site}</td>
                <td className={tdClass}>
                  <Badge
                    variant={staff.status === "active" ? "success" : "neutral"}
                  >
                    {staff.status}
                  </Badge>
                </td>
                <td className={tdClass}>
                  <Badge
                    variant={
                      staff.backgroundCheck === "clear" ? "success" : "warning"
                    }
                  >
                    {staff.backgroundCheck}
                  </Badge>
                </td>
                <td className={tdClass}>
                  {atRiskCerts.length ? (
                    <Badge variant="warning">
                      {atRiskCerts.length} expiring
                    </Badge>
                  ) : (
                    <Badge variant="success">Current</Badge>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </ReportTableSection>

      <ReportTableSection
        title="Certification expirations"
        description="Upcoming renewals sorted by expiry date across all staff."
        rowCount={certificationRows.length}
      >
        <thead className={tableHead}>
          <tr>
            <th className={thClass}>Staff</th>
            <th className={thClass}>Certification</th>
            <th className={thClass}>Expires</th>
            <th className={thClass}>Urgency</th>
            <th className={thClass}>Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {certificationRows.map(({ staff, cert }) => (
            <tr key={cert.id} className="hover:bg-slate-50">
              <td className={tdClass}>{staff.fullName}</td>
              <td className={tdClass}>{cert.name}</td>
              <td className={tdClass}>{formatDate(cert.expiresAt)}</td>
              <td className={tdClass}>
                <Badge
                  variant={
                    cert.status === "expired"
                      ? "danger"
                      : cert.status === "expiring"
                        ? "warning"
                        : "success"
                  }
                >
                  {formatRelativeDueDate(cert.expiresAt)}
                </Badge>
              </td>
              <td className={tdClass}>
                <Badge
                  variant={
                    cert.status === "current"
                      ? "success"
                      : cert.status === "expiring"
                        ? "warning"
                        : "danger"
                  }
                >
                  {cert.status}
                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </ReportTableSection>

      <ReportTableSection
        title="Incident follow-ups"
        description="Open and in-review incidents sorted by follow-up due date."
        rowCount={incidentRows.length}
      >
        <thead className={tableHead}>
          <tr>
            <th className={thClass}>Incident</th>
            <th className={thClass}>Site</th>
            <th className={thClass}>Severity</th>
            <th className={thClass}>Status</th>
            <th className={thClass}>Follow-up owner</th>
            <th className={thClass}>Due</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {incidentRows.map((incident) => {
            const dueLabel = formatRelativeDueDate(incident.followUpDue);
            const isOverdue = dueLabel.includes("overdue");

            return (
              <tr key={incident.id} className="hover:bg-slate-50">
                <td className={tdClass}>
                  <p className="font-semibold">{incident.title}</p>
                  <p className="text-muted-foreground">
                    {formatDate(incident.occurredAt)}
                  </p>
                </td>
                <td className={tdClass}>{incident.site}</td>
                <td className={tdClass}>
                  <Badge
                    variant={
                      incident.severity === "critical" ||
                      incident.severity === "high"
                        ? "danger"
                        : incident.severity === "medium"
                          ? "warning"
                          : "neutral"
                    }
                  >
                    {incident.severity}
                  </Badge>
                </td>
                <td className={tdClass}>
                  <Badge
                    variant={
                      incident.status === "closed"
                        ? "success"
                        : incident.status === "in_review"
                          ? "info"
                          : "warning"
                    }
                  >
                    {incident.status.replace("_", " ")}
                  </Badge>
                </td>
                <td className={tdClass}>{incident.followUpOwner}</td>
                <td className={tdClass}>
                  <Badge variant={isOverdue ? "danger" : "neutral"}>
                    {dueLabel}
                  </Badge>
                </td>
              </tr>
            );
          })}
        </tbody>
      </ReportTableSection>

      <ReportTableSection
        title="Evaluation performance"
        description="Recent staff evaluations sorted by overall score."
        rowCount={evaluationRows.length}
      >
        <thead className={tableHead}>
          <tr>
            <th className={thClass}>Staff</th>
            <th className={thClass}>Evaluator</th>
            <th className={thClass}>Submitted</th>
            <th className={thClass}>Score</th>
            <th className={thClass}>Summary</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {evaluationRows.map((evaluation) => (
            <tr key={evaluation.id} className="hover:bg-slate-50">
              <td className={tdClass}>{evaluation.staffName}</td>
              <td className={tdClass}>{evaluation.evaluator}</td>
              <td className={tdClass}>
                {formatDate(evaluation.submittedAt)}
              </td>
              <td className={tdClass}>
                <Badge
                  variant={
                    evaluation.score >= 4.5
                      ? "success"
                      : evaluation.score >= 4
                        ? "info"
                        : "warning"
                  }
                >
                  {evaluation.score.toFixed(1)}
                </Badge>
              </td>
              <td className={tdClass}>
                <p className="max-w-md text-muted-foreground">
                  {evaluation.summary}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </ReportTableSection>

      <ReportTableSection
        title="Survey adoption"
        description="Template reuse across schools and program types."
        rowCount={surveyRows.length}
      >
        <thead className={tableHead}>
          <tr>
            <th className={thClass}>Template</th>
            <th className={thClass}>School</th>
            <th className={thClass}>Program type</th>
            <th className={thClass}>Age group</th>
            <th className={thClass}>Questions</th>
            <th className={thClass}>Reuse count</th>
            <th className={thClass}>Last used</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-white">
          {surveyRows.map((survey) => (
            <tr key={survey.id} className="hover:bg-slate-50">
              <td className={tdClass}>
                <p className="font-semibold">{survey.name}</p>
              </td>
              <td className={tdClass}>{survey.school}</td>
              <td className={tdClass}>{survey.programType}</td>
              <td className={tdClass}>{survey.ageGroup}</td>
              <td className={tdClass}>{survey.questionCount}</td>
              <td className={tdClass}>
                <Badge variant={survey.reuseCount >= 10 ? "success" : "info"}>
                  {survey.reuseCount}
                </Badge>
              </td>
              <td className={tdClass}>{formatDate(survey.lastUsedAt)}</td>
            </tr>
          ))}
        </tbody>
      </ReportTableSection>
    </div>
  );
}
