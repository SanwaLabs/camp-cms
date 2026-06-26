import { createClient } from "@/lib/supabase/server";
import { aiSuggestions as mockAiSuggestions } from "@/lib/mock-data";
import type { AISuggestion } from "@/lib/types";
import { getOrganizationContext } from "@/lib/data/context";

type AiSuggestionRow = {
  id: string;
  kind: AISuggestion["kind"];
  prompt: string;
  output: string;
  status: AISuggestion["status"];
  created_at: string;
};

export async function getAiSuggestions(): Promise<AISuggestion[]> {
  const context = await getOrganizationContext();
  const supabase = await createClient();

  if (!context || !supabase) {
    return mockAiSuggestions;
  }

  const { data, error } = await supabase
    .from("ai_suggestion_logs")
    .select("id, kind, prompt, output, status, created_at")
    .eq("organization_id", context.organizationId)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return mockAiSuggestions;
  }

  return (data as AiSuggestionRow[]).map((row) => ({
    id: row.id,
    kind: row.kind,
    prompt: row.prompt,
    output: row.output,
    status: row.status,
    createdAt: row.created_at,
  }));
}
