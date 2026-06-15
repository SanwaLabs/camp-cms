-- Initial schema for the Youth Program Operations Platform.
-- This migration intentionally keeps authorization data in tables instead of
-- user-editable auth metadata so RLS policies have a trusted source of truth.

create extension if not exists pgcrypto;

create schema if not exists private;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum (
      'admin',
      'program_manager',
      'site_lead',
      'facilitator',
      'school_partner'
    );
  end if;

  if not exists (select 1 from pg_type where typname = 'staff_status') then
    create type public.staff_status as enum ('active', 'inactive', 'seasonal', 'alumni');
  end if;

  if not exists (select 1 from pg_type where typname = 'background_check_status') then
    create type public.background_check_status as enum ('clear', 'pending', 'restricted');
  end if;

  if not exists (select 1 from pg_type where typname = 'certification_status') then
    create type public.certification_status as enum ('current', 'expiring', 'expired');
  end if;

  if not exists (select 1 from pg_type where typname = 'incident_severity') then
    create type public.incident_severity as enum ('low', 'medium', 'high', 'critical');
  end if;

  if not exists (select 1 from pg_type where typname = 'incident_status') then
    create type public.incident_status as enum ('open', 'in_review', 'closed');
  end if;

  if not exists (select 1 from pg_type where typname = 'ai_suggestion_kind') then
    create type public.ai_suggestion_kind as enum ('survey', 'activity');
  end if;

  if not exists (select 1 from pg_type where typname = 'ai_suggestion_status') then
    create type public.ai_suggestion_status as enum ('draft', 'saved', 'discarded');
  end if;
end $$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  organization_id uuid references public.organizations(id) on delete set null,
  role public.app_role not null default 'facilitator',
  full_name text not null,
  email text not null,
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  constraint profiles_email_not_blank check (btrim(email) <> '')
);

create table public.schools (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  contact_name text,
  contact_email text,
  contact_phone text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  unique (organization_id, name)
);

create table public.sites (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  school_id uuid references public.schools(id) on delete set null,
  site_lead_id uuid references public.profiles(id) on delete set null,
  name text not null,
  address text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  unique (organization_id, name)
);

