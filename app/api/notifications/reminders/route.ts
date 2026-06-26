import { NextResponse } from "next/server";
import { getDashboardMetrics } from "@/lib/data/dashboard";
import { getStaffProfiles } from "@/lib/data/staff";

export async function GET() {
  const [staffProfiles, dashboardMetrics] = await Promise.all([
    getStaffProfiles(),
    getDashboardMetrics(),
  ]);

  const expiringCertifications = staffProfiles.flatMap((staff) =>
    staff.certifications
      .filter((certification) => certification.status !== "current")
      .map((certification) => ({
        staff: staff.fullName,
        certification: certification.name,
        expiresAt: certification.expiresAt,
      })),
  );

  const pendingBackgroundChecks =
    dashboardMetrics.find(
      (metric) => metric.label === "Pending background checks",
    )?.value ?? "0";

  return NextResponse.json({
    ok: true,
    mode: "dry-run",
    reminders: {
      expiringCertifications,
      pendingBackgroundChecks,
    },
    nextStep:
      "Connect this route to an email provider after Supabase tables and audit logging are live.",
  });
}
