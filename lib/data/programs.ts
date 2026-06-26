import { createClient } from "@/lib/supabase/server";
import { programs as mockPrograms, programSessions as mockSessions } from "@/lib/mock-data";
import type { Program, ProgramSession } from "@/lib/types";
import { getOrganizationContext } from "@/lib/data/context";
import { relationName } from "@/lib/data/relation";

type ProgramRow = {
  id: string;
  name: string;
  program_type: string;
  status: Program["status"];
  notes: string | null;
};

type SessionRow = {
  id: string;
  program_id: string;
  name: string;
  starts_at: string;
  ends_at: string;
  capacity: number | null;
  sites: { name: string } | null;
};

export async function getPrograms(): Promise<Program[]> {
  const context = await getOrganizationContext();
  const supabase = await createClient();

  if (!context || !supabase) {
    return mockPrograms;
  }

  const { data, error } = await supabase
    .from("programs")
    .select("id, name, program_type, status, notes")
    .eq("organization_id", context.organizationId)
    .order("name");

  if (error || !data) {
    return mockPrograms;
  }

  return (data as ProgramRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    programType: row.program_type,
    status: row.status,
    notes: row.notes ?? undefined,
  }));
}

export async function getProgramSessions(): Promise<ProgramSession[]> {
  const context = await getOrganizationContext();
  const supabase = await createClient();

  if (!context || !supabase) {
    return mockSessions;
  }

  const { data, error } = await supabase
    .from("sessions")
    .select(
      `
      id,
      program_id,
      name,
      starts_at,
      ends_at,
      capacity,
      sites ( name )
    `,
    )
    .eq("organization_id", context.organizationId)
    .order("starts_at");

  if (error || !data) {
    return mockSessions;
  }

  return (data as unknown as SessionRow[]).map((row) => ({
    id: row.id,
    programId: row.program_id,
    name: row.name,
    site: relationName(row.sites),
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    capacity: row.capacity ?? undefined,
  }));
}
