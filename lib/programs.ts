import type {
  Program,
  ProgramSession,
  ProgramTimeTab,
} from "@/lib/types";

export type ProgramWithSessions = Program & {
  sessions: ProgramSession[];
};

function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

export function getSessionTimeBucket(
  session: ProgramSession,
  referenceDate = new Date(),
): ProgramTimeTab {
  const today = startOfDay(referenceDate);
  const sixMonthsOut = addMonths(today, 6);
  const startsAt = new Date(session.startsAt);
  const endsAt = new Date(session.endsAt);

  if (endsAt < today) {
    return "past";
  }

  if (startsAt > sixMonthsOut) {
    return "future";
  }

  return "present";
}

export function getProgramsForTab(
  tab: ProgramTimeTab,
  programs: Program[],
  sessions: ProgramSession[],
  referenceDate = new Date(),
): ProgramWithSessions[] {
  const sessionsByProgram = new Map<string, ProgramSession[]>();

  for (const session of sessions) {
    if (getSessionTimeBucket(session, referenceDate) !== tab) {
      continue;
    }

    const existing = sessionsByProgram.get(session.programId) ?? [];
    existing.push(session);
    sessionsByProgram.set(session.programId, existing);
  }

  return programs
    .filter((program) => sessionsByProgram.has(program.id))
    .map((program) => ({
      ...program,
      sessions: (sessionsByProgram.get(program.id) ?? []).sort(
        (a, b) =>
          new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
      ),
    }));
}

export function formatSessionDateRange(startsAt: string, endsAt: string): string {
  const start = new Date(startsAt);
  const end = new Date(endsAt);
  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();

  const startFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    ...(sameYear && sameMonth ? {} : { year: "numeric" }),
  });

  const endFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  if (start.toDateString() === end.toDateString()) {
    return startFormatter.format(start);
  }

  return `${startFormatter.format(start)} – ${endFormatter.format(end)}`;
}

export function formatProgramType(programType: string): string {
  return programType.replace(/_/g, " ");
}
