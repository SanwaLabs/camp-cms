# Supabase Database Setup

The executable database baseline lives in
[`supabase/migrations/20260613033000_initial_schema.sql`](../supabase/migrations/20260613033000_initial_schema.sql).
Use that migration file as the source of truth for schema, RLS, indexes, storage
buckets, and audit logging. This document remains a review guide for the schema
shape and launch checklist.

## Schema Outline

Core tables:

- `profiles`: one row per Supabase Auth user, with role and organization scope.
- `schools`: customer or partner schools.
- `programs`: camp, school, or youth program instances.
- `sessions`: dated program delivery sessions.
- `staff_profiles`: facilitator records, status, background check state, notes.
- `certifications`: staff credential records and expiration dates.
- `documents`: file metadata for staff documents and incident attachments.
- `sick_leave_records`: staff leave history.
- `incidents`: operational and safety incident records.
- `follow_up_tasks`: incident and review action items.
- `evaluations`: rubric evaluation headers.
- `evaluation_scores`: category scores attached to evaluations.
- `survey_templates`: reusable survey definitions.
- `surveys`: generated or customized survey instances.
- `survey_questions`: normalized survey questions.
- `survey_responses`: response archive.
- `ai_suggestion_logs`: AI prompt/output review trail.
- `audit_logs`: append-only mutation, export, and file access trail.

## SQL Reference

The migration uses UUID primary keys and timestamps consistently:

```sql
create extension if not exists pgcrypto;

create type app_role as enum (
  'admin',
  'program_manager',
  'site_lead',
  'facilitator',
  'school_partner'
);

create type staff_status as enum ('active', 'inactive', 'seasonal', 'alumni');
create type incident_severity as enum ('low', 'medium', 'high', 'critical');
create type incident_status as enum ('open', 'in_review', 'closed');
```

Business tables use audit columns:

```sql
id uuid primary key default gen_random_uuid(),
created_at timestamptz not null default now(),
updated_at timestamptz not null default now(),
created_by uuid references auth.users(id),
updated_by uuid references auth.users(id)
```

## RLS Policy Model

The initial migration enables RLS on every table it creates in `public`.

```sql
alter table public.profiles enable row level security;
alter table public.staff_profiles enable row level security;
alter table public.incidents enable row level security;
alter table public.evaluations enable row level security;
alter table public.surveys enable row level security;
alter table public.documents enable row level security;
```

Access model:

- Admin: all rows in the organization.
- Program Manager: create/edit staff, incidents, evaluations, surveys, and reports.
- Site Lead: create incidents/evaluations and view assigned site staff.
- Facilitator: view own profile, certifications, evaluations, and feedback.
- School Partner: read-only approved summary/report rows.

Do not base authorization decisions on user-editable `raw_user_meta_data`.
Store role assignments in protected tables and check them from policies or
security definer functions in a private schema.

## Storage Buckets

The migration creates these private buckets:

- `staff-documents`: certification files, training records, background check artifacts.
- `incident-attachments`: incident photos, PDFs, or follow-up evidence.
- `exports`: generated leadership reports and audit-sensitive exports.

Storage policies mirror database permissions and keep staff documents and
incident attachments limited to privileged roles.

## Indexes

The migration creates indexes for the expected MVP filters:

```sql
create index on public.staff_profiles (status);
create index on public.staff_profiles (site_id);
create index on public.certifications (staff_profile_id, expires_at);
create index on public.incidents (status, severity, occurred_at desc);
create index on public.evaluations (staff_profile_id, submitted_at desc);
create index on public.survey_templates (school_id, program_type, age_group);
create index on public.follow_up_tasks (status, due_at);
```

## Audit Logging

Track:

- Inserts, updates, deletes on sensitive business records.
- File access for sensitive documents.
- Report exports.
- AI-generated content prompts, outputs, edits, saves, and discards.

Use an append-only `audit_logs` table with actor, action, entity, entity id,
timestamp, IP/user agent when available, and before/after JSON snapshots for
mutation events.

## Manual Verification Checklist

- RLS is enabled on every exposed table.
- No service-role key is exposed to browser code.
- Facilitators can only read their own staff-facing records.
- Site leads cannot view unrelated sites.
- Background check data is restricted to privileged roles.
- Storage policies match the table-level authorization model.
- Supabase advisors report no unresolved security or performance issues.
