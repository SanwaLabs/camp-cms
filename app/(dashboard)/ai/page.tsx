import { Sparkles } from "lucide-react";
import { AiGenerator } from "@/components/ai-generator";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { PageShell } from "@/components/page-shell";
import { getAiSuggestions } from "@/lib/data/ai";
import { formatDate } from "@/lib/utils";

export default async function AiPage() {
  const aiSuggestions = await getAiSuggestions();
  return (
    <PageShell
      title="AI assistant"
      description="Generate editable survey drafts, icebreakers, team-building activities, and session prompts with age and risk guardrails."
    >
      <div className="flex flex-col gap-6 xl:grid xl:min-w-0 xl:grid-cols-[1fr_0.8fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader
              title="Generate draft"
              description="AI output is never final until a manager edits and saves it."
              action={<Sparkles className="h-5 w-5 text-muted-foreground" />}
            />
            <AiGenerator />
          </Card>

          <Card className="border-dashed border-amber-200 bg-amber-50/60">
            <CardHeader
              title="Guided reports — coming soon"
              description="One-click summaries for programs, incidents, staff compliance, and evaluation trends."
            />
            <p className="text-sm leading-6 text-muted-foreground">
              Planned action buttons will generate specialized reports from live
              org data and save outputs to the suggestion log. See{" "}
              <code className="text-xs">docs/demo-princeton-blairstown-center.md</code>{" "}
              for the full spec.
            </p>
          </Card>
        </div>

        <Card>
          <CardHeader
            title="Suggestion log"
            description="Prompt and output metadata should be persisted for auditability."
          />
          <div className="space-y-4">
            {aiSuggestions.map((suggestion) => (
              <article
                key={suggestion.id}
                className="rounded-2xl border border-border p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold capitalize">{suggestion.kind}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatDate(suggestion.createdAt)}
                    </p>
                  </div>
                  <Badge variant={suggestion.status === "saved" ? "success" : "warning"}>
                    {suggestion.status}
                  </Badge>
                </div>
                <p className="mt-3 text-sm font-medium">{suggestion.prompt}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {suggestion.output}
                </p>
              </article>
            ))}
          </div>
        </Card>
      </div>
    </PageShell>
  );
}
