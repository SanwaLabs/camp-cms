import { createClient } from "@/lib/supabase/server";

export type OrganizationContext = {
  organizationId: string;
  userId: string;
};

export async function getOrganizationContext(): Promise<OrganizationContext | null> {
  const supabase = await createClient();

  if (!supabase) {
    return null;
  }

  const { data } = await supabase.auth.getClaims();
  const userId = data?.claims?.sub;

  if (!userId) {
    return null;
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("organization_id")
    .eq("id", userId)
    .maybeSingle();

  if (!profile?.organization_id) {
    return null;
  }

  return {
    organizationId: profile.organization_id,
    userId,
  };
}
