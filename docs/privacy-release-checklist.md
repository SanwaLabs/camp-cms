# Privacy And Release Checklist

Use this checklist before enabling production customers.

## Access Control

- Confirm each route has the expected role gate.
- Confirm Supabase RLS mirrors the app role matrix.
- Confirm facilitators can only access their own profile, certifications,
  evaluations, and feedback.
- Confirm school partners only see approved read-only summaries.

## Sensitive Records

- Restrict background check data to Admin and Program Manager roles.
- Keep internal incident notes hidden from school partner access.
- Store student-related survey data only when consent and retention rules are
  clear for that customer.
- Keep service-role access limited to server-side routes.

## Audit Trail

Audit these actions:

- Create, update, archive, or delete staff records.
- Create or close incidents and follow-up tasks.
- Submit or edit evaluations.
- Generate, edit, save, or discard AI output.
- Export reports.
- Access sensitive files.

## Deployment Checks

- Vercel Preview uses preview Supabase credentials.
- Vercel Production uses production Supabase credentials.
- `OPENAI_API_KEY` is only configured server-side.
- Reminder cron route stays dry-run until email delivery and audit logging are
  connected.
- Supabase advisors have been reviewed manually.
