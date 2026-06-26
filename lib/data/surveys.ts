import { createClient } from "@/lib/supabase/server";
import { surveyTemplates as mockSurveyTemplates } from "@/lib/mock-data";
import type { SurveyTemplate } from "@/lib/types";
import { getOrganizationContext } from "@/lib/data/context";
import { relationName } from "@/lib/data/relation";

type SurveyTemplateRow = {
  id: string;
  name: string;
  program_type: string;
  age_group: string;
  question_count: number;
  reuse_count: number;
  last_used_at: string | null;
  schools: { name: string } | null;
};

export async function getSurveyTemplates(): Promise<SurveyTemplate[]> {
  const context = await getOrganizationContext();
  const supabase = await createClient();

  if (!context || !supabase) {
    return mockSurveyTemplates;
  }

  const { data, error } = await supabase
    .from("survey_templates")
    .select(
      `
      id,
      name,
      program_type,
      age_group,
      question_count,
      reuse_count,
      last_used_at,
      schools ( name )
    `,
    )
    .eq("organization_id", context.organizationId)
    .order("name");

  if (error || !data) {
    return mockSurveyTemplates;
  }

  return (data as unknown as SurveyTemplateRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    school: relationName(row.schools),
    programType: row.program_type,
    ageGroup: row.age_group,
    questionCount: row.question_count,
    reuseCount: row.reuse_count,
    lastUsedAt: row.last_used_at ?? new Date().toISOString().slice(0, 10),
  }));
}
