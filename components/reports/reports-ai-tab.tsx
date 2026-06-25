"use client";

import { useState } from "react";
import { FileText, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type GuideId = "leadership" | "compliance" | "quality";

const guides: {
  id: GuideId;
  title: string;
  description: string;
  icon: typeof FileText;
}[] = [
  {
    id: "leadership",
    title: "Leadership briefing",
    description:
      "Summarize staffing, incidents, and evaluation trends for exec review.",
    icon: FileText,
  },
  {
    id: "compliance",
    title: "Compliance narrative",
    description:
      "Draft background-check and certification risk talking points.",
    icon: ShieldCheck,
  },
  {
    id: "quality",
    title: "Program quality insights",
    description:
      "Highlight evaluation scores and survey reuse patterns.",
    icon: TrendingUp,
  },
];

export function ReportsAiTab() {
  const [selectedGuide, setSelectedGuide] = useState<GuideId | null>(null);

  const activeGuide = guides.find((guide) => guide.id === selectedGuide);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {guides.map((guide) => {
          const Icon = guide.icon;
          const isSelected = selectedGuide === guide.id;

          return (
            <button
              key={guide.id}
              type="button"
              onClick={() => setSelectedGuide(guide.id)}
              className={cn(
                "rounded-2xl border p-5 text-left transition",
                isSelected
                  ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                  : "border-border bg-white hover:border-slate-300 hover:bg-slate-50",
              )}
            >
              <div
                className={cn(
                  "mb-4 inline-flex rounded-xl p-2",
                  isSelected
                    ? "bg-primary/10 text-primary"
                    : "bg-slate-100 text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="font-semibold text-foreground">{guide.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {guide.description}
              </p>
            </button>
          );
        })}
      </div>

      <Card>
        <CardHeader
          title={activeGuide ? activeGuide.title : "Choose a guide"}
          description={
            activeGuide
              ? "Preview the AI advisor workflow for this report type."
              : "Select one of the guided options above to preview the workflow."
          }
          action={<Sparkles className="h-5 w-5 text-muted-foreground" />}
        />
        <div className="rounded-2xl border border-dashed border-border bg-slate-50/80 p-8 text-center">
          {activeGuide ? (
            <div className="mx-auto max-w-lg space-y-3">
              <p className="text-sm font-medium text-foreground">
                AI analysis will appear here
              </p>
              <p className="text-sm leading-6 text-muted-foreground">
                {activeGuide.description} Generation logic will connect here in
                a future update.
              </p>
            </div>
          ) : (
            <div className="mx-auto max-w-lg space-y-3">
              <Sparkles className="mx-auto h-8 w-8 text-muted-foreground/60" />
              <p className="text-sm leading-6 text-muted-foreground">
                Choose a guide above to preview how AI-assisted reporting will
                work on this page.
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
