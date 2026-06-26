import { NextResponse } from "next/server";
import { getDashboardMetrics } from "@/lib/data/dashboard";
import { getIncidents } from "@/lib/data/incidents";
import { getStaffProfiles } from "@/lib/data/staff";

export async function GET() {
  const [staffProfiles, dashboardMetrics, incidents] = await Promise.all([
    getStaffProfiles(),
    getDashboardMetrics(),
    getIncidents(),
  ]);

  const rows = [
    ["section", "label", "value", "notes"],
    ...dashboardMetrics.map((metric) => [
      "dashboard",
      metric.label,
      metric.value,
      metric.helper,
    ]),
    ...staffProfiles.map((staff) => [
      "staff",
      staff.fullName,
      staff.status,
      `${staff.role} at ${staff.site}`,
    ]),
    ...incidents.map((incident) => [
      "incident",
      incident.title,
      incident.status,
      `${incident.severity} severity; follow-up ${incident.followUpOwner}`,
    ]),
  ];

  const csv = rows
    .map((row) =>
      row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","),
    )
    .join("\n");

  return new NextResponse(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": 'attachment; filename="leadership-report.csv"',
    },
  });
}
