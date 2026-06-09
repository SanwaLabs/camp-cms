import { NextResponse } from "next/server";
import { dashboardMetrics, incidents, staffProfiles } from "@/lib/mock-data";

export async function GET() {
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
