"use client";

import { useEffect, useRef, useState } from "react";
import {
  CalendarRange,
  ClipboardList,
  ShieldAlert,
  Sparkles,
  Star,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ReportId = "programs" | "incidents" | "staff" | "evaluations";

type Stat = {
  label: string;
  value: string;
  tone: "neutral" | "success" | "warning" | "danger" | "info";
};

type GuidedReport = {
  id: ReportId;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  iconClass: string;
  summary: string;
  stats: Stat[];
  highlights: string[];
};

const reports: GuidedReport[] = [
  {
    id: "programs",
    title: "Programs report",
    description:
      "Session schedule summary, past/present/future counts, and capacity by site.",
    icon: CalendarRange,
    accent: "from-sky-500/15 to-sky-500/0",
    iconClass: "bg-sky-100 text-sky-700",
    summary:
      "Princeton-Blairstown Center is running 4 active programs across 2 sites. Spring outdoor leadership is at 92% capacity, while the new middle-school day track has room to grow before the summer surge.",
    stats: [
      { label: "Active programs", value: "4", tone: "info" },
      { label: "Upcoming sessions", value: "11", tone: "neutral" },
      { label: "Avg. capacity", value: "87%", tone: "success" },
      { label: "Sites", value: "2", tone: "neutral" },
    ],
    highlights: [
      "Main Campus (Blairstown) overnight sessions are nearly full — consider opening a second cohort.",
      "Day-only middle-school track is trending below target; recommend a targeted outreach email.",
      "3 sessions completed this month with strong attendance retention (94%).",
    ],
  },
  {
    id: "incidents",
    title: "Incidents report",
    description:
      "Open vs. closed breakdown, severity distribution, and overdue follow-ups.",
    icon: ShieldAlert,
    accent: "from-rose-500/15 to-rose-500/0",
    iconClass: "bg-rose-100 text-rose-700",
    summary:
      "5 incidents remain unresolved, 2 of them high severity. Median time-to-resolution improved to 3.2 days this month, but two follow-ups are now overdue and should be escalated to site leads.",
    stats: [
      { label: "Unresolved", value: "5", tone: "danger" },
      { label: "High severity", value: "2", tone: "warning" },
      { label: "Overdue follow-ups", value: "2", tone: "danger" },
      { label: "Median resolution", value: "3.2d", tone: "success" },
    ],
    highlights: [
      "2 high-severity incidents at Main Campus need a documented follow-up within 24 hours.",
      "Closed-incident rate is up 18% month-over-month — process changes are working.",
      "Recommend a weekly review huddle for incidents open longer than 5 days.",
    ],
  },
  {
    id: "staff",
    title: "Staff report",
    description:
      "Certification compliance snapshot, background-check gaps, and roster by site.",
    icon: ClipboardList,
    accent: "from-amber-500/15 to-amber-500/0",
    iconClass: "bg-amber-100 text-amber-800",
    summary:
      "42 active staff are on the roster with 6 seasonal hires onboarded this month. 8 certifications expire within 30 days and 1 staffer still needs a final background check before overnight sessions.",
    stats: [
      { label: "Active staff", value: "42", tone: "success" },
      { label: "Expiring certs", value: "8", tone: "warning" },
      { label: "Background gaps", value: "1", tone: "danger" },
      { label: "Seasonal hires", value: "6", tone: "info" },
    ],
    highlights: [
      "8 CPR / First Aid certifications expire within 30 days — batch a renewal reminder.",
      "1 facilitator is cleared to work day sessions but not yet cleared for overnight.",
      "Roster is balanced across sites; Main Campus carries the heaviest overnight load.",
    ],
  },
  {
    id: "evaluations",
    title: "Evaluations report",
    description:
      "Average scores by staff, trending facilitators, and pending gaps.",
    icon: Star,
    accent: "from-emerald-500/15 to-emerald-500/0",
    iconClass: "bg-emerald-100 text-emerald-700",
    summary:
      "Facilitator evaluations average 4.5 / 5 across 4 active programs. 13 evaluations are still pending. Avery Johnson is the strongest upward trend (4.1 to 4.7 over four cycles).",
    stats: [
      { label: "Avg. score", value: "4.5", tone: "success" },
      { label: "Pending", value: "13", tone: "warning" },
      { label: "Programs covered", value: "4", tone: "info" },
      { label: "Top trend", value: "+0.6", tone: "success" },
    ],
    highlights: [
      "Avery Johnson trending up four cycles in a row — a good candidate for onboarding mentor.",
      "13 pending evaluations are concentrated in 2 programs; nudge those site leads.",
      "Checklist reinforcement flagged for newer facilitators before field sessions.",
    ],
  },
];

const statToneClass: Record<Stat["tone"], string> = {
  neutral: "text-foreground",
  success: "text-emerald-600",
  warning: "text-amber-600",
  danger: "text-rose-600",
  info: "text-sky-600",
};

export function GuidedReportsDemo() {
  const [selectedId, setSelectedId] = useState<ReportId | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const activeReport = reports.find((report) => report.id === selectedId) ?? null;

  function handleSelect(id: ReportId) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSelectedId(id);
    setIsGenerating(true);
    timeoutRef.current = setTimeout(() => setIsGenerating(false), 900);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {reports.map((report) => {
          const Icon = report.icon;
          const isSelected = report.id === selectedId;

          return (
            <button
              key={report.id}
              type="button"
              onClick={() => handleSelect(report.id)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border p-5 text-left transition",
                isSelected
                  ? "border-primary bg-primary/[0.04] ring-2 ring-primary/20"
                  : "border-border bg-card hover:border-slate-300 hover:shadow-soft",
              )}
            >
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100",
                  report.accent,
                  isSelected && "opacity-100",
                )}
              />
              <div className="relative">
                <div
                  className={cn(
                    "mb-4 inline-flex rounded-xl p-2.5",
                    report.iconClass,
                  )}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <p className="font-semibold text-foreground">{report.title}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {report.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      <Card>
        <CardHeader
          title={activeReport ? activeReport.title : "Choose a report"}
          description={
            activeReport
              ? "AI-generated summary from live organization data."
              : "Select a guided report above to generate an instant summary."
          }
          action={
            <span className="inline-flex items-center gap-2">
              <Badge variant="info" className="normal-case">
                Demo preview
              </Badge>
              <Sparkles className="h-5 w-5 text-muted-foreground" />
            </span>
          }
        />

        {!activeReport ? (
          <div className="rounded-2xl border border-dashed border-border bg-slate-50/80 p-12 text-center">
            <div className="mx-auto max-w-md space-y-3">
              <Sparkles className="mx-auto h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm leading-6 text-muted-foreground">
                Pick one of the guided reports above and the AI advisor will
                draft a summary, key metrics, and recommended next steps.
              </p>
            </div>
          </div>
        ) : isGenerating ? (
          <GeneratingState title={activeReport.title} />
        ) : (
          <ReportOutput report={activeReport} />
        )}
      </Card>
    </div>
  );
}

function GeneratingState({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-slate-50/80 p-12 text-center">
      <div className="mx-auto max-w-md space-y-4">
        <Sparkles className="mx-auto h-8 w-8 animate-pulse text-primary" />
        <p className="text-sm font-medium text-foreground">
          Generating {title.toLowerCase()}...
        </p>
        <div className="mx-auto max-w-sm space-y-2">
          <div className="h-2.5 w-full animate-pulse rounded-full bg-slate-200" />
          <div className="h-2.5 w-5/6 animate-pulse rounded-full bg-slate-200" />
          <div className="h-2.5 w-2/3 animate-pulse rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
}

function buildReportText(report: GuidedReport) {
  const lines = [
    report.title,
    "",
    "Summary",
    report.summary,
    "",
    "Key metrics",
    ...report.stats.map((stat) => `- ${stat.label}: ${stat.value}`),
    "",
    "Recommended next steps",
    ...report.highlights.map((highlight) => `- ${highlight}`),
  ];
  return lines.join("\n");
}

function ReportOutput({ report }: { report: GuidedReport }) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setIsSaved(false);
  }, [report.id]);

  function handleExport() {
    const blob = new Blob([buildReportText(report)], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${report.id}-report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {report.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-border bg-slate-50/60 p-4"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {stat.label}
            </p>
            <p
              className={cn(
                "mt-2 text-2xl font-semibold tabular-nums",
                statToneClass[stat.tone],
              )}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-sm font-semibold text-foreground">Summary</p>
        <p className="mt-2 text-sm leading-7 text-muted-foreground">
          {report.summary}
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-card p-5">
        <p className="text-sm font-semibold text-foreground">
          Recommended next steps
        </p>
        <ul className="mt-3 space-y-3">
          {report.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3 text-sm leading-6">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
              <span className="text-muted-foreground">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-3 rounded-2xl border border-dashed border-border bg-slate-50/60 p-4">
        {isSaved ? (
          <span className="mr-auto text-xs font-medium text-emerald-600">
            Saved to suggestion log.
          </span>
        ) : null}
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleExport}>
            Export PDF
          </Button>
          <Button onClick={() => setIsSaved(true)} disabled={isSaved}>
            {isSaved ? "Saved" : "Save to log"}
          </Button>
        </div>
      </div>
    </div>
  );
}
