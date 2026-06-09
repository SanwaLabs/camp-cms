"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";

export function AiGenerator() {
  const [draft, setDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("Drafts must be reviewed before saving.");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    setStatus("Generating editable draft...");

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/ai/suggestions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        kind: formData.get("kind"),
        ageGroup: formData.get("ageGroup"),
        programType: formData.get("programType"),
        outcomes: formData.get("outcomes"),
        riskLevel: formData.get("riskLevel"),
      }),
    });

    const data = (await response.json()) as { draft?: string; error?: string };
    setDraft(data.draft ?? data.error ?? "Unable to generate a draft.");
    setStatus("Draft generated. Edit before saving or publishing.");
    setIsLoading(false);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium">
          Output type
          <select name="kind" className="mt-2 w-full rounded-xl border-border">
            <option value="survey">Survey draft</option>
            <option value="activity">Activity ideas</option>
          </select>
        </label>
        <label className="block text-sm font-medium">
          Age group
          <input
            required
            name="ageGroup"
            className="mt-2 w-full rounded-xl border-border"
            placeholder="11-13"
          />
        </label>
        <label className="block text-sm font-medium">
          Program type
          <input
            required
            name="programType"
            className="mt-2 w-full rounded-xl border-border"
            placeholder="Outdoor leadership"
          />
        </label>
        <label className="block text-sm font-medium">
          Risk level
          <select
            name="riskLevel"
            className="mt-2 w-full rounded-xl border-border"
            defaultValue="low"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
      </div>

      <label className="block text-sm font-medium">
        Desired outcomes
        <textarea
          required
          name="outcomes"
          className="mt-2 w-full rounded-xl border-border"
          rows={3}
          placeholder="Confidence, belonging, teamwork"
        />
      </label>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate editable draft"}
      </Button>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label className="text-sm font-medium" htmlFor="draft">
            Editable output
          </label>
          <p className="text-xs text-muted-foreground">{status}</p>
        </div>
        <textarea
          id="draft"
          className="min-h-72 w-full rounded-xl border-border font-mono text-sm"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Generated survey or activity suggestions will appear here."
        />
      </div>

      <Button type="button" variant="secondary" disabled={!draft}>
        Save after ai_suggestion_logs table is connected
      </Button>
    </form>
  );
}
