import { createClient } from "@/lib/supabase/server";
import { incidents as mockIncidents } from "@/lib/mock-data";
import type { Incident } from "@/lib/types";
import { getOrganizationContext } from "@/lib/data/context";
import { relationName, relationRecord } from "@/lib/data/relation";

type IncidentRow = {
  id: string;
  title: string;
  severity: Incident["severity"];
  status: Incident["status"];
  occurred_at: string;
  description: string;
  sites: { name: string } | null;
  incident_staff: {
    staff_profiles: { full_name: string } | null;
  }[];
  follow_up_tasks: {
    owner_name: string | null;
    due_at: string | null;
  }[];
};

function mapIncidentRow(row: IncidentRow): Incident {
  const followUp = relationRecord(row.follow_up_tasks);

  return {
    id: row.id,
    title: row.title,
    site: relationName(row.sites),
    severity: row.severity,
    status: row.status,
    occurredAt: row.occurred_at,
    involvedStaff: (row.incident_staff ?? [])
      .map((link) => relationRecord(link.staff_profiles)?.full_name)
      .filter((name): name is string => Boolean(name)),
    description: row.description,
    followUpOwner: followUp?.owner_name ?? "Unassigned",
    followUpDue: followUp?.due_at ?? row.occurred_at,
  };
}

export async function getIncidents(): Promise<Incident[]> {
  const context = await getOrganizationContext();
  const supabase = await createClient();

  if (!context || !supabase) {
    return mockIncidents;
  }

  const { data, error } = await supabase
    .from("incidents")
    .select(
      `
      id,
      title,
      severity,
      status,
      occurred_at,
      description,
      sites ( name ),
      incident_staff (
        staff_profiles ( full_name )
      ),
      follow_up_tasks (
        owner_name,
        due_at
      )
    `,
    )
    .eq("organization_id", context.organizationId)
    .order("occurred_at", { ascending: false });

  if (error || !data) {
    return mockIncidents;
  }

  return (data as unknown as IncidentRow[]).map(mapIncidentRow);
}
