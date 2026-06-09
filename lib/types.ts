export type UserRole =
  | "admin"
  | "program_manager"
  | "site_lead"
  | "facilitator"
  | "school_partner";

export type StaffStatus = "active" | "inactive" | "seasonal" | "alumni";

export type IncidentSeverity = "low" | "medium" | "high" | "critical";

export type IncidentStatus = "open" | "in_review" | "closed";

export type CertificationStatus = "current" | "expiring" | "expired";

export type StaffProfile = {
  id: string;
  fullName: string;
  role: string;
  status: StaffStatus;
  site: string;
  email: string;
  phone: string;
  backgroundCheck: "clear" | "pending" | "restricted";
  certifications: Certification[];
  evaluationTrend: number[];
  sickLeaveDays: number;
  notes: string;
};

export type Certification = {
  id: string;
  name: string;
  expiresAt: string;
  status: CertificationStatus;
};

export type Incident = {
  id: string;
  title: string;
  site: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  occurredAt: string;
  involvedStaff: string[];
  description: string;
  followUpOwner: string;
  followUpDue: string;
};

export type Evaluation = {
  id: string;
  staffId: string;
  staffName: string;
  evaluator: string;
  submittedAt: string;
  score: number;
  rubric: Record<string, number>;
  summary: string;
};

export type SurveyTemplate = {
  id: string;
  name: string;
  school: string;
  programType: string;
  ageGroup: string;
  questionCount: number;
  reuseCount: number;
  lastUsedAt: string;
};

export type DashboardMetric = {
  label: string;
  value: string;
  helper: string;
  tone: "neutral" | "success" | "warning" | "danger";
};

export type AISuggestion = {
  id: string;
  kind: "survey" | "activity";
  prompt: string;
  output: string;
  status: "draft" | "saved" | "discarded";
  createdAt: string;
};
