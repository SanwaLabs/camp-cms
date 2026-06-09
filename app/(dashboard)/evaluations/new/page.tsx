import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { PageShell } from "@/components/page-shell";
import { staffProfiles } from "@/lib/mock-data";

const rubric = [
  "Safety",
  "Engagement",
  "Preparedness",
  "Inclusion",
  "Communication",
];

export default function NewEvaluationPage() {
  return (
    <PageShell
      title="Submit evaluation"
      description="Mobile and desktop friendly rubric submission with narrative feedback."
    >
      <Card>
        <CardHeader
          title="Evaluation form"
          description="Scores and summaries will write to Supabase after manual schema setup."
        />
        <form className="space-y-5">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block text-sm font-medium">
              Facilitator
              <select className="mt-2 w-full rounded-xl border-border">
                {staffProfiles.map((staff) => (
                  <option key={staff.id}>{staff.fullName}</option>
                ))}
              </select>
            </label>
            <label className="block text-sm font-medium">
              Program/session
              <input className="mt-2 w-full rounded-xl border-border" />
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-5">
            {rubric.map((item) => (
              <label key={item} className="block text-sm font-medium">
                {item}
                <select className="mt-2 w-full rounded-xl border-border">
                  {[1, 2, 3, 4, 5].map((score) => (
                    <option key={score}>{score}</option>
                  ))}
                </select>
              </label>
            ))}
          </div>

          <label className="block text-sm font-medium">
            Narrative summary
            <textarea className="mt-2 w-full rounded-xl border-border" rows={5} />
          </label>

          <label className="block text-sm font-medium">
            Coaching notes
            <textarea className="mt-2 w-full rounded-xl border-border" rows={4} />
          </label>

          <Button type="button" disabled>
            Submit after Supabase table is connected
          </Button>
        </form>
      </Card>
    </PageShell>
  );
}
