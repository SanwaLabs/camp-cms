// Fallback fixtures when Supabase is not configured. Canonical demo data lives in
// supabase/seeds/ for Princeton-Blairstown Center.
import type {
  AISuggestion,
  DashboardMetric,
  Evaluation,
  Incident,
  Program,
  ProgramSession,
  StaffProfile,
  SurveyTemplate,
} from "@/lib/types";

export const dashboardMetrics: DashboardMetric[] = [
  {
    label: "Active staff",
    value: "42",
    helper: "6 seasonal staff onboarded this month",
    tone: "success",
  },
  {
    label: "Expiring certifications",
    value: "8",
    helper: "Due within 30 days",
    tone: "warning",
  },
  {
    label: "Unresolved incidents",
    value: "5",
    helper: "2 marked high severity",
    tone: "danger",
  },
  {
    label: "Pending evaluations",
    value: "13",
    helper: "Across 4 active programs",
    tone: "neutral",
  },
];

export const staffProfiles: StaffProfile[] = [
  {
    id: "staff-1",
    fullName: "Avery Johnson",
    role: "Lead Facilitator",
    status: "active",
    site: "Main Campus (Blairstown)",
    email: "avery@example.org",
    phone: "(555) 010-4211",
    backgroundCheck: "clear",
    sickLeaveDays: 2,
    notes: "Strong with middle-school groups. Pair with new facilitators for onboarding.",
    evaluationTrend: [4.1, 4.4, 4.6, 4.7],
    certifications: [
      {
        id: "cert-1",
        name: "CPR / First Aid",
        expiresAt: "2026-07-12",
        status: "expiring",
      },
      {
        id: "cert-2",
        name: "Mandated Reporter",
        expiresAt: "2027-01-15",
        status: "current",
      },
    ],
  },
  {
    id: "staff-2",
    fullName: "Malik Carter",
    role: "Facilitator",
    status: "seasonal",
    site: "Challenge Course",
    email: "malik@example.org",
    phone: "(555) 010-8920",
    backgroundCheck: "pending",
    sickLeaveDays: 0,
    notes: "Needs final background check before overnight sessions.",
    evaluationTrend: [3.8, 4.0, 4.2],
    certifications: [
      {
        id: "cert-3",
        name: "Water Safety",
        expiresAt: "2026-11-03",
        status: "current",
      },
    ],
  },
  {
    id: "staff-3",
    fullName: "Sofia Nguyen",
    role: "Site Lead",
    status: "active",
    site: "Main Campus (Blairstown)",
    email: "sofia@example.org",
    phone: "(555) 010-1198",
    backgroundCheck: "clear",
    sickLeaveDays: 1,
    notes: "Best reviewer for complex incident debriefs.",
    evaluationTrend: [4.5, 4.6, 4.8],
    certifications: [
      {
        id: "cert-4",
        name: "Crisis Prevention",
        expiresAt: "2026-06-22",
        status: "expiring",
      },
    ],
  },
];

export const incidents: Incident[] = [
  {
    id: "incident-1",
    title: "Camper allergy response",
    site: "Main Campus (Blairstown)",
    severity: "high",
    status: "in_review",
    occurredAt: "2026-06-05T14:20:00Z",
    involvedStaff: ["Avery Johnson", "Sofia Nguyen"],
    description:
      "Staff followed allergy protocol and parent communication is pending final review.",
    followUpOwner: "Sofia Nguyen",
    followUpDue: "2026-06-10",
  },
  {
    id: "incident-2",
    title: "Equipment storage issue",
    site: "Challenge Course",
    severity: "medium",
    status: "open",
    occurredAt: "2026-06-07T18:10:00Z",
    involvedStaff: ["Malik Carter"],
    description:
      "Climbing equipment was returned without full checklist confirmation.",
    followUpOwner: "Program Manager",
    followUpDue: "2026-06-12",
  },
];

export const evaluations: Evaluation[] = [
  {
    id: "eval-1",
    staffId: "staff-1",
    staffName: "Avery Johnson",
    evaluator: "Sofia Nguyen",
    submittedAt: "2026-06-04T16:30:00Z",
    score: 4.7,
    rubric: {
      safety: 5,
      engagement: 5,
      preparedness: 4,
      inclusion: 5,
    },
    summary:
      "Excellent group management and strong adaptation when weather changed.",
  },
  {
    id: "eval-2",
    staffId: "staff-2",
    staffName: "Malik Carter",
    evaluator: "Avery Johnson",
    submittedAt: "2026-06-06T19:05:00Z",
    score: 4.2,
    rubric: {
      safety: 4,
      engagement: 4,
      preparedness: 4,
      inclusion: 5,
    },
    summary:
      "Positive rapport with campers. Needs checklist reinforcement before field sessions.",
  },
];

export const surveyTemplates: SurveyTemplate[] = [
  {
    id: "survey-1",
    name: "Middle School Outdoor Reflection",
    school: "Lincoln Middle School",
    programType: "Outdoor leadership",
    ageGroup: "11-13",
    questionCount: 8,
    reuseCount: 12,
    lastUsedAt: "2026-05-28",
  },
  {
    id: "survey-2",
    name: "Elementary Teamwork Pulse",
    school: "Cedar Elementary",
    programType: "Team building",
    ageGroup: "8-10",
    questionCount: 6,
    reuseCount: 7,
    lastUsedAt: "2026-06-02",
  },
];

