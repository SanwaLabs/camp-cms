import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { PageShell } from "@/components/page-shell";
import { evaluations } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function EvaluationsPage() {
  return (
    <PageShell
      title="Facilitator evaluations"
      description="Rubric scoring and narrative summaries for real-time staff development and quality visibility."
      actions={
        <Link
          href="/evaluations/new"
          className="inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          New evaluation
        </Link>
      }
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardHeader
            title="Recent submissions"
            description="Evaluations appear on staff profiles and dashboard trends."
          />
          <div className="space-y-4">
            {evaluations.map((evaluation) => (
              <article
                key={evaluation.id}
                className="rounded-2xl border border-border p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Link
                      href={`/staff/${evaluation.staffId}`}
                      className="text-lg font-semibold hover:underline"
                    >
                      {evaluation.staffName}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Evaluated by {evaluation.evaluator} on{" "}
                      {formatDate(evaluation.submittedAt)}
                    </p>
                  </div>
                  <Badge variant="success">{evaluation.score.toFixed(1)}</Badge>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  {evaluation.summary}
                </p>
                <div className="mt-4 grid gap-3 md:grid-cols-4">
                  {Object.entries(evaluation.rubric).map(([key, value]) => (
                    <div key={key} className="rounded-xl bg-slate-50 p-3">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        {key}
                      </p>
                      <p className="mt-1 text-xl font-bold">{value}/5</p>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Rubric categories"
            description="Default MVP rubric for consistent reviews."
          />
          <div className="space-y-3">
            {[
              "Safety and protocol adherence",
              "Participant engagement",
              "Preparedness and session flow",
              "Inclusion and group belonging",
              "Communication with site lead",
            ].map((category) => (
              <div key={category} className="rounded-xl bg-slate-50 p-4 text-sm">
                {category}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
