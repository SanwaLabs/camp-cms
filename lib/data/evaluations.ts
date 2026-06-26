import { createClient } from "@/lib/supabase/server";
import { evaluations as mockEvaluations } from "@/lib/mock-data";
import type { Evaluation } from "@/lib/types";
import { getOrganizationContext } from "@/lib/data/context";
import { relationRecord } from "@/lib/data/relation";

type EvaluationRow = {
  id: string;
  staff_profile_id: string;
  submitted_at: string;
  score: number;
  summary: string;
  staff_profiles: { full_name: string } | null;
  evaluator: { full_name: string } | null;
  evaluation_scores: { category: string; score: number }[];
};

function mapEvaluationRow(row: EvaluationRow): Evaluation {
  const rubric = (row.evaluation_scores ?? []).reduce<Record<string, number>>(
    (accumulator, item) => {
      accumulator[item.category] = item.score;
      return accumulator;
    },
    {},
  );

  return {
    id: row.id,
    staffId: row.staff_profile_id,
    staffName: relationRecord(row.staff_profiles)?.full_name ?? "Unknown staff",
    evaluator: relationRecord(row.evaluator)?.full_name ?? "Unknown evaluator",
    submittedAt: row.submitted_at,
    score: Number(row.score),
    rubric,
    summary: row.summary,
  };
}

export async function getEvaluations(): Promise<Evaluation[]> {
  const context = await getOrganizationContext();
  const supabase = await createClient();

  if (!context || !supabase) {
    return mockEvaluations;
  }

  const { data, error } = await supabase
    .from("evaluations")
    .select(
      `
      id,
      staff_profile_id,
      submitted_at,
      score,
      summary,
      staff_profiles ( full_name ),
      evaluator:profiles!evaluations_evaluator_id_fkey ( full_name ),
      evaluation_scores ( category, score )
    `,
    )
    .eq("organization_id", context.organizationId)
    .order("submitted_at", { ascending: false });

  if (error || !data) {
    return mockEvaluations;
  }

  return (data as unknown as EvaluationRow[]).map(mapEvaluationRow);
}