create table public.programs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  school_id uuid references public.schools(id) on delete set null,
  name text not null,
  program_type text not null,
  status text not null default 'planned',
  starts_on date,
  ends_on date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  program_id uuid not null references public.programs(id) on delete cascade,
  site_id uuid references public.sites(id) on delete set null,
  name text not null,
  starts_at timestamptz,
  ends_at timestamptz,
  capacity integer check (capacity is null or capacity >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create table public.staff_profiles (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete set null,
  site_id uuid references public.sites(id) on delete set null,
  full_name text not null,
  role text not null,
  status public.staff_status not null default 'active',
  email text not null,
  phone text,
  background_check_status public.background_check_status not null default 'pending',
  sick_leave_days integer not null default 0 check (sick_leave_days >= 0),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  unique (organization_id, email)
);

create table public.certifications (
  id uuid primary key default gen_random_uuid(),
  staff_profile_id uuid not null references public.staff_profiles(id) on delete cascade,
  name text not null,
  expires_at date not null,
  status public.certification_status not null default 'current',
  document_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create table public.sick_leave_records (
  id uuid primary key default gen_random_uuid(),
  staff_profile_id uuid not null references public.staff_profiles(id) on delete cascade,
  starts_on date not null,
  ends_on date not null,
  days numeric(5, 2) not null check (days >= 0),
  reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  constraint sick_leave_date_order check (ends_on >= starts_on)
);

create table public.incidents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  site_id uuid references public.sites(id) on delete set null,
  title text not null,
  severity public.incident_severity not null default 'low',
  status public.incident_status not null default 'open',
  occurred_at timestamptz not null,
  description text not null,
  internal_notes text,
  reported_by uuid references public.profiles(id) on delete set null,
  closed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create table public.incident_staff (
  incident_id uuid not null references public.incidents(id) on delete cascade,
  staff_profile_id uuid not null references public.staff_profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  primary key (incident_id, staff_profile_id)
);

create table public.follow_up_tasks (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  incident_id uuid references public.incidents(id) on delete cascade,
  owner_profile_id uuid references public.profiles(id) on delete set null,
  owner_name text,
  title text not null,
  status text not null default 'open',
  due_at date,
  completed_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create table public.evaluations (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  staff_profile_id uuid not null references public.staff_profiles(id) on delete cascade,
  evaluator_id uuid references public.profiles(id) on delete set null,
  session_id uuid references public.sessions(id) on delete set null,
  submitted_at timestamptz not null default now(),
  score numeric(3, 2) not null check (score >= 1 and score <= 5),
  summary text not null,
  coaching_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create table public.evaluation_scores (
  id uuid primary key default gen_random_uuid(),
  evaluation_id uuid not null references public.evaluations(id) on delete cascade,
  category text not null,
  score integer not null check (score between 1 and 5),
  created_at timestamptz not null default now(),
  unique (evaluation_id, category)
);

create table public.survey_templates (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  school_id uuid references public.schools(id) on delete set null,
  name text not null,
  program_type text not null,
  age_group text not null,
  question_count integer not null default 0 check (question_count >= 0),
  reuse_count integer not null default 0 check (reuse_count >= 0),
  last_used_at date,
  content jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create table public.surveys (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  survey_template_id uuid references public.survey_templates(id) on delete set null,
  school_id uuid references public.schools(id) on delete set null,
  program_id uuid references public.programs(id) on delete set null,
  session_id uuid references public.sessions(id) on delete set null,
  name text not null,
  status text not null default 'draft',
  approved_for_partner_access boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create table public.survey_questions (
  id uuid primary key default gen_random_uuid(),
  survey_id uuid not null references public.surveys(id) on delete cascade,
  position integer not null check (position > 0),
  question_text text not null,
  question_type text not null default 'text',
  options jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  unique (survey_id, position)
);

create table public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  survey_id uuid not null references public.surveys(id) on delete cascade,
  school_id uuid references public.schools(id) on delete set null,
  program_id uuid references public.programs(id) on delete set null,
  session_id uuid references public.sessions(id) on delete set null,
  respondent_label text,
  submitted_at timestamptz not null default now(),
  answers jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create table public.ai_suggestion_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete set null,
  kind public.ai_suggestion_kind not null,
  prompt text not null,
  output text not null,
  status public.ai_suggestion_status not null default 'draft',
  age_group text,
  program_type text,
  outcomes text,
  risk_level text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null
);

create table public.documents (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  staff_profile_id uuid references public.staff_profiles(id) on delete cascade,
  incident_id uuid references public.incidents(id) on delete cascade,
  uploaded_by uuid references public.profiles(id) on delete set null,
  bucket_id text not null,
  object_path text not null,
  file_name text not null,
  category text not null,
  mime_type text,
  size_bytes bigint check (size_bytes is null or size_bytes >= 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null,
  updated_by uuid references auth.users(id) on delete set null,
  unique (bucket_id, object_path),
  constraint documents_entity_required check (
    staff_profile_id is not null or incident_id is not null
  )
);

alter table public.certifications
  add constraint certifications_document_id_fkey
  foreign key (document_id) references public.documents(id) on delete set null;

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete set null,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  entity text not null,
  entity_id uuid,
  occurred_at timestamptz not null default now(),
  ip_address inet,
  user_agent text,
  before_snapshot jsonb,
  after_snapshot jsonb
);

create index profiles_organization_id_idx on public.profiles (organization_id);
create index profiles_role_idx on public.profiles (role);
create index schools_organization_id_idx on public.schools (organization_id);
create index programs_school_id_idx on public.programs (school_id);
create index sessions_program_id_idx on public.sessions (program_id);
create index sites_organization_id_idx on public.sites (organization_id);
create index staff_profiles_status_idx on public.staff_profiles (status);
create index staff_profiles_site_id_idx on public.staff_profiles (site_id);
create index staff_profiles_profile_id_idx on public.staff_profiles (profile_id);
create index certifications_staff_profile_expires_idx on public.certifications (staff_profile_id, expires_at);
create index sick_leave_staff_profile_idx on public.sick_leave_records (staff_profile_id);
create index incidents_status_severity_occurred_idx on public.incidents (status, severity, occurred_at desc);
create index incidents_site_id_idx on public.incidents (site_id);
create index incident_staff_staff_profile_idx on public.incident_staff (staff_profile_id);
create index follow_up_tasks_status_due_idx on public.follow_up_tasks (status, due_at);
create index evaluations_staff_profile_submitted_idx on public.evaluations (staff_profile_id, submitted_at desc);
create index evaluations_evaluator_id_idx on public.evaluations (evaluator_id);
create index survey_templates_school_program_age_idx on public.survey_templates (school_id, program_type, age_group);
create index surveys_school_id_idx on public.surveys (school_id);
create index survey_responses_survey_id_idx on public.survey_responses (survey_id);
create index ai_suggestion_logs_created_by_idx on public.ai_suggestion_logs (created_by);
create index documents_staff_profile_id_idx on public.documents (staff_profile_id);
create index documents_incident_id_idx on public.documents (incident_id);
create index audit_logs_actor_occurred_idx on public.audit_logs (actor_id, occurred_at desc);
create index audit_logs_entity_idx on public.audit_logs (entity, entity_id);

create trigger set_organizations_updated_at
before update on public.organizations
for each row execute function public.set_updated_at();

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger set_schools_updated_at
before update on public.schools
for each row execute function public.set_updated_at();

create trigger set_sites_updated_at
before update on public.sites
for each row execute function public.set_updated_at();

create trigger set_programs_updated_at
before update on public.programs
for each row execute function public.set_updated_at();

create trigger set_sessions_updated_at
before update on public.sessions
for each row execute function public.set_updated_at();

create trigger set_staff_profiles_updated_at
before update on public.staff_profiles
for each row execute function public.set_updated_at();

create trigger set_certifications_updated_at
before update on public.certifications
for each row execute function public.set_updated_at();

create trigger set_sick_leave_records_updated_at
before update on public.sick_leave_records
for each row execute function public.set_updated_at();

create trigger set_incidents_updated_at
before update on public.incidents
for each row execute function public.set_updated_at();

create trigger set_follow_up_tasks_updated_at
before update on public.follow_up_tasks
for each row execute function public.set_updated_at();

create trigger set_evaluations_updated_at
before update on public.evaluations
for each row execute function public.set_updated_at();

create trigger set_survey_templates_updated_at
before update on public.survey_templates
for each row execute function public.set_updated_at();

create trigger set_surveys_updated_at
before update on public.surveys
for each row execute function public.set_updated_at();

create trigger set_survey_questions_updated_at
before update on public.survey_questions
for each row execute function public.set_updated_at();

create trigger set_survey_responses_updated_at
before update on public.survey_responses
for each row execute function public.set_updated_at();

create trigger set_ai_suggestion_logs_updated_at
before update on public.ai_suggestion_logs
for each row execute function public.set_updated_at();

create trigger set_documents_updated_at
before update on public.documents
for each row execute function public.set_updated_at();

create or replace function private.current_user_role()
returns public.app_role
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.profiles
  where id = auth.uid()
    and is_active = true
  limit 1
$$;

create or replace function private.current_organization_id()
returns uuid
language sql
stable
security definer
set search_path = public
as $$
  select organization_id
  from public.profiles
  where id = auth.uid()
    and is_active = true
  limit 1
$$;

create or replace function private.has_role(allowed_roles public.app_role[])
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(private.current_user_role() = any(allowed_roles), false)
$$;

create or replace function private.is_org_member(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select target_organization_id is not null
    and private.current_organization_id() = target_organization_id
$$;

create or replace function private.can_manage_org(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select private.is_org_member(target_organization_id)
    and private.has_role(array['admin', 'program_manager']::public.app_role[])
$$;

create or replace function private.can_view_sensitive(target_organization_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select private.is_org_member(target_organization_id)
    and private.has_role(array['admin', 'program_manager', 'site_lead']::public.app_role[])
$$;

create or replace function private.can_access_site(target_site_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.sites s
    where s.id = target_site_id
      and private.is_org_member(s.organization_id)
      and (
        private.has_role(array['admin', 'program_manager']::public.app_role[])
        or (private.has_role(array['site_lead']::public.app_role[]) and s.site_lead_id = auth.uid())
      )
  )
$$;

create or replace function private.is_staff_self(target_staff_profile_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.staff_profiles sp
    where sp.id = target_staff_profile_id
      and sp.profile_id = auth.uid()
  )
$$;

create or replace function private.can_read_staff_profile(target_staff_profile_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.staff_profiles sp
    where sp.id = target_staff_profile_id
      and (
        private.can_manage_org(sp.organization_id)
        or private.is_staff_self(sp.id)
        or (
          private.has_role(array['site_lead']::public.app_role[])
          and sp.site_id is not null
          and private.can_access_site(sp.site_id)
        )
      )
  )
$$;

create or replace function private.audit_row_change()
returns trigger
language plpgsql
security definer
set search_path = public, private
as $$
declare
  row_data jsonb := to_jsonb(coalesce(new, old));
  row_id uuid;
  row_org_id uuid;
begin
  row_id := nullif(row_data ->> 'id', '')::uuid;

  if tg_table_name = 'organizations' then
    row_org_id := row_id;
  elsif row_data ? 'organization_id' then
    row_org_id := nullif(row_data ->> 'organization_id', '')::uuid;
  end if;

  insert into public.audit_logs (
    organization_id,
    actor_id,
    action,
    entity,
    entity_id,
    before_snapshot,
    after_snapshot
  )
  values (
    row_org_id,
    auth.uid(),
    lower(tg_op),
    tg_table_name,
    row_id,
    case when tg_op in ('UPDATE', 'DELETE') then to_jsonb(old) else null end,
    case when tg_op in ('INSERT', 'UPDATE') then to_jsonb(new) else null end
  );

  return coalesce(new, old);
end;
$$;

revoke all on schema private from public;
grant usage on schema private to authenticated;

alter table public.organizations enable row level security;
alter table public.profiles enable row level security;
alter table public.schools enable row level security;
alter table public.sites enable row level security;
alter table public.programs enable row level security;
alter table public.sessions enable row level security;
alter table public.staff_profiles enable row level security;
alter table public.certifications enable row level security;
alter table public.sick_leave_records enable row level security;
alter table public.incidents enable row level security;
alter table public.incident_staff enable row level security;
alter table public.follow_up_tasks enable row level security;
alter table public.evaluations enable row level security;
alter table public.evaluation_scores enable row level security;
alter table public.survey_templates enable row level security;
alter table public.surveys enable row level security;
alter table public.survey_questions enable row level security;
alter table public.survey_responses enable row level security;
alter table public.ai_suggestion_logs enable row level security;
alter table public.documents enable row level security;
alter table public.audit_logs enable row level security;

create policy "organization members can read their organization"
on public.organizations for select
to authenticated
using (private.is_org_member(id));

create policy "organization admins can update their organization"
on public.organizations for update
to authenticated
using (private.can_manage_org(id))
with check (private.can_manage_org(id));

create policy "users can read their profile"
on public.profiles for select
to authenticated
using (
  id = auth.uid()
  or private.can_manage_org(organization_id)
);

create policy "organization admins can manage profiles"
on public.profiles for all
to authenticated
using (private.can_manage_org(organization_id))
with check (private.can_manage_org(organization_id));

create policy "organization members can read schools"
on public.schools for select
to authenticated
using (private.is_org_member(organization_id));

create policy "program managers can manage schools"
on public.schools for all
to authenticated
using (private.can_manage_org(organization_id))
with check (private.can_manage_org(organization_id));

create policy "privileged users can read sites"
on public.sites for select
to authenticated
using (
  private.can_view_sensitive(organization_id)
  or site_lead_id = auth.uid()
);

create policy "program managers can manage sites"
on public.sites for all
to authenticated
using (private.can_manage_org(organization_id))
with check (private.can_manage_org(organization_id));

create policy "organization members can read programs"
on public.programs for select
to authenticated
using (private.is_org_member(organization_id));

create policy "program managers can manage programs"
on public.programs for all
to authenticated
using (private.can_manage_org(organization_id))
with check (private.can_manage_org(organization_id));

create policy "organization members can read sessions"
on public.sessions for select
to authenticated
using (private.is_org_member(organization_id));

create policy "program managers can manage sessions"
on public.sessions for all
to authenticated
using (private.can_manage_org(organization_id))
with check (private.can_manage_org(organization_id));

create policy "authorized users can read staff profiles"
on public.staff_profiles for select
to authenticated
using (
  private.can_read_staff_profile(id)
);

create policy "program managers can manage staff profiles"
on public.staff_profiles for all
to authenticated
using (private.can_manage_org(organization_id))
with check (private.can_manage_org(organization_id));

create policy "authorized users can read certifications"
on public.certifications for select
to authenticated
using (private.can_read_staff_profile(staff_profile_id));

create policy "program managers can manage certifications"
on public.certifications for all
to authenticated
using (
  exists (
    select 1
    from public.staff_profiles sp
    where sp.id = staff_profile_id
      and private.can_manage_org(sp.organization_id)
  )
)
with check (
  exists (
    select 1
    from public.staff_profiles sp
    where sp.id = staff_profile_id
      and private.can_manage_org(sp.organization_id)
  )
);

create policy "authorized users can read sick leave"
on public.sick_leave_records for select
to authenticated
using (private.can_read_staff_profile(staff_profile_id));

create policy "program managers can manage sick leave"
on public.sick_leave_records for all
to authenticated
using (
  exists (
    select 1
    from public.staff_profiles sp
    where sp.id = staff_profile_id
      and private.can_manage_org(sp.organization_id)
  )
)
with check (
  exists (
    select 1
    from public.staff_profiles sp
    where sp.id = staff_profile_id
      and private.can_manage_org(sp.organization_id)
  )
);

create policy "authorized users can read incidents"
on public.incidents for select
to authenticated
using (
  private.can_manage_org(organization_id)
  or (site_id is not null and private.can_access_site(site_id))
  or exists (
    select 1
    from public.incident_staff ist
    join public.staff_profiles sp on sp.id = ist.staff_profile_id
    where ist.incident_id = incidents.id
      and sp.profile_id = auth.uid()
  )
);

create policy "site leads and managers can create incidents"
on public.incidents for insert
to authenticated
with check (
  private.can_manage_org(organization_id)
  or (site_id is not null and private.can_access_site(site_id))
);

create policy "site leads and managers can update incidents"
on public.incidents for update
to authenticated
using (
  private.can_manage_org(organization_id)
  or (site_id is not null and private.can_access_site(site_id))
)
with check (
  private.can_manage_org(organization_id)
  or (site_id is not null and private.can_access_site(site_id))
);

create policy "program managers can delete incidents"
on public.incidents for delete
to authenticated
using (private.can_manage_org(organization_id));

create policy "authorized users can read incident staff"
on public.incident_staff for select
to authenticated
using (
  exists (
    select 1
    from public.incidents i
    where i.id = incident_id
      and (
        private.can_manage_org(i.organization_id)
        or (i.site_id is not null and private.can_access_site(i.site_id))
        or private.is_staff_self(staff_profile_id)
      )
  )
);

create policy "incident managers can manage incident staff"
on public.incident_staff for all
to authenticated
using (
  exists (
    select 1
    from public.incidents i
    where i.id = incident_id
      and (
        private.can_manage_org(i.organization_id)
        or (i.site_id is not null and private.can_access_site(i.site_id))
      )
  )
)
with check (
  exists (
    select 1
    from public.incidents i
    where i.id = incident_id
      and (
        private.can_manage_org(i.organization_id)
        or (i.site_id is not null and private.can_access_site(i.site_id))
      )
  )
);

create policy "authorized users can read follow up tasks"
on public.follow_up_tasks for select
to authenticated
using (
  private.can_manage_org(organization_id)
  or owner_profile_id = auth.uid()
  or exists (
    select 1
    from public.incidents i
    where i.id = incident_id
      and i.site_id is not null
      and private.can_access_site(i.site_id)
  )
);

create policy "site leads and managers can manage follow up tasks"
on public.follow_up_tasks for all
to authenticated
using (
  private.can_manage_org(organization_id)
  or exists (
    select 1
    from public.incidents i
    where i.id = incident_id
      and i.site_id is not null
      and private.can_access_site(i.site_id)
  )
)
with check (
  private.can_manage_org(organization_id)
  or exists (
    select 1
    from public.incidents i
    where i.id = incident_id
      and i.site_id is not null
      and private.can_access_site(i.site_id)
  )
);

create policy "authorized users can read evaluations"
on public.evaluations for select
to authenticated
using (
  private.can_manage_org(organization_id)
  or evaluator_id = auth.uid()
  or private.is_staff_self(staff_profile_id)
  or exists (
    select 1
    from public.staff_profiles sp
    where sp.id = staff_profile_id
      and sp.site_id is not null
      and private.can_access_site(sp.site_id)
  )
);

create policy "site leads and managers can create evaluations"
on public.evaluations for insert
to authenticated
with check (
  private.can_manage_org(organization_id)
  or exists (
    select 1
    from public.staff_profiles sp
    where sp.id = staff_profile_id
      and sp.site_id is not null
      and private.can_access_site(sp.site_id)
  )
);

create policy "site leads and managers can update evaluations"
on public.evaluations for update
to authenticated
using (
  private.can_manage_org(organization_id)
  or evaluator_id = auth.uid()
)
with check (
  private.can_manage_org(organization_id)
  or evaluator_id = auth.uid()
);

create policy "program managers can delete evaluations"
on public.evaluations for delete
to authenticated
using (private.can_manage_org(organization_id));

create policy "authorized users can read evaluation scores"
on public.evaluation_scores for select
to authenticated
using (
  exists (
    select 1
    from public.evaluations e
    where e.id = evaluation_id
      and (
        private.can_manage_org(e.organization_id)
        or e.evaluator_id = auth.uid()
        or private.is_staff_self(e.staff_profile_id)
      )
  )
);

create policy "evaluation managers can manage scores"
on public.evaluation_scores for all
to authenticated
using (
  exists (
    select 1
    from public.evaluations e
    where e.id = evaluation_id
      and (private.can_manage_org(e.organization_id) or e.evaluator_id = auth.uid())
  )
)
with check (
  exists (
    select 1
    from public.evaluations e
    where e.id = evaluation_id
      and (private.can_manage_org(e.organization_id) or e.evaluator_id = auth.uid())
  )
);

create policy "organization members can read survey templates"
on public.survey_templates for select
to authenticated
using (private.is_org_member(organization_id));

create policy "program managers can manage survey templates"
on public.survey_templates for all
to authenticated
using (private.can_manage_org(organization_id))
with check (private.can_manage_org(organization_id));

create policy "organization members can read surveys"
on public.surveys for select
to authenticated
using (
  private.is_org_member(organization_id)
  and (
    private.has_role(array['admin', 'program_manager', 'site_lead']::public.app_role[])
    or approved_for_partner_access = true
  )
);

create policy "program managers can manage surveys"
on public.surveys for all
to authenticated
using (private.can_manage_org(organization_id))
with check (private.can_manage_org(organization_id));

create policy "authorized users can read survey questions"
on public.survey_questions for select
to authenticated
using (
  exists (
    select 1
    from public.surveys s
    where s.id = survey_id
      and private.is_org_member(s.organization_id)
      and (
        private.has_role(array['admin', 'program_manager', 'site_lead']::public.app_role[])
        or s.approved_for_partner_access = true
      )
  )
);

create policy "program managers can manage survey questions"
on public.survey_questions for all
to authenticated
using (
  exists (
    select 1
    from public.surveys s
    where s.id = survey_id
      and private.can_manage_org(s.organization_id)
  )
)
with check (
  exists (
    select 1
    from public.surveys s
    where s.id = survey_id
      and private.can_manage_org(s.organization_id)
  )
);

create policy "program managers can read survey responses"
on public.survey_responses for select
to authenticated
using (private.can_view_sensitive(organization_id));

create policy "program managers can manage survey responses"
on public.survey_responses for all
to authenticated
using (private.can_manage_org(organization_id))
with check (private.can_manage_org(organization_id));

create policy "users can read their ai suggestion logs"
on public.ai_suggestion_logs for select
to authenticated
using (
  created_by = auth.uid()
  or private.can_manage_org(organization_id)
);

create policy "organization users can create ai suggestion logs"
on public.ai_suggestion_logs for insert
to authenticated
with check (
  created_by = auth.uid()
  and (
    organization_id is null
    or private.is_org_member(organization_id)
  )
);

create policy "users can update their ai suggestion logs"
on public.ai_suggestion_logs for update
to authenticated
using (created_by = auth.uid() or private.can_manage_org(organization_id))
with check (created_by = auth.uid() or private.can_manage_org(organization_id));

create policy "authorized users can read documents"
on public.documents for select
to authenticated
using (
  private.can_view_sensitive(organization_id)
  or (staff_profile_id is not null and private.is_staff_self(staff_profile_id))
);

create policy "program managers can manage documents"
on public.documents for all
to authenticated
using (private.can_manage_org(organization_id))
with check (private.can_manage_org(organization_id));

create policy "program managers can read audit logs"
on public.audit_logs for select
to authenticated
using (private.can_manage_org(organization_id));

create policy "authenticated users can append audit logs"
on public.audit_logs for insert
to authenticated
with check (
  actor_id = auth.uid()
  and (
    organization_id is null
    or private.is_org_member(organization_id)
  )
);

create trigger audit_organizations_changes
after insert or update or delete on public.organizations
for each row execute function private.audit_row_change();

create trigger audit_schools_changes
after insert or update or delete on public.schools
for each row execute function private.audit_row_change();

create trigger audit_sites_changes
after insert or update or delete on public.sites
for each row execute function private.audit_row_change();

create trigger audit_programs_changes
after insert or update or delete on public.programs
for each row execute function private.audit_row_change();

create trigger audit_sessions_changes
after insert or update or delete on public.sessions
for each row execute function private.audit_row_change();

create trigger audit_staff_profiles_changes
after insert or update or delete on public.staff_profiles
for each row execute function private.audit_row_change();

create trigger audit_incidents_changes
after insert or update or delete on public.incidents
for each row execute function private.audit_row_change();

create trigger audit_follow_up_tasks_changes
after insert or update or delete on public.follow_up_tasks
for each row execute function private.audit_row_change();

create trigger audit_evaluations_changes
after insert or update or delete on public.evaluations
for each row execute function private.audit_row_change();

create trigger audit_survey_templates_changes
after insert or update or delete on public.survey_templates
for each row execute function private.audit_row_change();

create trigger audit_surveys_changes
after insert or update or delete on public.surveys
for each row execute function private.audit_row_change();

create trigger audit_survey_responses_changes
after insert or update or delete on public.survey_responses
for each row execute function private.audit_row_change();

create trigger audit_ai_suggestion_logs_changes
after insert or update or delete on public.ai_suggestion_logs
for each row execute function private.audit_row_change();

create trigger audit_documents_changes
after insert or update or delete on public.documents
for each row execute function private.audit_row_change();

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  (
    'staff-documents',
    'staff-documents',
    false,
    52428800,
    array[
      'application/pdf',
      'image/jpeg',
      'image/png',
      'text/plain'
    ]
  ),
  (
    'incident-attachments',
    'incident-attachments',
    false,
    52428800,
    array[
      'application/pdf',
      'image/jpeg',
      'image/png',
      'text/plain'
    ]
  ),
  (
    'exports',
    'exports',
    false,
    52428800,
    array[
      'text/csv',
      'application/pdf',
      'application/json'
    ]
  )
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create policy "privileged users can read staff documents"
on storage.objects for select
to authenticated
using (
  bucket_id = 'staff-documents'
  and private.has_role(array['admin', 'program_manager', 'site_lead']::public.app_role[])
);

create policy "program managers can upload staff documents"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'staff-documents'
  and private.has_role(array['admin', 'program_manager']::public.app_role[])
);

create policy "program managers can update staff documents"
on storage.objects for update
to authenticated
using (
  bucket_id = 'staff-documents'
  and private.has_role(array['admin', 'program_manager']::public.app_role[])
)
with check (
  bucket_id = 'staff-documents'
  and private.has_role(array['admin', 'program_manager']::public.app_role[])
);

create policy "program managers can delete staff documents"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'staff-documents'
  and private.has_role(array['admin', 'program_manager']::public.app_role[])
);

create policy "privileged users can read incident attachments"
on storage.objects for select
to authenticated
using (
  bucket_id = 'incident-attachments'
  and private.has_role(array['admin', 'program_manager', 'site_lead']::public.app_role[])
);

create policy "site leads and managers can upload incident attachments"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'incident-attachments'
  and private.has_role(array['admin', 'program_manager', 'site_lead']::public.app_role[])
);

create policy "site leads and managers can update incident attachments"
on storage.objects for update
to authenticated
using (
  bucket_id = 'incident-attachments'
  and private.has_role(array['admin', 'program_manager', 'site_lead']::public.app_role[])
)
with check (
  bucket_id = 'incident-attachments'
  and private.has_role(array['admin', 'program_manager', 'site_lead']::public.app_role[])
);

create policy "program managers can delete incident attachments"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'incident-attachments'
  and private.has_role(array['admin', 'program_manager']::public.app_role[])
);

create policy "program managers can read exports"
on storage.objects for select
to authenticated
using (
  bucket_id = 'exports'
  and private.has_role(array['admin', 'program_manager']::public.app_role[])
);

create policy "program managers can manage exports"
on storage.objects for all
to authenticated
using (
  bucket_id = 'exports'
  and private.has_role(array['admin', 'program_manager']::public.app_role[])
)
with check (
  bucket_id = 'exports'
  and private.has_role(array['admin', 'program_manager']::public.app_role[])
);
