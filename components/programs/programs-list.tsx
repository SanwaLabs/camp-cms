import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import {
  formatProgramType,
  formatSessionDateRange,
  type ProgramWithSessions,
} from "@/lib/programs";
import type { ProgramTimeTab } from "@/lib/types";

const tabDescriptions: Record<ProgramTimeTab, string> = {
  past: "Programs with sessions that ended yesterday or earlier.",
  present: "Programs with sessions running now or starting within six months.",
  future: "Programs with sessions starting six months or more from today.",
};

export function ProgramsList({
  programs,
  activeTab,
}: {
  programs: ProgramWithSessions[];
  activeTab: ProgramTimeTab;
}) {
  if (programs.length === 0) {
    return (
      <Card>
        <CardHeader
          title="No programs found"
          description="No programs with sessions in this time range."
        />
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader
        title="Program list"
        description={tabDescriptions[activeTab]}
      />
      <div className="space-y-4">
        {programs.map((program) => (
          <article
            key={program.id}
            className="overflow-hidden rounded-2xl border border-border bg-white"
          >
            <div className="flex flex-wrap items-center gap-2 border-b border-border bg-slate-50 px-4 py-3">
              <h3 className="text-sm font-semibold text-foreground">
                {program.name}
              </h3>
              <Badge variant="neutral">{formatProgramType(program.programType)}</Badge>
              <Badge
                variant={program.status === "active" ? "success" : "neutral"}
              >
                {program.status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                {program.sessions.length}{" "}
                {program.sessions.length === 1 ? "session" : "sessions"}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Session</th>
                    <th className="px-4 py-3">Site</th>
                    <th className="px-4 py-3">Dates</th>
                    <th className="px-4 py-3">Capacity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {program.sessions.map((session) => (
                    <tr key={session.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 font-medium">{session.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {session.site}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {formatSessionDateRange(
                          session.startsAt,
                          session.endsAt,
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {session.capacity ?? "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        ))}
      </div>
    </Card>
  );
}