export const aiSuggestions: AISuggestion[] = [
  {
    id: "ai-1",
    kind: "survey",
    prompt: "Age 11-13, outdoor leadership, confidence and inclusion",
    output:
      "Draft survey with reflection, safety comfort, teamwork, and facilitator feedback questions.",
    status: "saved",
    createdAt: "2026-06-03T10:15:00Z",
  },
  {
    id: "ai-2",
    kind: "activity",
    prompt: "Ages 8-10, low-risk rainy day team building",
    output:
      "Indoor knot circle, silent lineup, and collaborative shelter-design prompts.",
    status: "draft",
    createdAt: "2026-06-08T09:00:00Z",
  },
];

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addMonths(date: Date, months: number): Date {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

function sessionRange(
  start: Date,
  end: Date,
): { startsAt: string; endsAt: string } {
  return { startsAt: start.toISOString(), endsAt: end.toISOString() };
}

export function buildProgramFixtures(referenceDate = new Date()) {
  const today = new Date(referenceDate);
  today.setHours(0, 0, 0, 0);

  const programs: Program[] = [
    {
      id: "program-summer",
      name: "Summer",
      programType: "summer_camp",
      status: "active",
      notes: "Multi-week summer camp with rotating outdoor themes.",
    },
    {
      id: "program-venture-out",
      name: "Venture Out",
      programType: "expedition",
      status: "active",
      notes: "Multi-day expeditions and field-based learning.",
    },
    {
      id: "program-day",
      name: "Day",
      programType: "day_camp",
      status: "active",
      notes: "Day-only sessions for elementary and middle school groups.",
    },
    {
      id: "program-overnight",
      name: "Overnight",
      programType: "overnight",
      status: "planned",
      notes: "Residential overnight programs with cabin-based cohorts.",
    },
  ];

  const sessions: ProgramSession[] = [
    // Past (5) — ended yesterday or earlier
    {
      id: "session-past-1",
      programId: "program-summer",
      name: "Week 1",
      site: "Main Campus (Blairstown)",
      capacity: 48,
      ...sessionRange(addDays(today, -21), addDays(today, -14)),
    },
    {
      id: "session-past-2",
      programId: "program-summer",
      name: "Week 2",
      site: "Main Campus (Blairstown)",
      capacity: 48,
      ...sessionRange(addDays(today, -14), addDays(today, -7)),
    },
    {
      id: "session-past-3",
      programId: "program-day",
      name: "Spring Day Camp",
      site: "Main Campus (Blairstown)",
      capacity: 32,
      ...sessionRange(addDays(today, -3), addDays(today, -1)),
    },
    {
      id: "session-past-4",
      programId: "program-venture-out",
      name: "Spring Expedition",
      site: "Challenge Course",
      capacity: 24,
      ...sessionRange(addDays(today, -95), addDays(today, -90)),
    },
    {
      id: "session-past-5",
      programId: "program-overnight",
      name: "Memorial Weekend",
      site: "Challenge Course",
      capacity: 36,
      ...sessionRange(addDays(today, -33), addDays(today, -30)),
    },
    // Present (5) — active now or within 6 months
    {
      id: "session-present-1",
      programId: "program-summer",
      name: "Week 3",
      site: "Main Campus (Blairstown)",
      capacity: 48,
      ...sessionRange(addDays(today, -3), addDays(today, 4)),
    },
    {
      id: "session-present-2",
      programId: "program-day",
      name: "July Session A",
      site: "Main Campus (Blairstown)",
      capacity: 32,
      ...sessionRange(addDays(today, 14), addDays(today, 18)),
    },
    {
      id: "session-present-3",
      programId: "program-overnight",
      name: "August Session",
      site: "Challenge Course",
      capacity: 36,
      ...sessionRange(addDays(today, 42), addDays(today, 46)),
    },
    {
      id: "session-present-4",
      programId: "program-venture-out",
      name: "Fall Outing",
      site: "Challenge Course",
      capacity: 24,
      ...sessionRange(addMonths(today, 3), addDays(addMonths(today, 3), 4)),
    },
    {
      id: "session-present-5",
      programId: "program-day",
      name: "November Session",
      site: "Main Campus (Blairstown)",
      capacity: 32,
      ...sessionRange(addMonths(today, 5), addDays(addMonths(today, 5), 4)),
    },
    // Future (5) — starts 6+ months out
    {
      id: "session-future-1",
      programId: "program-summer",
      name: "Summer 2027 Kickoff",
      site: "Main Campus (Blairstown)",
      capacity: 48,
      ...sessionRange(addMonths(today, 7), addDays(addMonths(today, 7), 6)),
    },
    {
      id: "session-future-2",
      programId: "program-venture-out",
      name: "Spring 2027 Expedition",
      site: "Challenge Course",
      capacity: 24,
      ...sessionRange(addMonths(today, 9), addDays(addMonths(today, 9), 5)),
    },
    {
      id: "session-future-3",
      programId: "program-day",
      name: "Winter 2027 Day Camp",
      site: "Main Campus (Blairstown)",
      capacity: 32,
      ...sessionRange(addMonths(today, 8), addDays(addMonths(today, 8), 4)),
    },
    {
      id: "session-future-4",
      programId: "program-overnight",
      name: "New Year 2027 Overnight",
      site: "Challenge Course",
      capacity: 36,
      ...sessionRange(addDays(today, 198), addDays(today, 201)),
    },
    {
      id: "session-future-5",
      programId: "program-summer",
      name: "Early 2027 Session",
      site: "Main Campus (Blairstown)",
      capacity: 48,
      ...sessionRange(addMonths(today, 10), addDays(addMonths(today, 10), 6)),
    },
  ];

  return { programs, sessions };
}

const programFixtures = buildProgramFixtures();

export const programs = programFixtures.programs;
export const programSessions = programFixtures.sessions;
