import { createClient } from "@/lib/supabase/server";
import { staffProfiles as mockStaffProfiles } from "@/lib/mock-data";
import type { Certification, StaffProfile } from "@/lib/types";
import { getOrganizationContext } from "@/lib/data/context";
import { relationName } from "@/lib/data/relation";

type StaffRow = {
  id: string;
  full_name: string;
  role: string;
  status: StaffProfile["status"];
  email: string;
  phone: string | null;
  background_check_status: StaffProfile["backgroundCheck"];
  sick_leave_days: number;
  notes: string | null;
  sites: { name: string } | null;
  certifications: {
    id: string;
    name: string;
    expires_at: string;
    status: Certification["status"];
  }[];
};

function mapStaffRow(row: StaffRow, evaluationTrend: number[] = []): StaffProfile {
  return {
    id: row.id,
    fullName: row.full_name,
    role: row.role,
    status: row.status,
    site: relationName(row.sites),
    email: row.email,
    phone: row.phone ?? "",
    backgroundCheck: row.background_check_status,
    sickLeaveDays: row.sick_leave_days,
    notes: row.notes ?? "",
    evaluationTrend,
    certifications: (row.certifications ?? []).map((cert) => ({
      id: cert.id,
      name: cert.name,
      expiresAt: cert.expires_at,
      status: cert.status,
    })),
  };
}

async function getEvaluationTrendsByStaff(
  organizationId: string,
): Promise<Map<string, number[]>> {
  const supabase = await createClient();
  const trends = new Map<string, number[]>();

  if (!supabase) {
    return trends;
  }

  const { data: evaluations } = await supabase
    .from("evaluations")
    .select("staff_profile_id, score, submitted_at")
    .eq("organization_id", organizationId)
    .order("submitted_at", { ascending: true });

  for (const evaluation of evaluations ?? []) {
    const existing = trends.get(evaluation.staff_profile_id) ?? [];
    existing.push(Number(evaluation.score));
    trends.set(evaluation.staff_profile_id, existing);
  }

  return trends;
}

export async function getStaffProfiles(): Promise<StaffProfile[]> {
  const context = await getOrganizationContext();
  const supabase = await createClient();

  if (!context || !supabase) {
    return mockStaffProfiles;
  }

  const trends = await getEvaluationTrendsByStaff(context.organizationId);

  const { data, error } = await supabase
    .from("staff_profiles")
    .select(
      `
      id,
      full_name,
      role,
      status,
      email,
      phone,
      background_check_status,
      sick_leave_days,
      notes,
      sites ( name ),
      certifications ( id, name, expires_at, status )
    `,
    )
    .eq("organization_id", context.organizationId)
    .order("full_name");

  if (error || !data) {
    return mockStaffProfiles;
  }

  return (data as unknown as StaffRow[]).map((row) =>
    mapStaffRow(row, trends.get(row.id) ?? []),
  );
}

export async function getStaffProfileById(id: string): Promise<StaffProfile | null> {
  const profiles = await getStaffProfiles();
  return profiles.find((profile) => profile.id === id) ?? null;
}
