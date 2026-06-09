import type { UserRole } from "@/lib/types";

export const roleLabels: Record<UserRole, string> = {
  admin: "Admin / Owner",
  program_manager: "Program Manager",
  site_lead: "Site Lead",
  facilitator: "Facilitator",
  school_partner: "School Partner",
};

export const rolePermissions: Record<UserRole, string[]> = {
  admin: [
    "Full system access",
    "Manage roles and organization settings",
    "View audit logs and exports",
  ],
  program_manager: [
    "Create and edit staff records",
    "Manage incidents, evaluations, surveys, and dashboards",
    "Export leadership reports",
  ],
  site_lead: [
    "Create incidents and evaluations",
    "View assigned staff and site-level dashboards",
  ],
  facilitator: [
    "View own profile, certifications, evaluations, and feedback",
  ],
  school_partner: ["Read-only access to approved summaries and reports"],
};

export function canManageStaff(role: UserRole) {
  return role === "admin" || role === "program_manager";
}

export function canViewSensitiveRecords(role: UserRole) {
  return ["admin", "program_manager", "site_lead"].includes(role);
}
