import { NextResponse } from "next/server";
import { staffProfiles, dashboardMetrics } from "@/lib/mock-data";

export async function GET() {
  const expiringCertifications = staffProfiles.flatMap((staff) =>
    staff.certifications
      .filter((certification) => certification.status !== "current")
      .map((certification) => ({
        staff: staff.fullName,
        certification: certification.name,
        expiresAt: certification.expiresAt,
      })),
  );

  const pendingEvaluations =
    dashboardMetrics.find((metric) => metric.label === "Pending evaluations")
      ?.value ?? "0";

  return NextResponse.json({
    ok: true,
    mode: "dry-run",
    reminders: {
      expiringCertifications,
      pendingEvaluations,
    },
    nextStep:
      "Connect this route to an email provider after Supabase tables and audit logging are live.",
  });
}
