import type { DashboardMetric } from "@/lib/types";
import { getIncidents } from "@/lib/data/incidents";
import { getStaffProfiles } from "@/lib/data/staff";

function toneForCount(
  count: number,
  warningAt: number,
  dangerAt: number,
): DashboardMetric["tone"] {
  if (count >= dangerAt) {
    return "danger";
  }

  if (count >= warningAt) {
    return "warning";
  }

  return count === 0 ? "success" : "neutral";
}

export async function getDashboardMetrics(): Promise<DashboardMetric[]> {
  const [staffProfiles, incidents] = await Promise.all([
    getStaffProfiles(),
    getIncidents(),
  ]);

  const activeStaff = staffProfiles.filter(
    (staff) => staff.status === "active" || staff.status === "seasonal",
  ).length;

  const expiringCerts = staffProfiles.reduce((count, staff) => {
    return (
      count +
      staff.certifications.filter((cert) => cert.status !== "current").length
    );
  }, 0);

  const unresolvedIncidents = incidents.filter(
    (incident) => incident.status !== "closed",
  );
  const highSeverityIncidents = unresolvedIncidents.filter(
    (incident) => incident.severity === "high" || incident.severity === "critical",
  ).length;

  const pendingBackgroundChecks = staffProfiles.filter(
    (staff) => staff.backgroundCheck === "pending",
  ).length;

  return [
    {
      label: "Active staff",
      value: String(activeStaff),
      helper: `${staffProfiles.filter((staff) => staff.status === "seasonal").length} seasonal staff on roster`,
      tone: "success",
    },
    {
      label: "Expiring certifications",
      value: String(expiringCerts),
      helper: "Credentials needing renewal attention",
      tone: toneForCount(expiringCerts, 3, 6),
    },
    {
      label: "Unresolved incidents",
      value: String(unresolvedIncidents.length),
      helper:
        highSeverityIncidents > 0
          ? `${highSeverityIncidents} marked high severity`
          : "No high-severity open incidents",
      tone: toneForCount(unresolvedIncidents.length, 2, 4),
    },
    {
      label: "Pending background checks",
      value: String(pendingBackgroundChecks),
      helper: "Staff awaiting clearance for overnight sessions",
      tone: toneForCount(pendingBackgroundChecks, 1, 3),
    },
  ];
}
