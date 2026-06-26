import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { PageShell } from "@/components/page-shell";
import { getSurveyTemplates } from "@/lib/data/surveys";
import { formatDate } from "@/lib/utils";

export default async function SurveysPage() {
  const surveyTemplates = await getSurveyTemplates();
  return (
    <PageShell
      title="Surveys and templates"
      description="Reusable survey templates, archived response history, and program-specific survey drafts."
      actions={
        <Link
          href="/ai"
          className="inline-flex rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
        >
          Generate with AI
        </Link>
      }
    >
      <div className="flex flex-col gap-6 xl:grid xl:min-w-0 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardHeader
            title="Template library"
            description="Saved by school, program type, and age group for reuse and comparison."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {surveyTemplates.map((template) => (
              <article
                key={template.id}
                className="rounded-2xl border border-border p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-semibold">{template.name}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {template.school}
                    </p>
                  </div>
                  <Badge variant="info">{template.ageGroup}</Badge>
                </div>
                <div className="mt-4 grid gap-3 text-sm">
                  <div className="rounded-xl bg-slate-50 p-3">
                    Program type: {template.programType}
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    {template.questionCount} questions · reused{" "}
                    {template.reuseCount} times
                  </div>
                  <div className="rounded-xl bg-slate-50 p-3">
                    Last used {formatDate(template.lastUsedAt)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader
            title="Response archive"
            description="Comparison-ready response history will be grouped by school, program, session, and age band."
          />
          <div className="space-y-3">
            {[
              "Lincoln Middle School · Outdoor leadership · May 2026",
              "Cedar Elementary · Team building · June 2026",
              "Harbor Outdoor School · Confidence pulse · June 2026",
            ].map((archive) => (
              <div key={archive} className="rounded-xl bg-slate-50 p-4">
                <p className="font-medium">{archive}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Ready for trend comparison and export once connected.
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
