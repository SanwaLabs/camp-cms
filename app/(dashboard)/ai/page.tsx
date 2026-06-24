import { Sparkles } from "lucide-react";
import { AiGenerator } from "@/components/ai-generator";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { PageShell } from "@/components/page-shell";
import { aiSuggestions } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function AiPage() {
  return (
    <PageShell
      title="AI assistant"
      description="Generate editable survey drafts, icebreakers, team-building activities, and session prompts with age and risk guardrails."
    >
      <div className="flex flex-col gap-6 xl:grid xl:min-w-0 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardHeader
            title="Generate draft"
            description="AI output is never final until a manager edits and saves it."
            action={<Sparkles className="h-5 w-5 text-muted-foreground" />}
          />
          <AiGenerator />
        </Card>

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
